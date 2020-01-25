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


// Capitalizes proper nouns like first and last names
const properNouns = (name) => {
  return name[0].toUpperCase() + name.slice(1,);
}

// Hook to capitalise name input before save
Student.beforeValidate((studentInstance, ) => {
  studentInstance.firstName = properNouns(studentInstance.firstName);
  studentInstance.lastName = properNouns(studentInstance.lastName);

});

module.exports = Student;
