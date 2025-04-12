import  { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const AddReview = () => {
  const location = useLocation();
  const { selectedGarage } = location.state || {};
  const { garageId } = useParams(); // We can get the garageId from URL params

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.warning("Please fill out all fields.");
      return;
    }

    const userId = localStorage.getItem("id"); // Get userId from localStorage
    console.log(userId);
    if (!userId) {
      toast.error("User not logged in. Please log in to submit a review.");
      return;
    }

    try {
      await axios.post(`/addreview/${garageId}`, {
        userId, // Send userId along with rating and comment
        rating,
        comment
      });

      toast.success("Review added successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
    }
  };

  if (!selectedGarage?._id) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontSize: "1.5rem" }}>
        Garage not found. Please go back and try again.
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center" }}>
        Add Review for{" "}
        <span style={{ color: "blue" }}>{selectedGarage.name}</span>
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px"
        }}
      >
        <label>
          Rating:
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginTop: "0.5rem"
            }}
          />
        </label>

        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            placeholder="Write your review..."
            style={{ padding: "0.5rem", width: "100%" }}
          />
        </label>

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};
