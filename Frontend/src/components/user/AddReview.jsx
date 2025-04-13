import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export const AddReview = () => {
  const location = useLocation();
  const { selectedGarage } = location.state || {};
  const { garageId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/review/getreviews/${garageId}`);
      const reviewList = res.data.reviews || [];
      setReviews(reviewList);

      if (reviewList.length > 0) {
        const total = reviewList.reduce((sum, r) => sum + Number(r.rating), 0);
        setAverageRating((total / reviewList.length).toFixed(1));
      } else {
        setAverageRating(null);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [garageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.warning("Please fill out all fields.");
      return;
    }

    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("User not logged in. Please log in to submit a review.");
      return;
    }

    try {
      await axios.post(`/review/addreview/${garageId}`, {
        userId,
        rating,
        comment
      });

      toast.success("Review added successfully");
      setRating(0);
      setComment("");
      fetchReviews();
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
    <div
      style={{
        minHeight: "90vh",
        padding: "2rem",
        backgroundColor: "rgb(221, 221, 223)"
      }}
    >
     <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
      <div>
        <button
          onClick={() => navigate(-1)}
          className="book-app-go-back-button"
          style={{
            marginLeft: "20px",
            backgroundColor: "rgb(241, 241, 244)",
            color: "black",
            border: "1px solid #fff"
          }}
        >
          ← Go Back
        </button>
      </div>
      <h2 style={{ textAlign: "center" }}>
        Add Review for{" "}
        <span style={{ color: "rgb(92, 159, 242)" }}>{selectedGarage.name}</span>
      </h2>

      <div>
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
            borderRadius: "10px",
            background: "white"
          }}
        >
          <label>
            Rating:
            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  style={{
                    cursor: "pointer",
                    fontSize: "2rem",
                    color: (hover || rating) >= star ? "#FFD700" : "#ccc"
                  }}
                >
                  ★
                </span>
              ))}
            </div>
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
              backgroundColor: "rgb(69, 70, 73)",
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

      {/* Show Reviews */}
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        {averageRating && (
          <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem", color: "#333" }}>
              ⭐ Average Rating:{" "}
              <strong style={{ color: "rgb(26, 42, 106)" }}>{averageRating} / 5</strong>
            </span>
          </div>
        )}

        <h3
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            fontWeight: "bold",
            marginTop: "1rem"
          }}
        >
          Customer Reviews
        </h3>

        {loadingReviews ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>No reviews yet.</p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {[...reviews]
              .slice(-5)
              .reverse()
              .map((review, index) => (
                <div
                  key={index}
                  style={{
                    background: "#fff",
                    padding: "1rem",
                    borderRadius: "10px",
                    boxShadow: "0 0 5px rgba(0,0,0,0.1)"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "0.5rem"
                    }}
                  >
                    <img
                      src={
                        review.userId?.imageURL ||
                        "https://via.placeholder.com/40"
                      }
                      alt={review.userId?.fullName}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover"
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong>{review.userId?.fullName || "Anonymous"}</strong>
                      <div style={{ color: "#FFD700" }}>
                        {"★".repeat(Number(review.rating))}{" "}
                        <span style={{ fontSize: "0.8rem", color: "gray" }}>
                          ({review.rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>
                  <p>{review.comment}</p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "gray",
                      marginTop: "0.5rem"
                    }}
                  >
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
