import { CommandRegistry } from '../CommandRegistry';

CommandRegistry.register({
  name: 'clear',
  description: 'Clear the terminal',
  usage: 'clear',
  execute: (ctx) => {
    ctx.terminal.clear();
  },
});
