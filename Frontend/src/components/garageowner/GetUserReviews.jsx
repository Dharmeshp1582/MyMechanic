import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const GetUserReviews = () => {
  const { garageId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [garageName, setGarageName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); // NEW STATE
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/review/getreviews/${garageId}`);
      const reviewList = res.data.reviews || [];
      setReviews(reviewList);

      if (reviewList.length > 0) {
        setGarageName(reviewList[0]?.garageId?.name || "Garage");
        const total = reviewList.reduce((sum, r) => sum + Number(r.rating), 0);
        setAverageRating((total / reviewList.length).toFixed(1));
      } else {
        setAverageRating(null);
        setGarageName("Garage");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [garageId]);

  const visibleReviews = showAll
    ? [...reviews].reverse()
    : [...reviews].reverse().slice(0, 10);

  return (
    <div style={{ padding: "2rem", background: "#f4f4f6", minHeight: "80vh" }}>
      <button onClick={() => navigate(-1)} className="" style={{backgroundColor:"#ffff"}}>
        ← Go Back
      </button>

      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Customer Feedback -{" "}
        <span style={{ color: "#2c3e50" }}>{garageName}</span>
      </h2>

      {averageRating && (
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "1.2rem", color: "#333" }}>
            ⭐ Average Rating:{" "}
            <strong style={{ color: "#1a2a6a" }}>{averageRating} / 5</strong>
          </span>
        </div>
      )}

      {loading ? (
        <p style={{ textAlign: "center", color: "gray" }}>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No reviews found.</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxWidth: "800px",
              margin: "0 auto"
            }}
          >
            {visibleReviews.map((review, index) => (
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
                    alt={review.userId?.fullName || "Anonymous"}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                  <div>
                    <strong>{review.userId?.fullName || "Anonymous"}</strong>
                    <div style={{ color: "#FFD700" }}>
                      {"★".repeat(Number(review.rating))}
                      <span style={{ fontSize: "0.8rem", color: "gray" }}>
                        {" "}
                        ({review.rating}/5)
                      </span>
                    </div>
                  </div>
                </div>
                <p style={{ margin: "0.5rem 0" }}>{review.comment}</p>
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

          {/* Show more/less button */}
          {reviews.length > 5 && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                onClick={() => setShowAll(!showAll)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#1a2a6a",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                {showAll ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
