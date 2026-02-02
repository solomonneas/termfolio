import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF, stripAnsi } from '../../utils/ansi';
import { getContent } from '../../data';

function searchDir(
  ctx: CommandContext,
  absPath: string,
  pattern: RegExp,
  results: { path: string; line: string }[],
): void {
  const entries = ctx.fs.list(absPath);
  if (!entries) return;

  for (const entry of entries) {
    const childPath = absPath === '/' ? `/${entry.name}` : `${absPath}/${entry.name}`;
    if (entry.node.type === 'dir') {
      searchDir(ctx, childPath, pattern, results);
    } else if (entry.node.content) {
      const content = getContent(entry.node.content);
      if (!content) continue;
      const plain = stripAnsi(content);
      for (const line of plain.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (trimmed && pattern.test(trimmed)) {
          // Highlight matches in the line
          const highlighted = trimmed.replace(pattern, (match) => `${FG.red}${BOLD}${match}${RESET}`);
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
    let pattern: RegExp;
    try {
      pattern = new RegExp(patternStr, 'gi');
    } catch {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}grep:${RESET} invalid pattern '${patternStr}'${CRLF}${CRLF}`);
      return;
    }

    const searchPath = args[1] ? fs.resolve(args[1], cwd) : cwd;
    const results: { path: string; line: string }[] = [];

    if (fs.isDir(searchPath)) {
      searchDir(ctx, searchPath, pattern, results);
    } else if (fs.isFile(searchPath)) {
      const node = fs.getNode(searchPath);
      if (node?.content) {
        const content = getContent(node.content);
        if (content) {
          const plain = stripAnsi(content);
          for (const line of plain.split(/\r?\n/)) {
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
    }
    terminal.write(CRLF);
  },
});
