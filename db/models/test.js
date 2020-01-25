'use strict';
const Sequelize = require('sequelize');
const db = require('../db');
const Student = require('./student');

const Test = db.define('test', {
  subject: {
    type: Sequelize.STRING,
    allowNull: false
  },
  grade: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
});

Test.belongsTo(Student)
Student.hasMany(Test)

module.exports = Test;
