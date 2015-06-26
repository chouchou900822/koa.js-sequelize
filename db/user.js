'use strict';

module.exports = function (sequelize, DataTypes) {

  var user = sequelize.define("user", {
    phoneNumber: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
    }
  });
  return user;
};