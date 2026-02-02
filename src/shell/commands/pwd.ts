import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'pwd',
  description: 'Print working directory',
  usage: 'pwd',
  execute: (ctx: CommandContext) => {
    ctx.terminal.write(`${CRLF}  ${ctx.cwd}${CRLF}`);
  },
});
