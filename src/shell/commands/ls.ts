import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

function formatColumns(items: string[], termCols: number): string {
  if (items.length === 0) return '';

  // Calculate column width from longest item (strip ANSI for measurement)
  const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, '');
  const maxLen = Math.max(...items.map(i => stripAnsi(i).length));
  const colWidth = maxLen + 2;
  const numCols = Math.max(1, Math.floor(termCols / colWidth));

  const lines: string[] = [];
  for (let i = 0; i < items.length; i += numCols) {
    const row = items.slice(i, i + numCols);
    const formatted = row.map((item, idx) => {
      if (idx === row.length - 1) return item;
      const pad = colWidth - stripAnsi(item).length;
      return item + ' '.repeat(Math.max(0, pad));
    });
    lines.push('  ' + formatted.join(''));
  }
  return lines.join(CRLF);
}

CommandRegistry.register({
  name: 'ls',
  description: 'List directory contents',
  usage: 'ls [-la] [path]',
  execute: (ctx: CommandContext) => {
    const { terminal, fs, cwd, args } = ctx;

    let showLong = false;
    let showAll = false;
    let targetPath = cwd;

    for (const arg of args) {
      if (arg.startsWith('-')) {
        if (arg.includes('l')) showLong = true;
        if (arg.includes('a')) showAll = true;
      } else {
        targetPath = fs.resolve(arg, cwd);
      }
    }

    const entries = fs.list(targetPath);
    if (!entries) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}ls:${RESET} cannot access '${targetPath}': No such file or directory${CRLF}`);
      return;
    }

    if (entries.length === 0) {
      terminal.write(CRLF);
      return;
    }

    terminal.write(CRLF);

    if (showLong) {
      if (showAll) {
        terminal.write(`  ${DIM}drwxr-xr-x${RESET}  ${DIM}4.0K${RESET}  ${DIM}Jan 31 2025${RESET}  ${BOLD}${FG.blue}.${RESET}${CRLF}`);
        terminal.write(`  ${DIM}drwxr-xr-x${RESET}  ${DIM}4.0K${RESET}  ${DIM}Jan 31 2025${RESET}  ${BOLD}${FG.blue}..${RESET}${CRLF}`);
      }
      for (const entry of entries) {
        const isDir = entry.node.type === 'dir';
        const perms = entry.node.permissions ?? (isDir ? 'drwxr-xr-x' : '-rw-r--r--');
        const size = entry.node.size ?? (isDir ? '4.0K' : '0B');
        const modified = entry.node.modified ?? 'Jan 01 2025';
        const name = isDir
          ? `${BOLD}${FG.blue}${entry.name}/${RESET}`
          : entry.name;
        terminal.write(`  ${DIM}${perms}${RESET}  ${DIM}${size.padStart(5)}${RESET}  ${DIM}${modified}${RESET}  ${name}${CRLF}`);
      }
    } else {
      const items = entries.map(entry => {
        if (entry.node.type === 'dir') {
          return `${BOLD}${FG.blue}${entry.name}/${RESET}`;
        }
        return entry.name;
      });
      terminal.write(formatColumns(items, terminal.cols) + CRLF);
    }

    terminal.write(CRLF);
  },
});
