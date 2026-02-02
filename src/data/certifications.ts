import { BOLD, FG, RESET, DIM, CRLF } from '../utils/ansi';

export function getCertifications(): string {
  const lines = [
    '',
    `${BOLD}${FG.cyan}  >> Certifications${RESET}`,
    '',
    `  ${FG.yellow}[*]${RESET} ${BOLD}CompTIA A+${RESET}`,
    `      ${DIM}CompTIA | Issued 2022${RESET}`,
    `      ${DIM}Validates foundational IT skills: hardware, networking,${RESET}`,
    `      ${DIM}mobile devices, operating systems, and troubleshooting.${RESET}`,
    '',
  ];
  return lines.join(CRLF);
}
