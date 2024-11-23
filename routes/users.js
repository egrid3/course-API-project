// To serve user endpoints / ? if will use pug or other template engines / remove Joi functions? - how to refactor

import express from 'express';
const router = express.Router();
const Joi = require('joi');

const users =[
  { id: 1, name: 'user1' },
  { id: 2, name: 'user2' },
  { id: 3, name: 'user3' },
  { id: 4, name: 'user4' }
];

router.get('/', (req, res, next) => {
  /* if (error.status = 404) return error.send('<h2 style="text-align: center; color: #EF9427;">Page not found</h2>'); // 404 error message */
  res.send(users);
});

router.get('/:id', (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given user was not found. Check your spelling and try again.</h2>'); // 404 error message
  res.send(user);
});

router.post('/', (req, res) => {
  const { error } = validateuser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.send(user);
});

router.put('/:id', (req, res) => {
  // Look up user; if not existing, return 404
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given user was not found. Check your spelling and try again.</h2>'); // 404 error message
  // Validate; if not valid, return 400 - Bad Request
  const { error } = validateuser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Update user
  user.name = req.body.name;
  // Return the updated user
  res.send(user);
});

router.delete('/:id', (req, res) => {
  // Look up the user; not existing, return 404
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given user was not found. Check your spelling and try again.</h2>'); // 404 error message
  // Delete
  const index = users.indexOf(user);
  users.splice(index, 1);
  // Return the same user
  res.send(user);
});
// remove Joi functions, refactor? ...or keep and maybe change later
function validateuser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required()
  });
  return schema.validate(user);
}

export default router;