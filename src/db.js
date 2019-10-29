const mongoose = require('mongoose');

const User = new.mongoose.Schema({
  username: String,
  hash: String,
  boards: Array
});

mongoose.model('User', User);

const Board = new.mongoose.Schema({
  name: String,
  createdAt: String,
  Users: Array
});

mongoose.model('Board', Board);

mongoose.connect();
