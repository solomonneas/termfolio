import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'weather',
  description: 'Check the weather',
  hidden: true,
  execute: (ctx) => {
    const lines = [
      '',
      `  ${BOLD}${FG.cyan}Weather report: The Cloud${RESET}`,
      '',
      `  ${FG.brightWhite}     .---.${RESET}`,
      `  ${FG.brightWhite}    (     ).${RESET}       ${BOLD}Temperature:${RESET}  72°F (22°C)`,
      `  ${FG.brightWhite}   (_________)${RESET}     ${BOLD}Humidity:${RESET}     100% (it's literally the cloud)`,
      `  ${FG.brightCyan}    ' ' ' '${RESET}        ${BOLD}Wind:${RESET}         10 Gbit/s`,
      `  ${FG.brightCyan}   ' ' ' '${RESET}         ${BOLD}Visibility:${RESET}   Infinite (serverless)`,
      `                        ${BOLD}UV Index:${RESET}     404 Not Found`,
      `                        ${BOLD}Pressure:${RESET}     High (deadlines)`,
      '',
      `  ${DIM}Forecast: Cloudy with a chance of containers.${RESET}`,
      `  ${DIM}Tomorrow: 99% uptime, slight chance of incidents.${RESET}`,
      '',
    ];
    ctx.terminal.write(lines.join(CRLF));
  },
});
