import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

export function GameForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        titre: '',
        genre: '',
        plateforme: '',
        editeur: '',
        developpeur: '',
        annee_sortie: new Date().getFullYear(),
        metacritic_score: 75,
        temps_jeu_heures: 0,
        termine: false
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (isEdit) {
            api.getGame(id).then(data => {
                setFormData({
                    ...data,
                    genre: data.genre.join(', '),
                    plateforme: data.plateforme.join(', ')
                });
            }).catch(err => setError(err.message));
        }
    }, [id, isEdit]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                genre: formData.genre.split(',').map(s => s.trim()).filter(Boolean),
                plateforme: formData.plateforme.split(',').map(s => s.trim()).filter(Boolean),
                annee_sortie: Number(formData.annee_sortie),
                metacritic_score: Number(formData.metacritic_score),
                temps_jeu_heures: Number(formData.temps_jeu_heures)
            };

            if (isEdit) {
                await api.updateGame(id, payload);
            } else {
                await api.createGame(payload);
            }
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="card animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <button onClick={() => navigate('/')} className="btn" style={{ marginBottom: '1.5rem', background: 'transparent', paddingLeft: 0, textDecoration: 'none' }}>
                <FaArrowLeft /> RETURN_TO_BASE
            </button>

            <h2>{isEdit ? 'EDIT_ENTRY' : 'NEW_ENTRY_INIT'}</h2>

            {error && <div className="btn-danger" style={{ padding: '1rem', marginBottom: '1rem', borderRadius: 'var(--border-radius)' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>TITLE_ID</label>
                    <input required name="titre" className="input" value={formData.titre} onChange={handleChange} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>GENRE_TAGS (CSV)</label>
                        <input required name="genre" className="input" placeholder="Action, RPG" value={formData.genre} onChange={handleChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>SYSTEM_TARGET (CSV)</label>
                        <input required name="plateforme" className="input" placeholder="Switch, PS5" value={formData.plateforme} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>PUBLISHER</label>
                        <input name="editeur" className="input" value={formData.editeur} onChange={handleChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>DEVELOPER</label>
                        <input name="developpeur" className="input" value={formData.developpeur} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>REL_YEAR</label>
                        <input type="number" name="annee_sortie" className="input" value={formData.annee_sortie} onChange={handleChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>META_SCORE</label>
                        <input type="number" min="0" max="100" name="metacritic_score" className="input" value={formData.metacritic_score} onChange={handleChange} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>PLAY_TIME (HRS)</label>
                        <input type="number" min="0" name="temps_jeu_heures" className="input" value={formData.temps_jeu_heures} onChange={handleChange} />
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input type="checkbox" name="termine" id="termine" style={{ width: '20px', height: '20px', accentColor: 'var(--cyber-cyan)' }} checked={formData.termine} onChange={handleChange} />
                    <label htmlFor="termine" style={{ cursor: 'pointer' }}>COMPLETION_STATUS_100%</label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <FaSave /> {isEdit ? 'UPDATE_DATABASE' : 'SAVE_TO_MEMORY'}
                </button>
            </form>
        </div>
    );
}
