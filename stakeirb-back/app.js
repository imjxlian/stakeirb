import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import Sequelize from 'sequelize';

import { DataTypes } from 'sequelize';

import { v4 as uuidv4 } from 'uuid';

// Initialisation serveur
const app = express();
// Sécurité
app.use(cors());
// Configuration parser body
app.use(bodyParser.json());

/* Partie Sequelizer */
// Connexion à la base de donnée avec Sequelize
const sequelize = new Sequelize('sqlite:stakeirb-database.db');

// Modèle User avec Sequelize
const User = sequelize.define('User', {
    uuid_user: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pfp_url: {
      type: DataTypes.STRING(255),
    },
    register_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    rank_pts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
});

// Modèle Game avec Sequelize
const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bets_placed: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
});

// Modèle Bets avec Sequelize
const Bets = sequelize.define('Bets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_uuid: {
      type: DataTypes.CHAR(36),
    },
    game_id: {
      type: DataTypes.INTEGER,
    },
    bet_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    multiplier: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
});
  
Bets.belongsTo(User, { foreignKey: 'user_uuid' });
Bets.belongsTo(Game, { foreignKey: 'game_id' });

// Modèle Messages avec Sequelize
const Messages = sequelize.define('Messages', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_uuid: {
      type: DataTypes.CHAR(36),
    },
    message: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
});
  
Messages.belongsTo(User, { foreignKey: 'user_uuid' });

// Création des tables
const hydrateDatabase = async () => {
    try {
      await sequelize.sync({ force: true });
      console.log('Tables créées avec succès');
  
      await User.create({
        username: 'alice',
        email: 'alice@example.com',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        uuid_user: uuidv4(), // Générez un UUID v4 ici
      });
  
      await User.create({
        username: 'bob',
        email: 'bob@example.com',
        password: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        uuid_user: uuidv4(), // Générez un UUID v4 ici
      });
  
      // Données pour le modèle Game
      await Game.create({
        slug: 'dice',
        name: 'Dice',
      });
  
      await Game.create({
        slug: 'mines',
        name: 'Mines',
      });
  
      console.log('Données insérées avec succès');

    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
};
  
hydrateDatabase();

/* Routes Express */

// Récupération de tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Une erreur s\'est produite :', error);
    }
});

// Récupération d'un utilisateur
app.get('/users/:uuid_user', async (req, res) => {
    const user = await User.findOne({ where: { uuid_user: req.params.uuid_user } });
    res.json(user);
});

// Création d'un utilisateur
app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    res.json(user);
});

// Mise à jour d'un utilisateur
app.put('/users/:uuid_user', async (req, res) => {
    const user = await User.findOne({ where: { uuid_user: req.params.uuid_user } });
    user.update(req.body);
    res.json(user);
});

// Suppression d'un utilisateur
app.delete('/users/:uuid_user', async (req, res) => {
    const user = await User.findOne({ where: { uuid_user: req.params.uuid_user } });
    user.destroy();
    res.json(user);
});

// Récupération de tous les jeux
app.get('/games', async (req, res) => {
    const games = await Game.findAll();
    res.json(games);
});

// Récupération d'un jeu
app.get('/games/:slug', async (req, res) => {
    const game = await Game.findOne({ where: { slug: req.params.slug } });
    res.json(game);
});

// Création d'un jeu
app.post('/games', async (req, res) => {
    const game = await Game.create(req.body);
    res.json(game);
});

// Mise à jour d'un jeu
app.post('/games/:slug', async (req, res) => {
    const game = await Game.findOne({ where: { slug: req.params.slug } });
    game.update(req.body);
    res.json(game);
});

// Suppression d'un jeu
app.delete('/games/:slug', async (req, res) => {
    const game = await Game.findOne({ where: { slug: req.params.slug } });
    game.destroy();
    res.json(game);
});

// Récupération de tous les paris
app.get('/bets', async (req, res) => {
    const bets = await Bets.findAll();
    res.json(bets);
});

// Récupération d'un pari
app.get('/bets/:id', async (req, res) => {
    const bet = await Bets.findOne({ where: { id: req.params.id } });
    res.json(bet);
});

// Création d'un pari
app.post('/bets', async (req, res) => {
    const bet = await Bets.create(req.body);
    res.json(bet);
});

// Mise à jour d'un pari
app.post('/bets/:id', async (req, res) => {
    const bet = await Bets.findOne({ where: { id: req.params.id } });
    bet.update(req.body);
    res.json(bet);
});

// Suppression d'un pari
app.delete('/bets/:id', async (req, res) => {
    const bet = await Bets.findOne({ where: { id: req.params.id } });
    bet.destroy();
    res.json(bet);
});

// Récupération de tous les messages
app.get('/messages', async (req, res) => {
    const messages = await Messages.findAll();
    res.json(messages);
});

// Récupération d'un message
app.get('/messages/:id', async (req, res) => {
    const message = await Messages.findOne({ where: { id: req.params.id } });
    res.json(message);
});

// Création d'un message
app.post('/messages', async (req, res) => {
    const message = await Messages.create(req.body);
    res.json(message);
});

// Suppression d'un message
app.delete('/messages/:id', async (req, res) => {
    const message = await Messages.findOne({ where: { id: req.params.id } });
    message.destroy();
    res.json(message);
});

/* Démarrage serveur */
app.listen(3000, () => {
    console.log('Serveur phe-backend démarré !');
});