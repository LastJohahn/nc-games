import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, getReviewById } from "../utils/api";
import { UserContext } from "../contexts/User";
import CommentForm from "./CommentForm.js";
import Votes from "./Votes.js";
import WrongPath from "./WrongPath.js";
import LoadingScreen from "./LoadingScreen";

const ReviewById = () => {
  const [review, setReview] = useState({});
  const [isReview, setIsReview] = useState();
  const [commentsOnReview, setCommentsOnReview] = useState([]);
  const [hasComments, setHasComments] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState();
  const { user } = useContext(UserContext);

  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then((result) => {
      setIsLoading(false);
      if (result.review) {
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
        setHasComments(false);
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

  return isLoading ? (
    <LoadingScreen />
  ) : (
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
      {hasComments ? (
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
      ) : (
        <h2>Looks like this review has no comments! Why not leave one?</h2>
      )}
    </div>
  );
};

export default ReviewById;
