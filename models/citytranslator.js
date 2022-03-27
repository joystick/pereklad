'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CityTranslator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  CityTranslator.init({
    CityId: DataTypes.NUMBER,
    TranslatorId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'CityTranslator',
    tableName: 'CityTranslator'
  })
  return CityTranslator
}
