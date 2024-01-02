// const express = require('express');
// const app = express();

// const express = require('express'),
//   morgan = require('morgan');

const express = require('express'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path');

    let topTenMovies = [
        {
            title: 'The Godfather',
            Director: 'Francis Ford Coppola'
        },
        {
            title: 'The Godfather Part II',
            Director: 'Francis Ford Coppola'
        },
        {
            title: 'Schindler\' List',
            Director: 'Steven Spielberg'
        },
        {
            title: 'The Dark Knight',
            Director: 'Christopher Nolan'
        },
        {
            title: 'Forest Gump',
            Director: 'Robert Zemeckis'
        },
        {
            title: 'Pulp Fiction',
            Director: 'Quentin Tarantino'
        },
        {
            title: 'The Shawshank Redemption',
            Director: 'Frank Darabont'
        },
        {
            title: 'Inception',
            Director: 'Christopher Nolan'
        },
        {
            title: 'The Lion King',
            Director: 'Rob Minkoff'
        },
        {
            title: 'Black Panther',
            Director: 'Ryan Coogler'
        }
    ]
    
const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});