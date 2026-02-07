import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

const SHORTCUTS: Record<string, string> = {
  github: 'https://github.com/solomonneas',
  linkedin: 'https://www.linkedin.com/in/solomon-neas',
  resume: 'https://www.solomonneas.dev/solomon_neas_resume.pdf',
  website: 'https://solomonneas.dev',
  site: 'https://solomonneas.dev',
  blog: 'https://solomonneas.dev/blog',
};

function registerOpen(name: string) {
  CommandRegistry.register({
    name,
    description: 'Open URL in browser',
    usage: `${name} <shortcut|url>`,
    execute: (ctx) => {
      const { terminal, args } = ctx;

      if (args.length === 0) {
        terminal.write(CRLF);
        terminal.write(`  ${BOLD}${FG.cyan}Shortcuts:${RESET}${CRLF}`);
        for (const [key, url] of Object.entries(SHORTCUTS)) {
          terminal.write(`  ${FG.brightWhite}${key.padEnd(12)}${RESET} ${DIM}${url}${RESET}${CRLF}`);
        }
        terminal.write(CRLF);
        terminal.write(`  ${DIM}Or pass any URL directly.${RESET}${CRLF}${CRLF}`);
        return;
      }

      const input = args[0].toLowerCase();
      const url = SHORTCUTS[input] || args[0];

      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        terminal.write(`${CRLF}  ${FG.red}${BOLD}${name}:${RESET} '${args[0]}' is not a valid URL or shortcut${CRLF}${CRLF}`);
        return;
      }

      const win = window.open(url, '_blank', 'noopener,noreferrer');
      if (win) win.opener = null;
      terminal.write(`${CRLF}  ${DIM}Opening ${url}...${RESET}${CRLF}${CRLF}`);
    },
  });
}

registerOpen('open');
registerOpen('xdg-open');
