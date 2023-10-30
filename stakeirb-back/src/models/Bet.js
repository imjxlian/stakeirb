// models/Bet.js

import { DataTypes } from "sequelize";

export default function (sequelize) {
  const Bet = sequelize.define("Bet", {
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
    win: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    data: {
      type: DataTypes.JSON,
    },
  });

  Bet.associate = (models) => {
    Bet.belongsTo(models.User, { foreignKey: "user_uuid" });
    Bet.belongsTo(models.Game, { foreignKey: "game_id" });
  };

  return Bet;
}