import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, getReviewById } from "../utils/api";
import { UserContext } from "../contexts/User";
import CommentForm from "./CommentForm.js";
import Votes from "./Votes.js";
import WrongPath from "./WrongPath.js";

const ReviewById = () => {
  const [review, setReview] = useState({});
  const [isReview, setIsReview] = useState();
  const [commentsOnReview, setCommentsOnReview] = useState([]);
  const [isUser, setIsUser] = useState();
  const { user } = useContext(UserContext);

  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then((result) => {
      if (result.review) {
        console.log(result, "result");
        setIsReview(true);
        setReview(result.review);
      } else {
        setIsReview(false);
        setReview({});
      }
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

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <section className="review">
        {isReview ? (
          <>
            <h1>REVIEW</h1>
            <h2 className="review review__title">{review.title}</h2>
            <p>{`comments: ${review.comment_count}`}</p>
            <Votes review={review} />
            <p>{`posted by: ${review.owner}`}</p>
            <img
              src={`${review.review_img_url}`}
              alt="what the reviewer has chosen to represent the game"
            />
            <p>{review.review_body}</p>
          </>
        ) : (
          <WrongPath />
        )}
      </section>
      <section>
        {isUser ? (
          <CommentForm
            review_id={review_id}
            setCommentsOnReview={setCommentsOnReview}
          />
        ) : (
          <p>Please log in to leave a comment!</p>
        )}
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
