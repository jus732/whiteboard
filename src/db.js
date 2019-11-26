const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, '../config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/js9164';
}

const dbConnection = mongoose.connect(dbconf);

// const User = new Schema({
//   username: String,
//   hash: String,
//   notes: Array,
//   boards: Array
// });
//
// mongoose.model('User', User);

const Note = new Schema({
  title: String,
  noteBody: String
});

mongoose.model('Note', Note);

const Board = new Schema({
  board: String, // will be data url
  createdAt: String,
  // to refer to another Schema, use population
  notes: {
    title: String,
    noteBody: String,
    _id: Schema.Types.ObjectId
  }
});

mongoose.model('Board', Board);

module.exports = {
  dbConnection: dbConnection
}
