const mongoose = require('mongoose');

// Create schema for todo
const usersSchema = mongoose.Schema({
  username:String,
  location:String
});

// Create model for todo
module.exports = mongoose.model('user', usersSchema);