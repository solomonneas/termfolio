import { CommandRegistry } from '../CommandRegistry';
import { FG, RESET, DIM, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'echo',
  description: 'Display text',
  usage: 'echo [text...]',
  execute: (ctx) => {
    const { terminal, rawInput } = ctx;
    const text = rawInput.replace(/^echo\s*/, '');

    // Variable substitution easter eggs
    const vars: Record<string, string> = {
      '$PATH': '/usr/local/bin:/usr/bin:/home/solomon/.local/bin:/home/solomon/go/bin',
      '$HOME': '/home/solomon',
      '$USER': 'solomon',
      '$SHELL': '/bin/termfolio-sh',
      '$EDITOR': 'vim',
      '$TERM': 'xterm-256color',
    };

    const resolved = vars[text.trim()];
    if (resolved) {
      terminal.write(`${CRLF}  ${resolved}${CRLF}${CRLF}`);
      return;
    }

    // Easter egg responses
    if (text.replace(/['"]/g, '').trim().toLowerCase() === 'i use arch btw') {
      terminal.write(`${CRLF}  ${DIM}We know.${RESET}${CRLF}${CRLF}`);
      return;
    }

    if (text.replace(/['"]/g, '').trim().toLowerCase() === 'hello world') {
      terminal.write(`${CRLF}  ${FG.green}Hello, World!${RESET} ${DIM}(classic)${RESET}${CRLF}${CRLF}`);
      return;
    }

    // Strip surrounding quotes if present
    const stripped = text.replace(/^(['"])(.*)\1$/, '$2');
    terminal.write(`${CRLF}  ${stripped}${CRLF}${CRLF}`);
  },
});
