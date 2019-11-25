const path = require('path');
const express = require('express');
const db = require('./db.js');
const mongoose = require('mongoose');
const socket = require('socket.io');

const Note = mongoose.model('Note');
const app = express();
const publicPath = path.resolve(__dirname, 'public');
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(express.urlencoded({extended: false}));

//inserted this session

app.get('/', (req, res) => {
  Note.find({}, (err, notes) => {
    res.render('home', {notes: notes});
  })
});

app.post('/', (req,res) => {
  const note = new Note({
    title: req.body.title,
    notes: req.body.notes
  });

  note.save((err) => {
    if(err)
    {
      return console.log(err);
    }
    res.redirect('/');
  });
});

app.get('/draw', (req,res) => {
    res.render('draw');
});

// app.get('/delete/:id', (req,res) => {
//   Note.find({req.params.id}, (err, note) => {
//     note.remove()
//   })
//   ({_id: mongodb.ObjectID(req.params.id)}, (err, result) => {
//     if(err)
//     {
//       return console.log(err);
//     }
//     console.log(req.body);
//     res.redirect('/');
//   })
// });

console.log("Server started. CTRL+C to exit.")

// socket.io implementation
let server = app.listen(process.env.PORT || 3000);
let io = socket(server);

// handle new connections
io.sockets.on('connection', (socket) => {
  // console.log('new connection:' + socket.id);

  // handles location data sent from client
  socket.on('mouse', (data) => {
    // console.log(data);
    // send mouse data back out
    socket.broadcast.emit('mouse', data);
  });

  socket.on('clearBtnClick', () => {
    socket.broadcast.emit('clearBtnClick');
  });
});
