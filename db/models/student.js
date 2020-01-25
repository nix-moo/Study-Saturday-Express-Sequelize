'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  }
});

const properNouns = (name) => {
  return name.slice(0,1).toUpperCase() + name.slice(1,);
}
Student.beforeCreate((studentInstance, ) => {
  studentInstance.firstName = properNouns(studentInstance.firstName);
  studentInstance.lastName = properNouns(studentInstance.lastName);

})
//Student.sync({force: true});

module.exports = Student;
