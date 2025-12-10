import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { GameList } from './components/GameList';
import { GameForm } from './components/GameForm';
import { StatsDashboard } from './components/StatsDashboard';
import { FaGamepad, FaPlus, FaChartBar, FaList, FaPowerOff } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      borderBottom: '2px solid var(--cyber-cyan)',
      background: 'rgba(0,0,0,0.8)',
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2rem', color: 'var(--cyber-cyan)' }}><FaGamepad /></div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="glitch" data-text="GAME.VAULT_OS" style={{ fontSize: '1.5rem', fontFamily: 'Share Tech Mono', color: 'white', letterSpacing: '2px' }}>GAME.VAULT_OS</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--cyber-yellow)', letterSpacing: '1px' }}>SYSTEM: ONLINE</span>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: location.pathname === '/' ? 'var(--cyber-cyan)' : 'var(--text-dim)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: location.pathname === '/' ? '1px solid var(--cyber-cyan)' : 'none' }}>
            [ COLLECTION ]
          </Link>
          <Link to="/stats" style={{ color: location.pathname === '/stats' ? 'var(--cyber-cyan)' : 'var(--text-dim)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: location.pathname === '/stats' ? '1px solid var(--cyber-cyan)' : 'none' }}>
            [ DATA_LOGS ]
          </Link>
          <Link to="/add" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaPlus /> INITIALIZE_NEW_ENTRY
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container animate-fade-in">
          <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/add" element={<GameForm />} />
            <Route path="/edit/:id" element={<GameForm />} />
            <Route path="/stats" element={<StatsDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
