const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  garageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'garages',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    // trim: true,
    required: true
  }
},{ timestamps: true });

module.exports = mongoose.model('reviews', reviewSchema);
