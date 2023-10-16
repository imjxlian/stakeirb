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
    } finally {
      sequelize.close();
    }
};
  
hydrateDatabase(); 

/* Routes Express */

/* Démarrage serveur */
const server = app.listen(3000, () => {
    console.log('Serveur phe-backend démarré !');
});

/* Partie Socket.io */
import { Server } from 'socket.io';
const io = new Server(server, { cors: { origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] } });

io.on('connection', socket => console.log('Connection ' + socket.id));