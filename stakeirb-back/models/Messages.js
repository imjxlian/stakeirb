// models/Messages.js

import { DataTypes } from 'sequelize';

export default function(sequelize) {
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
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  return Messages;
}