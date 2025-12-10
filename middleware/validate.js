const validateGame = (req, res, next) => {
  const {
    titre,
    genre,
    plateforme,
    annee_sortie,
    metacritic_score,
    temps_jeu_heures
  } = req.body;

  const errors = [];

  // Validation Titre
  if (!titre || typeof titre !== 'string' || titre.trim().length === 0) {
    errors.push('Le titre est requis et doit être une chaîne non vide.');
  }

  // Validation Genre
  if (!genre || !Array.isArray(genre) || genre.length === 0) {
    errors.push('Le genre doit être un tableau contenant au moins un élément.');
  }

  // Validation Plateforme
  if (!plateforme || !Array.isArray(plateforme) || plateforme.length === 0) {
    errors.push('La plateforme doit être un tableau contenant au moins un élément.');
  }

  // Validation Année de sortie
  const currentYear = new Date().getFullYear();
  if (annee_sortie !== undefined) {
    if (typeof annee_sortie !== 'number' || annee_sortie < 1970 || annee_sortie > currentYear) {
      errors.push(`L'année de sortie doit être un nombre entre 1970 et ${currentYear}.`);
    }
  }

  // Validation Metacritic Score
  if (metacritic_score !== undefined) {
    if (typeof metacritic_score !== 'number' || metacritic_score < 0 || metacritic_score > 100) {
      errors.push('Le score Metacritic doit être un nombre entre 0 et 100.');
    }
  }

  // Validation Temps de jeu
  if (temps_jeu_heures !== undefined) {
    if (typeof temps_jeu_heures !== 'number' || temps_jeu_heures < 0) {
      errors.push('Le temps de jeu doit être un nombre positif.');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = validateGame;
