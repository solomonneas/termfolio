import { BOLD, FG, RESET, DIM, CRLF } from '../utils/ansi';

export function getProjectTermfolio(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> termfolio${RESET}`,
    `  ${DIM}Interactive terminal portfolio${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} React + xterm.js terminal emulator`,
    `  ${FG.green}[+]${RESET} Virtual filesystem with ANSI-rendered content`,
    `  ${FG.green}[+]${RESET} Full shell emulation: history, line editing, tab completion`,
    `  ${FG.green}[+]${RESET} Easter eggs included`,
    '',
    `  ${DIM}Stack:${RESET}  React 19, TypeScript, xterm.js, Vite`,
    `  ${DIM}URL:${RESET}    termfolio.solomonneas.dev`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectHomelab(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> homelab${RESET}`,
    `  ${DIM}Self-hosted infrastructure${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Proxmox cluster with multiple nodes`,
    `  ${FG.green}[+]${RESET} Docker-based service deployment`,
    `  ${FG.green}[+]${RESET} Automated backups and monitoring`,
    `  ${FG.green}[+]${RESET} Reverse proxy with SSL termination`,
    '',
    `  ${DIM}Stack:${RESET}  Proxmox, Docker, Nginx, Grafana`,
    '',
  ];
  return lines.join(CRLF);
}

export function getProjectSolomonNeasDev(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> solomonneas.dev${RESET}`,
    `  ${DIM}Personal website and portfolio${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Main portfolio site`,
    `  ${FG.green}[+]${RESET} Project showcase and blog`,
    `  ${FG.green}[+]${RESET} Clean, responsive design`,
    '',
    `  ${DIM}Stack:${RESET}  Next.js, TypeScript, Tailwind CSS`,
    `  ${DIM}URL:${RESET}    solomonneas.dev`,
    '',
  ];
  return lines.join(CRLF);
}
