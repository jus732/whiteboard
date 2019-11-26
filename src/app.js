const path = require('path');
const express = require('express');
const db = require('./db.js');
const mongoose = require('mongoose');
const socket = require('socket.io');
const session = require('express-session');
const timestamp = require('time-stamp');
const { check, validationResult } = require('express-validator');
const MongoStore = require('connect-mongo')(session);

const Board = mongoose.model('Board');
const Note = mongoose.model('Note');
const app = express();
const publicPath = path.resolve(__dirname, 'public');
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(express.urlencoded({limit:'50mb', extended: false}));
app.use(session({
  secret: 'this is super secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true
  }
}));

//inserted this session

app.get('/', (req, res) => {
  const titleSearch = req.query.titleSearch;

  Board.find({}, (err, boards) => {
    Note.find({}, (err, notes) =>{
      if(err)
      {
        console.log(err);
      }
      let newNotes = false;
      let useNew;
      newNotes = notes.filter((note) => {
        if(note.title.includes(titleSearch))
        {
          useNew = true;
          return note;
        }
      });

      // console.log(newNotes);
      if(useNew)
      {
        res.render('home', {boards: boards, notes:newNotes});
      }
      else
      {
        res.render('home', {boards: boards, notes:notes});
      }
    });
  });
});

app.get('/draw', (req,res) => {
    res.render('draw');
});

// buggy - does save canvas and title/notes to database, but does not save modified canvas;
app.post('/draw', [
  // validate - make sure title and note body are filled
  check('title').isLength({min: 1}),
  check('notes').isLength({min: 1})
], (req, res) => {

  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.json({
      err: err.array()
    });
  }

   // Create a new board document w/ notes
   // Send back json (if new document created, send it back in json)
   const note = new Note({
     title: req.body.title,
     noteBody: req.body.notes
   })
   note.save();

   const newBoard = new Board({
     board: req.body.board,
     createdAt: timestamp(),
     notes: {
       title: note.title,
       noteBody: note.noteBody,
       _id: note._id
     }
   });
   // if error, send back error; if ok, send back in json
   newBoard.save((err, board, count) => {
     if(err)
     {
       res.json({key: err});
     }
     res.json(board);
   });
});

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
