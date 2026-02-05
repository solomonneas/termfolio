import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'top',
  description: 'Display running processes',
  hidden: true,
  execute: (ctx) => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });

    const lines = [
      '',
      `  ${BOLD}top${RESET} - ${time} up 365 days,  0:00,  1 user,  load average: ${(Math.random() * 0.5 + 0.2).toFixed(2)}, ${(Math.random() * 0.4 + 0.2).toFixed(2)}, ${(Math.random() * 0.3 + 0.2).toFixed(2)}`,
      `  Tasks: ${FG.green}8 total${RESET},   3 running,   5 sleeping,   0 stopped`,
      `  %Cpu(s): ${FG.green}42.0${RESET} us, 12.0 sy,  0.0 ni, ${FG.cyan}46.0${RESET} id,  0.0 wa`,
      `  MiB Mem:  16384.0 total,   4096.0 free,   8192.0 used,   4096.0 buff`,
      '',
      `  ${BOLD}${FG.brightWhite}  PID USER      PR  NI    VIRT    RES  %CPU %MEM  COMMAND${RESET}`,
      `  ${FG.brightGreen} 1337${RESET} solomon   20   0   2.4G  512M  ${FG.red}42.0${RESET}  3.1  termfolio`,
      `  ${FG.brightGreen} 2049${RESET} solomon   20   0   1.8G  256M  ${FG.yellow}28.5${RESET}  1.6  watchtower-noc`,
      `  ${FG.brightGreen} 3001${RESET} solomon   20   0   1.2G  128M  ${FG.yellow}15.2${RESET}  0.8  soc-platform`,
      `  ${FG.brightGreen} 4200${RESET} solomon   20   0   800M   64M   8.0  0.4  homelab-ansible`,
      `  ${FG.brightGreen} 5555${RESET} solomon   20   0   600M   32M   3.2  0.2  linux-labs`,
      `  ${FG.brightGreen} 6789${RESET} solomon   20   0   400M   16M   1.5  0.1  portgrid`,
      `  ${FG.brightGreen} 7777${RESET} solomon   20   0   256M    8M   0.8  0.0  solomonneas-dev`,
      `  ${FG.brightGreen} 8888${RESET} solomon   20   0   128M    4M   0.3  0.0  obsidian-vault`,
      '',
      `  ${DIM}(All projects running at full capacity. No incidents. Life is good.)${RESET}`,
      '',
    ];
    ctx.terminal.write(lines.join(CRLF));
  },
});
