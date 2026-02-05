import { Terminal } from '@xterm/xterm';
import { FileSystem } from '../fs/FileSystem';
import { CommandRegistry } from './CommandRegistry';
import { BOLD, FG, RESET, CRLF } from '../utils/ansi';
import { getMOTD } from '../utils/motd';
import { tokenize } from '../utils/tokenize';

// Import all commands to register them
import './commands/ls';
import './commands/cd';
import './commands/cat';
import './commands/pwd';
import './commands/clear';
import './commands/help';
import './commands/whoami';
import './commands/easter-eggs';
import './commands/history';
import './commands/tree';
import './commands/grep';
import './commands/echo';
import './commands/open';
import './commands/man';
import './commands/cowsay';
import './commands/vim';
import './commands/sl';
import './commands/theme';
import './commands/ping';
import './commands/fortune';
import './commands/weather';
import './commands/top';
import './commands/cmatrix';
import './commands/snake';
import './commands/figlet';
import './commands/lolcat';

const ALIASES: Record<string, string> = {
  'll': 'ls -l',
  'la': 'ls -la',
  '.': 'cd ..',
  'tetris': 'snake',
};

export class Shell {
  private terminal: Terminal;
  private fs: FileSystem;
  private cwd = '/home/solomon';
  private previousDir = '/home/solomon';
  private buffer = '';
  private cursorPos = 0;
  private history: string[] = [];
  private historyIndex = -1;
  private historyStash = '';
  private inputLocked = false;

  constructor(terminal: Terminal) {
    this.terminal = terminal;
    this.fs = new FileSystem();
  }

  start(): void {
    this.terminal.write(getMOTD());

    // URL routing: auto-execute commands based on path
    const routeCommands = this.getRouteCommands();
    if (routeCommands) {
      history.replaceState(null, '', '/');
      this.executeBootCommands(routeCommands);
    }

    this.prompt();

    this.terminal.onData((data) => {
      this.handleInput(data);
    });
  }

  /**
   * Execute boot commands (from URL routing) with proper prompt state.
   * Shows each command as if the user typed it for clarity.
   */
  private executeBootCommands(commands: string[]): void {
    for (const cmd of commands) {
      // Write prompt + command to show what's being executed
      this.terminal.write(CRLF + this.getPrompt() + cmd + CRLF);
      // Execute without silent mode so command output appears naturally,
      // but we'll call prompt() ourselves at the end of start()
      this.executeCommand(cmd, true);
    }
  }

  private getRouteCommands(): string[] | null {
    const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
    if (!path || path === '/') return null;

    const routes: Record<string, string[]> = {
      '/projects': ['cd projects', 'ls'],
      '/about': ['cat about.md'],
      '/resume': ['cat resume.pdf'],
      '/experience': ['cat experience/README.md'],
      '/education': ['cat education/README.md'],
      '/blog': ['cd blog', 'ls'],
      '/contact': ['cat socials.md'],
      '/socials': ['cat socials.md'],
      '/certifications': ['cat certifications/README.md'],
      '/certs': ['cat certifications/README.md'],
    };

    const commands = routes[path];
    if (commands) return commands;

    // Unknown path: show 404
    this.terminal.write(
      `  ${FG.red}${BOLD}bash:${RESET} ${path}: No such file or directory${CRLF}`
    );
    history.replaceState(null, '', '/');
    return null;
  }

  private getPrompt(): string {
    const displayPath = this.fs.getDisplayPath(this.cwd);
    return `${BOLD}${FG.green}solomon${RESET}${FG.brightBlack}@${RESET}${BOLD}${FG.blue}${displayPath}${RESET}${FG.brightBlack}$${RESET} `;
  }

  private getPromptLength(): number {
    // Calculate visible length of prompt (strip ANSI)
    const raw = this.getPrompt().replace(/\x1b\[[0-9;]*m/g, '');
    return raw.length;
  }

  prompt(): void {
    this.terminal.write(CRLF + this.getPrompt());
    this.buffer = '';
    this.cursorPos = 0;
    this.historyIndex = -1;
    this.historyStash = '';
  }

  private refreshLine(): void {
    const promptLen = this.getPromptLength();
    const targetCol = promptLen + this.cursorPos;
    // Hide cursor during redraw to prevent flicker
    this.terminal.write(
      '\x1b[?25l' +       // hide cursor
      '\r' +               // move to column 0
      '\x1b[K' +           // clear line
      this.getPrompt() +   // write prompt
      this.buffer +         // write buffer
      '\r' +               // back to column 0
      (targetCol > 0 ? `\x1b[${targetCol}C` : '') + // position cursor
      '\x1b[?25h'          // show cursor
    );
  }

  private handleInput(data: string): void {
    // When input is locked, the active command handles all input via its own onData listener
    if (this.inputLocked) return;

    // Handle escape sequences
    if (data === '\x1b[A') {
      // Up arrow: history previous
      this.navigateHistory(-1);
      return;
    }
    if (data === '\x1b[B') {
      // Down arrow: history next
      this.navigateHistory(1);
      return;
    }
    if (data === '\x1b[C') {
      // Right arrow
      if (this.cursorPos < this.buffer.length) {
        this.cursorPos++;
        this.terminal.write(data);
      }
      return;
    }
    if (data === '\x1b[D') {
      // Left arrow
      if (this.cursorPos > 0) {
        this.cursorPos--;
        this.terminal.write(data);
      }
      return;
    }

    // Home key
    if (data === '\x1b[H' || data === '\x01') {
      this.cursorPos = 0;
      this.refreshLine();
      return;
    }

    // End key
    if (data === '\x1b[F' || data === '\x05') {
      this.cursorPos = this.buffer.length;
      this.refreshLine();
      return;
    }

    // Ctrl+C
    if (data === '\x03') {
      this.terminal.write('^C');
      this.prompt();
      return;
    }

    // Ctrl+L: clear screen
    if (data === '\x0c') {
      this.terminal.clear();
      this.terminal.write(this.getPrompt() + this.buffer);
      return;
    }

    // Ctrl+U: clear line
    if (data === '\x15') {
      this.buffer = this.buffer.slice(this.cursorPos);
      this.cursorPos = 0;
      this.refreshLine();
      return;
    }

    // Enter
    if (data === '\r') {
      this.terminal.write(CRLF);
      const input = this.buffer.trim();
      if (input) {
        this.history.unshift(input);
        if (this.history.length > 100) this.history.pop();
        this.executeCommand(input);
      } else {
        this.prompt();
      }
      return;
    }

    // Backspace
    if (data === '\x7f' || data === '\b') {
      if (this.cursorPos > 0) {
        this.buffer =
          this.buffer.slice(0, this.cursorPos - 1) +
          this.buffer.slice(this.cursorPos);
        this.cursorPos--;
        this.refreshLine();
      }
      return;
    }

    // Delete key
    if (data === '\x1b[3~') {
      if (this.cursorPos < this.buffer.length) {
        this.buffer =
          this.buffer.slice(0, this.cursorPos) +
          this.buffer.slice(this.cursorPos + 1);
        this.refreshLine();
      }
      return;
    }

    // Tab: basic completion
    if (data === '\t') {
      this.handleTab();
      return;
    }

    // Ignore other escape sequences
    if (data.startsWith('\x1b')) return;

    // Printable characters
    this.buffer =
      this.buffer.slice(0, this.cursorPos) +
      data +
      this.buffer.slice(this.cursorPos);
    this.cursorPos += data.length;
    this.refreshLine();
  }

  private navigateHistory(direction: number): void {
    if (this.history.length === 0) return;

    if (this.historyIndex === -1 && direction === -1) {
      this.historyStash = this.buffer;
      this.historyIndex = 0;
    } else if (direction === -1) {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
      } else {
        return;
      }
    } else if (direction === 1) {
      if (this.historyIndex > 0) {
        this.historyIndex--;
      } else if (this.historyIndex === 0) {
        this.historyIndex = -1;
        this.buffer = this.historyStash;
        this.cursorPos = this.buffer.length;
        this.refreshLine();
        return;
      } else {
        return;
      }
    }

    this.buffer = this.history[this.historyIndex];
    this.cursorPos = this.buffer.length;
    this.refreshLine();
  }

  private handleTab(): void {
    // Cursor-aware completion: work with the token at cursor position
    const leftOfCursor = this.buffer.slice(0, this.cursorPos);
    const rightOfCursor = this.buffer.slice(this.cursorPos);

    // Find the start of the current token (word being completed)
    const tokenStart = leftOfCursor.lastIndexOf(' ') + 1;
    const prefix = leftOfCursor.slice(tokenStart);
    const beforeToken = leftOfCursor.slice(0, tokenStart);

    // Determine if this is command or path completion
    const isFirstToken = beforeToken.trim() === '';

    if (isFirstToken) {
      // Command completion
      const matches = CommandRegistry.getAll()
        .map((c) => c.name)
        .filter((n) => n.startsWith(prefix));

      if (matches.length === 1) {
        const completion = matches[0] + ' ';
        this.buffer = beforeToken + completion + rightOfCursor;
        this.cursorPos = beforeToken.length + completion.length;
        this.refreshLine();
      } else if (matches.length > 1) {
        this.terminal.write(CRLF + '  ' + matches.join('  ') + CRLF);
        this.terminal.write(this.getPrompt() + this.buffer);
      }
    } else {
      // Path completion
      const lastSlash = prefix.lastIndexOf('/');
      let dirPath: string;
      let namePrefix: string;

      if (lastSlash >= 0) {
        dirPath = this.fs.resolve(prefix.slice(0, lastSlash + 1), this.cwd);
        namePrefix = prefix.slice(lastSlash + 1);
      } else {
        dirPath = this.cwd;
        namePrefix = prefix;
      }

      const entries = this.fs.list(dirPath);
      if (!entries) return;

      const matches = entries
        .map((e) => e.name + (e.node.type === 'dir' ? '/' : ''))
        .filter((n) => n.startsWith(namePrefix));

      if (matches.length === 1) {
        const base = prefix.slice(0, lastSlash >= 0 ? lastSlash + 1 : 0);
        const completion = base + matches[0];
        this.buffer = beforeToken + completion + rightOfCursor;
        this.cursorPos = beforeToken.length + completion.length;
        this.refreshLine();
      } else if (matches.length > 1) {
        this.terminal.write(CRLF + '  ' + matches.join('  ') + CRLF);
        this.terminal.write(this.getPrompt() + this.buffer);
      }
    }
  }

  private executeCommand(input: string, silent = false): void {
    // Resolve aliases before parsing
    const resolved = ALIASES[input.trim()] ?? input;
    const parts = tokenize(resolved);
    const cmdName = parts[0];
    const args = parts.slice(1);

    const command = CommandRegistry.get(cmdName);
    if (!command) {
      this.terminal.write(
        `  ${FG.red}${BOLD}${cmdName}:${RESET} command not found. Type ${FG.brightWhite}help${RESET} for available commands.${CRLF}`
      );
      if (!silent) this.prompt();
      return;
    }

    const ctx = {
      terminal: this.terminal,
      fs: this.fs,
      cwd: this.cwd,
      setCwd: (path: string) => {
        this.previousDir = this.cwd;
        this.cwd = path;
      },
      args,
      rawInput: resolved,
      previousDir: this.previousDir,
      reprompt: () => this.prompt(),
      history: this.history,
      lockInput: () => { this.inputLocked = true; },
      unlockInput: () => { this.inputLocked = false; },
    };

    command.execute(ctx);

    if (!command.async && !silent) {
      this.prompt();
    }
  }
}
