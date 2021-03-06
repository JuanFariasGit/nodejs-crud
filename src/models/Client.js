const { DataTypes } = require('sequelize');
const sequelize = require('../database/pg');
const CPF = require('cpf');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
     len: {
       args: [4, 100],
       msg: 'O nome completo deve ter entre 4 à 100 caracteres.'
     }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Já existe um cliente com esse e-mail.' 
    },
    validate: {
      isEmail: {
        msg: 'O e-mail informado é inválido.'
      }
    }
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Já existe um cliente com esse CPF.'
    },
    validate: {
      isCpf(value) {
        if (!CPF.isValid(value)) {
          throw new Error('O CPF informado é inválido.');
        }
      }
    }
  }
}, {
  tableName: 'clients',
  timestamps: false
});

module.exports = Client;