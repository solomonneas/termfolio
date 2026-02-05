import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

const QUIT_RESPONSES = [
  "You're stuck now. Good luck.",
  ':q? That\'s cute.',
  'Escape won\'t save you here.',
  'Have you tried turning it off and... wait, no.',
  'vim has been running for 0 days, 0 hours, and an eternity.',
  'Alt+F4 won\'t work either.',
  'OK FINE. But only because I like you.',
];

function registerEditor(name: string) {
  CommandRegistry.register({
    name,
    description: `Open ${name} editor`,
    hidden: true,
    async: true,
    execute: (ctx) => {
      const { terminal } = ctx;
      const filename = ctx.args[0] || '[No Name]';

      // If it's nano, just do the quick read-only gag
      if (name === 'nano') {
        terminal.write('\x1b[?25l'); // hide cursor
        terminal.write(CRLF);
        terminal.write(`  ${BOLD}${FG.brightWhite}  GNU nano - ${filename}${RESET}${CRLF}`);
        terminal.write(`  ${DIM}${'─'.repeat(50)}${RESET}${CRLF}`);
        terminal.write(CRLF);
        for (let i = 0; i < 5; i++) {
          terminal.write(CRLF);
        }
        terminal.write(`  ${DIM}[ Read 0 lines ]${RESET}${CRLF}`);

        setTimeout(() => {
          terminal.write(CRLF);
          terminal.write(`  ${FG.yellow}${BOLD}E605: Read-only file system${RESET}${CRLF}`);
          terminal.write(`  ${DIM}(this is a terminal portfolio, not a real editor)${RESET}${CRLF}`);
          terminal.write('\x1b[?25h'); // show cursor
          ctx.reprompt();
        }, 1500);
        return;
      }

      // vim: the trap
      ctx.lockInput();
      terminal.write('\x1b[?25l'); // hide cursor

      // Draw fake vim screen
      terminal.write(CRLF);
      terminal.write(`  ${BOLD}${FG.brightWhite}  VIM - ${filename}${RESET}${CRLF}`);
      terminal.write(`  ${DIM}${'─'.repeat(50)}${RESET}${CRLF}`);
      terminal.write(CRLF);
      for (let i = 0; i < 5; i++) {
        terminal.write(`  ${FG.blue}~${RESET}${CRLF}`);
      }
      terminal.write(CRLF);
      terminal.write(`  ${FG.yellow}${BOLD}${QUIT_RESPONSES[0]}${RESET}${CRLF}`);
      terminal.write(`  ${DIM}(try :q to quit... if you can)${RESET}${CRLF}`);

      let attempts = 0;
      let colonMode = false;
      let colonBuffer = '';

      function cleanup() {
        dataDisposable.dispose();
        ctx.unlockInput();
        terminal.write(CRLF);
        terminal.write(`  ${DIM}(this is a terminal portfolio, not a real editor)${RESET}${CRLF}`);
        terminal.write('\x1b[?25h'); // show cursor
        ctx.reprompt();
      }

      const dataDisposable = terminal.onData((data: string) => {
        // Ctrl+C always escapes
        if (data === '\x03') {
          cleanup();
          return;
        }

        if (colonMode) {
          if (data === '\r') {
            // Process the command
            const cmd = colonBuffer.trim();
            terminal.write(CRLF);

            const quitCommands = ['q', 'q!', 'wq', 'wq!', 'x', 'qa', 'qa!', 'exit'];
            if (quitCommands.includes(cmd)) {
              attempts++;
              if (attempts >= QUIT_RESPONSES.length) {
                // They've earned their freedom
                cleanup();
                return;
              }
              terminal.write(`  ${FG.yellow}${BOLD}${QUIT_RESPONSES[attempts]}${RESET}${CRLF}`);
            } else if (cmd === 'help') {
              terminal.write(`  ${DIM}The only help is perseverance. Keep trying :q${RESET}${CRLF}`);
            } else {
              terminal.write(`  ${FG.red}E492: Not an editor command: ${cmd}${RESET}${CRLF}`);
            }

            colonMode = false;
            colonBuffer = '';
          } else if (data === '\x1b' || data === '\x1b[A' || data === '\x1b[B') {
            // Escape or arrow keys cancel colon mode
            colonMode = false;
            colonBuffer = '';
            terminal.write(CRLF);
          } else if (data === '\x7f' || data === '\b') {
            // Backspace
            if (colonBuffer.length > 0) {
              colonBuffer = colonBuffer.slice(0, -1);
              terminal.write('\b \b');
            }
          } else if (data.length === 1 && data.charCodeAt(0) >= 32) {
            colonBuffer += data;
            terminal.write(data);
          }
        } else if (data === ':') {
          colonMode = true;
          colonBuffer = '';
          terminal.write(`${CRLF}  ${DIM}:${RESET}`);
        }
        // All other input is silently ignored (you're in vim after all)
      });
    },
  });
}

registerEditor('vim');
registerEditor('nano');
