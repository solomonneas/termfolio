import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Terminal initialization failed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

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
          {this.state.error && (
            <pre style={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: '#24283b',
              borderRadius: '4px',
              fontSize: '0.8rem',
              maxWidth: '100%',
              overflow: 'auto',
            }}>
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
