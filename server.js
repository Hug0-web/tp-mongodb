require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const gameRoutes = require('./routes/games');
const statsRoutes = require('./routes/stats');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const DB_USER = "hugolucas_db_user";
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = "cluster0.jh9jfus.mongodb.net";
const DB_NAME = "game_collection_db";

if (!DB_PASSWORD) {
    console.error("❌ Error: DB_PASSWORD is not defined in .env file.");
    process.exit(1);
}

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?appName=Cluster0`;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log(`✅ Connected to MongoDB Atlas`);

        app.use('/api/games', gameRoutes);
        app.use('/api/stats', statsRoutes);

        app.get('/', (req, res) => {
            res.send('🎮 Video Game Collection API is running with Mongoose!');
        });

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Failed to connect to MongoDB', err);
        process.exit(1);
    });
