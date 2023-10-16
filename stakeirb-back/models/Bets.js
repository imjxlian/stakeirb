// models/Bets.js

import { DataTypes } from 'sequelize';

export default function(sequelize) {
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
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  return Bets;
}