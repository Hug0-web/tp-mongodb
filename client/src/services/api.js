const API_URL = 'http://localhost:3000/api';

export const api = {
    getGames: async (filters = {}) => {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_URL}/games?${query}`);
        if (!response.ok) throw new Error('Failed to fetch games');
        return response.json();
    },

    getGame: async (id) => {
        const response = await fetch(`${API_URL}/games/${id}`);
        if (!response.ok) throw new Error('Failed to fetch game');
        return response.json();
    },

    createGame: async (gameData) => {
        const response = await fetch(`${API_URL}/games`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameData),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create game');
        }
        return response.json();
    },

    updateGame: async (id, gameData) => {
        const response = await fetch(`${API_URL}/games/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gameData),
        });
        if (!response.ok) throw new Error('Failed to update game');
        return response.json();
    },

    deleteGame: async (id) => {
        const response = await fetch(`${API_URL}/games/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete game');
        return response.json();
    },

    toggleFavorite: async (id) => {
        const response = await fetch(`${API_URL}/games/${id}/favorite`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error('Failed to toggle favorite');
        return response.json();
    },

    getStats: async () => {
        const response = await fetch(`${API_URL}/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        return response.json();
    },

    getExportUrl: () => `${API_URL}/games/export`
};
