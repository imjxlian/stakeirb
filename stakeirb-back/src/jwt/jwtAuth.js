// jwtMiddleware.js
import jwt from "jsonwebtoken";
import "dotenv/config";

export const jwtMiddleware = (req, res, next) => {
  // Récupérer le token depuis les en-têtes
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Diviser l'en-tête Authorization pour obtenir le token
  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Vérifier le token JWT
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Ajouter les données du token à la requête pour une utilisation ultérieure
    req.user = decoded.user;
    next();
  });
};
