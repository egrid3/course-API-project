import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a course title'],
    unique: true,
    trim: true,
    maxlength: [42, 'Name can\'t be more than 42 characters long']
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a course description'],
    maxlength: [480, 'Description can\'t be more than 480 characters long']
  },
  videoType: {
    type: String,
    required: [true, 'Please select a course type'],
    enum : [
      'VOD',
      'Live'
    ]
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Cloud Admin',
      'Cloud Development',
      'DevOps',
      'Other'
    ]
  },
  minimumSkill: {
    type: String,
    required: [false, 'Please add a minimum skill'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5']
  },
  averageCost: Number,
  imgUrl: {
    type: String,
    default: 'no-photo.jpg'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

export default mongoose.model('Course', CourseSchema);