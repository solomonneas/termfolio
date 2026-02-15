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

// ── traceroute ────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'traceroute',
  description: 'Trace route to host',
  usage: 'traceroute <host>',
  hidden: true,
  async: true,
  execute: (ctx) => {
    const { terminal } = ctx;
    ctx.lockInput();

    const hops = [
      `${BOLD}traceroute${RESET} to solomonneas.dev (151.101.1.1), 9 hops max`,
      ` ${FG.green}1${RESET}  localhost (127.0.0.1)  ${DIM}0.042 ms${RESET}`,
      ` ${FG.green}2${RESET}  your-isp.net (10.0.0.1)  ${DIM}12.337 ms${RESET}`,
      ` ${FG.green}3${RESET}  cloudflare-edge.net (172.67.1.1)  ${DIM}18.224 ms${RESET}`,
      ` ${FG.green}4${RESET}  vercel-cdn.net (76.76.21.21)  ${DIM}22.891 ms${RESET}`,
      ` ${FG.green}5${RESET}  ${FG.yellow}talent-pipeline.net${RESET} (10.30.0.1)  ${DIM}28.442 ms${RESET}`,
      ` ${FG.green}6${RESET}  ${FG.yellow}recruiter-inbox.net${RESET} (10.30.0.2)  ${DIM}34.119 ms${RESET}`,
      ` ${FG.green}7${RESET}  ${FG.yellow}hr-approval.corp${RESET} (10.30.0.3)  ${DIM}41.337 ms${RESET}`,
      ` ${FG.green}8${RESET}  ${FG.yellow}offer-letter.corp${RESET} (10.30.0.4)  ${DIM}48.002 ms${RESET}`,
      ` ${FG.cyan}9${RESET}  ${BOLD}solomonneas.dev${RESET} (151.101.1.1)  ${DIM}52.119 ms${RESET}`,
      '',
      `${FG.green}Trace complete.${RESET} Hiring Solomon is faster than you think.`,
    ];

    let i = 0;
    terminal.write(CRLF);

    function next() {
      if (i >= hops.length) {
        ctx.unlockInput();
        terminal.write(CRLF);
        ctx.reprompt();
        return;
      }
      terminal.write(`  ${hops[i]}${CRLF}`);
      i++;
      setTimeout(next, 100 + Math.random() * 150);
    }
    next();
  },
});

// ── nmap ──────────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'nmap',
  description: 'Network port scanner',
  usage: 'nmap <host>',
  hidden: true,
  async: true,
  execute: (ctx) => {
    const { terminal } = ctx;
    ctx.lockInput();

    const lines = [
      `${BOLD}Starting Nmap 7.94${RESET} ( https://nmap.org )`,
      `Nmap scan report for ${BOLD}solomonneas.dev${RESET} (151.101.1.1)`,
      '',
      `${DIM}PORT      STATE    SERVICE          VERSION${RESET}`,
      `${FG.green}22/tcp${RESET}    open     ssh              OpenSSH 9.6 (protocol 2.0)`,
      `${FG.green}80/tcp${RESET}    open     http             nginx 1.25.4`,
      `${FG.green}443/tcp${RESET}   open     https            Vercel Edge`,
      `${FG.green}3000/tcp${RESET}  open     dev-server       React 19.0.0`,
      `${FG.green}5173/tcp${RESET}  open     vite             Vite 6.1.0`,
      `${FG.green}8000/tcp${RESET}  open     fastapi          Uvicorn 0.27.0`,
      `${FG.green}8443/tcp${RESET}  open     soc-dashboard    Wazuh 4.7.2`,
      `${FG.yellow}9090/tcp${RESET}  filtered prometheus`,
      `${FG.cyan}31337/tcp${RESET} open     ${FG.brightYellow}easter-egg       You found it!${RESET}`,
      '',
      `9 services detected. ${FG.green}0 vulnerabilities found.${RESET}`,
      `${DIM}(That's because I patch my stuff.)${RESET}`,
    ];

    let i = 0;
    terminal.write(CRLF);

    function next() {
      if (i >= lines.length) {
        ctx.unlockInput();
        terminal.write(CRLF);
        ctx.reprompt();
        return;
      }
      terminal.write(`  ${lines[i]}${CRLF}`);
      i++;
      setTimeout(next, 80 + Math.random() * 120);
    }
    next();
  },
});

// ── apt / brew (package manager) ─────────────────────────────────

function packageInstall(ctx: ReturnType<typeof Object.create>) {
  const { terminal } = ctx;
  ctx.lockInput();

  const steps = [
    `${DIM}Reading package lists... Done${RESET}`,
    `${DIM}Building dependency tree... Done${RESET}`,
    `The following ${BOLD}NEW${RESET} packages will be installed:`,
    `  ${FG.cyan}solomon-neas${RESET} (v2026.2.15)`,
    `${DIM}Unpacking solomon-neas (v2026.2.15) ...${RESET}`,
    `Setting up ${BOLD}solomon-neas${RESET} ...`,
    `  Installing: ${FG.green}full-stack-development${RESET} ... done`,
    `  Installing: ${FG.green}cybersecurity-engineering${RESET} ... done`,
    `  Installing: ${FG.green}network-infrastructure${RESET} ... done`,
    `  Installing: ${FG.green}teaching-ability${RESET} ... done`,
    `  Installing: ${FG.yellow}questionable-humor${RESET} ... done`,
    '',
    `${FG.green}solomon-neas is now available system-wide.${RESET}`,
    `Run '${BOLD}sudo hire me${RESET}' to activate.`,
  ];

  let i = 0;
  terminal.write(CRLF);

  function next() {
    if (i >= steps.length) {
      ctx.unlockInput();
      terminal.write(CRLF);
      ctx.reprompt();
      return;
    }
    terminal.write(`  ${steps[i]}${CRLF}`);
    i++;
    setTimeout(next, 150 + Math.random() * 200);
  }
  next();
}

CommandRegistry.register({
  name: 'apt',
  description: 'Package manager',
  usage: 'apt install <package>',
  hidden: true,
  async: true,
  execute: (ctx) => packageInstall(ctx),
});

CommandRegistry.register({
  name: 'brew',
  description: 'Package manager',
  usage: 'brew install <package>',
  hidden: true,
  async: true,
  execute: (ctx) => packageInstall(ctx),
});

// ── uptime ────────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'uptime',
  description: 'Show system uptime',
  usage: 'uptime',
  execute: (ctx) => {
    const birth = new Date('2026-01-31T00:00:00');
    const now = new Date();
    const diff = now.getTime() - birth.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const timeStr = now.toTimeString().slice(0, 8);

    ctx.terminal.write(
      `${CRLF}  ${timeStr} up ${BOLD}${days} days${RESET}, ${hours}:${mins.toString().padStart(2, '0')},  1 user,  load average: 0.42, 0.38, 0.35${CRLF}${CRLF}`
    );
  },
});

// ── git log ───────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'git',
  description: 'Version control',
  usage: 'git <command>',
  hidden: true,
  execute: (ctx) => {
    const sub = ctx.args[0];

    if (sub !== 'log') {
      ctx.terminal.write(`${CRLF}  ${DIM}git: '${sub || ''}' is not a git command. Try 'git log'.${RESET}${CRLF}${CRLF}`);
      return;
    }

    const commits = [
      {
        hash: 'a1b2c3d',
        refs: 'HEAD -> main, origin/main',
        date: 'Feb 2026',
        msg: 'feat: building 30+ app AI pipeline with multi-model orchestration',
      },
      {
        hash: 'd4e5f6a',
        refs: '',
        date: 'Jan 2026',
        msg: 'feat: launched CyberBRIEF threat intel platform (live deploy)',
      },
      {
        hash: 'b7c8d9e',
        refs: '',
        date: '2025',
        msg: 'feat: migrated 6-node VMware cluster to Proxmox ($343K saved)',
      },
      {
        hash: 'e0f1a2b',
        refs: '',
        date: '2024',
        msg: 'feat: built open-source SOC monitoring 200+ endpoints',
      },
      {
        hash: 'c3d4e5f',
        refs: '',
        date: '2023',
        msg: 'init: started M.S. Cybersecurity Intelligence at USF',
      },
    ];

    const lines = [''];
    for (const c of commits) {
      const refStr = c.refs ? ` (${FG.cyan}${c.refs}${RESET})` : '';
      lines.push(`  ${FG.yellow}commit ${c.hash}${RESET}${refStr}`);
      lines.push(`  Author: Solomon Neas <me@solomonneas.dev>`);
      lines.push(`  ${DIM}Date:   ${c.date}${RESET}`);
      lines.push('');
      lines.push(`      ${c.msg}`);
      lines.push('');
    }
    ctx.terminal.write(lines.join(CRLF));
  },
});

// ── curl ──────────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'curl',
  description: 'Transfer data from URLs',
  usage: 'curl <url>',
  hidden: true,
  execute: (ctx) => {
    const input = ctx.args.join(' ').toLowerCase();

    if (!input.includes('hire') && !input.includes('solomonneas')) {
      ctx.terminal.write(`${CRLF}  ${DIM}curl: try 'curl solomonneas.dev/api/hire'${RESET}${CRLF}${CRLF}`);
      return;
    }

    const json = [
      '',
      `  ${FG.brightWhite}{${RESET}`,
      `    ${FG.cyan}"status"${RESET}: ${FG.yellow}200${RESET},`,
      `    ${FG.cyan}"message"${RESET}: ${FG.green}"Solomon is available for hire"${RESET},`,
      `    ${FG.cyan}"data"${RESET}: {`,
      `      ${FG.cyan}"name"${RESET}: ${FG.green}"Solomon Neas"${RESET},`,
      `      ${FG.cyan}"title"${RESET}: ${FG.green}"Full-Stack Developer & Security Engineer"${RESET},`,
      `      ${FG.cyan}"available"${RESET}: ${FG.yellow}true${RESET},`,
      `      ${FG.cyan}"response_time"${RESET}: ${FG.green}"< 24 hours"${RESET},`,
      `      ${FG.cyan}"contact"${RESET}: ${FG.green}"me@solomonneas.dev"${RESET},`,
      `      ${FG.cyan}"skills"${RESET}: [${FG.green}"React"${RESET}, ${FG.green}"Python"${RESET}, ${FG.green}"TypeScript"${RESET}, ${FG.green}"FastAPI"${RESET}, ${FG.green}"Proxmox"${RESET}, ${FG.green}"SOC/NOC"${RESET}],`,
      `      ${FG.cyan}"fun_fact"${RESET}: ${FG.green}"Built this terminal portfolio from scratch"${RESET}`,
      `    }`,
      `  ${FG.brightWhite}}${RESET}`,
      '',
    ];
    ctx.terminal.write(json.join(CRLF));
  },
});

// ── ssh ───────────────────────────────────────────────────────────

CommandRegistry.register({
  name: 'ssh',
  description: 'Secure shell',
  usage: 'ssh <host>',
  hidden: true,
  async: true,
  execute: (ctx) => {
    const { terminal } = ctx;
    ctx.lockInput();

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });

    const steps = [
      { text: `${DIM}Connecting to solomonneas.dev...${RESET}`, delay: 800 },
      { text: `${FG.yellow}Warning:${RESET} Permanently added 'solomonneas.dev' (ED25519) to known hosts.`, delay: 600 },
      { text: '', delay: 300 },
      { text: `Welcome to ${BOLD}TermfolioOS 1.0${RESET} (GNU/Linux 5.15.0-generic x86_64)`, delay: 200 },
      { text: '', delay: 100 },
      { text: ` * ${BOLD}Portfolio:${RESET}  https://solomonneas.dev`, delay: 80 },
      { text: ` * ${BOLD}GitHub:${RESET}     https://github.com/solomonneas`, delay: 80 },
      { text: ` * ${BOLD}Email:${RESET}      me@solomonneas.dev`, delay: 80 },
      { text: '', delay: 200 },
      { text: `${DIM}Last login: ${dateStr} from your-ip-address${RESET}`, delay: 300 },
      { text: '', delay: 200 },
      { text: `You're already here. What more do you want? ${FG.brightYellow}😏${RESET}`, delay: 0 },
    ];

    let i = 0;
    terminal.write(CRLF);

    function next() {
      if (i >= steps.length) {
        ctx.unlockInput();
        terminal.write(CRLF);
        ctx.reprompt();
        return;
      }
      terminal.write(`  ${steps[i].text}${CRLF}`);
      const delay = steps[i].delay;
      i++;
      setTimeout(next, delay);
    }
    next();
  },
});
