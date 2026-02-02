import { CommandRegistry } from '../CommandRegistry';
import { CRLF } from '../../utils/ansi';

function wordWrap(text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (current && current.length + 1 + word.length > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines.length > 0 ? lines : [''];
}

CommandRegistry.register({
  name: 'cowsay',
  description: 'Cow says moo',
  usage: 'cowsay [message]',
  execute: (ctx) => {
    const { terminal, rawInput } = ctx;
    const message = rawInput.replace(/^cowsay\s*/, '').trim() || 'moo';
    const lines = wordWrap(message, 40);
    const maxLen = Math.max(...lines.map((l) => l.length));

    const output: string[] = [''];

    // Top border
    output.push(`   ${'_'.repeat(maxLen + 2)}`);

    if (lines.length === 1) {
      output.push(`  < ${lines[0].padEnd(maxLen)} >`);
    } else {
      for (let i = 0; i < lines.length; i++) {
        const padded = lines[i].padEnd(maxLen);
        if (i === 0) {
          output.push(`  / ${padded} \\`);
        } else if (i === lines.length - 1) {
          output.push(`  \\ ${padded} /`);
        } else {
          output.push(`  | ${padded} |`);
        }
      }
    }

    // Bottom border
    output.push(`   ${'-'.repeat(maxLen + 2)}`);

    // The cow
    output.push('          \\   ^__^');
    output.push('           \\  (oo)\\_______');
    output.push('              (__)\\       )\\/\\');
    output.push('                  ||----w |');
    output.push('                  ||     ||');
    output.push('');

    terminal.write(output.join(CRLF));
  },
});
