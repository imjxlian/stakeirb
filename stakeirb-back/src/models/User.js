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
    },
    rank_pts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Bets, { foreignKey: "uuid_user" });
    User.hasMany(models.Message, { foreignKey: "uuid_user" });
  };

  return User;
}
