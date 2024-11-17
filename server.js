/*
Re-factor code to follow process on codewithmosh Vidly project.
Follow videos for concepts minus some features.
*/
const express = require("express");
const courses = require('./routes/courses');
const users = require('./routes/users');
// const pages = require('./routes/pages');
const authenticate = require('./authenticate');
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended:true })); // key=value&key=value
app.use('/api/courses', courses);
app.use('/api/users', users);
// app.use('/', pages);

app.use(authenticate);

app.get("/",(req,res) => {
res.send(`<h2 style="color:slateblue; text-align:center">Can you see me? Then it works!</h2>`)
  });

//Declare PORT variable
const port = process.env.PORT || 8050
app.listen(port, () => console.log(`Listening on port ${port}...`));