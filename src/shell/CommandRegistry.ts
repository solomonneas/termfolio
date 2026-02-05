import { Terminal } from '@xterm/xterm';
import { FileSystem } from '../fs/FileSystem';

export interface CommandContext {
  terminal: Terminal;
  fs: FileSystem;
  cwd: string;
  setCwd: (path: string) => void;
  args: string[];
  rawInput: string;
  previousDir: string;
  reprompt: () => void;
  history: string[];
  lockInput: () => void;
  unlockInput: () => void;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  async?: boolean;
  hidden?: boolean;
  execute: (ctx: CommandContext) => void;
}

class CommandRegistryClass {
  private commands = new Map<string, Command>();

  register(cmd: Command): void {
    this.commands.set(cmd.name, cmd);
  }

  get(name: string): Command | undefined {
    return this.commands.get(name);
  }

  getAll(): Command[] {
    return Array.from(this.commands.values());
  }

  has(name: string): boolean {
    return this.commands.has(name);
  }
}

export const CommandRegistry = new CommandRegistryClass();
