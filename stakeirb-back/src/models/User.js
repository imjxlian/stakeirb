// models/User.js

import { DataTypes } from "sequelize";

export default function (sequelize) {
  const User = sequelize.define("User", {
    uuid_user: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
      defaultValue: "https://i.imgur.com/0y8Ftya.png",
    },
    rank_pts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return User;
}
