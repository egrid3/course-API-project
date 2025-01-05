/* import Joi from 'joi'; */
// const Joi = require('joi');
import Course from '../models/Course.js';

/* data code to remove
const courses = [
  { id: 1, name: 'Course1', description: 'Minim nulla incididunt occaecat sunt id deserunt nisi sit id sint exercitation mollit.', videoType: 'VOD', imgUrl: 'https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/html-400x223.jpg' },
  { id: 2, name: 'Course2', description: 'Consectetur quis duis elit occaecat occaecat ea ex pariatur. Excepteur fugiat occaecat sunt id deserunt nisi sit id sint exercitation mollit.', videoType: 'VOD', imgUrl: 'https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/wordpress-400x223.jpg' },
  { id: 3, name: 'Course3', description: 'Excepteur fugiat laboris duis sint fugiat in id ullamco ipsum consequat exercitation excepteur est.', videoType: 'Live', imgUrl: 'https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/html-400x223.jpg' },
  { id: 4, name: 'Course4', description: 'Ipsum non nostrud duis officia laborum exercitation excepteur do. Incididunt aliqua quis dolor id culpa. Aute commodo ad occaecat magna eu elit ut. Enim adipisicing eiusmod ad anim. Sit excepteur magna laboris esse consectetur eiusmod adipisicing. Dolor pariatur sint elit excepteur anim irure qui. Non officia veniam ad culpa aliqua nostrud consectetur veniam dolore incididunt. Officia ex nulla sint minim nisi ullamco. Elit incididunt ex aliqua ut excepteur id labore minim.', videoType: 'VOD', imgUrl: 'https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/wordpress-400x223.jpg' }
];*/

// desc: Get all courses, route: GET /api/courses
export const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(400).json({ success: false, msg:'Error with fetching courses' });
  }
  /* HBS rendering code to remove
  res.render('courseList', {
    courseList : [
      { id: 1, name: 'Course1', description: 'Minim nulla incididunt occaecat sunt id deserunt nisi sit id sint exercitation mollit.', videoType: 'VOD', imgUrl: 'https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/html-400x223.jpg' },
      { id: 2, name: 'Course2', description: 'Consectetur quis duis elit occaecat occaecat ea ex pariatur. Excepteur fugiat occaecat sunt id deserunt nisi sit id sint exercitation mollit.', videoType: 'VOD', imgUrl: 'https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/wordpress-400x223.jpg' },
      { id: 3, name: 'Course3', description: 'Excepteur fugiat laboris duis sint fugiat in id ullamco ipsum consequat exercitation excepteur est.', videoType: 'Live', imgUrl: 'https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/html-400x223.jpg' },
      { id: 4, name: 'Course4', description: 'Ipsum non nostrud duis officia laborum exercitation excepteur do. Incididunt aliqua quis dolor id culpa. Aute commodo ad occaecat magna eu elit ut. Enim adipisicing eiusmod ad anim. Sit excepteur magna laboris esse consectetur eiusmod adipisicing. Dolor pariatur sint elit excepteur anim irure qui.', videoType: 'VOD', imgUrl: 'https://websitedemos.net/online-courses-02/wp-content/uploads/sites/542/2020/04/wordpress-400x223.jpg' }
    ]
  });*/
};
 
const errorMessage1 = {
  courseMessage: "The given course was not found. Check your spelling or link and try again.",
/*  userMessage: "The given user was not found. Check your spelling or link and try again."*/
}
// const coursePage = {
//   courseValue: course
// }
// desc: Get a course, route: GET /api/courses/:id
export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(400).json({ success: false, msg:'Course doesn\'t exsist' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, msg:'Error with fetching course' });
  }
  
  /* local get single data code to remove
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).render('404', errorMessage1); //404 error message
  res.render('coursePage', course);*/
};

// desc: Create a course, route: POST /api/courses
export const postCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({success: true, data: course});
  } catch (error) {
    res.status(400).json({ success: false, msg:'Error with course creation' });
  }
};

// desc: Update a course, route: PUT /api/courses/:id
export const putCourse = async (req, res, next) => {
  // Look up course; if not existing, return 404
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!course) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: course });

  /* local update data code to remove
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given course was not found. Check your spelling and try again.</h2>'); //404 error message
  // Validate; if not valid, return 400 - Bad Request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Update course
  course.name = req.body.name;
  // Return the updated course
  res.send(course); */
};

// desc: Delete a course, route: DELETE /api/courses/:id
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false });
  }
  /* local delete data code to remove
  // Look up the course; not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('<h2 style="text-align: center; color: #EF9427;">The given course was not found. Check your spelling and try again.</h2>'); //404 error message
  // Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  // Return the same course
  res.send(course); */
};

/* // use Joi for validation - to remove
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required()
  });
  return schema.validate(course);
} */
