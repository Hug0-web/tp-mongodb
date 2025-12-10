const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const stats = await Game.aggregate([
            {
                $facet: {
                    totalGames: [{ $count: "count" }],
                    totalPlayTime: [
                        { $group: { _id: null, total: { $sum: "$temps_jeu_heures" } } }
                    ],
                    averageMetacritic: [
                        { $match: { metacritic_score: { $ne: null } } },
                        { $group: { _id: null, avg: { $avg: "$metacritic_score" } } }
                    ],
                    byPlatform: [
                        { $unwind: "$plateforme" },
                        { $group: { _id: "$plateforme", count: { $sum: 1 } } }
                    ],
                    byGenre: [
                        { $unwind: "$genre" },
                        { $group: { _id: "$genre", count: { $sum: 1 } } }
                    ]
                }
            }
        ]);

        const result = stats[0];

        const formattedStats = {
            total_games: result.totalGames[0]?.count || 0,
            total_play_time_hours: result.totalPlayTime[0]?.total || 0,
            average_metacritic_score: parseFloat((result.averageMetacritic[0]?.avg || 0).toFixed(2)),
            games_by_platform: result.byPlatform,
            games_by_genre: result.byGenre
        };

        res.json(formattedStats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors du calcul des statistiques' });
    }
});

module.exports = router;
