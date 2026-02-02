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

export function getBlogHomelabJourney(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> The Homelab Journey${RESET}`,
    `  ${DIM}February 12, 2025${RESET}`,
    '',
    `  It started with a single Raspberry Pi and a dream of not paying`,
    `  for cloud hosting. Now it's a Proxmox cluster with more VMs than`,
    `  I can count and a power bill my future self will deal with.`,
    '',
    `  ${BOLD}The Setup${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} Proxmox VE cluster (3 nodes)`,
    `  ${FG.green}[+]${RESET} TrueNAS for storage (ZFS mirrors)`,
    `  ${FG.green}[+]${RESET} Pi-hole for DNS`,
    `  ${FG.green}[+]${RESET} Nginx Proxy Manager for reverse proxy`,
    `  ${FG.green}[+]${RESET} Wazuh + TheHive for security monitoring`,
    `  ${FG.green}[+]${RESET} Grafana + Prometheus for metrics`,
    '',
    `  The best part: everything is documented so students can rebuild`,
    `  it from scratch. Infrastructure as a teaching artifact.`,
    '',
  ];
  return lines.join(CRLF);
}

export function getBlogWhyTerminalPortfolio(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Why a Terminal Portfolio?${RESET}`,
    `  ${DIM}January 31, 2025${RESET}`,
    '',
    `  Because everyone has a React portfolio with a hero section and`,
    `  a contact form. I wanted something that filters for people who`,
    `  actually enjoy the command line.`,
    '',
    `  If you're reading this, you're my people.`,
    '',
    `  ${BOLD}Tech Decisions${RESET}`,
    '',
    `  ${FG.green}[+]${RESET} xterm.js for real terminal emulation (not a CSS fake)`,
    `  ${FG.green}[+]${RESET} Virtual filesystem for authentic navigation`,
    `  ${FG.green}[+]${RESET} ANSI escape codes for styling (no HTML in the terminal)`,
    `  ${FG.green}[+]${RESET} Easter eggs, because why not`,
    '',
    `  ${DIM}Try: sudo, hack, sl, cowsay, vim${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}
