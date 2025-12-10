const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("../models/usersModel");

const Pegawai = sequelize.define(
  "Pegawai",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "pegawai",
    timestamps: true,
    paranoid: true,
    deletedAt: "deletedAt", 
  }
);

Pegawai.belongsTo(User, {
  foreignKey: "created_by",
  as: "creator",
});

User.hasMany(Pegawai, {
  foreignKey: "created_by",
  as: "pegawai",
});

module.exports = Pegawai;
