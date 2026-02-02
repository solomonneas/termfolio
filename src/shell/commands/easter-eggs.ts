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

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    let iterations = 0;
    const maxIterations = 60;

    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        clearInterval(interval);
        terminal.write(CRLF);
        terminal.write(`${CRLF}  ${FG.green}${BOLD}ACCESS GRANTED${RESET}${CRLF}`);
        terminal.write(`  ${DIM}Just kidding. But you look cool doing it.${RESET}${CRLF}${CRLF}`);
        // Re-prompt after async command
        (ctx as any).reprompt?.();
        return;
      }

      let line = `  ${FG.green}`;
      for (let i = 0; i < 60; i++) {
        line += chars[Math.floor(Math.random() * chars.length)];
      }
      line += RESET;
      terminal.write(line + CRLF);
      iterations++;
    }, 50);
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
