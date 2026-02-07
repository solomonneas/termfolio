import { CommandRegistry } from '../CommandRegistry';
import { BOLD, FG, RESET, DIM, CRLF } from '../../utils/ansi';
import { themes } from '../../utils/themes';

CommandRegistry.register({
  name: 'theme',
  description: 'Switch terminal theme',
  usage: 'theme [name]',
  execute: (ctx) => {
    const { terminal, args } = ctx;
    const names = Object.keys(themes);

    if (args.length === 0) {
      terminal.write(CRLF);
      terminal.write(`  ${BOLD}${FG.cyan}Available Themes${RESET}${CRLF}`);
      terminal.write(`  ${DIM}${'─'.repeat(30)}${RESET}${CRLF}`);
      for (const name of names) {
        const t = themes[name];
        // Color preview strip using the theme's colors
        const strip =
          `\x1b[48;2;${hexToRgb(t.red as string)}m  \x1b[0m` +
          `\x1b[48;2;${hexToRgb(t.green as string)}m  \x1b[0m` +
          `\x1b[48;2;${hexToRgb(t.yellow as string)}m  \x1b[0m` +
          `\x1b[48;2;${hexToRgb(t.blue as string)}m  \x1b[0m` +
          `\x1b[48;2;${hexToRgb(t.magenta as string)}m  \x1b[0m` +
          `\x1b[48;2;${hexToRgb(t.cyan as string)}m  \x1b[0m`;
        terminal.write(`  ${FG.brightWhite}${name.padEnd(14)}${RESET}${strip}${CRLF}`);
      }
      terminal.write(CRLF);
      terminal.write(`  ${DIM}Usage: theme <name>${RESET}${CRLF}${CRLF}`);
      return;
    }

    const themeName = args[0].toLowerCase();
    const theme = themes[themeName];

    if (!theme) {
      terminal.write(`${CRLF}  ${FG.red}${BOLD}theme:${RESET} unknown theme '${args[0]}'${CRLF}`);
      terminal.write(`  ${DIM}Available: ${names.join(', ')}${RESET}${CRLF}${CRLF}`);
      return;
    }

    terminal.options.theme = theme;

    // Update CSS variable for body/scrollbar background
    const bg = theme.background as string;
    document.documentElement.style.setProperty('--terminal-bg', bg);

    terminal.write(CRLF);
    terminal.write(`  ${FG.green}${BOLD}✓${RESET} Theme set to ${BOLD}${themeName}${RESET}${CRLF}`);

    // Show preview strip with new theme colors
    const colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'] as const;
    let strip = '  ';
    for (const c of colors) {
      const hex = theme[c] as string;
      strip += `\x1b[48;2;${hexToRgb(hex)}m   \x1b[0m`;
    }
    terminal.write(strip + CRLF);
    terminal.write(CRLF);
  },
});

function hexToRgb(hex: string): string {
  if (!hex) return '0;0;0';

  // Strip leading #
  const h = hex.replace(/^#/, '');

  // Validate: must be 3 or 6 hex characters
  if (!/^[0-9a-fA-F]{3}$/.test(h) && !/^[0-9a-fA-F]{6}$/.test(h)) {
    return '0;0;0';
  }

  // Expand 3-char shorthand (e.g. "f0c" -> "ff00cc")
  const full = h.length === 3
    ? h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
    : h;

  const r = parseInt(full.substring(0, 2), 16);
  const g = parseInt(full.substring(2, 4), 16);
  const b = parseInt(full.substring(4, 6), 16);
  return `${r};${g};${b}`;
}
