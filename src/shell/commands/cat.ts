import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { BOLD, FG, RESET, CRLF } from '../../utils/ansi';
import { getContent, getNotFoundMessage, specialContentKeys } from '../../data';

CommandRegistry.register({
  name: 'cat',
  description: 'Display file contents',
  usage: 'cat <file>',
  execute: (ctx: CommandContext) => {
    const { terminal, fs, cwd, args } = ctx;

    if (args.length === 0) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}cat:${RESET} missing file operand${CRLF}`);
      return;
    }

    // Easter egg: /dev/urandom or /dev/random
    if (args[0] === '/dev/urandom' || args[0] === '/dev/random') {
      const hex = (n: number) => [...Array(n)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      const lines = [
        '',
        `  ${FG.green}${hex(64)}${RESET}`,
        `  ${FG.green}${hex(64)}${RESET}`,
        `  ${FG.green}${hex(64)}${RESET}`,
        '',
        `  ... just kidding. Here's what you're really looking for:`,
        '',
        `  ${BOLD}${FG.cyan}Email:${RESET}    me@solomonneas.dev`,
        `  ${BOLD}${FG.cyan}GitHub:${RESET}   github.com/solomonneas`,
        '',
        `  The real randomness is my career path.`,
        '',
      ];
      terminal.write(lines.join(CRLF));
      return;
    }

    const absPath = fs.resolve(args[0], cwd);

    if (fs.isDir(absPath)) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}cat:${RESET} ${args[0]}: Is a directory${CRLF}`);
      return;
    }

    const contentKey = fs.getContent(absPath);
    if (!contentKey) {
      terminal.write(getNotFoundMessage(args[0]));
      return;
    }

    // Open special files in a background tab (write content first, then open)
    if (specialContentKeys[contentKey]) {
      const content = getContent(contentKey);
      if (content) {
        terminal.write(content);
      }
      // Small delay so terminal renders before browser steals focus
      setTimeout(() => {
        const w = window.open(specialContentKeys[contentKey], '_blank', 'noopener,noreferrer');
        // Bring focus back to the terminal
        if (w) {
          w.opener = null;
          window.focus();
        }
      }, 100);
      return;
    }

    const content = getContent(contentKey);
    if (content) {
      terminal.write(content);
    } else {
      terminal.write(getNotFoundMessage(args[0]));
    }
  },
});
