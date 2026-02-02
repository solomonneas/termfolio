import { BOLD, FG, RESET, DIM, CRLF } from './ansi';

export function getMOTD(): string {
  const accent = FG.cyan;
  const dim = DIM;

  const banner = [
    `${accent}${BOLD}  ███████╗ ██████╗ ██╗      ██████╗ ███╗   ███╗ ██████╗ ███╗   ██╗${RESET}`,
    `${accent}${BOLD}  ██╔════╝██╔═══██╗██║     ██╔═══██╗████╗ ████║██╔═══██╗████╗  ██║${RESET}`,
    `${accent}${BOLD}  ███████╗██║   ██║██║     ██║   ██║██╔████╔██║██║   ██║██╔██╗ ██║${RESET}`,
    `${accent}${BOLD}  ╚════██║██║   ██║██║     ██║   ██║██║╚██╔╝██║██║   ██║██║╚██╗██║${RESET}`,
    `${accent}${BOLD}  ███████║╚██████╔╝███████╗╚██████╔╝██║ ╚═╝ ██║╚██████╔╝██║ ╚████║${RESET}`,
    `${accent}${BOLD}  ╚══════╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝${RESET}`,
  ];

  const lines = [
    '',
    ...banner,
    '',
    `  ${dim}Welcome to Solomon Neas' interactive terminal portfolio.${RESET}`,
    `  ${dim}This is a real terminal. Type commands and hit Enter.${RESET}`,
    '',
    `  ${accent}${BOLD}  Quick Start${RESET}`,
    `  ${dim}  ──────────────────────────────────────────────${RESET}`,
    `  ${FG.brightWhite}  ls${RESET}${dim}              see what's here${RESET}`,
    `  ${FG.brightWhite}  cat about.md${RESET}${dim}    read about me${RESET}`,
    `  ${FG.brightWhite}  cd projects${RESET}${dim}     explore my work${RESET}`,
    `  ${FG.brightWhite}  cat resume.pdf${RESET}${dim}  view my resume${RESET}`,
    `  ${FG.brightWhite}  cat socials.md${RESET}${dim}  connect with me${RESET}`,
    `  ${FG.brightWhite}  help${RESET}${dim}            all commands${RESET}`,
    '',
    `  ${dim}  Pro tip: use ${FG.brightWhite}Tab${RESET}${dim} to autocomplete and ${FG.brightWhite}↑↓${RESET}${dim} for history.${RESET}`,
    '',
  ];

  return lines.join(CRLF);
}
