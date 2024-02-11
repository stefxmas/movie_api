const bodyParser = require("body-parser");
const {users, movies} = require("./data");
const express = require('express');
      morgan = require('morgan');
      app = express();   
      uuid = require('uuid');
      bodyPraiser = require('body-parser'),

app.use(bodyParser.json());

//create
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).json(newUser)
  } else {
      res.status(400).send('users need names')
  }
})

//update 
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updateUser = req.body;

  let user = users.find( user => user.id == id);
  if (!user) {
      user.name = updatedUser.name;
      res.status(200).json(user);
  } else {
      res.status(400).send('no such user')
  }
})

//create 
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

//delete
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user =user.find( user => user.id == id );

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

  let user = users.find(user.id == id );

  if (user) {
      users = users.filter( user => user.id != id);
      res.status(200).send( 'user ID has been removed');
  } else {
      res.status(400).send('no such user')
  }

})



//Using the Morgan middleware library to log all requests
app.use(morgan('common'));
app.use(express.json()); 
const path = require("path");

//GET request for returning the JSON movie data
  // app.get('/movies', (req, res) => {
  //   res.json(movies);
  // });
  app.get('/movies', (req, res) => {
    res.status(200).json(movies)
})

app.get('/users', (req, res) => {
  res.status(200).json(users)
})

app.get('/genre', (req, res) => {
  res.status(200).json(genre)
})



  //Read
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.title === title);

  if (movie) {
      res.status(200).json(movie);
  } else {
      res.status(400).send('no such movie')
  }
})

//read
app.get('/movies/genre/:genreName', (req, res) => {
  const { genrename } = req.params;
  const genre = movies.find( movie => movie.genre.name === genrename ).genre;

  if (genre) {
      res.status(200).json(genre);
  } else {
      res.status(400).send('no such genre')
  }
})

//read
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorname } = req.params;
  const director = movies.find( movie => movie.director.name === directorname ).director;
  if (director) {
      res.status(200).json(director);
  } else {
      res.status(400).send('no such director')
  }
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