import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { BOLD, FG, RESET, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'cd',
  description: 'Change directory',
  usage: 'cd [path]',
  execute: (ctx: CommandContext) => {
    const { terminal, fs, cwd, args, setCwd, previousDir } = ctx;

    let target: string;

    if (args.length === 0) {
      target = '/home/solomon';
    } else if (args[0] === '-') {
      target = previousDir;
    } else {
      target = fs.resolve(args[0], cwd);
    }

    if (!fs.isDir(target)) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}cd:${RESET} ${args[0] ?? target}: No such directory${CRLF}`);
      return;
    }

    setCwd(target);
  },
});
