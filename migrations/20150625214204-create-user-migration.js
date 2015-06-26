'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phoneNumber: Sequelize.STRING,
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
