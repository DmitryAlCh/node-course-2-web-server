const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `Timestamp: ${now}, HTTP method: ${req.method}, requested URL: ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err){
      console.log('Unable lo write log file');
    }
  });
  next();
});

app.use((req, res,next) => {
  res.render('maintenace.hbs');
});

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});
//to use helper with args inside of template
//{{helper_istelf 'whitespace' argument_we_pass_to_helper }}

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');

  // res.send({
  //   name: 'Dmitry',
  //   likes: ['biking','photos'],
  // });

  res.render('home.hbs',{
    pageTitle: 'Home page',
    // currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to our website, Welcome to our website, Welcome to our website'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorCode: 121,
    errorMessage: 'Bad request',
    solutions: 'use another route'
  });
});

//app.get('/my route here', function(request, response){All my actions here})

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
  console.log('Test messages');
});
