import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { FaStar, FaRegStar, FaTrash, FaMicrochip } from 'react-icons/fa';

export function GameList() {
    const [games, setGames] = useState([]);
    const [filters, setFilters] = useState({ titre: '', genre: '', plateforme: '' });
    const [loading, setLoading] = useState(true);

    const fetchGames = async () => {
        try {
            const data = await api.getGames(filters);
            setGames(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const toggleFavorite = async (id) => {
        try {
            const res = await api.toggleFavorite(id);
            setGames(games.map(g => g._id === id ? { ...g, isFavorite: res.isFavorite } : g));
        } catch (error) {
            console.error(error);
        }
    };

    const deleteGame = async (id) => {
        if (!window.confirm("WARNING: PERMANENT DATA DELETION. PROCEED?")) return;
        try {
            await api.deleteGame(id);
            setGames(games.filter(g => g._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '2rem' }}>
                <div>
                    <h1 className="glitch" data-text="ARCHIVE_MODULE">ARCHIVE_MODULE</h1>
                    <p style={{ fontFamily: 'Share Tech Mono', color: 'var(--cyber-cyan)' }}>// ACCESSING SECURE DATABASE...</p>
                </div>
                <div style={{ textAlign: 'right', fontFamily: 'Share Tech Mono', color: '#555' }}>
                    SECURE.CONNECTION_ESTABLISHED<br />
                    TOKEN_ID: 884-X99
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    name="titre"
                    className="input"
                    placeholder=">> SEARCH_TITLE..."
                    value={filters.titre}
                    onChange={handleFilterChange}
                />
                <input name="genre" className="input" placeholder=">> FLTR_GENRE" value={filters.genre} onChange={handleFilterChange} />
                <input name="plateforme" className="input" placeholder=">> FLTR_SYS" value={filters.plateforme} onChange={handleFilterChange} />
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', fontFamily: 'Share Tech Mono', fontSize: '1.5rem', color: 'var(--cyber-cyan)' }}>
                    <FaMicrochip className="animate-spin" /> LOAD_SEQUENCE_INITIATED...
                </div>
            ) : (
                <div className="games-grid">
                    {games.map((game, idx) => (
                        <div key={game._id} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#fff' }}>{game.titre}</h3>
                                <button
                                    onClick={() => toggleFavorite(game._id)}
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: game.isFavorite ? 'var(--cyber-yellow)' : '#333' }}
                                >
                                    {game.isFavorite ? <FaStar /> : <FaRegStar />}
                                </button>
                            </div>

                            <div style={{ marginBottom: '1rem', borderTop: '1px dashed #333', borderBottom: '1px dashed #333', padding: '0.5rem 0' }}>
                                {game.genre.map((g, i) => <span key={i} className="tag" style={{ marginRight: '5px' }}>{g}</span>)}
                            </div>

                            <div style={{ fontFamily: 'Share Tech Mono', fontSize: '0.9rem', color: '#aaa', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>SYS:</span> <span style={{ color: 'var(--cyber-cyan)' }}>{game.plateforme.join(', ')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>REL:</span> <span>{game.annee_sortie}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>T_PLAY:</span> <span>{game.temps_jeu_heures} HRS</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>RATING:</span> <span style={{ color: game.metacritic_score > 80 ? 'var(--cyber-yellow)' : 'var(--cyber-pink)' }}>{game.metacritic_score}/100</span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Link to={`/edit/${game._id}`} className="btn" style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', padding: '0.5rem', textDecoration: 'none' }}>
                                    EDIT_DATA
                                </Link>
                                <button onClick={() => deleteGame(game._id)} className="btn btn-danger" style={{ padding: '0.5rem 1rem' }}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
