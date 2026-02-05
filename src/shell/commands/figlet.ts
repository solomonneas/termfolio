import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

// Simple 5-line tall ASCII font
const FONT: Record<string, string[]> = {
  'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
  'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
  'C': [' ████', '█    ', '█    ', '█    ', ' ████'],
  'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
  'E': ['█████', '█    ', '███  ', '█    ', '█████'],
  'F': ['█████', '█    ', '███  ', '█    ', '█    '],
  'G': [' ████', '█    ', '█  ██', '█   █', ' ████'],
  'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
  'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
  'J': ['  ███', '    █', '    █', '█   █', ' ███ '],
  'K': ['█  █ ', '█ █  ', '██   ', '█ █  ', '█  █ '],
  'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
  'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
  'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
  'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
  'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
  'Q': [' ███ ', '█   █', '█ █ █', '█  █ ', ' ██ █'],
  'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
  'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
  'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
  'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
  'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
  'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
  'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
  'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
  'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
  '0': [' ███ ', '█  ██', '█ █ █', '██  █', ' ███ '],
  '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
  '2': [' ███ ', '█   █', '  ██ ', ' █   ', '█████'],
  '3': ['████ ', '    █', ' ███ ', '    █', '████ '],
  '4': ['█   █', '█   █', '█████', '    █', '    █'],
  '5': ['█████', '█    ', '████ ', '    █', '████ '],
  '6': [' ███ ', '█    ', '████ ', '█   █', ' ███ '],
  '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
  '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
  '9': [' ███ ', '█   █', ' ████', '    █', ' ███ '],
  ' ': ['   ', '   ', '   ', '   ', '   '],
  '!': ['  █  ', '  █  ', '  █  ', '     ', '  █  '],
  '?': [' ███ ', '█   █', '  ██ ', '     ', '  █  '],
  '.': ['     ', '     ', '     ', '     ', '  █  '],
  '-': ['     ', '     ', '█████', '     ', '     '],
  '_': ['     ', '     ', '     ', '     ', '█████'],
  '#': [' █ █ ', '█████', ' █ █ ', '█████', ' █ █ '],
  '@': [' ███ ', '█ ███', '█ █ █', '█ ██ ', ' ███ '],
};

function renderFiglet(text: string): string[] {
  const rows: string[] = ['', '', '', '', ''];
  for (const char of text.toUpperCase()) {
    const glyph = FONT[char] || FONT['?'] || ['     ', '     ', '     ', '     ', '     '];
    for (let i = 0; i < 5; i++) {
      rows[i] += glyph[i] + ' ';
    }
  }
  return rows;
}

CommandRegistry.register({
  name: 'figlet',
  description: 'Display text as ASCII art',
  usage: 'figlet <text>',
  hidden: true,
  execute: (ctx) => {
    const { terminal, args } = ctx;
    const text = args.join(' ');

    if (!text) {
      terminal.write(`${CRLF}  ${DIM}Usage: figlet <text>${RESET}${CRLF}`);
      terminal.write(`  ${DIM}Example: figlet hello${RESET}${CRLF}${CRLF}`);
      return;
    }

    const rendered = renderFiglet(text);
    terminal.write(CRLF);
    for (const line of rendered) {
      terminal.write(`  ${FG.cyan}${BOLD}${line}${RESET}${CRLF}`);
    }
    terminal.write(CRLF);
  },
});

// toilet is an alias for figlet
CommandRegistry.register({
  name: 'toilet',
  description: 'Display text as ASCII art',
  usage: 'toilet <text>',
  hidden: true,
  execute: (ctx) => {
    // Delegate to figlet
    const text = ctx.args.join(' ');
    if (!text) {
      ctx.terminal.write(`${CRLF}  ${DIM}Usage: toilet <text>${RESET}${CRLF}`);
      ctx.terminal.write(`  ${DIM}(It's like figlet, but with a funnier name)${RESET}${CRLF}${CRLF}`);
      return;
    }

    const rendered = renderFiglet(text);
    ctx.terminal.write(CRLF);
    for (const line of rendered) {
      ctx.terminal.write(`  ${FG.magenta}${BOLD}${line}${RESET}${CRLF}`);
    }
    ctx.terminal.write(CRLF);
  },
});
