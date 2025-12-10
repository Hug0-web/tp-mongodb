const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Le titre est requis'],
        trim: true,
        minLength: 1
    },
    genre: {
        type: [String],
        required: [true, 'Le genre est requis'],
        validate: {
            validator: (v) => v && v.length > 0,
            message: 'Au moins un genre doit être spécifié'
        }
    },
    plateforme: {
        type: [String],
        required: [true, 'La plateforme est requise'],
        validate: {
            validator: (v) => v && v.length > 0,
            message: 'Au moins une plateforme doit être spécifiée'
        }
    },
    editeur: {
        type: String,
        trim: true
    },
    developpeur: {
        type: String,
        trim: true
    },
    annee_sortie: {
        type: Number,
        min: 1970,
        max: new Date().getFullYear() + 5
    },
    metacritic_score: {
        type: Number,
        min: 0,
        max: 100
    },
    temps_jeu_heures: {
        type: Number,
        min: 0,
        default: 0
    },
    termine: {
        type: Boolean,
        default: false
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    date_ajout: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    date_modification: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: { createdAt: 'date_ajout', updatedAt: 'date_modification' }
});

module.exports = mongoose.model('Game', gameSchema);
