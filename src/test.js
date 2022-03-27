const { City, Country } = require('../models')

async function test () {
  const city = await City.create({
    name: 'Oslo',
    region: '',
    CountryId: 15
  }, { include: 'Country' })
  console.log(city.toJSON())
  const result = await Country.findOne({ where: { id: 15 }, include: 'Cities' })
  console.log(JSON.stringify(result, null, 2))
}

test()
