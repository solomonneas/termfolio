import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';

CommandRegistry.register({
  name: 'snake',
  description: 'Play Snake',
  hidden: true,
  async: true,
  execute: (ctx) => {
    const { terminal } = ctx;
    const WIDTH = 20;
    const HEIGHT = 12;
    const TICK_MS = 130;

    // Game state
    let snake = [{ x: 10, y: 6 }, { x: 9, y: 6 }, { x: 8, y: 6 }];
    let food = { x: 15, y: 6 };
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let score = 0;
    let gameOver = false;
    let firstDraw = true;

    ctx.lockInput();
    terminal.write('\x1b[?25l'); // hide cursor
    terminal.write(CRLF);

    function spawnFood(): boolean {
      // Collect all empty cells
      const empty: { x: number; y: number }[] = [];
      for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
          if (!snake.some((s) => s.x === x && s.y === y)) {
            empty.push({ x, y });
          }
        }
      }
      if (empty.length === 0) return false; // board full = win
      food = empty[Math.floor(Math.random() * empty.length)];
      return true;
    }

    // Total lines drawn per frame: 1 (title) + 1 (top border) + HEIGHT (rows) + 1 (bottom border) + 1 (controls)
    const TOTAL_LINES = HEIGHT + 4;

    function draw() {
      // Move cursor up to overwrite previous frame
      if (!firstDraw) {
        terminal.write(`\x1b[${TOTAL_LINES}A`);
      }
      firstDraw = false;

      // Title / score
      terminal.write(`\r\x1b[K  ${BOLD}${FG.green}SNAKE${RESET}  ${DIM}Score: ${score}  |  High scores: be the first!${RESET}${CRLF}`);

      // Top border
      terminal.write(`\r\x1b[K  ${DIM}+${'--'.repeat(WIDTH)}+${RESET}${CRLF}`);

      // Game rows
      for (let y = 0; y < HEIGHT; y++) {
        let row = `\r\x1b[K  ${DIM}|${RESET}`;
        for (let x = 0; x < WIDTH; x++) {
          const isHead = snake[0].x === x && snake[0].y === y;
          const isBody = !isHead && snake.some((s) => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          if (isHead) {
            row += `${FG.brightGreen}${BOLD}[]${RESET}`;
          } else if (isBody) {
            row += `${FG.green}[]${RESET}`;
          } else if (isFood) {
            row += `${FG.red}${BOLD}<>${RESET}`;
          } else {
            row += '  ';
          }
        }
        row += `${DIM}|${RESET}`;
        terminal.write(row + CRLF);
      }

      // Bottom border
      terminal.write(`\r\x1b[K  ${DIM}+${'--'.repeat(WIDTH)}+${RESET}${CRLF}`);

      // Controls
      terminal.write(`\r\x1b[K  ${DIM}Arrow keys: move  |  q: quit${RESET}${CRLF}`);
    }

    function gameTick() {
      if (gameOver) return;

      dir = nextDir;

      // Move snake
      const newHead = {
        x: snake[0].x + dir.x,
        y: snake[0].y + dir.y,
      };

      // Wall collision
      if (newHead.x < 0 || newHead.x >= WIDTH || newHead.y < 0 || newHead.y >= HEIGHT) {
        endGame();
        return;
      }

      // Self collision
      if (snake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        endGame();
        return;
      }

      snake.unshift(newHead);

      // Food check
      if (newHead.x === food.x && newHead.y === food.y) {
        score += 10;
        if (!spawnFood()) {
          // Board full: you win!
          gameOver = true;
          clearInterval(gameInterval);
          dataDisposable.dispose();
          ctx.unlockInput();
          terminal.write('\x1b[?25h');
          draw();
          terminal.write(CRLF);
          terminal.write(`  ${FG.green}${BOLD}YOU WIN!${RESET}  ${DIM}You filled the entire board! Score: ${score}${RESET}${CRLF}`);
          ctx.reprompt();
          return;
        }
      } else {
        snake.pop();
      }

      draw();
    }

    function endGame() {
      gameOver = true;
      clearInterval(gameInterval);
      dataDisposable.dispose();
      ctx.unlockInput();
      terminal.write('\x1b[?25h'); // show cursor

      // Draw one final frame showing the collision
      draw();

      terminal.write(CRLF);
      terminal.write(`  ${FG.red}${BOLD}GAME OVER${RESET}  ${DIM}Final score: ${score}${RESET}${CRLF}`);
      if (score >= 100) {
        terminal.write(`  ${FG.yellow}${BOLD}Impressive!${RESET} ${DIM}You clearly have your priorities straight.${RESET}${CRLF}`);
      } else if (score >= 50) {
        terminal.write(`  ${DIM}Not bad! Try again with 'snake' to beat your score.${RESET}${CRLF}`);
      } else {
        terminal.write(`  ${DIM}The snake was hungry. And so were you, apparently.${RESET}${CRLF}`);
      }
      ctx.reprompt();
    }

    // Input handler
    const dataDisposable = terminal.onData((data: string) => {
      if (gameOver) return;

      // Quit
      if (data === 'q' || data === 'Q' || data === '\x03') {
        gameOver = true;
        clearInterval(gameInterval);
        dataDisposable.dispose();
        ctx.unlockInput();
        terminal.write('\x1b[?25h'); // show cursor
        terminal.write(CRLF);
        terminal.write(`  ${DIM}Game ended. Score: ${score}${RESET}${CRLF}`);
        ctx.reprompt();
        return;
      }

      // Arrow keys: change direction (prevent 180-degree turns)
      if (data === '\x1b[A' && dir.y !== 1) nextDir = { x: 0, y: -1 };    // up
      if (data === '\x1b[B' && dir.y !== -1) nextDir = { x: 0, y: 1 };    // down
      if (data === '\x1b[C' && dir.x !== -1) nextDir = { x: 1, y: 0 };    // right
      if (data === '\x1b[D' && dir.x !== 1) nextDir = { x: -1, y: 0 };    // left
    });

    // Initial draw
    draw();

    // Game loop
    const gameInterval = setInterval(gameTick, TICK_MS);
  },
});
