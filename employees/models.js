'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const EmployeeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  },
  organization: {
    type: String
  },
  department: {
    type: String
  },
  title: {
    type: String
  },
  createDate: {
    type: Date, 
    default: Date.now
  }
});

EmployeeSchema.methods.serialize = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    phoneNumber: this.phoneNumber,
    address: this.addressString,
    organization: this.organization,
    department: this.department,
    title: this.title,
    createDate: this.createDate
  };
};

EmployeeSchema.virtual('addressString').get(function() {
  return `${this.address.street} ${this.address.state}`.trim()});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {Employee};