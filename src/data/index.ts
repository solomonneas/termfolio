import { getAbout } from './about';
import {
  getProjectTermfolio, getProjectSOC, getProjectWatchtower,
  getProjectVMwareMigration, getProjectHyperVMigration, getProjectLAIM,
  getProjectLinuxLabs, getProjectNSETInventory, getProjectPortGrid,
  getProjectNetworkObservability, getProjectSambaAD, getProjectNDGWorkshop,
  getProjectHomelab, getProjectAPT44, getProjectWaterSecurity,
  getProjectSolomonNeasDev, getProjectNeovim,
  getProjectObsidian,
} from './projects';
import { getExperience } from './experience';
import { getEducation } from './education';
import { getResume } from './resume';
import { getBlogHelloWorld, getBlogHomelabJourney, getBlogWhyTerminalPortfolio } from './blog';
import { getSocials } from './socials';
import { getCertifications } from './certifications';
import { CRLF, DIM, RESET, FG, BOLD } from '../utils/ansi';

// Content registry: maps filesystem content keys to ANSI string generators
const registry: Record<string, () => string> = {
  about: getAbout,
  resume: getResume,
  'project:termfolio': getProjectTermfolio,
  'project:soc': getProjectSOC,
  'project:watchtower': getProjectWatchtower,
  'project:vmware-migration': getProjectVMwareMigration,
  'project:hyperv-migration': getProjectHyperVMigration,
  'project:laim': getProjectLAIM,
  'project:linux-labs': getProjectLinuxLabs,
  'project:nset-inventory': getProjectNSETInventory,
  'project:portgrid': getProjectPortGrid,
  'project:network-observability': getProjectNetworkObservability,
  'project:samba-ad': getProjectSambaAD,
  'project:ndg-workshop': getProjectNDGWorkshop,
  'project:homelab': getProjectHomelab,
  'project:apt44': getProjectAPT44,
  'project:water-security': getProjectWaterSecurity,
  'project:solomonneas-dev': getProjectSolomonNeasDev,
  'project:neovim': getProjectNeovim,
  'project:obsidian': getProjectObsidian,
  experience: getExperience,
  education: getEducation,
  'blog:hello-world': getBlogHelloWorld,
  'blog:homelab-journey': getBlogHomelabJourney,
  'blog:why-terminal-portfolio': getBlogWhyTerminalPortfolio,
  socials: getSocials,
  certifications: getCertifications,
  'dotfile:bashrc': () => {
    const lines = [
      '',
      `${DIM}# ~/.bashrc - Solomon's shell config${RESET}`,
      '',
      `${FG.green}export${RESET} PS1='\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ '`,
      `${FG.green}export${RESET} PATH="$HOME/.local/bin:$HOME/go/bin:$PATH"`,
      `${FG.green}export${RESET} EDITOR=vim`,
      `${FG.green}export${RESET} TERM=xterm-256color`,
      '',
      `${DIM}# Aliases${RESET}`,
      `alias ll='ls -lah'`,
      `alias gs='git status'`,
      `alias gp='git push'`,
      `alias dc='docker compose'`,
      `alias k='kubectl'`,
      `alias tf='terraform'`,
      `alias py='python3'`,
      '',
      `${DIM}# Homelab shortcuts${RESET}`,
      `alias pve='ssh root@proxmox.lab'`,
      `alias nas='ssh admin@truenas.lab'`,
      `alias waz='ssh wazuh@soc.lab'`,
      '',
      `${DIM}# Quality of life${RESET}`,
      `alias ..='cd ..'`,
      `alias ...='cd ../..'`,
      `alias ports='ss -tulnp'`,
      `alias myip='curl -s ifconfig.me'`,
      '',
    ];
    return lines.join(CRLF);
  },
  'dotfile:plan': () => {
    const lines = [
      '',
      `${BOLD}${FG.cyan}  >> ~/.plan${RESET}`,
      '',
      `  Build things that matter. Teach what I learn.`,
      `  Leave systems better than I found them.`,
      '',
      `  ${DIM}Current focus:${RESET}`,
      `  ${FG.green}[+]${RESET} M.S. Cybersecurity Intelligence (USF)`,
      `  ${FG.green}[+]${RESET} Open-source SOC/NOC tooling for education`,
      `  ${FG.green}[+]${RESET} Making infrastructure a teaching artifact`,
      '',
    ];
    return lines.join(CRLF);
  },
  'dotfile:secrets': () => {
    const lines = [
      '',
      `  ${FG.red}${BOLD}Nice try.${RESET}`,
      '',
      `  ${DIM}API_KEY=sk-████████████████████████████████${RESET}`,
      `  ${DIM}DB_PASSWORD=████████████████${RESET}`,
      `  ${DIM}AWS_SECRET=████████████████████████████████████████${RESET}`,
      `  ${DIM}GITHUB_TOKEN=ghp_████████████████████████████████████${RESET}`,
      '',
      `  ${DIM}(You didn't really think I'd put real secrets here, did you?)${RESET}`,
      '',
    ];
    return lines.join(CRLF);
  },
  'dotfile:ssh-authorized-keys': () => {
    const lines = [
      '',
      `${DIM}ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFakeKeyForDemoP0rp0sesOnly solomon@workstation${RESET}`,
      `${DIM}ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAn0therFakeKeyHeReT00 solomon@macbook${RESET}`,
      '',
    ];
    return lines.join(CRLF);
  },
  'dotfile:ssh-config': () => {
    const lines = [
      '',
      `${DIM}# Homelab hosts${RESET}`,
      '',
      `${FG.green}Host${RESET} proxmox`,
      `  HostName 10.0.10.1`,
      `  User root`,
      `  Port 22`,
      '',
      `${FG.green}Host${RESET} truenas`,
      `  HostName 10.0.10.2`,
      `  User admin`,
      '',
      `${FG.green}Host${RESET} pihole`,
      `  HostName 10.0.10.3`,
      `  User pi`,
      '',
      `${FG.green}Host${RESET} docker-host`,
      `  HostName 10.0.10.10`,
      `  User solomon`,
      `  ForwardAgent yes`,
      '',
      `${FG.green}Host${RESET} *`,
      `  AddKeysToAgent yes`,
      `  IdentityFile ~/.ssh/id_ed25519`,
      `  ServerAliveInterval 60`,
      '',
    ];
    return lines.join(CRLF);
  },
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
