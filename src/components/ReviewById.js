import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getCommentsById, getReviewById } from "../utils/api";
import { UserContext } from "../contexts/User";
import CommentForm from "./CommentForm.js";
import Votes from "./Votes.js";
import WrongPath from "./WrongPath.js";
import LoadingScreen from "./LoadingScreen";
import "../css/ReviewById.css";

const ReviewById = () => {
  const [review, setReview] = useState({});
  const [isReview, setIsReview] = useState();
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [commentsOnReview, setCommentsOnReview] = useState([]);
  const [hasComments, setHasComments] = useState(true);
  const [sortCommentsByVotes, setSortCommentsByVotes] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const [isUser, setIsUser] = useState();

  const { user } = useContext(UserContext);

  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then((result) => {
      setIsLoadingReview(false);
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
      setIsLoadingComments(false);
      if (result.comments) {
        let sortedComments = result.comments;
        if (!sortCommentsByVotes) {
          sortedComments.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
        } else {
          sortedComments.sort((a, b) => {
            return b.votes - a.votes;
          });
        }
        setCommentsOnReview(sortedComments);
      } else {
        setHasComments(false);
        setCommentsOnReview(result);
      }
    });
  }, [review_id, sortCommentsByVotes]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
    // eslint-disable-next-line
  }, []);

  const dateMaker = (timestamp) => {
    const commentDate = new Date(timestamp);
    return commentDate.toUTCString();
  };

  return isLoadingReview ? (
    <LoadingScreen />
  ) : (
    <div className="reviewAndComments">
      <section className="single_review">
        {isReview ? (
          <>
            <h2 className="header">REVIEW</h2>
            <div className="reviewCard">
              <h2 className="reviews__title">{review.title}</h2>
              <p>{`comments: ${review.comment_count}`}</p>
              <Votes review={review} />
              <p>{`posted by: ${review.owner}`}</p>
              <img
                className="reviewsImage"
                src={`${review.review_img_url}`}
                alt="what the reviewer has chosen to represent the game"
              />
              <p>{review.review_body}</p>
            </div>
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
      {isLoadingComments ? (
        <LoadingScreen className="comments" />
      ) : (
        <section>
          {hasComments ? (
            <section className="comments">
              <h1>COMMENTS</h1>
              <button
                className={
                  sortCommentsByVotes
                    ? "comments comments__sortButton"
                    : "comments comments__sortButton--state-active"
                }
                onClick={() => {
                  setSortCommentsByVotes(false);
                  setIsLoadingComments(true);
                }}
              >
                posted on
              </button>
              <button
                className={
                  sortCommentsByVotes
                    ? "comments comments__sortButton--state-active"
                    : "comments comments_sortButton"
                }
                onClick={() => {
                  setSortCommentsByVotes(true);
                  setIsLoadingComments(true);
                }}
              >
                votes
              </button>
              <ul className="comments comments__list">
                {commentsOnReview.map((comment) => {
                  return (
                    <li key={comment.comment_id}>
                      <h3 className="comments comments__list comments__list__poster">{`posted by: ${comment.author}`}</h3>
                      <p>{comment.body}</p>
                      <p>posted on: {dateMaker(comment.created_at)}</p>
                      <p>votes: {comment.votes}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : (
            <h2>Looks like this review has no comments! Why not leave one?</h2>
          )}
        </section>
      )}
    </div>
  );
};

export default ReviewById;
