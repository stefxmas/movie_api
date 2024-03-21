const bodyParser = require("body-parser");
//const {users, movies} = require("./data");
const express = require('express');
      morgan = require('morgan');
      app = express();   
      uuid = require('uuid');
      bodyPraiser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true });
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//create
app.post('/users', (req, res) => {
  //let newUser = req.body;

  then((user)=> {
    res.status(200).json(user);
}).catch((error)=>  {
    res.status(400).send('ERR')
})
})

//update 
app.put('/users/:Username', (req, res) => {
  //let user = Users.find( user => user.id == id);
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  )
  .then((user)=> {
      res.status(200).json(user);
  }).catch((error)=>  {
      res.status(400).send('ERR')
  })
})

//Add to Fav 
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);
  
  if (user) {
      user.favoriteMovies.push(movieTitle);
      res.status(200).send(' text? ')
  } else {
      res.status(400).send('no such Title')
  }
 
})



// Remove from fav
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

 // let user =user.find( user => user.id == id );

  if (user) {
      user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
      res.status(200).send(' removed ')
   } else {
      res.status(400).send(' no such Title')
   }
})

//delete
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

   let user = Users.find(user.id == id );

   if (user) {
       users = users.filter( user => user.id != id);
       res.status(200).send( 'user ID has been removed');
  } else {
       res.status(400).send('no such user')
   }

 })

app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//Using the Morgan middleware library to log all requests
app.use(morgan('common'));
app.use(express.json()); 
const path = require("path");

//GET request for returning the JSON movie data
  // app.get('/movies', (req, res) => {
  //   res.json(movies);
  // });
  app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
.then((movies) => {
res.status(200).json(movies);
}).catch((err) => {
console.error(err);
res.status(500).send('Error: ' + err);
});
})

app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
   .then((users) => {
  res.status(200).json(users);
  }).catch((err) => {
   console.error(err);
  res.status(500).send('Error: ' + err);
   });
 })

 app.put('/users/:Username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  // CONDITION TO CHECK ADDED HERE
  if(req.user.Username !== req.params.Username){
      return res.status(400).send('Permission denied');
  }
  // CONDITION ENDS
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
      $set:
      {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday
      }
  },
      { new: true }) // This line makes sure that the updated document is returned
      .then((updatedUser) => {
          res.json(updatedUser);
      })
      .catch((err) => {
          console.log(err);
          res.status(500).send('Error: ' + err);
      })
});



app.get('/genre/:Genre', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { Genre } = req.params;
  Movies.find( {"Movies.Genre": Genre })
  .then((movie) => {
    res.status(200).json(movie[0].Genre);
  })
  .catch(e=> {
      res.status(400).send('no such movie')
  })
})



  //Read
app.get('/movies/:Title', (req, res) => {
  const { Title } = req.params;
   Movies.find( { "Movies.Title": Title })
  .then((movie) => {
    res.status(200).json(movie[0].Title);
  })
  .catch(e=> {
      res.status(400).send('no such movie')
  })
})



//read
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  Movies.find( {"Genre.Name": genreName})
  .then((movie) => {
    res.status(200).json(movie[0].Genre);
  })
  .catch(e=> {
      res.status(400).send('no such movie')
  })
})

//read
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  Movies.find( {"Director.Name": directorName})
  .then((movie) => {
    res.status(200).json(movie[0].Director);
  })
  .catch(e=> {
      res.status(400).send('no such director')
  })
})



app.use(morgan('common'));
app.use('/topTenMovies', express.static('public'));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/documentation', (req,res) =>{
    res.sendFile('public/documentation.html',{ root:__dirname});
});
app.get('/topTenMovies', (req, res) =>{
    res.json(topTenMovies);
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});