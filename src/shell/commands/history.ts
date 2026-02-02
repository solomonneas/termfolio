import { CommandRegistry } from '../CommandRegistry';
import { DIM, RESET, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'history',
  description: 'Show command history',
  usage: 'history',
  execute: (ctx) => {
    const { terminal, history } = ctx;

    if (history.length === 0) {
      terminal.write(`${CRLF}  ${DIM}No commands in history.${RESET}${CRLF}${CRLF}`);
      return;
    }

    terminal.write(CRLF);
    // Display in reverse so most recent is at the bottom (like bash)
    const items = [...history].reverse();
    for (let i = 0; i < items.length; i++) {
      const num = String(i + 1).padStart(4);
      terminal.write(`  ${DIM}${num}${RESET}  ${items[i]}${CRLF}`);
    }
    terminal.write(CRLF);
  },
});
