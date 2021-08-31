import React, { useEffect, useState } from "react";
import { getReviews } from "../utils/api.js";
import { commentsSortBy } from "../utils/comments.js";
import ReviewCard from "./ReviewCard.js";

const Reviews = ({ reviews, setReviews }) => {
  const [sortBy, setSortBy] = useState("");
  const [sortByComments, setSortByComments] = useState(false);

  useEffect(() => {
    getReviews(sortBy).then((result) => {
      const reviewsToUse = result.reviews;
      if (sortByComments === false) {
        setReviews(reviewsToUse);
      } else if (sortByComments === true) {
        commentsSortBy(reviewsToUse);
        setReviews(reviewsToUse);
      }
    });
  }, [sortBy, sortByComments, setReviews]);

  return (
    <div className="reviews">
      <h2>REVIEWS</h2>
      <button
        className={
          sortBy === "" && sortByComments === false
            ? "reviews reviews__sortButton--state-active"
            : "reviews reviews__sortButton"
        }
        onClick={() => {
          setSortByComments(false);
          setSortBy("");
        }}
      >
        created_at
      </button>
      <button
        className={
          sortBy === "votes" && sortByComments === false
            ? "reviews reviews__sortButton--state-active"
            : "reviews reviews__sortButton"
        }
        onClick={() => {
          setSortByComments(false);
          setSortBy("votes");
        }}
      >
        votes
      </button>
      <button
        className={
          sortByComments === false
            ? "reviews reviews__sortButton"
            : "reviews reviews__sortButton--state-active"
        }
        onClick={() => {
          setSortByComments(true);
        }}
      >
        comment_count
      </button>
      <ul className="reviews reviews__list">
        {reviews.map((review) => {
          return <ReviewCard review={review} key={review.review_id} />;
        })}
      </ul>
    </div>
  );
};

export default Reviews;
