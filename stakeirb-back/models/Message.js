// models/Message.js

import { DataTypes } from 'sequelize';

export default function(sequelize) {
  const Message = sequelize.define('Message', {
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

  Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: 'user_uuid' });
  };

  return Message;
}