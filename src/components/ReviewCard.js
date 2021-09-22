import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Votes from "./Votes.js";
import { UserContext } from "../contexts/User";
import { deleteReview } from "../utils/api.js";

const ReviewCard = ({ review }) => {
  const { user } = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  return isDeleted ? (
    <br />
  ) : (
    <li key={review.review_id} className="reviews">
      <Link to={`/reviews/${review.review_id}`}>
        <h2 className="reviews reviews__title">{review.title}</h2>
      </Link>
      <div>
        {review.owner === user.username ? (
          <button
            className="reviews reviews__reviewsDeleteButton"
            onClick={() => {
              deleteReview(review.review_id).then((response) => {
                if (response.status === 204) {
                  setIsDeleted(true);
                } else {
                  setIsDeleteError(true);
                }
              });
            }}
          >
            DELETE REVIEW
          </button>
        ) : (
          <span></span>
        )}
        {isDeleteError ? (
          <p>Oops, something went wrong with deleting this review!</p>
        ) : (
          <span></span>
        )}
      </div>
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
