// To serve course endpoints / ? if will use pug or other template engines / remove Joi functions? - how to refactor

const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses =[
  { id: 1, name: 'course1' },
  { id: 2, name: 'course2' },
  { id: 3, name: 'course3' },
  { id: 4, name: 'course4' }
];

router.get('/', (req, res) => {
  res.send(courses);
});

router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given course was not found. Check your spelling and try again.</h2>'); //404 error message
  res.send(course);
});

router.post('/', (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

router.put('/:id', (req, res) => {
  // Look up course; if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given course was not found. Check your spelling and try again.</h2>'); //404 error message
  // Validate; if not valid, return 400 - Bad Request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course);
});

router.delete('/:id', (req, res) => {
  // Look up the course; not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given course was not found. Check your spelling and try again.</h2>'); //404 error message
  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // Return the same course
  res.send(course);
});
// remove Joi functions, refactor? ...or keep and maybe change later
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required()
  });
  return schema.validate(course);
}

module.exports = router;