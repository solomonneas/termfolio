import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF, stripAnsi } from '../../utils/ansi';
import { getContent } from '../../data';

const MAX_PATTERN_LENGTH = 200;
const MAX_LINES = 10000;

function searchDir(
  ctx: CommandContext,
  absPath: string,
  pattern: RegExp,
  patternStr: string,
  results: { path: string; line: string }[],
  lineCount: { value: number },
): void {
  if (lineCount.value >= MAX_LINES) return;

  const entries = ctx.fs.list(absPath);
  if (!entries) return;

  for (const entry of entries) {
    if (lineCount.value >= MAX_LINES) return;

    const childPath = absPath === '/' ? `/${entry.name}` : `${absPath}/${entry.name}`;
    if (entry.node.type === 'dir') {
      searchDir(ctx, childPath, pattern, patternStr, results, lineCount);
    } else if (entry.node.content) {
      const content = getContent(entry.node.content);
      if (!content) continue;
      const plain = stripAnsi(content);
      for (const line of plain.split(/\r?\n/)) {
        if (lineCount.value >= MAX_LINES) return;
        lineCount.value++;

        const trimmed = line.trim();
        if (trimmed && pattern.test(trimmed)) {
          // Highlight matches in the line
          const highlighted = trimmed.replace(
            new RegExp(patternStr, 'gi'),
            (match) => `${FG.red}${BOLD}${match}${RESET}`,
          );
          results.push({
            path: ctx.fs.getDisplayPath(childPath),
            line: highlighted,
          });
        }
      }
    }
  }
}

CommandRegistry.register({
  name: 'grep',
  description: 'Search file contents',
  usage: 'grep <pattern> [path]',
  execute: (ctx) => {
    const { terminal, fs, cwd, args } = ctx;

    if (args.length === 0) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}grep:${RESET} missing search pattern${CRLF}`);
      terminal.write(`  ${DIM}Usage: grep <pattern> [path]${RESET}${CRLF}${CRLF}`);
      return;
    }

    const patternStr = args[0];

    if (patternStr.length > MAX_PATTERN_LENGTH) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}grep:${RESET} pattern too long (max ${MAX_PATTERN_LENGTH} characters)${CRLF}${CRLF}`);
      return;
    }

    let pattern: RegExp;
    try {
      pattern = new RegExp(patternStr, 'gi');
    } catch {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}grep:${RESET} invalid pattern '${patternStr}'${CRLF}${CRLF}`);
      return;
    }

    const searchPath = args[1] ? fs.resolve(args[1], cwd) : cwd;
    const results: { path: string; line: string }[] = [];
    const lineCount = { value: 0 };

    if (fs.isDir(searchPath)) {
      searchDir(ctx, searchPath, pattern, patternStr, results, lineCount);
    } else if (fs.isFile(searchPath)) {
      const node = fs.getNode(searchPath);
      if (node?.content) {
        const content = getContent(node.content);
        if (content) {
          const plain = stripAnsi(content);
          for (const line of plain.split(/\r?\n/)) {
            if (lineCount.value >= MAX_LINES) break;
            lineCount.value++;

            const trimmed = line.trim();
            if (trimmed && pattern.test(trimmed)) {
              const highlighted = trimmed.replace(
                new RegExp(patternStr, 'gi'),
                (match) => `${FG.red}${BOLD}${match}${RESET}`,
              );
              results.push({
                path: fs.getDisplayPath(searchPath),
                line: highlighted,
              });
            }
          }
        }
      }
    } else {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}grep:${RESET} '${args[1] || searchPath}': No such file or directory${CRLF}${CRLF}`);
      return;
    }

    terminal.write(CRLF);
    if (results.length === 0) {
      terminal.write(`  ${DIM}No matches found.${RESET}${CRLF}`);
    } else {
      for (const r of results) {
        terminal.write(`  ${FG.magenta}${r.path}${RESET}${DIM}:${RESET} ${r.line}${CRLF}`);
      }
      if (lineCount.value >= MAX_LINES) {
        terminal.write(`${CRLF}  ${DIM}(search stopped after ${MAX_LINES} lines)${RESET}${CRLF}`);
      }
    }
    terminal.write(CRLF);
  },
});
