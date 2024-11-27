import Joi from 'joi';
// const Joi = require('joi');

const users =[
  { id: 1, name: 'user1' },
  { id: 2, name: 'user2' },
  { id: 3, name: 'user3' },
  { id: 4, name: 'user4' }
];

// desc: Get all users, route: GET /api/users
export const getUsers = (req, res, next) => {
  res.send(users);
}

// desc: Get a user, route: GET /api/users/:id
export const getUser = (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given user was not found. Check your spelling and try again.</h2>'); //404 error message
  res.send(user);
};

// desc: Create a user, route: POST /api/users
export const postUser = (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.send(user);
}

// desc: Update a user, route: PUT /api/users/:id
export const putUser = (req, res) => {
  // Look up user; if not existing, return 404
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given user was not found. Check your spelling and try again.</h2>'); //404 error message
  // Validate; if not valid, return 400 - Bad Request
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Update user
  user.name = req.body.name;
  // Return the updated user
  res.send(user);
}

// desc: Delete a user, route: DELETE /api/users/:id
export const deleteUser = (req, res) => {
  // Look up the user; not existing, return 404
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given user was not found. Check your spelling and try again.</h2>'); //404 error message
  // Delete
  const index = users.indexOf(user);
  users.splice(index, 1);
  // Return the same user
  res.send(user);
}

// use Joi for validation
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required()
  });
  return schema.validate(user);
}