'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class City extends Model { }
  City.init({
    name: DataTypes.STRING,
    region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City'
  })
  City.associate = function (models) {
    City.belongsTo(models.Country)
    City.belongsToMany(models.Translator, { through: 'CityTranslator' })
  }
  return City
}
