'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Translator extends Model { }
  Translator.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    organisation: DataTypes.STRING,
    streetAddress: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    languages: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Translator'
  })
  Translator.associate = function (models) {
    Translator.belongsToMany(models.City, { as: 'Cities', through: 'CityTranslator' })
  }
  return Translator
}
