import { CommandRegistry } from '../CommandRegistry';
import { RESET, DIM, CRLF } from '../../utils/ansi';

const CAREER_TIMELINE = [
  { num: 1, date: '2000-01-15', cmd: 'mkdir /var/www/neas-web-productions' },
  { num: 2, date: '2000-03-22', cmd: 'chmod +x deploy-client-sites.sh' },
  { num: 3, date: '2004-06-01', cmd: 'cd /career && git checkout culinary-arts' },
  { num: 4, date: '2006-05-15', cmd: 'apt install comptia-a-plus --certified' },
  { num: 5, date: '2007-12-31', cmd: 'systemctl stop neas-web-productions' },
  { num: 6, date: '2012-09-01', cmd: 'sudo promote --title "Executive Chef"' },
  { num: 7, date: '2021-01-10', cmd: 'cd /career && git checkout information-technology' },
  { num: 8, date: '2021-06-15', cmd: 'ssh solomon@polk-state-college' },
  { num: 9, date: '2022-11-01', cmd: 'systemctl stop culinary.service --permanent' },
  { num: 10, date: '2023-01-15', cmd: 'ansible-playbook deploy-soc.yml --tags wazuh,thehive,misp' },
  { num: 11, date: '2023-06-01', cmd: 'proxmox migrate --from vmware-esxi --save $68600' },
  { num: 12, date: '2024-01-20', cmd: 'git init ~/projects/watchtower-noc' },
  { num: 13, date: '2025-01-01', cmd: 'npx create-portfolio --style terminal' },
  { num: 14, date: '2025-06-15', cmd: 'enrolled --program "M.S. Cybersecurity Intelligence" --school USF' },
  { num: 15, date: '2026-02-04', cmd: 'cat ~/.plan  # Build things that matter' },
];

CommandRegistry.register({
  name: 'history',
  description: 'Show command history',
  usage: 'history',
  execute: (ctx) => {
    const { terminal } = ctx;

    terminal.write(CRLF);
    for (const entry of CAREER_TIMELINE) {
      const num = String(entry.num).padStart(4);
      terminal.write(`  ${DIM}${num}  ${entry.date}${RESET}  ${entry.cmd}${CRLF}`);
    }
    terminal.write(CRLF);
  },
});
