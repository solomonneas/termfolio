import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

function registerEditor(name: string) {
  CommandRegistry.register({
    name,
    description: `Open ${name} editor`,
    hidden: true,
    async: true,
    execute: (ctx) => {
      const { terminal } = ctx;
      const filename = ctx.args[0] || '[No Name]';

      // Fake editor screen
      terminal.write('\x1b[?25l'); // hide cursor
      terminal.write(CRLF);
      terminal.write(`  ${BOLD}${FG.brightWhite}  ${name === 'vim' ? 'VIM' : 'GNU nano'} - ${filename}${RESET}${CRLF}`);
      terminal.write(`  ${DIM}${'─'.repeat(50)}${RESET}${CRLF}`);

      if (name === 'vim') {
        terminal.write(CRLF);
        for (let i = 0; i < 5; i++) {
          terminal.write(`  ${FG.blue}~${RESET}${CRLF}`);
        }
        terminal.write(CRLF);
        terminal.write(`  ${DIM}"${filename}" [readonly]${RESET}${CRLF}`);
      } else {
        terminal.write(CRLF);
        for (let i = 0; i < 5; i++) {
          terminal.write(CRLF);
        }
        terminal.write(`  ${DIM}[ Read 0 lines ]${RESET}${CRLF}`);
      }

      setTimeout(() => {
        terminal.write(CRLF);
        terminal.write(`  ${FG.yellow}${BOLD}E605: Read-only file system${RESET}${CRLF}`);
        terminal.write(`  ${DIM}(this is a terminal portfolio, not a real editor)${RESET}${CRLF}`);
        terminal.write('\x1b[?25h'); // show cursor
        ctx.reprompt();
      }, 1500);
    },
  });
}

registerEditor('vim');
registerEditor('nano');
