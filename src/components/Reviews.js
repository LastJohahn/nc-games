import React, { useEffect, useState } from "react";
import { getCommentCountByReviewId, getReviews } from "../utils/api.js";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [commentCount, setCommentCount] = useState([]);

  useEffect(() => {
    getReviews(sortBy)
      .then((result) => {
        const reviewsToUse = result.reviews;
        setReviews(reviewsToUse);
        const commentsByIdPending = reviewsToUse.map(({ review_id }) => {
          return getCommentCountByReviewId(review_id).then((result) => {
            let obj = {};
            obj[review_id] = result.review[0].comment_count;
            return obj;
          });
        });
        return Promise.all(commentsByIdPending);
      })
      .then((commentsById) => {
        setCommentCount((currCommentCount) => {
          let newCommentCount = [...currCommentCount];
          newCommentCount = [...commentsById];
          return newCommentCount;
        });
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
              <p>
                {commentCount.map((commentCountObj) => {
                  if (review.review_id in commentCountObj) {
                    return `comments: ${commentCountObj[review.review_id]}`;
                  }
                })}
              </p>
              <p> {`votes: ${review.votes}`}</p>
              <p>{review.review_body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
