import { BOLD, FG, RESET, DIM, CRLF, link } from '../utils/ansi';

export function getSocials(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Connect${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} GitHub     https://github.com/solomonneas`,
    `  ${FG.green}[+]${RESET} LinkedIn   https://www.linkedin.com/in/solomon-neas`,
    `  ${FG.green}[+]${RESET} Email      ${link('me@solomonneas.dev', 'mailto:me@solomonneas.dev')}`,
    `  ${FG.green}[+]${RESET} Website    https://solomonneas.dev`,
    '',
    `  ${DIM}Click any link above or use${RESET} ${FG.brightWhite}open <shortcut>${RESET} ${DIM}for quick access.${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}
