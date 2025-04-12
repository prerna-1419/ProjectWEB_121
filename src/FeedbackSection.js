import React, { useState, useEffect } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedReviews = localStorage.getItem("reviews");
    if (storedReviews) {
      setSubmittedReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Save to localStorage whenever submittedReviews change
  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(submittedReviews));
  }, [submittedReviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { name, review, rating, id: Date.now() };
    setSubmittedReviews([...submittedReviews, newReview]);

    // Reset form
    setName("");
    setReview("");
    setRating(0);
    setHover(0);
  };

  const handleDelete = (id) => {
    const filtered = submittedReviews.filter((r) => r.id !== id);
    setSubmittedReviews(filtered);
  };

  return (
    <div className="star-rating-container">
      <h2>🌟 Feedback & Reviews</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          className="input-box"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your review..."
          className="input-box"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <p>Rating:</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? "active" : ""}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
        <button className="submit-btn" type="submit">
          Submit Review
        </button>
      </form>

      {/* Review Preview Section */}
      <div className="submitted-reviews">
        <h3>📝 Submitted Reviews</h3>
        {submittedReviews.map((item) => (
          <div key={item.id} className="review-card">
            <strong>{item.name}</strong>
            <p>{item.review}</p>
            <p>
              Rating:{" "}
              {[...Array(item.rating)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </p>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarRating;

