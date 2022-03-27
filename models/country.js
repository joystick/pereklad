'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Country extends Model { }
  Country.init({
    name: DataTypes.STRING,
    isoCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Country'
  })
  Country.associate = function (models) {
    Country.hasMany(models.City)
  }
  return Country
}
