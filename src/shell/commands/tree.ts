import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

function buildTree(
  ctx: CommandContext,
  absPath: string,
  prefix: string,
  lines: string[],
  counts: { dirs: number; files: number },
): void {
  const entries = ctx.fs.list(absPath);
  if (!entries) return;

  // Filter dotfiles from tree output
  const visible = entries.filter((e) => !e.name.startsWith('.'));

  for (let i = 0; i < visible.length; i++) {
    const entry = visible[i];
    const isLast = i === visible.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const childPrefix = isLast ? '    ' : '│   ';

    if (entry.node.type === 'dir') {
      counts.dirs++;
      lines.push(`${prefix}${connector}${BOLD}${FG.blue}${entry.name}/${RESET}`);
      const childPath = absPath === '/' ? `/${entry.name}` : `${absPath}/${entry.name}`;
      buildTree(ctx, childPath, prefix + childPrefix, lines, counts);
    } else {
      counts.files++;
      lines.push(`${prefix}${connector}${entry.name}`);
    }
  }
}

CommandRegistry.register({
  name: 'tree',
  description: 'Display directory tree',
  usage: 'tree [path]',
  execute: (ctx) => {
    const { terminal, fs, cwd, args } = ctx;
    const targetPath = args[0] ? fs.resolve(args[0], cwd) : cwd;

    if (!fs.isDir(targetPath)) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}tree:${RESET} '${args[0] || targetPath}': Not a directory${CRLF}${CRLF}`);
      return;
    }

    const displayName = fs.getDisplayPath(targetPath);
    const lines: string[] = [`  ${BOLD}${FG.blue}${displayName}${RESET}`];
    const counts = { dirs: 0, files: 0 };

    buildTree(ctx, targetPath, '  ', lines, counts);

    terminal.write(CRLF);
    for (const line of lines) {
      terminal.write(line + CRLF);
    }
    terminal.write(CRLF);
    terminal.write(`  ${DIM}${counts.dirs} directories, ${counts.files} files${RESET}${CRLF}${CRLF}`);
  },
});
