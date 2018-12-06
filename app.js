const mongoose = require('mongoose');
const server = require('./server/server');
const port = 5500;

const path = require('path');
const express = require('express');

mongoose.connect(
  'mongodb://localhost/ihlfg',
  {},
  err => {
    if (err) return console.log(err);
    console.log('Connected to MongoDB');
  }
);

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server running on ${port}`);
});
