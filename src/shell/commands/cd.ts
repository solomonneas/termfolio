import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { BOLD, FG, RESET, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'cd',
  description: 'Change directory',
  usage: 'cd [path]',
  execute: (ctx: CommandContext) => {
    const { terminal, fs, cwd, args, setCwd, previousDir } = ctx;

    let target: string;
    let displayPath: string; // What to show in error message

    if (args.length === 0) {
      target = '/home/solomon';
      displayPath = '~';
    } else if (args[0] === '-') {
      target = previousDir;
      displayPath = previousDir;
    } else {
      target = fs.resolve(args[0], cwd);
      displayPath = args[0];
    }

    if (!fs.isDir(target)) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}cd:${RESET} ${displayPath}: No such directory${CRLF}`);
      return;
    }

    setCwd(target);
  },
});
