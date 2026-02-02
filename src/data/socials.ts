import { BOLD, FG, RESET, DIM, CRLF, link } from '../utils/ansi';

export function getSocials(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Connect${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} GitHub     ${link('github.com/solomonneas', 'https://github.com/solomonneas')}`,
    `  ${FG.green}[+]${RESET} LinkedIn   ${link('linkedin.com/in/solomon-neas', 'https://www.linkedin.com/in/solomon-neas')}`,
    `  ${FG.green}[+]${RESET} Email      ${link('solomon@solomonneas.dev', 'mailto:solomon@solomonneas.dev')}`,
    `  ${FG.green}[+]${RESET} Website    ${link('solomonneas.dev', 'https://solomonneas.dev')}`,
    '',
    `  ${DIM}Click any link above or use${RESET} ${FG.brightWhite}open <shortcut>${RESET} ${DIM}for quick access.${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}
