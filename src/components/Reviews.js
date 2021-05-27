import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../utils/api.js";
import { commentsSortBy } from "../utils/comments.js";

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
  }, [sortBy, sortByComments]);

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
          return (
            <li key={review.review_id}>
              <Link to={`/reviews/${review.review_id}`}>
                <h2 className="reviews reviews__title">{review.title}</h2>
              </Link>
              <p>{`comments: ${review.comment_count}`}</p>
              <p>{`votes: ${review.votes}`}</p>
              <p>{`posted by: ${review.owner}`}</p>
              <img
                src={review.review_img_url}
                alt="image reviewer has chosen to represent the game"
              ></img>
              <p>{review.review_body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
