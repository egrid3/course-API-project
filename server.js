/*
Re-factor code to follow process on codewithmosh Vidly project.
Follow videos for concepts minus some features. / comment out handlebars code until I can change js type to module
*/
// const express = require('express');
import express from 'express';
import { hbs } from 'express-handlebars';
// const courses = require('./routes/courses');
import { courses } from './routes/courses.js';
// const users = require('./routes/users');
import { users } from './routes/users.js';
// const errorHandler = require('./middleware/error');
import { errorHandler } from './middleware/error.js';
// const authenticate = require('./authenticate');
import { authenticate } from './authenticate.js';

const app = express();

app.use(express.json());

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api/courses', courses);
app.use('/api/users', users);
app.get("/",(req,res) => {
//   res.send(`<h2 style="color:slateblue; text-align:center">Can you see me? Then it works!</h2>`)
  res.render('test', {
    title: "Handlebars rendered page",
    firstname: "Elvin",
    lastname: "R",
    headline: "Can you see me? Then it works!"
  });
});

app.use((req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
});
app.use(errorHandler);

app.use(authenticate);

//Declare PORT variable
const port = process.env.PORT || 8050
app.listen(port, () => console.log(`Listening on port ${port}...`));

// add handlebars cdn (https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js)