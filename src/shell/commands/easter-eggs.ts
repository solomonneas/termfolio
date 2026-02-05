import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

// ── sudo ──────────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'sudo',
  description: 'Execute as superuser',
  usage: 'sudo <command>',
  execute: (ctx) => {
    const subcommand = ctx.args.join(' ').toLowerCase();

    if (subcommand === 'hire me') {
      const lines = [
        '',
        `  ${FG.green}${BOLD}[sudo]${RESET} Access granted.`,
        '',
        `  ${BOLD}${FG.cyan}Name:${RESET}     Solomon Neas`,
        `  ${BOLD}${FG.cyan}Role:${RESET}     Full-Stack Developer & Security Engineer`,
        `  ${BOLD}${FG.cyan}Status:${RESET}   ${FG.green}Available for hire${RESET}`,
        '',
        `  ${BOLD}${FG.cyan}Email:${RESET}    me@solomonneas.dev`,
        `  ${BOLD}${FG.cyan}GitHub:${RESET}   github.com/solomonneas`,
        `  ${BOLD}${FG.cyan}LinkedIn:${RESET} linkedin.com/in/solomon-neas`,
        `  ${BOLD}${FG.cyan}Website:${RESET}  solomonneas.dev`,
        `  ${BOLD}${FG.cyan}Resume:${RESET}   type ${FG.brightWhite}cat resume.pdf${RESET}`,
        '',
        `  ${DIM}Let's build something.${RESET}`,
        '',
      ];
      ctx.terminal.write(lines.join(CRLF));
      return;
    }

    ctx.terminal.write(`${CRLF}  ${FG.red}${BOLD}[sudo]${RESET} Nice try. This isn't your machine.${CRLF}${CRLF}`);
  },
});

// ── rm (with fake meltdown) ───────────────────────────────────────

CommandRegistry.register({
  name: 'rm',
  description: 'Remove files',
  usage: 'rm [options] <file>',
  async: true,
  execute: (ctx) => {
    const input = ctx.rawInput;

    // Regular rm: permission denied
    if (!input.includes('-rf /') && !input.includes('-rf ~') && !input.includes('-rf *')) {
      ctx.terminal.write(`${CRLF}  ${FG.red}${BOLD}rm:${RESET} permission denied${CRLF}${CRLF}`);
      ctx.reprompt();
      return;
    }

    // The meltdown sequence
    const { terminal } = ctx;
    ctx.lockInput();
    terminal.write(CRLF);

    const hex = (n: number) => [...Array(n)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    type SeqItem = { type: 'text'; text: string; delay: number }
      | { type: 'separator'; delay: number }
      | { type: 'glitch'; delay: number }
      | { type: 'clear'; delay: number }
      | { type: 'pause'; delay: number };

    const sequence: SeqItem[] = [
      // Phase 1: File deletion (rapid fire)
      { type: 'text', text: `${DIM}rm: removing '/boot/vmlinuz-5.15.0'...${RESET}`, delay: 60 },
      { type: 'text', text: `${DIM}rm: removing '/etc/shadow'...${RESET}`, delay: 50 },
      { type: 'text', text: `${DIM}rm: removing '/etc/passwd'...${RESET}`, delay: 40 },
      { type: 'text', text: `${DIM}rm: removing '/usr/lib/x86_64-linux-gnu/libc.so.6'...${RESET}`, delay: 55 },
      { type: 'text', text: `${DIM}rm: removing '/usr/bin/bash'...${RESET}`, delay: 35 },
      { type: 'text', text: `${DIM}rm: removing '/usr/bin/systemd'...${RESET}`, delay: 45 },
      { type: 'text', text: `${DIM}rm: removing '/home/solomon/projects/*'...${RESET}`, delay: 60 },
      { type: 'text', text: `${DIM}rm: removing '/home/solomon/.bashrc'...${RESET}`, delay: 40 },
      { type: 'text', text: `${DIM}rm: removing '/var/log/*'...${RESET}`, delay: 35 },
      { type: 'text', text: `${DIM}rm: removing '/dev/sda'...${RESET}`, delay: 50 },
      { type: 'text', text: `${DIM}rm: removing '/dev/null'... wait, what?${RESET}`, delay: 70 },

      // Phase 2: Things start breaking
      { type: 'text', text: `${FG.yellow}[WARN]${RESET}  systemd[1]: sshd.service: Main process exited, code=killed`, delay: 200 },
      { type: 'text', text: `${FG.yellow}[WARN]${RESET}  systemd[1]: nginx.service: Failed with result 'signal'`, delay: 180 },
      { type: 'text', text: `${FG.red}[ERROR]${RESET} kernel: BUG: unable to handle page fault at 0x${hex(16)}`, delay: 250 },
      { type: 'text', text: `${FG.red}[ERROR]${RESET} kernel: Oops: 0000 [#1] SMP NOPTI`, delay: 200 },
      { type: 'text', text: `${FG.red}[CRIT]${RESET}  kernel: Out of memory: Kill process 1 (systemd) score 999`, delay: 300 },

      // Phase 3: Kernel panic
      { type: 'separator', delay: 400 },
      { type: 'text', text: `${FG.red}${BOLD}KERNEL PANIC - not syncing: Attempted to kill init!${RESET}`, delay: 350 },
      { type: 'text', text: `${DIM}CPU: 0 PID: 1 Comm: init Tainted: G    B   W  5.15.0-generic${RESET}`, delay: 200 },
      { type: 'text', text: `${DIM}Hardware name: TermfolioOS Virtual Platform /termfolio, BIOS v1.0${RESET}`, delay: 150 },
      { type: 'text', text: `${DIM}Call Trace:${RESET}`, delay: 100 },
      { type: 'text', text: `${DIM}  panic+0x1a9/0x36b${RESET}`, delay: 80 },
      { type: 'text', text: `${DIM}  do_exit+0x9f0/0xaf0${RESET}`, delay: 80 },
      { type: 'text', text: `${DIM}  do_group_exit+0x33/0xb0${RESET}`, delay: 80 },
      { type: 'separator', delay: 300 },

      // Phase 4: Screen glitch
      { type: 'glitch', delay: 120 },
      { type: 'glitch', delay: 100 },
      { type: 'glitch', delay: 80 },
      { type: 'glitch', delay: 150 },
      { type: 'glitch', delay: 100 },

      // Phase 5: Darkness
      { type: 'clear', delay: 2000 },

      // Phase 6: Recovery
      { type: 'pause', delay: 800 },
      { type: 'text', text: `${DIM}...${RESET}`, delay: 600 },
      { type: 'text', text: `${DIM}Rebooting...${RESET}`, delay: 800 },
      { type: 'text', text: '', delay: 400 },
      { type: 'text', text: `${FG.green}[  OK  ]${RESET} Filesystem recovered`, delay: 300 },
      { type: 'text', text: `${FG.green}[  OK  ]${RESET} Services restored`, delay: 250 },
      { type: 'text', text: `${FG.green}[  OK  ]${RESET} Portfolio integrity: ${FG.green}100%${RESET}`, delay: 250 },
      { type: 'text', text: '', delay: 200 },
      { type: 'text', text: `${BOLD}Nothing was actually deleted, you goofball.${RESET}`, delay: 500 },
      { type: 'text', text: '', delay: 200 },
      { type: 'text', text: `Nice try. ${FG.brightYellow}😏${RESET}`, delay: 0 },
    ];

    let i = 0;

    function processNext() {
      if (i >= sequence.length) {
        ctx.unlockInput();
        terminal.write(CRLF);
        ctx.reprompt();
        return;
      }

      const item = sequence[i];
      i++;

      switch (item.type) {
        case 'text':
          terminal.write(`  ${item.text}${CRLF}`);
          break;
        case 'separator':
          terminal.write(`  ${FG.red}${'═'.repeat(55)}${RESET}${CRLF}`);
          break;
        case 'glitch': {
          let garbage = '';
          for (let j = 0; j < 55; j++) {
            garbage += String.fromCharCode(Math.floor(Math.random() * 94) + 33);
          }
          const color = 31 + Math.floor(Math.random() * 6);
          terminal.write(`  \x1b[${color}m${garbage}${RESET}${CRLF}`);
          break;
        }
        case 'clear':
          terminal.clear();
          break;
        case 'pause':
          // Just wait
          break;
      }

      setTimeout(processNext, item.delay);
    }

    processNext();
  },
});

// ── neofetch (resume style) ───────────────────────────────────────

CommandRegistry.register({
  name: 'neofetch',
  description: 'System information',
  usage: 'neofetch',
  execute: (ctx) => {
    const art = [
      `${FG.cyan}${BOLD}   ███████ ██   ██${RESET}`,
      `${FG.cyan}${BOLD}   ██      ███  ██${RESET}`,
      `${FG.cyan}${BOLD}   ███████ ██ █ ██${RESET}`,
      `${FG.cyan}${BOLD}        ██ ██  ███${RESET}`,
      `${FG.cyan}${BOLD}   ███████ ██   ██${RESET}`,
    ];

    const info = [
      `${BOLD}solomon${RESET}${DIM}@${RESET}${BOLD}termfolio${RESET}`,
      `${DIM}──────────────────────────────────${RESET}`,
      `${BOLD}Title:${RESET}    Full-Stack Dev & Security Engineer`,
      `${BOLD}Skills:${RESET}   TypeScript, Python, Go, Rust`,
      `${BOLD}Frontend:${RESET} React, Next.js, Tailwind`,
      `${BOLD}Backend:${RESET}  Node.js, FastAPI, PostgreSQL`,
      `${BOLD}Infra:${RESET}    Docker, Proxmox, Nginx, Linux`,
      `${BOLD}Focus:${RESET}    Cybersecurity, SOC/NOC, Homelab`,
      `${BOLD}Uptime:${RESET}   26 years building things`,
      `${BOLD}Certs:${RESET}    CompTIA A+`,
      `${BOLD}Editor:${RESET}   vim ${DIM}(good luck exiting)${RESET}`,
      '',
      `${BOLD}${FG.cyan}Contact:${RESET}`,
      `${BOLD}Email:${RESET}    me@solomonneas.dev`,
      `${BOLD}GitHub:${RESET}   github.com/solomonneas`,
      `${BOLD}Web:${RESET}      solomonneas.dev`,
    ];

    // Color palette bar
    const palette = [30, 31, 32, 33, 34, 35, 36, 37].map((c) => `\x1b[${c + 10}m   ${RESET}`).join('');

    const artPad = 22; // Width to pad ASCII art lines to
    const lines: string[] = [''];

    const maxRows = Math.max(art.length, info.length);
    for (let i = 0; i < maxRows; i++) {
      const artLine = i < art.length ? art[i] : '';
      const infoLine = i < info.length ? info[i] : '';

      // Strip ANSI to measure visible width for padding
      const visibleLen = artLine.replace(/\x1b\[[0-9;]*m/g, '').length;
      const padding = ' '.repeat(Math.max(1, artPad - visibleLen));

      lines.push(`  ${artLine}${padding}${infoLine}`);
    }

    // Add color palette
    lines.push('');
    lines.push(`  ${' '.repeat(artPad)}${palette}`);
    lines.push('');

    ctx.terminal.write(lines.join(CRLF));
  },
});

// ── hack ──────────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'hack',
  description: '???',
  hidden: true,
  async: true,
  execute: (ctx) => {
    const { terminal } = ctx;
    ctx.lockInput();
    terminal.write(CRLF);

    const ip = () => `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    const port = () => [22, 80, 443, 3306, 5432, 8080, 8443, 27017, 6379, 9200][Math.floor(Math.random() * 10)];
    const hex = (n: number) => [...Array(n)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

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
        ctx.unlockInput();
        terminal.write(CRLF);
        terminal.write(`  ${FG.green}${BOLD}ACCESS GRANTED${RESET}${CRLF}`);
        terminal.write(`  ${DIM}Just kidding. But you looked cool doing it.${RESET}${CRLF}${CRLF}`);
        ctx.reprompt();
        return;
      }

      terminal.write(`  ${commands[i]}${CRLF}`);
      i++;
    }, Math.floor(Math.random() * 80) + 40);
  },
});

// ── exit ──────────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'exit',
  description: 'Exit the terminal',
  usage: 'exit',
  execute: (ctx) => {
    ctx.terminal.write(`${CRLF}  ${DIM}You can check out any time you like, but you can never leave.${RESET} 🎸${CRLF}${CRLF}`);
  },
});
