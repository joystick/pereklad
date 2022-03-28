'use strict'
const { User } = require('../models')
const bcrypt = require('bcryptjs')
require('dotenv').config()

module.exports = {
  async up (queryInterface, Sequelize) {
    const password = 'Shmassword!!!'
    const emails = ['alexei.kozhushkov@gmail.com', 'mariastay@gmail.com']
    for await (const email of emails) {
      const user = await User.create({
        email,
        password: await bcrypt.hash(password, 10)
      })
      console.log('created user', user)
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
