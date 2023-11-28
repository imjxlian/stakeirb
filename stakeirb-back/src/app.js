import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import userController from "./controllers/UserController.js";
import gameController from "./controllers/GameController.js";
import betsController from "./controllers/BetController.js";
import messagesController from "./controllers/MessageController.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize("sqlite:stakeirb-database.db");

// No logging
// sequelize.options.logging = false;

// Importez les modèles
import createUserModel from "./models/User.js";
import createGameModel from "./models/Game.js";
import createBetsModel from "./models/Bet.js";
import createMessagesModel from "./models/Message.js";
import DiceController from "./controllers/games/DiceController.js";

const User = createUserModel(sequelize);
const Game = createGameModel(sequelize);
const Bets = createBetsModel(sequelize);
const Messages = createMessagesModel(sequelize);

User.hasMany(Bets, { foreignKey: "uuid_user" });
User.hasMany(Messages, { foreignKey: "uuid_user" });
Bets.belongsTo(User, { foreignKey: "uuid_user" });
Bets.belongsTo(Game, { foreignKey: "game_id" });
Messages.belongsTo(User, { foreignKey: "uuid_user" });

// Hydratez la base de données avec des données réalistes
const hydrateDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables créées avec succès");

    // Créez des utilisateurs avec des paris et des messages associés
    const user1 = await User.create({
      username: "alice",
      email: "alice@example.com",
      password:
        "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      uuid_user: "f7e727c6-257d-4f40-8017-52c31f1f82ca",
      balance: 1000,
      pfp_url: "https://i.imgur.com/0y8Ftya.png",
      rank_pts: 70,
    });

    const user2 = await User.create({
      username: "bob",
      email: "bob@example.com",
      password:
        "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      uuid_user: uuidv4(),
      balance: 2000,
      pfp_url: "https://i.imgur.com/0y8Ftya.png",
      rank_pts: 40,
    });

    const game1 = await Game.create({
      slug: "dice",
      name: "Dice",
    });

    const game2 = await Game.create({
      slug: "mines",
      name: "Mines",
    });

    // Créez des paris associés aux utilisateurs et aux jeux
    await Bets.create({
      uuid_user: user1.uuid_user,
      game_id: game1.id,
      bet_amount: 100.0,
      multiplier: 2.0,
      win: false,
    });

    await Bets.create({
      uuid_user: user2.uuid_user,
      game_id: game2.id,
      bet_amount: 50.0,
      multiplier: 3.0,
      win: true,
    });

    // Créez des messages associés aux utilisateurs
    await Messages.create({
      uuid_user: user1.uuid_user,
      message: "Hello from Alice",
    });

    await Messages.create({
      uuid_user: user2.uuid_user,
      message: "Greetings from Bob",
    });

    console.log("*-- Données insérées avec succès --*");
  } catch (error) {
    console.error("*-- Une erreur s'est produite : --*", error);
  }
};

hydrateDatabase();

const server = app.listen(3000, () => {
  console.log("*-- Serveur démarré (port 3000) --*");
});

// Listen to / route
app.get("/", (req, res) => {
  res.send("*-- Welcome to Stak'Eirb API --*");
});

import { Server } from "socket.io";
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173", "http://127.0.0.1:5173"] },
});

let usersOnline = [];

// Associez les contrôleurs aux routes
app.use("/users", userController(User));
app.use("/games", gameController(Game));
app.use("/bets", betsController(Bets));
app.use("/messages", messagesController(Messages, User, io));
app.use("/games/dice", DiceController(Bets));

io.on("connection", (socket) => {
  if (!usersOnline.includes(socket.id)) {
    usersOnline.push(socket.id);
  }

  io.emit("usersOnline", usersOnline.length);

  // Handle disconnection
  socket.on("disconnect", () => {
    usersOnline = usersOnline.filter((user) => user !== socket.id);
    io.emit("usersOnline", usersOnline.length);
  });

  socket.on("getOnlineUsers", () => {
    io.emit("usersOnline", usersOnline.length);
  });
});
