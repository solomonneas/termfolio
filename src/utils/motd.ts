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
    `  ${dim}Type ${FG.brightWhite}help${RESET}${dim} for a list of commands, or start exploring with ${FG.brightWhite}ls${RESET}${dim}.${RESET}`,
    '',
  ];

  return lines.join(CRLF);
}
