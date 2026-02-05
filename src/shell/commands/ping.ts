import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'ping',
  description: 'Ping a host',
  hidden: true,
  async: true,
  execute: (ctx) => {
    const { terminal, args } = ctx;
    const target = args[0] || 'localhost';

    ctx.lockInput();
    terminal.write(CRLF);
    terminal.write(`  ${BOLD}PING${RESET} solomon.brain (127.0.0.1) 56(84) bytes of data.${CRLF}`);

    const responses = [
      `  64 bytes from solomon.brain: icmp_seq=1 ttl=64 time=${(Math.random() * 3 + 1).toFixed(1)} ms`,
      `  64 bytes from solomon.brain: icmp_seq=2 ttl=64 time=${(Math.random() * 3 + 1).toFixed(1)} ms`,
      `  64 bytes from solomon.brain: icmp_seq=3 ttl=64 time=${(Math.random() * 3 + 1).toFixed(1)} ms`,
      `  64 bytes from solomon.brain: icmp_seq=4 ttl=64 time=${(Math.random() * 3 + 1).toFixed(1)} ms`,
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= responses.length) {
        clearInterval(interval);
        ctx.unlockInput();
        terminal.write(CRLF);
        terminal.write(`  ${DIM}--- solomon.brain ping statistics ---${RESET}${CRLF}`);
        terminal.write(`  ${DIM}4 packets transmitted, 4 received, 0% packet loss${RESET}${CRLF}`);
        terminal.write(`  ${FG.green}Pinging Solomon's brain... 2ms avg response time${RESET}${CRLF}`);
        terminal.write(`  ${DIM}(${target}? Never heard of it. But Solomon's always online.)${RESET}${CRLF}`);
        terminal.write(CRLF);
        ctx.reprompt();
        return;
      }
      terminal.write(`${responses[i]}${CRLF}`);
      i++;
    }, 600);
  },
});
