const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
  },
  author: {
    type: String,
    required: [true, 'Please provide auther'],
  },
  type: {
    type: String,
    required: [true, 'Please provide type'],
  },
  availability: {
    type: Boolean,
    enum: [true, false],
    default: false,
  },
  image: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    default: 0,
  },
  sales: {
    type: Number,
    required: [true, 'Please provide the sales number'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please provide rating'],
},
});

module.exports = mongoose.model('Book', bookSchema);