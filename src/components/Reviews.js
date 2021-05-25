import React, { useEffect, useState } from "react";
import { getReviews } from "../utils/api.js";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    getReviews(sortBy).then((result) => {
      const reviewsToUse = result.reviews;
      setReviews(reviewsToUse);
      // console.log("reviewsToUse", reviewsToUse);
      // console.log("reviews", reviews);
    });
  }, [sortBy]);

  return (
    <div className="reviews">
      <h2>REVIEWS</h2>
      <button
        className={
          sortBy
            ? "reviews reviews__sortButton"
            : "reviews reviews__sortButton--state-active"
        }
        onClick={() => {
          setSortBy("");
        }}
      >
        created_at
      </button>
      <button
        className={
          sortBy === "votes"
            ? "reviews reviews__sortButton--state-active"
            : "reviews reviews__sortButton"
        }
        onClick={() => {
          setSortBy("votes");
        }}
      >
        votes
      </button>
      {/* <button
        className="reviews reviews__sortButton"
        onClick={() => {
          setSortBy("comment_count");
        }}
      >
        comment_count
      </button> */}
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
