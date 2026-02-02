import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'sudo',
  description: 'Execute as superuser',
  usage: 'sudo <command>',
  execute: (ctx) => {
    ctx.terminal.write(`${CRLF}  ${FG.red}${BOLD}[sudo]${RESET} Nice try. This isn't your machine.${CRLF}${CRLF}`);
  },
});

CommandRegistry.register({
  name: 'rm',
  description: 'Remove files',
  usage: 'rm [options] <file>',
  execute: (ctx) => {
    const input = ctx.rawInput;
    if (input.includes('-rf /') || input.includes('-rf ~') || input.includes('-rf *')) {
      const lines = [
        '',
        `  ${FG.red}${BOLD}rm: refusing to destroy the portfolio${RESET}`,
        `  ${DIM}  (you thought it would be that easy?)${RESET}`,
        '',
      ];
      ctx.terminal.write(lines.join(CRLF));
    } else {
      ctx.terminal.write(`${CRLF}  ${FG.red}${BOLD}rm:${RESET} permission denied${CRLF}${CRLF}`);
    }
  },
});

CommandRegistry.register({
  name: 'neofetch',
  description: 'System information',
  usage: 'neofetch',
  execute: (ctx) => {
    const lines = [
      '',
      `  ${FG.cyan}${BOLD}       _____${RESET}       ${BOLD}solomon${RESET}@${BOLD}termfolio${RESET}`,
      `  ${FG.cyan}${BOLD}      / ____|${RESET}      ${DIM}──────────────────${RESET}`,
      `  ${FG.cyan}${BOLD}     | (___${RESET}        ${BOLD}OS:${RESET}     TermfolioOS 1.0`,
      `  ${FG.cyan}${BOLD}      \\___ \\${RESET}       ${BOLD}Host:${RESET}   Browser v∞`,
      `  ${FG.cyan}${BOLD}      ____) |${RESET}      ${BOLD}Kernel:${RESET} xterm.js`,
      `  ${FG.cyan}${BOLD}     |_____/${RESET}       ${BOLD}Shell:${RESET}  termfolio-sh`,
      `  ${FG.cyan}${BOLD}${RESET}                   ${BOLD}Theme:${RESET}  Dark [always]`,
      `                     ${BOLD}Font:${RESET}   JetBrains Mono`,
      `                     ${BOLD}CPU:${RESET}    Your Browser @ who knows`,
      `                     ${BOLD}Memory:${RESET} enough / probably`,
      '',
    ];
    ctx.terminal.write(lines.join(CRLF));
  },
});

CommandRegistry.register({
  name: 'hack',
  description: '???',
  execute: (ctx) => {
    const { terminal } = ctx;
    terminal.write(CRLF);

    const ip = () => `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}`;
    const port = () => [22, 80, 443, 3306, 5432, 8080, 8443, 27017, 6379, 9200][Math.floor(Math.random()*10)];
    const hex = (n: number) => [...Array(n)].map(() => Math.floor(Math.random()*16).toString(16)).join('');

    const commands: string[] = [
      `${FG.green}[*]${RESET} Initializing attack framework v4.2.0...`,
      `${FG.green}[*]${RESET} Loading exploit modules from /opt/sploit/db...`,
      `${DIM}    >> 2,847 modules loaded${RESET}`,
      `${FG.green}[*]${RESET} nmap -sS -sV -O -p- ${ip()} --script vuln`,
      `${DIM}    PORT     STATE  SERVICE       VERSION${RESET}`,
      `${DIM}    22/tcp   open   ssh           OpenSSH 8.9p1${RESET}`,
      `${DIM}    80/tcp   open   http          nginx 1.24.0${RESET}`,
      `${DIM}    443/tcp  open   ssl/https     nginx 1.24.0${RESET}`,
      `${DIM}    3306/tcp closed mysql${RESET}`,
      `${DIM}    8443/tcp open   https-alt     Apache Tomcat 9.0.80${RESET}`,
      `${FG.yellow}[!]${RESET} CVE-2024-21762 detected on ${ip()}:${port()}`,
      `${FG.green}[*]${RESET} Spawning reverse shell on port 4444...`,
      `${FG.green}[*]${RESET} ssh -D 9050 -C -N pivot@${ip()} -p 22`,
      `${DIM}    >> SOCKS proxy established${RESET}`,
      `${FG.green}[*]${RESET} proxychains nmap -sT -Pn ${ip()}/24`,
      `${DIM}    >> 14 hosts discovered on internal network${RESET}`,
      `${FG.green}[*]${RESET} Enumerating Active Directory via LDAP...`,
      `${DIM}    >> DC01.corp.local    ${ip()}${RESET}`,
      `${DIM}    >> DC02.corp.local    ${ip()}${RESET}`,
      `${DIM}    >> 847 user objects found${RESET}`,
      `${FG.yellow}[!]${RESET} Kerberoastable SPN: MSSQLSvc/db01.corp.local:1433`,
      `${FG.green}[*]${RESET} hashcat -m 13100 -a 0 krb5tgs.hash /usr/share/wordlists/rockyou.txt`,
      `${DIM}    >> ${hex(32)}:Password123!${RESET}`,
      `${FG.green}[*]${RESET} impacket-psexec svc_sql:Password123!@${ip()}`,
      `${DIM}    >> NT AUTHORITY\\SYSTEM shell obtained${RESET}`,
      `${FG.green}[*]${RESET} Dumping SAM database...`,
      `${DIM}    Administrator:500:${hex(32)}:::${RESET}`,
      `${DIM}    svc_backup:1104:${hex(32)}:::${RESET}`,
      `${FG.green}[*]${RESET} secretsdump.py -ntds ntds.dit -system SYSTEM LOCAL`,
      `${DIM}    >> 847 NTLM hashes extracted${RESET}`,
      `${FG.yellow}[!]${RESET} Golden ticket forged: krbtgt ${hex(16)}`,
      `${FG.green}[*]${RESET} Pivoting to ${ip()} via WinRM...`,
      `${FG.green}[*]${RESET} Exfiltrating data over DNS tunnel to ${ip()}...`,
      `${DIM}    >> 2.4GB transferred (${hex(8)}.evil.com)${RESET}`,
      `${FG.green}[*]${RESET} Clearing event logs...`,
      `${DIM}    >> Security.evtx purged${RESET}`,
      `${DIM}    >> System.evtx purged${RESET}`,
      `${FG.green}[*]${RESET} Deploying persistence via scheduled task...`,
      `${DIM}    >> C:\\Windows\\Temp\\totally_legit.exe registered${RESET}`,
      `${FG.red}${BOLD}[!] FIREWALL DETECTED - ADAPTING...${RESET}`,
      `${FG.green}[*]${RESET} Tunneling through HTTPS on port 443...`,
      `${DIM}    >> Firewall bypassed${RESET}`,
      `${FG.green}[*]${RESET} All objectives completed.`,
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= commands.length) {
        clearInterval(interval);
        terminal.write(CRLF);
        terminal.write(`  ${FG.green}${BOLD}ACCESS GRANTED${RESET}${CRLF}`);
        terminal.write(`  ${DIM}Just kidding. But you looked cool doing it.${RESET}${CRLF}${CRLF}`);
        (ctx as any).reprompt?.();
        return;
      }

      terminal.write(`  ${commands[i]}${CRLF}`);
      i++;
    }, Math.floor(Math.random() * 80) + 40);
  },
});

CommandRegistry.register({
  name: 'exit',
  description: 'Exit the terminal',
  usage: 'exit',
  execute: (ctx) => {
    ctx.terminal.write(`${CRLF}  ${DIM}There is no escape. Try ${FG.brightWhite}help${RESET}${DIM} instead.${RESET}${CRLF}${CRLF}`);
  },
});
