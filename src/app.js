const path = require('path');
const express = require('express');
const db = require('./db.js');
const mongoose = require('mongoose');

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

// app.get('/draw', (req,res) => {
//
// });


console.log("Server started. CTRL+C to exit.")
app.listen(process.env.PORT || 3000);


// currently, I'm a bit stuck trying to figure out the interaction between React, Express, and MongoDB, so I reverted to the version of my project that doesn't use
// React - this is the code I currently have in the version of my app.js with React
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// const express = require('express');
// const session = require('express-session');
// const mongoose = require('mongoose');
// const fs = require('fs');
// const path = require('path');
// const next = require('next');
// const glob = require('glob');
// //const db = require('./db.js');
//
// // moved mongo config file code here to implement with react
//
// // determine whether or not to launch Next.js in dev mode
// const dev = process.env.NODE_ENV !== 'production';
// const fn = path.join(__dirname, 'config.json');
// let dbconf;
// if(dev)
// {
//   const data = fs.readFileSync(fn);
//   const conf = JSON.parse(data);
//   dbconf = conf.dbconf;
// }
// else {
//   dbconf = 'mongodb://localhost/js9164';
// }
//
// const app = next({dev});
// const handle = app.getRequestHandler();
// const server = express();
//
// // based off boilerplate code
//
// app.prepare().then(() => {
//
//   // Parse application/x-www-form-urlencoded
// 	server.use(express.urlencoded({ extended: false }));
// 	// Parse application/json
// 	server.use(express.json());
//
//   // Allows for cross origin domain request:
// 	server.use(function(req, res, next) {
// 		res.header("Access-Control-Allow-Origin", "*");
// 		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 		next();
// 	});
//
//   // database
//   mongoose.connect(dbconf);
//
//   // API routes
// 	const rootPath = require('path').normalize(__dirname + '/..');
// 	glob.sync(rootPath + '/server/routes/*.js').forEach(controllerPath => require(controllerPath)(server));
//
//   // Next.js route
//   server.get('*', (req,res) => {
//     return handle(req,res);
//   });
//
//   server.post('/index', (req, res) => {
//     const note = new Note({
//       title: req.query.title,
//       notes: req.query.notes
//     });
//     console.log(req.query.title);
//   });
//
//   server.listen(process.env.PORT || 3000, (err) => {
//     if(err)
//     {
//       throw err;
//     }
//     console.log("Server Started");
//   });
// })
