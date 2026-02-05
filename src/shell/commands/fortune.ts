import { CommandRegistry } from '../CommandRegistry';
import { FG, RESET, DIM, ITALIC, CRLF } from '../../utils/ansi';

const FORTUNES = [
  { quote: 'Talk is cheap. Show me the code.', author: 'Linus Torvalds' },
  { quote: 'The best way to predict the future is to implement it.', author: 'David Heinemeier Hansson' },
  { quote: 'It works on my machine.', author: 'Every developer, ever' },
  { quote: 'There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors.', author: 'Unknown' },
  { quote: 'The most dangerous phrase in the language is, "We\'ve always done it this way."', author: 'Grace Hopper' },
  { quote: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
  { quote: 'Any sufficiently advanced technology is indistinguishable from magic.', author: 'Arthur C. Clarke' },
  { quote: 'Unix is user-friendly. It\'s just very selective about who its friends are.', author: 'Unknown' },
  { quote: 'There is no cloud. It\'s just someone else\'s computer.', author: 'Unknown' },
  { quote: 'A SQL query walks into a bar, sees two tables, and asks: "Can I join you?"', author: 'Unknown' },
  { quote: 'Why do programmers prefer dark mode? Because light attracts bugs.', author: 'Unknown' },
  { quote: 'In theory, theory and practice are the same. In practice, they\'re not.', author: 'Yogi Berra' },
  { quote: 'If debugging is the process of removing bugs, then programming must be the process of putting them in.', author: 'Edsger Dijkstra' },
  { quote: 'The only way to learn a new programming language is by writing programs in it.', author: 'Dennis Ritchie' },
  { quote: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.', author: 'Antoine de Saint-Exupery' },
  { quote: 'Programs must be written for people to read, and only incidentally for machines to execute.', author: 'Harold Abelson' },
  { quote: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs' },
  { quote: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
  { quote: 'rm -rf / solves all problems.', author: 'No sane sysadmin, ever' },
  { quote: 'It\'s not a bug, it\'s a feature.', author: 'Every product manager' },
  { quote: 'sudo make me a sandwich.', author: 'xkcd #149' },
  { quote: 'Given enough eyeballs, all bugs are shallow.', author: 'Linus\'s Law' },
  { quote: 'Weeks of coding can save you hours of planning.', author: 'Unknown' },
  { quote: 'There are two ways to write error-free programs; only the third one works.', author: 'Alan Perlis' },
];

CommandRegistry.register({
  name: 'fortune',
  description: 'Display a random fortune',
  hidden: true,
  execute: (ctx) => {
    const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    const lines = [
      '',
      `  ${FG.yellow}${ITALIC}"${fortune.quote}"${RESET}`,
      `  ${DIM}    -- ${fortune.author}${RESET}`,
      '',
    ];
    ctx.terminal.write(lines.join(CRLF));
  },
});
