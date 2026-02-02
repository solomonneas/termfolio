import { useEffect, useRef } from 'react';
import { Terminal as XTerminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';
import { Shell } from '../shell/Shell';
import { themes } from '../utils/themes';

export function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<XTerminal | null>(null);

  useEffect(() => {
    if (!containerRef.current || terminalRef.current) return;

    const terminal = new XTerminal({
      theme: themes.default,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 14,
      lineHeight: 1.2,
      cursorBlink: true,
      cursorStyle: 'block',
      allowProposedApi: true,
      scrollback: 5000,
    });

    terminalRef.current = terminal;

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(new WebLinksAddon());

    terminal.open(containerRef.current);
    fitAddon.fit();

    // Dismiss loading screen
    const loadingEl = document.getElementById('loading-screen');
    if (loadingEl) {
      loadingEl.classList.add('fade-out');
      setTimeout(() => loadingEl.remove(), 300);
    }

    const shell = new Shell(terminal);
    shell.start();

    terminal.focus();

    // Handle resize
    const observer = new ResizeObserver(() => {
      fitAddon.fit();
    });
    observer.observe(containerRef.current);

    // Re-focus on click anywhere
    const handleClick = () => terminal.focus();
    document.addEventListener('click', handleClick);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleClick);
      terminal.dispose();
      terminalRef.current = null;
    };
  }, []);

  return <div id="terminal-container" ref={containerRef} />;
}
