import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

export const AddReview = () => {
  const location = useLocation();
  const { selectedGarage } = location.state || {};
  const { garageId } = useParams();
  const navigate = useNavigate();

  const userId = localStorage.getItem("id");

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [ratingDistribution, setRatingDistribution] = useState({});
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/review/getreviews/${garageId}`);
      const reviewList = res.data.reviews || [];
      setReviews(reviewList);

      if (reviewList.length > 0) {
        const total = reviewList.reduce((sum, r) => sum + Number(r.rating), 0);
        setAverageRating((total / reviewList.length).toFixed(1));

        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviewList.forEach(r => {
          const rInt = Math.round(Number(r.rating));
          distribution[rInt] = (distribution[rInt] || 0) + 1;
        });
        setRatingDistribution(distribution);
      } else {
        setAverageRating(null);
        setRatingDistribution({});
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

    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    try {
      if (editingReviewId) {
        await axios.put(`/review/updatereview/${editingReviewId}`, {
          userId,
          rating,
          comment
        });
        toast.success("Review updated!");
        setEditingReviewId(null);
      } else {
        await axios.post(`/review/addreview/${garageId}`, {
          userId,
          rating,
          comment
        });
        toast.success("Review added!");
      }

      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  const handleEdit = (review) => {
    window.scrollTo(0, 0);
    setRating(Number(review.rating));
    setComment(review.comment);
    setEditingReviewId(review._id);
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`/review/deletereview/${reviewId}?userId=${userId}`);
      toast.success("Review deleted");
      fetchReviews();
    } catch (err) {
      toast.error("Error deleting review");
      console.error(err);
    }
  };

  const displayedReviews = showAllReviews
    ? [...reviews].reverse()
    : [...reviews].slice(-5).reverse();

  if (!selectedGarage?._id) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontSize: "1.5rem" }}>
        Garage not found. Please go back and try again.
      </div>
    );
  }

  return (
    <div style={{ minHeight: "90vh", padding: "2rem", backgroundColor: "rgb(221, 221, 223)" }}>
      {/* <ToastContainer position="top-right" autoClose={1000} theme="dark" /> */}

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

      <h2 style={{ textAlign: "center" }}>
        {editingReviewId ? "Update Review for" : "Add Review for"}{" "}
        <span style={{ color: "rgb(92, 159, 242)" }}>{selectedGarage.name}</span>
      </h2>

      {/* Review Form */}
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "700px",
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
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
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
            {editingReviewId ? "Update Review" : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Rating Summary Bar */}
      {averageRating && (
        <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "10px", boxShadow: "0 0 8px rgba(0,0,0,0.1)", maxWidth: "700px", margin: "2rem auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{averageRating}</div>
              <div style={{ fontSize: "1.5rem", color: "#FFD700" }}>
                {"★".repeat(Math.floor(averageRating))}{averageRating % 1 >= 0.5 ? "½" : ""}
              </div>
              <div style={{ color: "gray" }}>{reviews.length} reviews</div>
            </div>
            <div style={{ flex: 1 }}>
              {[5, 4, 3, 2, 1].map(star => {
                const count = ratingDistribution[star] || 0;
                const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ width: "20px" }}>{star}</span>
                    <div style={{ flex: 1, margin: "0 10px", height: "10px", background: "#eee", borderRadius: "5px" }}>
                      <div style={{ width: `${percentage}%`, background: "#FFD700", height: "100%", borderRadius: "5px" }}></div>
                    </div>
                    <span style={{ minWidth: "30px", textAlign: "right" }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <h3 style={{ fontSize: "1.5rem", margin: "1rem 0", fontWeight: "bold" }}>
          Customer Reviews
        </h3>

        {loadingReviews ? (
          <p style={{ textAlign: "center", color: "gray" }}>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>No reviews yet.</p>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {displayedReviews.map((review, index) => (
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
                      src={review.userId?.imageURL || "https://via.placeholder.com/40"}
                      alt={review.userId?.fullName}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "0.5px solid black",
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
                  <p style={{ fontSize: "0.8rem", color: "gray", marginTop: "0.5rem" }}>
                    {new Date(review.createdAt).toLocaleString()}
                  </p>

                  {review.userId?._id === userId && (
                    <div style={{ marginTop: "0.5rem", display: "flex", gap: "1rem" }}>
                      <button
                        onClick={() => handleEdit(review)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        title="Edit"
                      >
                        <FaEdit color="#007bff" />
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        title="Delete"
                      >
                        <FaTrash color="#dc3545" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {reviews.length > 5 && (
              <div style={{ textAlign: "center", marginTop: "1rem" }}>
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  {showAllReviews ? "View Less" : "View More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
