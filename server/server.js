// Node
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Local Routes

mongoose.connect('mongodb://localhost/ihlfg');

// Server
const server = express();
const port = 5000;

// Logger

function logger(req, res, next) {
  console.log('body: ', req.body);

  next();
}

// Middleware
server.use(morgan('dev'));
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(logger);

// Imports

const User = require('./data/userSchema.js');

// Server

const router = express.Router();

server.get('/get', function(req, res) {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'User does not exist' });
    });
});

server.get('/:id', function(req, res) {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (user === null) {
        return res.status(404).json({ error: 'This user does not exist!' });
      }
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/post', (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(savedUser => {
      res.send('User Saved');
    })
    .catch(err => {
      res.status(400).send('Unable to save User');
    });
});

server.put('/:id', (req, res) => {});

server.delete('/:id', (req, res) => {
  const { id } = req.params;
  let User;

  User.findByIdAndRemove(id)
    .then(res => {
      res.status(200).json({ id });
    })
    .catch(err => res.status(400).json(err));
});

server.listen(port, () =>
  console.log(`d-(OvO")z up and running on port ${port}`)
);

module.exports = server;
