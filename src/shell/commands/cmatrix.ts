import { CommandRegistry } from '../CommandRegistry';
import { FG, BOLD, RESET, DIM, CRLF } from '../../utils/ansi';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

CommandRegistry.register({
  name: 'cmatrix',
  description: 'Matrix digital rain',
  hidden: true,
  async: true,
  execute: (ctx) => {
    const { terminal } = ctx;
    const cols = terminal.cols;
    const rows = terminal.rows;

    ctx.lockInput();
    terminal.write('\x1b[?25l'); // hide cursor
    terminal.write('\x1b[2J');   // clear screen
    terminal.write('\x1b[H');    // home

    // Character grid: what character to show at each cell
    const charGrid: string[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => randomChar())
    );

    // Per-column drop state
    interface Drop {
      y: number;       // current head Y position
      length: number;  // trail length
      speed: number;   // cells per tick
      counter: number; // tick counter for fractional speed
    }

    const drops: Drop[] = Array.from({ length: cols }, () => ({
      y: -Math.floor(Math.random() * rows) - 1,
      length: Math.floor(Math.random() * 12) + 6,
      speed: Math.floor(Math.random() * 2) + 1,
      counter: 0,
    }));

    let ticks = 0;

    function tick() {
      ticks++;

      // Randomly mutate some characters in the grid
      for (let i = 0; i < Math.floor(cols * 0.5); i++) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        charGrid[r][c] = randomChar();
      }

      // Advance drops
      for (let col = 0; col < cols; col++) {
        const drop = drops[col];
        drop.counter++;
        if (drop.counter >= (3 - drop.speed)) {
          drop.counter = 0;
          drop.y++;
        }

        // Reset if fully off screen
        if (drop.y - drop.length > rows) {
          drop.y = -Math.floor(Math.random() * rows) - 5;
          drop.length = Math.floor(Math.random() * 12) + 6;
          drop.speed = Math.floor(Math.random() * 2) + 1;
        }
      }

      // Render frame
      terminal.write('\x1b[H'); // home

      for (let row = 0; row < rows - 1; row++) {
        let line = '';
        for (let col = 0; col < cols; col++) {
          const drop = drops[col];
          const distFromHead = drop.y - row;

          if (distFromHead < 0 || distFromHead > drop.length) {
            line += ' ';
          } else if (distFromHead === 0) {
            // Head: bright white
            line += `${BOLD}\x1b[97m${charGrid[row][col]}\x1b[0m`;
          } else if (distFromHead < 3) {
            // Near head: bright green
            line += `${BOLD}${FG.brightGreen}${charGrid[row][col]}${RESET}`;
          } else if (distFromHead < drop.length * 0.6) {
            // Body: normal green
            line += `${FG.green}${charGrid[row][col]}${RESET}`;
          } else {
            // Tail: dim green
            line += `${DIM}${FG.green}${charGrid[row][col]}${RESET}`;
          }
        }
        terminal.write('\r' + line + CRLF);
      }
    }

    const interval = setInterval(tick, 60);

    const dataDisposable = terminal.onData((data: string) => {
      if (data === 'q' || data === 'Q' || data === '\x03') {
        clearInterval(interval);
        dataDisposable.dispose();
        ctx.unlockInput();
        terminal.clear();
        terminal.write('\x1b[?25h'); // show cursor
        ctx.reprompt();
      }
    });
  },
});
