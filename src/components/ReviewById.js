import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, getReviewById } from "../utils/api";

const ReviewById = () => {
  const [review, setReview] = useState([]);
  const [commentsOnReview, setCommentsOnReview] = useState([]);
  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then((result) => {
      setReview(result.review[0]);
    });
  }, [review_id]);

  useEffect(() => {
    getCommentsById(review_id).then((result) => {
      if (result.comments) {
        setCommentsOnReview(result.comments);
      } else {
        setCommentsOnReview(result);
      }
    });
  }, [review_id]);

  return (
    <div>
      <section className="review">
        <h1>REVIEW</h1>
        <h2 className="review review__title">{review.title}</h2>
        <p>{`comments: ${review.comment_count}`}</p>
        <p>{`votes: ${review.votes}`}</p>
        <p>{`posted by: ${review.owner}`}</p>
        <img
          src={`${review.review_img_url}`}
          alt="image reviewer has chosen to represent the game"
        />
        <p>{review.review_body}</p>
      </section>
      <section className="comments">
        <h1>COMMENTS</h1>
        <ul className="comments comments__list">
          {commentsOnReview.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <h3 className="comments comments__list comments__list__poster">{`posted by: ${comment.author}`}</h3>
                <p>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default ReviewById;
