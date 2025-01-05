/*
[general comments for main server JS file]
*/
// const express = require('express');
import express from 'express';
import { engine } from 'express-handlebars';
// const courses = require('./routes/courses');
import courses from './routes/courses.js';
// const users = require('./routes/users');
import users from './routes/users.js';
// const errorHandler = require('./middleware/error');
import errorHandler from './middleware/error.js';
// const authenticate = require('./authenticate');
import { auth } from './authenticate.js';
import connectDB from './config/db.js';

// Connect to DB
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(auth);

// HBS render engine config
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
// Routes
app.use('/api/courses', courses);
app.use('/api/users', users);

const homepage = {
  title: "Cloud-Learn",
  firstname: "Elvin",
  lastname: "R",
  headline: "Come learn how to build in the cloud"
}
app.get("/",(req,res) => {
//   res.send(`<h2 style="color:slateblue; text-align:center">Can you see me? Then it works!</h2>`)
  res.render('home', homepage);
});
const about = {
  title: "Cloud-Learn | About",
  aboutus: "About US",
  headline: "Giving you the essential skills to build in the cloud",
  aboutBody: "Cillum proident adipisicing deserunt ut et commodo elit quis veniam laborum. Dolor deserunt qui cillum ullamco adipisicing ex elit laborum pariatur occaecat ex reprehenderit. Est aute magna cupidatat esse dolore deserunt magna. Nisi qui magna amet id tempor. Velit sunt nulla dolor cupidatat occaecat proident Lorem irure ipsum reprehenderit voluptate laborum dolor. Aute id mollit elit in enim et. Tempor elit cillum minim minim sint consectetur aliqua nostrud deserunt eiusmod. Id velit magna Lorem sit consequat. Ea proident nulla laboris do deserunt nostrud aliquip do incididunt amet sint commodo non culpa. Officia fugiat commodo consequat officia quis nostrud aliqua cupidatat in non nisi."
}
app.get("/about",(req,res) => {
  //   res.send(`<h2 style="color:slateblue; text-align:center">Can you see me? Then it works!</h2>`)
    res.render('about', about);
  });
  
// Error handler
app.use((req, res, next) => {
  const error = new Error('Page not found');
  error.status = 404;
  next(error);
});
app.use(errorHandler);

//Declare PORT variable
const port = process.env.PORT || 8050
const server = app.listen(port, () => console.log(`Server listening on port ${port}...`));

// Handel unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// add handlebars cdn (https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.8/handlebars.min.js) - not working