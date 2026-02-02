import { BOLD, FG, RESET, DIM, CRLF } from '../utils/ansi';

export function getBlogHelloWorld(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Hello, World${RESET}`,
    `  ${DIM}January 30, 2025${RESET}`,
    '',
    `  Welcome to my blog. This is my first post from the terminal.`,
    '',
    `  If you're reading this, you've found the terminal portfolio.`,
    `  Nice work. More posts coming soon.`,
    '',
  ];
  return lines.join(CRLF);
}
