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

    const commands = CommandRegistry.getAll()
      .filter((c) => !c.hidden)
      .sort((a, b) => a.name.localeCompare(b.name));

    terminal.write(CRLF);
    terminal.write(`  ${BOLD}${FG.cyan}Available Commands${RESET}${CRLF}`);
    terminal.write(`  ${DIM}${'─'.repeat(40)}${RESET}${CRLF}`);

    for (const cmd of commands) {
      const name = `${FG.brightWhite}${cmd.name.padEnd(12)}${RESET}`;
      terminal.write(`  ${name} ${DIM}${cmd.description}${RESET}${CRLF}`);
    }

    terminal.write(CRLF);
    terminal.write(`  ${BOLD}${FG.yellow}Easter Eggs${RESET}${CRLF}`);
    terminal.write(`  ${DIM}${'─'.repeat(40)}${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'neofetch'.padEnd(12)}${RESET} ${DIM}System info (try it!)${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'sudo'.padEnd(12)}${RESET} ${DIM}Execute as superuser${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'cmatrix'.padEnd(12)}${RESET} ${DIM}Matrix digital rain${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'snake'.padEnd(12)}${RESET} ${DIM}Play a game${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'fortune'.padEnd(12)}${RESET} ${DIM}Random wisdom${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'weather'.padEnd(12)}${RESET} ${DIM}Check the forecast${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'top'.padEnd(12)}${RESET} ${DIM}Running processes${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'ping'.padEnd(12)}${RESET} ${DIM}Ping a host${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'figlet'.padEnd(12)}${RESET} ${DIM}ASCII text art${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'lolcat'.padEnd(12)}${RESET} ${DIM}Rainbow text${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'sl'.padEnd(12)}${RESET} ${DIM}Choo choo${RESET}${CRLF}`);
    terminal.write(`  ${FG.brightWhite}${'hack'.padEnd(12)}${RESET} ${DIM}???${RESET}${CRLF}`);
    terminal.write(CRLF);
    terminal.write(`  ${DIM}Type ${FG.brightWhite}help <command>${RESET}${DIM} for detailed usage.${RESET}${CRLF}`);
    terminal.write(`  ${DIM}Try ${FG.brightWhite}man solomon${RESET}${DIM} for more about me.${RESET}${CRLF}`);
    terminal.write(CRLF);
  },
});
