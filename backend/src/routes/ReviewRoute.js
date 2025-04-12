const router = require('express').Router();
const reviewController = require('../controllers/ReviewController');

// POST a new review
router.post('/addreview/:garageId', reviewController.createReview);

// GET all reviews
router.get('/allreview', reviewController.getAllReviews);

// GET reviews for a specific garage
router.get('/garage/:garageId', reviewController.getReviewsByGarage);

// DELETE a review
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
