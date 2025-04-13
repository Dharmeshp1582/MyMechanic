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
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete review",
        error: error.message
      });
  }
};

// controllers/reviewController.js (update to calculate average rating)

// const updateGarageRating = async (garageId) => {
//   const reviews = await Review.find({ garageId });
//   const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
//   await Garage.findByIdAndUpdate(garageId, { averageRating });
// };

// const addReview = async (req, res) => {
//   try {
//     const { garageId, rating, review } = req.body;
//     const userId = req.user._id;

//     const garage = await Garage.findById(garageId);
//     if (!garage) {
//       return res.status(404).json({ success: false, message: "Garage not found" });
//     }

//     const newReview = new Review({ garageId, userId, rating, review });
//     await newReview.save();

//     // Update garage rating
//     await updateGarageRating(garageId);

//     return res.status(201).json({
//       success: true,
//       message: "Review added successfully!",
//       data: newReview,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };


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
  deleteReview,
  getReviewsByGarage,
  getAverageRating
};
