import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

const MAN_PAGES: Record<string, { synopsis: string; description: string[] }> = {
  ls: {
    synopsis: 'ls [-la] [path]',
    description: [
      'List directory contents. By default shows non-hidden files in',
      'columnar format. Use -l for long format with permissions, size,',
      'and modification date. Use -a to include hidden files (dotfiles).',
    ],
  },
  cd: {
    synopsis: 'cd [directory]',
    description: [
      'Change the current working directory. With no arguments, changes',
      'to the home directory (~). Use cd - to return to the previous',
      'directory. Supports both absolute and relative paths.',
    ],
  },
  cat: {
    synopsis: 'cat <file>',
    description: [
      'Display file contents. Reads the specified file and outputs its',
      'formatted content to the terminal. Special files like resume.pdf',
      'will also open in a new browser tab.',
    ],
  },
  grep: {
    synopsis: 'grep <pattern> [path]',
    description: [
      'Search file contents for a pattern. Searches recursively through',
      'directories. Matches are highlighted in red. Supports regular',
      'expressions. If no path given, searches the current directory.',
    ],
  },
  tree: {
    synopsis: 'tree [path]',
    description: [
      'Display a recursive directory tree with box-drawing characters.',
      'Shows the hierarchy of files and directories. Hidden files',
      '(dotfiles) are excluded from the output.',
    ],
  },
  echo: {
    synopsis: 'echo [text...]',
    description: [
      'Display text to the terminal. Supports shell variable expansion',
      'for $PATH, $HOME, $USER, $SHELL, $EDITOR, and $TERM.',
    ],
  },
  open: {
    synopsis: 'open <shortcut|url>',
    description: [
      'Open a URL in a new browser tab. Supports shortcuts: github,',
      'linkedin, resume, website, blog. Also accepts raw URLs.',
      'Aliased as xdg-open.',
    ],
  },
  history: {
    synopsis: 'history',
    description: [
      'Display a numbered list of previously executed commands.',
      'Most recent commands appear at the bottom.',
    ],
  },
  help: {
    synopsis: 'help [command]',
    description: [
      'Show available commands. With no arguments, lists all commands.',
      'With a command name, shows detailed usage for that command.',
    ],
  },
  cowsay: {
    synopsis: 'cowsay [message]',
    description: [
      'Display a cow saying a message. If no message is given, the',
      'cow says "moo". Word-wraps long messages.',
    ],
  },
  theme: {
    synopsis: 'theme [name]',
    description: [
      'Switch the terminal color theme. With no arguments, lists',
      'available themes. Pass a theme name to apply it.',
    ],
  },
};

CommandRegistry.register({
  name: 'man',
  description: 'Manual pages',
  usage: 'man <command>',
  execute: (ctx) => {
    const { terminal, args } = ctx;

    if (args.length === 0) {
      terminal.write(`${CRLF}  ${DIM}What manual page do you want?${RESET}${CRLF}`);
      terminal.write(`  ${DIM}Usage: man <command>${RESET}${CRLF}${CRLF}`);
      return;
    }

    const name = args[0].toLowerCase();

    // Special case: man solomon
    if (name === 'solomon') {
      const manPage = [
        '',
        `  ${BOLD}SOLOMON(1)${RESET}${DIM}              General Commands Manual             ${RESET}${BOLD}SOLOMON(1)${RESET}`,
        '',
        `  ${BOLD}${FG.cyan}NAME${RESET}`,
        `      solomon - full-stack developer & security engineer`,
        '',
        `  ${BOLD}${FG.cyan}SYNOPSIS${RESET}`,
        `      ${BOLD}solomon${RESET} [${DIM}--hire${RESET}] [${DIM}--collaborate${RESET}] [${DIM}--chat${RESET}]`,
        '',
        `  ${BOLD}${FG.cyan}DESCRIPTION${RESET}`,
        `      Solomon Neas is a full-stack software developer and security`,
        `      engineer based in Florida. With experience spanning web development,`,
        `      systems administration, cybersecurity, and infrastructure engineering,`,
        `      he builds tools that solve real problems.`,
        '',
        `      Currently serves as Network & Systems Engineer at Polk State College,`,
        `      where he built an open-source SOC (Wazuh, TheHive, MISP) saving`,
        `      $140K-$217K in licensing costs, and migrated VMware ESXi to Proxmox,`,
        `      eliminating ~$68,600/yr in expenses.`,
        '',
        `      Previously operated Neas Web Productions (2000-2007) and spent 18`,
        `      years as a culinary professional, developing leadership, crisis`,
        `      management, and team-building skills that translate directly to`,
        `      engineering roles.`,
        '',
        `  ${BOLD}${FG.cyan}OPTIONS${RESET}`,
        `      ${BOLD}--hire${RESET}        Send an email to me@solomonneas.dev`,
        `      ${BOLD}--collaborate${RESET} Visit github.com/solomonneas`,
        `      ${BOLD}--chat${RESET}        Connect on linkedin.com/in/solomon-neas`,
        '',
        `  ${BOLD}${FG.cyan}SKILLS${RESET}`,
        `      TypeScript, Python, Go, Rust, React, Next.js, Node.js, FastAPI,`,
        `      Docker, Proxmox, Linux, Nginx, PostgreSQL, Wazuh, Active Directory,`,
        `      Cisco, Palo Alto, Ansible, Terraform`,
        '',
        `  ${BOLD}${FG.cyan}CERTIFICATIONS${RESET}`,
        `      CompTIA A+ ${DIM}(Good-For-Life, May 2006)${RESET}`,
        '',
        `  ${BOLD}${FG.cyan}EDUCATION${RESET}`,
        `      M.S. Cybersecurity Intelligence, University of South Florida`,
        `      ${DIM}(In Progress)${RESET}`,
        '',
        `  ${BOLD}${FG.cyan}BUGS${RESET}`,
        `      Sometimes builds terminal portfolios instead of sleeping.`,
        '',
        `  ${BOLD}${FG.cyan}SEE ALSO${RESET}`,
        `      github.com/solomonneas, solomonneas.dev, linkedin.com/in/solomon-neas`,
        '',
        `  ${BOLD}${FG.cyan}AUTHOR${RESET}`,
        `      Solomon Neas <me@solomonneas.dev>`,
        '',
      ];
      terminal.write(manPage.join(CRLF));
      return;
    }

    const page = MAN_PAGES[name];

    if (!page) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}man:${RESET} no manual entry for '${name}'${CRLF}${CRLF}`);
      return;
    }

    terminal.write(CRLF);
    terminal.write(`  ${BOLD}${FG.cyan}NAME${RESET}${CRLF}`);
    terminal.write(`      ${name} - ${CommandRegistry.get(name)?.description || ''}${CRLF}${CRLF}`);
    terminal.write(`  ${BOLD}${FG.cyan}SYNOPSIS${RESET}${CRLF}`);
    terminal.write(`      ${page.synopsis}${CRLF}${CRLF}`);
    terminal.write(`  ${BOLD}${FG.cyan}DESCRIPTION${RESET}${CRLF}`);
    for (const line of page.description) {
      terminal.write(`      ${line}${CRLF}`);
    }
    terminal.write(CRLF);
  },
});
