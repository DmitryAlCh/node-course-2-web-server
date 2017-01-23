const express = require('express');

var app = express();



app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'Dmitry',
    likes: ['biking','photos'],
  });
});

app.get('/about', (req, res) => {
  res.send('About page')
});

app.get('/bad', (req, res) => {
  res.send({
    errorCode: 121,
    errorMessage: 'Bad request',
    solutions: 'use another route'
  });
});

//app.get('/my route here', function(request, response){All my actions here})

app.listen(3000);
