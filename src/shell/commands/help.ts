import { CommandRegistry, type CommandContext } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'help',
  description: 'Show available commands',
  usage: 'help [command]',
  execute: (ctx: CommandContext) => {
    const { terminal, args } = ctx;

    if (args.length > 0) {
      const cmd = CommandRegistry.get(args[0]);
      if (!cmd) {
        terminal.write(`${CRLF}  ${FG.red}${BOLD}help:${RESET} unknown command '${args[0]}'${CRLF}`);
        return;
      }
      terminal.write(CRLF);
      terminal.write(`  ${BOLD}${FG.cyan}${cmd.name}${RESET} - ${cmd.description}${CRLF}`);
      if (cmd.usage) {
        terminal.write(`  ${DIM}Usage: ${cmd.usage}${RESET}${CRLF}`);
      }
      terminal.write(CRLF);
      return;
    }

    const commands = CommandRegistry.getAll().sort((a, b) => a.name.localeCompare(b.name));

    terminal.write(CRLF);
    terminal.write(`  ${BOLD}${FG.cyan}Available Commands${RESET}${CRLF}`);
    terminal.write(`  ${DIM}${'─'.repeat(40)}${RESET}${CRLF}`);

    for (const cmd of commands) {
      const name = `${FG.brightWhite}${cmd.name.padEnd(12)}${RESET}`;
      terminal.write(`  ${name} ${DIM}${cmd.description}${RESET}${CRLF}`);
    }

    terminal.write(CRLF);
    terminal.write(`  ${DIM}Type ${FG.brightWhite}help <command>${RESET}${DIM} for detailed usage.${RESET}${CRLF}`);
    terminal.write(CRLF);
  },
});
