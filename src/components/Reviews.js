import React, { useEffect, useState } from "react";
import { getReviews } from "../utils/api.js";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews().then((result) => {
      const reviewsToUse = result.reviews;
      setReviews(reviewsToUse);
      // console.log("reviewsToUse", reviewsToUse);
      // console.log("reviews", reviews);
    });
  }, []);

  return (
    <div className="reviews">
      <h2>test</h2>
      <ul className="reviews reviews__list">
        {reviews.map((review) => {
          return (
            <li key={review.review_id}>
              <h2 className="reviews reviews__header">{review.title}</h2>
              <p>{review.review_body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
