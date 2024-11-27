// To serve course endpoints
import express from 'express';
// const express = require('express');
import {
  getCourses,
  getCourse,
  postCourse,
  putCourse,
  deleteCourse,
} from '../controllers/courseController.js';
const router = express.Router();

router.get('/', getCourses);

router.get('/:id', getCourse);

router.post('/', postCourse);

router.put('/:id', putCourse);

router.delete('/:id', deleteCourse);

export default router;