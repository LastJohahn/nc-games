import React from "react";
import { Link } from "react-router-dom";
import Votes from "./Votes.js";

const ReviewCard = ({ review }) => {
  return (
    <li key={review.review_id} className="reviews">
      <Link to={`/reviews/${review.review_id}`}>
        <h2 className="reviews reviews__title">{review.title}</h2>
      </Link>
      {review.comment_count ? (
        <p>{`comments: ${review.comment_count}`}</p>
      ) : (
        <p>{`comments: 0`}</p>
      )}
      <Votes review={review} />
      <p>posted by: </p>
      <Link to={`/users/${review.owner}`}>
        <p>{`${review.owner}`}</p>
      </Link>
      <img
        src={review.review_img_url}
        alt="what the reviewer has chosen to represent the game"
      ></img>
      <p>{review.review_body}</p>
    </li>
  );
};

export default ReviewCard;
