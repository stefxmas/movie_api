const {users, movies} = require("./data");
const express = require('express');
      morgan = require('morgan');

const app = express();

//Using the Morgan middleware library to log all requests
app.use(morgan('common'));
app.use(express.json()); 
const path = require("path");

//GET request for returning the JSON movie data
  app.get('/movies', (req, res) => {
    res.json(movies);
  });




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