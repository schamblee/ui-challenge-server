'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const { Employee } = require('./models');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config');
const router = express.Router();

router.use(bodyParser.json());


router.get('/', (req, res) => {
  Employee
    router.get('/', (req, res) => {
      return User.find()
        .then(employees => res.json(employees.map(employee => employee.serialize())))
        .catch(err => res.status(500).json({message: 'Internal server error'}));
    });
});

router.post('/', (req, res) => {
  const requiredFields = ['firstName', 'lastName'];
  for (let i = 0; i < requiredFields.length; i++) {

    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
    Employee
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      address: {
        street: req.body.street,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
      },
      organization: req.body.organization,
      department: req.body.department,
      title: req.body.title
    })
    .then(employee => res.status(201).json(employee.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.put('/:id', (req, res) => {
  // ensure that the id in the request path and the one in request body match
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).json({ message: message });
  }

  const toUpdate = {};
  const updateableFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'street', 
  'state', 'zipcode', 'organization', 'department', 'title'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  Employee
    // all key/value pairs in toUpdate will be updated -- that's what `$set` does
    .findByIdAndUpdate(req.params.id, { $set: toUpdate })
    .then(emplyee => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

router.delete('/:id', (req, res) => {
  Employee
    .findByIdAndRemove(req.params.id)
    .then(emplyee => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = {router};