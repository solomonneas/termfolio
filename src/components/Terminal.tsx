import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import '@xterm/xterm/css/xterm.css';
import { Shell } from '../shell/Shell';
import { themes } from '../utils/themes';

export function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<XTerminal | null>(null);
  const [initError, setInitError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || terminalRef.current) return;

    let terminal: XTerminal | null = null;
    let observer: ResizeObserver | null = null;
    let container: HTMLDivElement | null = null;
    let handleClick: ((e: MouseEvent) => void) | null = null;

    try {
      terminal = new XTerminal({
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
      observer = new ResizeObserver(() => {
        fitAddon.fit();
      });
      observer.observe(containerRef.current);

      // Re-focus on click within terminal container (avoid interfering with links/accessibility)
      container = containerRef.current;
      handleClick = (e: MouseEvent) => {
        // Don't steal focus if clicking an anchor (e.g., from WebLinksAddon)
        if ((e.target as HTMLElement).closest('a')) return;
        terminal?.focus();
      };
      container.addEventListener('click', handleClick);
    } catch (error) {
      console.error('Terminal initialization failed:', error);
      setInitError(error instanceof Error ? error.message : 'Unknown error');

      // Dismiss loading screen even on error
      const loadingEl = document.getElementById('loading-screen');
      if (loadingEl) loadingEl.remove();
    }

    return () => {
      if (observer) observer.disconnect();
      if (container && handleClick) container.removeEventListener('click', handleClick);
      if (terminal) terminal.dispose();
      terminalRef.current = null;
    };
  }, []);

  if (initError) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1a1b26',
        color: '#a9b1d6',
        fontFamily: "'JetBrains Mono', monospace",
        padding: '2rem',
        textAlign: 'center',
      }}>
        <h1 style={{ color: '#f7768e', marginBottom: '1rem' }}>
          Terminal Failed to Initialize
        </h1>
        <p style={{ maxWidth: '600px', lineHeight: 1.6 }}>
          Something went wrong while loading the terminal emulator.
          This might be due to browser compatibility issues or font loading problems.
        </p>
        <p style={{ marginTop: '1rem', color: '#7aa2f7' }}>
          Try refreshing the page or using a different browser.
        </p>
        <pre style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#24283b',
          borderRadius: '4px',
          fontSize: '0.8rem',
          maxWidth: '100%',
          overflow: 'auto',
        }}>
          {initError}
        </pre>
      </div>
    );
  }

  return <div id="terminal-container" ref={containerRef} />;
}
