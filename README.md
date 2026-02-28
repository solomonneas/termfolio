<p align="center">
  <a href="https://solomonneas.dev/projects/termfolio"><img src="https://img.shields.io/badge/Portfolio-solomonneas.dev-22c55e?style=flat-square" alt="Portfolio" /></a>
</p>

# Termfolio

A terminal-themed portfolio website built with React, TypeScript, and xterm.js. Navigate through a virtual filesystem to explore projects, experience, education, and more using familiar shell commands.

## Features

- Interactive terminal emulator powered by xterm.js
- Virtual filesystem with projects, blog posts, dotfiles, and more
- Full shell line editing (arrows, Home/End, Ctrl shortcuts, history)
- Tab completion for commands and paths
- URL-based routing (e.g., `/projects`, `/about`, `/resume`)
- Multiple color themes
- Easter eggs and fun commands

## Quick Start

```bash
npm install
npm run dev
```

## Available Commands

### Navigation
- `ls [-l] [-a] [path]` - List directory contents
- `cd [path]` - Change directory (`cd -` for previous directory)
- `pwd` - Print working directory
- `tree [path]` - Display directory tree

### File Operations
- `cat <file>` - Display file contents
- `grep <pattern> [path]` - Search for patterns in files

### Information
- `help` - Show available commands
- `man <command>` - Display command manual
- `whoami` - Display user info
- `history` - Show command history

### Fun Stuff
- `cowsay <message>` - Cow says your message
- `figlet <text>` - ASCII art text
- `fortune` - Random fortune
- `lolcat <text>` - Rainbow text
- `cmatrix` - Matrix rain animation
- `snake` - Play Snake game
- `sl` - Steam locomotive

### Utilities
- `open <url>` - Open URL in new tab
- `echo <text>` - Print text
- `clear` - Clear terminal
- `theme [name]` - Change color theme
- `weather [city]` - Show weather (requires API)
- `ping <host>` - Simulated ping
- `top` - Simulated process viewer

## URL Routing

Navigate directly to sections via URL:

| URL | Action |
|-----|--------|
| `/projects` | `cd projects && ls` |
| `/about` | `cat about.md` |
| `/resume` | `cat resume.pdf` (opens PDF) |
| `/experience` | `cat experience/README.md` |
| `/contact` | `cat socials.md` |

## Architecture

```
src/
├── components/
│   └── Terminal.tsx       # xterm.js integration
├── shell/
│   ├── Shell.ts           # Input handling, history, completion
│   ├── CommandRegistry.ts # Command registration system
│   └── commands/          # Individual command implementations
├── fs/
│   ├── FileSystem.ts      # Virtual filesystem operations
│   └── fsTree.ts          # Filesystem structure definition
├── data/
│   ├── index.ts           # Content registry
│   ├── projects.ts        # Project descriptions
│   ├── experience.ts      # Work experience
│   └── ...                # Other content
└── utils/
    ├── ansi.ts            # ANSI escape codes
    ├── motd.ts            # Message of the day
    ├── themes.ts          # Color themes
    └── tokenize.ts        # Shell argument tokenizer
```

## Adding Content

### Add a new project

1. Add the project file entry in `src/fs/fsTree.ts`:
   ```typescript
   'my-project.md': { type: 'file', content: 'project:my-project' }
   ```

2. Create the content generator in `src/data/projects.ts`:
   ```typescript
   export function getProjectMyProject(): string {
     // Return ANSI-formatted string
   }
   ```

3. Register in `src/data/index.ts`:
   ```typescript
   'project:my-project': getProjectMyProject,
   ```

### Add a new command

1. Create a new file in `src/shell/commands/`:
   ```typescript
   import { CommandRegistry, type CommandContext } from '../CommandRegistry';

   CommandRegistry.register({
     name: 'mycommand',
     description: 'Description shown in help',
     usage: 'mycommand [args]',
     async: false, // Set true if command handles its own reprompt
     hidden: false, // Set true to hide from help
     execute: (ctx: CommandContext) => {
       const { terminal, fs, cwd, args } = ctx;
       // Implementation
     },
   });
   ```

2. Import in `src/shell/Shell.ts`:
   ```typescript
   import './commands/mycommand';
   ```

### Add URL routes

Edit `getRouteCommands()` in `src/shell/Shell.ts`:
```typescript
const routes: Record<string, string[]> = {
  '/myroute': ['cd somewhere', 'ls'],
};
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Auto-complete command or path |
| `Up/Down` | Navigate command history |
| `Ctrl+C` | Cancel current input |
| `Ctrl+L` | Clear screen |
| `Ctrl+U` | Clear line before cursor |
| `Ctrl+A` / `Home` | Move to start of line |
| `Ctrl+E` / `End` | Move to end of line |

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Tech Stack

- React 19
- TypeScript
- Vite
- xterm.js with FitAddon and WebLinksAddon
- ANSI escape sequences for styling

## License

MIT
