import { BOLD, FG, RESET, DIM, CRLF } from '../utils/ansi';

export function getAbout(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> About Me${RESET}`,
    '',
    `  Hey, I'm ${BOLD}Solomon Neas${RESET}. Software engineer who likes building things`,
    `  that work well and look good doing it.`,
    '',
    `${BOLD}${FG.cyan}  >> What I Do${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Full-stack web development`,
    `  ${FG.green}[+]${RESET} Infrastructure and homelab tinkering`,
    `  ${FG.green}[+]${RESET} Self-hosting and systems administration`,
    `  ${FG.green}[+]${RESET} Building tools that solve real problems`,
    '',
    `${BOLD}${FG.cyan}  >> Tech I Like${RESET}`,
    '',
    `  ${DIM}Languages:${RESET}   TypeScript, Python, Go, Rust`,
    `  ${DIM}Frontend:${RESET}    React, Next.js, Tailwind`,
    `  ${DIM}Backend:${RESET}     Node.js, FastAPI, PostgreSQL`,
    `  ${DIM}Infra:${RESET}       Docker, Proxmox, Nginx, Linux`,
    '',
    `${BOLD}${FG.cyan}  >> Contact${RESET}`,
    '',
    `  ${DIM}Email:${RESET}       me@solomonneas.dev`,
    `  ${DIM}GitHub:${RESET}      https://github.com/solomonneas`,
    `  ${DIM}Website:${RESET}     https://solomonneas.dev`,
    '',
  ];
  return lines.join(CRLF);
}
