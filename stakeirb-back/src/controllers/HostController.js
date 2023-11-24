// jwtMiddleware.js
import jwt from 'jsonwebtoken';

export const jwtMiddleware = (req, res, next) => {
    // Récupérer le token depuis les en-têtes
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Vérifier le token JWT
    jwt.verify(token, 'jilian&jiles', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Ajouter les données du token à la requête pour une utilisation ultérieure
        req.userId = decoded.userId;
        next();
    });
};
