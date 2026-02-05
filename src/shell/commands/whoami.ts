import { CommandRegistry } from '../CommandRegistry';
import { CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'whoami',
  description: 'Print current user',
  usage: 'whoami',
  execute: (ctx) => {
    ctx.terminal.write(`${CRLF}  A curious visitor. Welcome.${CRLF}${CRLF}`);
  },
});
