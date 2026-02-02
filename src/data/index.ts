import { getAbout } from './about';
import { getProjectTermfolio, getProjectHomelab, getProjectSolomonNeasDev } from './projects';
import { getExperience } from './experience';
import { getEducation } from './education';
import { getResume } from './resume';
import { getBlogHelloWorld } from './blog';
import { CRLF, DIM, RESET, FG, BOLD } from '../utils/ansi';

// Content registry: maps filesystem content keys to ANSI string generators
const registry: Record<string, () => string> = {
  about: getAbout,
  resume: getResume,
  'project:termfolio': getProjectTermfolio,
  'project:homelab': getProjectHomelab,
  'project:solomonneas-dev': getProjectSolomonNeasDev,
  experience: getExperience,
  education: getEducation,
  'blog:hello-world': getBlogHelloWorld,
  'auth-log': () => {
    const lines = [
      '',
      `${DIM}Jan 31 09:14:22 solomon sshd[1337]: Accepted publickey for solomon${RESET}`,
      `${DIM}Jan 31 09:14:22 solomon sshd[1337]: pam_unix(sshd:session): session opened${RESET}`,
      `${DIM}Jan 31 10:02:15 solomon sudo: solomon : TTY=pts/0 ; COMMAND=/usr/bin/apt update${RESET}`,
      `${DIM}Jan 31 11:45:33 solomon sshd[2049]: Failed password for admin from 192.168.1.100${RESET}`,
      `${DIM}Jan 31 11:45:34 solomon sshd[2049]: Failed password for admin from 192.168.1.100${RESET}`,
      `${DIM}Jan 31 11:45:35 solomon sshd[2049]: Connection closed by 192.168.1.100 [preauth]${RESET}`,
      `${DIM}Jan 31 14:20:00 solomon CRON[3001]: pam_unix(cron:session): session opened for user root${RESET}`,
      '',
    ];
    return lines.join(CRLF);
  },
  hostname: () => `${CRLF}  solomon.neas.dev${CRLF}${CRLF}`,
};

// Special files that trigger browser actions
export const specialFiles: Record<string, string> = {
  resume: 'https://www.solomonneas.dev/solomon_neas_resume.pdf',
};

export function getContent(key: string): string | null {
  const generator = registry[key];
  if (!generator) return null;
  return generator();
}

export function getNotFoundMessage(filename: string): string {
  return `${CRLF}  ${FG.red}${BOLD}cat:${RESET} ${filename}: No such file or directory${CRLF}${CRLF}`;
}
