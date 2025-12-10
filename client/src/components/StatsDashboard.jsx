import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { FaDownload, FaDatabase, FaClock, FaStarHalfAlt } from 'react-icons/fa';

export function StatsDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        api.getStats().then(setStats).catch(console.error);
    }, []);

    if (!stats) return <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--cyber-cyan)' }}>READING_DATA_STREAM...</div>;

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid var(--cyber-cyan)', paddingBottom: '1rem' }}>
                <div>
                    <h2 className="glitch" data-text="DATA_ANALYSIS_MODULE" style={{ margin: 0 }}>DATA_ANALYSIS_MODULE</h2>
                    <span style={{ fontFamily: 'Share Tech Mono', color: 'var(--cyber-pink)', fontSize: '0.8rem' }}>// RESTRICTED ACCESS</span>
                </div>
                <a href={api.getExportUrl()} className="btn" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaDownload /> EXTRACT_JSON
                </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', marginBottom: '3rem', border: '1px solid #333' }}>
                <div style={{ padding: '2rem', borderRight: '1px solid #333', background: 'rgba(0,243,255,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <FaDatabase style={{ fontSize: '2rem', color: 'var(--cyber-cyan)', marginBottom: '1rem' }} />
                    <div style={{ fontFamily: 'Share Tech Mono', color: '#777', letterSpacing: '2px', fontSize: '0.9rem' }}>TOTAL_ENTRIES</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px var(--cyber-cyan)' }}>
                        {stats.total_games}
                    </div>
                </div>

                <div style={{ padding: '2rem', borderRight: '1px solid #333', background: 'rgba(255,0,85,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <FaClock style={{ fontSize: '2rem', color: 'var(--cyber-pink)', marginBottom: '1rem' }} />
                    <div style={{ fontFamily: 'Share Tech Mono', color: '#777', letterSpacing: '2px', fontSize: '0.9rem' }}>RUNTIME_HOURS</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px var(--cyber-pink)' }}>
                        {stats.total_play_time_hours}
                    </div>
                </div>

                <div style={{ padding: '2rem', background: 'rgba(252,238,10,0.02)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <FaStarHalfAlt style={{ fontSize: '2rem', color: 'var(--cyber-yellow)', marginBottom: '1rem' }} />
                    <div style={{ fontFamily: 'Share Tech Mono', color: '#777', letterSpacing: '2px', fontSize: '0.9rem' }}>AVG_RATING</div>
                    <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#fff', textShadow: '0 0 10px var(--cyber-yellow)' }}>
                        {stats.average_metacritic_score}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem' }}>
                <div className="card" style={{ clipPath: 'none', border: '1px solid #333' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--cyber-cyan)', paddingLeft: '1rem' }}>SYSTEM_DISTRIBUTION</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.games_by_platform}>
                                <XAxis dataKey="_id" stroke="#777" tick={{ fill: '#777', fontFamily: 'Share Tech Mono' }} />
                                <YAxis stroke="#777" tick={{ fill: '#777', fontFamily: 'Share Tech Mono' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid var(--cyber-cyan)', fontFamily: 'Share Tech Mono' }}
                                    itemStyle={{ color: 'var(--cyber-cyan)' }}
                                    cursor={{ fill: 'rgba(0,243,255,0.1)' }}
                                />
                                <Bar dataKey="count" fill="#00f3ff">
                                    {stats.games_by_platform.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#00f3ff', '#ff0055', '#fcee0a', '#00ff9d'][index % 4]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card" style={{ clipPath: 'none', border: '1px solid #333' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--cyber-pink)', paddingLeft: '1rem' }}>GENRE_BREAKDOWN</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={stats.games_by_genre}
                                    dataKey="count"
                                    nameKey="_id"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {stats.games_by_genre.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#00f3ff', '#ff0055', '#fcee0a', '#b91c1c'][index % 4]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', border: '1px solid var(--cyber-pink)', fontFamily: 'Share Tech Mono' }}
                                    itemStyle={{ color: 'var(--cyber-pink)' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
