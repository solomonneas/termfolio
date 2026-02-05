import { Terminal } from './components/Terminal';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/terminal.css';

export default function App() {
  return (
    <>
      <ErrorBoundary>
        <Terminal />
      </ErrorBoundary>
      <div className="mobile-notice">best viewed on desktop</div>
    </>
  );
}
