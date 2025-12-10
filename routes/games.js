const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { genre, plateforme, titre } = req.query;
        const filter = {};

        if (genre) {
            filter.genre = { $regex: genre, $options: 'i' };
        }
        if (plateforme) {
            filter.plateforme = { $regex: plateforme, $options: 'i' };
        }
        if (titre) {
            filter.titre = { $regex: titre, $options: 'i' };
        }

        const games = await Game.find(filter).sort({ date_ajout: -1 });
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/export', async (req, res) => {
    try {
        const games = await Game.find({});
        res.header('Content-Type', 'application/json');
        res.attachment('games_collection.json');
        res.send(JSON.stringify(games, null, 2));
    } catch (error) {
        res.status(500).json({ error: "Export failed" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ error: 'Jeu non trouvé' });
        res.json(game);
    } catch (error) {
        res.status(400).json({ error: 'ID invalide' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newGame = new Game(req.body);
        const savedGame = await newGame.save();
        res.status(201).json(savedGame);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Erreur lors de la création' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedGame) return res.status(404).json({ error: 'Jeu non trouvé' });
        res.json(updatedGame);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Erreur lors de la modification' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Game.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ error: 'Jeu non trouvé' });
        res.json({ message: 'Jeu supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
});

router.post('/:id/favorite', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ error: 'Jeu non trouvé' });

        game.isFavorite = !game.isFavorite;
        await game.save();

        res.json({ message: 'Favori mis à jour', isFavorite: game.isFavorite });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
