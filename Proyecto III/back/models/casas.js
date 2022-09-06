'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class casas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  casas.init({
    tipo: DataTypes.STRING,
    propietario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'casas',
  });
  return casas;
};