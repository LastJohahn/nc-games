import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Votes from "./Votes.js";
import { UserContext } from "../contexts/User";
import { deleteReview } from "../utils/api.js";
import "../css/ReviewCard.css";

const ReviewCard = ({ review }) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  const routeChangeUser = (username) => {
    let path = `/users/${username}`;
    history.push(path);
  };

  return isDeleted ? (
    <br />
  ) : (
    <li key={review.review_id} className="reviewCard">
      <div className="postedBy">
        <button
          className="ownerButton"
          onClick={() => {
            routeChangeUser(review.owner);
          }}
        >{`${review.owner}`}</button>
        {review.owner === user.username && (
          <button
            className="deleteButton"
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
        )}
        {isDeleteError === true && (
          <p>Oops, something went wrong with deleting this review!</p>
        )}
      </div>
      <Link className="reviews__title" to={`/reviews/${review.review_id}`}>
        <h2>{review.title}</h2>
      </Link>
      <img
        src={review.review_img_url}
        alt="what the reviewer has chosen to represent the game"
        className="reviewsImage"
      />
      <p className="reviewBody">{review.review_body}</p>
      <div className="reviewData">
        {review.comment_count ? (
          <p>{`${review.comment_count} comments`}</p>
        ) : (
          <p>{`0 comments`}</p>
        )}
        <Votes review={review} />
      </div>
    </li>
  );
};

export default ReviewCard;
