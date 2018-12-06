const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  username: String,
  summary: String,
  server: String,
  class: String,
  imgb: String,
  imgs: String,
  rating: String,
  twos: String,
  threes: String,
  rbgs: String,

  created: {
    type: Date,
    default: Date.now,
  },
});

// pre-save

userSchema.pre('save', function(next) {
  console.log('pre save hook');

  next();
});

module.exports = mongoose.model('User', userSchema);
