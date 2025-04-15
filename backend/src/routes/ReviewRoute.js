const routes = require('express').Router();
const reviewController = require('../controllers/ReviewController');

// POST a new review
routes.post('/addreview/:garageId', reviewController.createReview);

// GET all reviews
routes.get('/allreview', reviewController.getAllReviews);

// GET reviews for a specific garage
routes.get('/getreviews/:garageId', reviewController.getReviewsByGarage);

// DELETE a review
// router.delete('/:id', reviewController.deleteReview);

routes.get("/average/:garageId", reviewController.getAverageRating);


//Update review by user id
routes.put("/updatereview/:reviewId",reviewController.updateReview);

//delete review by user id
routes.delete("/deletereview/:reviewId",reviewController.deleteReviewByUserId);


module.exports = routes;
