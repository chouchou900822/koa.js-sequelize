'use strict';

module.exports = function (sequelize, DataTypes) {

  var user = sequelize.define("user", {
    username: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
    }
  });
  return user;
};