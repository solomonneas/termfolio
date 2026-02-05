import { CommandRegistry } from '../CommandRegistry';
import { RESET, CRLF } from '../../utils/ansi';

// Rainbow color cycle using 256-color ANSI codes
const RAINBOW = [196, 202, 208, 214, 220, 226, 190, 154, 118, 82, 46, 47, 48, 49, 50, 51, 45, 39, 33, 27, 21, 57, 93, 129, 165, 201];

function rainbowize(text: string, rowOffset: number = 0): string {
  let result = '';
  let colorIdx = rowOffset;
  for (const char of text) {
    if (char === ' ' || char === '\t') {
      result += char;
    } else {
      const color = RAINBOW[colorIdx % RAINBOW.length];
      result += `\x1b[38;5;${color}m${char}`;
      colorIdx++;
    }
  }
  return result + RESET;
}

const DEMO_TEXT = [
  '  _____                      __       _ _       ',
  ' |_   _|__ _ __ _ __ ___   / _| ___ | (_) ___  ',
  '   | |/ _ \\ \'__| \'_ ` _ \\ | |_ / _ \\| | |/ _ \\ ',
  '   | |  __/ |  | | | | | ||  _| (_) | | | (_) |',
  '   |_|\\___|_|  |_| |_| |_||_|  \\___/|_|_|\\___/ ',
  '',
  '   Taste the rainbow.',
];

CommandRegistry.register({
  name: 'lolcat',
  description: 'Rainbow text',
  usage: 'lolcat <text>',
  hidden: true,
  execute: (ctx) => {
    const { terminal, args } = ctx;
    const text = args.join(' ');

    terminal.write(CRLF);

    if (!text) {
      // Show rainbow demo
      for (let i = 0; i < DEMO_TEXT.length; i++) {
        terminal.write(`  ${rainbowize(DEMO_TEXT[i], i * 3)}${CRLF}`);
      }
    } else {
      // Rainbow the input text
      terminal.write(`  ${rainbowize(text, 0)}${CRLF}`);
    }

    terminal.write(CRLF);
  },
});
