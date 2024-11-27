// To serve user endpoints
import express from 'express';
// const express = require('express');
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/userController.js';
const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', postUser);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

export default router;