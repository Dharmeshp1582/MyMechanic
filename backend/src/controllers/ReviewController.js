const mongoose = require("mongoose")
const ReviewModel = require("../models/ReviewModel");

// Create a new review
const createReview = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;
    const { garageId } = req.params;

    // Validate input
    if (!userId || !garageId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Optional: prevent duplicate reviews from same user
    // const existingReview = await ReviewModel.findOne({ userId, garageId });
    // if (existingReview) {
    //   return res.status(400).json({ message: "You have already reviewed this garage." });
    // }

    const review = await ReviewModel.create({
      userId,
      garageId,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
};





// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find()
      .populate("userId", "fullName email") // optional: limit fields
      .populate("garageId","name");

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch reviews",
        error: error.message
      });
  }
};

// Get reviews by Garage ID
const getReviewsByGarage = async (req, res) => {
  try {
    const { garageId } = req.params;
    const reviews = await ReviewModel.find({ garageId })
    .populate("garageId","name")
      .populate("userId", "fullName imageURL email")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch garage reviews",
        error: error.message
      });
  }
};

// Delete a review
// const deleteReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Review.findByIdAndDelete(id);
//     res
//       .status(200)
//       .json({ success: true, message: "Review deleted successfully" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "Failed to delete review",
//         error: error.message
//       });
//   }
// };


//update review
const updateReview =  async (req, res) => {
  const { userId, rating, comment } = req.body;

  try {
    const review = await ReviewModel.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.userId.toString() !== userId)
      return res.status(403).json({ error: "Unauthorized" });

    review.rating = rating;
    review.comment = comment;
    await review.save();

    res.status(200).json({ message: "Review updated", review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update review" });
  }
};

// Delete review (only own)
const deleteReviewByUserId = async (req, res) => {
  const { userId } = req.query;

  try {
    const review = await ReviewModel.findById(req.params.reviewId);

    if (!review) return res.status(404).json({ error: "Review not found" });
    if (review.userId.toString() !== userId)
      return res.status(403).json({ error: "Unauthorized" });

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};



const getAverageRating = async (req, res) => {
  const { garageId } = req.params;
  try {
    const result = await ReviewModel.aggregate([
      { $match: { garageId: new mongoose.Types.ObjectId(garageId) } },
      {
        $group: {
          _id: "$garageId",
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 }
        }
      }
    ]);

    if (result.length > 0) {
      res.json({ average: result[0].averageRating, count: result[0].count });
    } else {
      res.json({ average: 0, count: 0 });
    }
  } catch (error) {
    console.error("Error getting average rating:", error);
    res.status(500).json({ error: "Failed to calculate average rating" });
  }
};


module.exports = {
  createReview,
  getAllReviews,
  // deleteReview,
  getReviewsByGarage,
  getAverageRating,
  updateReview,
  deleteReviewByUserId
};
