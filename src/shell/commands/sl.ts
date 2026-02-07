import { CommandRegistry } from '../CommandRegistry';
import { CRLF } from '../../utils/ansi';

const TRAIN = [
  '      ====        ________                ___________',
  '  _D _|  |_______/        \\__I_I_____===__|_________|',
  '   |(_)---  |   H\\________/ |   |        =|___ ___|',
  '   /     |  |   H  |  |     |   |         ||_| |_||',
  '  |      |  |   H  |__--------------------| [___] |',
  '  | ________|___H__/__|_____/[][]~\\_______|       |',
  '  |/ |   |-----------I_____I [][] []  D   |=======|__',
  '__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__',
  ' |/-=|___|=    ||    ||    ||    |_____/~\\___/        ',
  '  \\_/      \\O=====O=====O=====O_/      \\_/           ',
];

CommandRegistry.register({
  name: 'sl',
  description: 'Steam locomotive',
  hidden: true,
  async: true,
  execute: (ctx) => {
    const { terminal } = ctx;
    const trainWidth = Math.max(...TRAIN.map((l) => l.length));
    const cols = terminal.cols;
    let offset = cols;

    ctx.lockInput();
    terminal.write('\x1b[?25l'); // hide cursor

    const interval = setInterval(() => {
      if (offset < -trainWidth) {
        clearInterval(interval);
        terminal.write('\x1b[?25h'); // show cursor
        ctx.unlockInput();
        ctx.reprompt();
        return;
      }

      // Move up to redraw (clear previous frame)
      if (offset < cols) {
        terminal.write(`\x1b[${TRAIN.length}A`); // move up N lines
      }

      for (const line of TRAIN) {
        // Shift the line by offset
        let shifted = '';
        for (let c = 0; c < cols; c++) {
          const srcIdx = c - offset;
          if (srcIdx >= 0 && srcIdx < line.length) {
            shifted += line[srcIdx];
          } else {
            shifted += ' ';
          }
        }
        terminal.write('\r' + shifted + CRLF);
      }

      offset -= 3;
    }, 50);
  },
});
