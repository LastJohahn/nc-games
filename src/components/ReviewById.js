import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getCommentsById, getReviewById } from "../utils/api";
import { UserContext } from "../contexts/User";
import CommentForm from "./CommentForm.js";
import Votes from "./Votes.js";
import WrongPath from "./WrongPath.js";
import LoadingScreen from "./LoadingScreen";
import "../css/ReviewById.css";

const ReviewById = () => {
  const history = useHistory();

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

  const routeChangeUser = (username) => {
    let path = `/users/${username}`;
    history.push(path);
  };

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
      <div className="reviewSolo">
        {isReview ? (
          <div>
            <h2 className="header">REVIEW</h2>
            <div className="reviewCardSolo">
              <div className="ownerButtonContainer">
                <button
                  className="ownerButtonIndivReview"
                  onClick={() => {
                    routeChangeUser(review.owner);
                  }}
                >{`${review.owner}`}</button>
              </div>
              <h2 className="reviews__title">{review.title}</h2>
              <img
                className="reviewsImage"
                src={`${review.review_img_url}`}
                alt="what the reviewer has chosen to represent the game"
              />
              <p className="reviewBody">{review.review_body}</p>
              <div className="reviewData">
                <p>{`${review.comment_count} comments`}</p>
                <Votes review={review} />
              </div>
            </div>
          </div>
        ) : (
          <WrongPath />
        )}
      </div>
      {isUser ? (
        <CommentForm
          review_id={review_id}
          setCommentsOnReview={setCommentsOnReview}
        />
      ) : (
        <p>Please log in to leave a comment!</p>
      )}
      {isLoadingComments ? (
        <LoadingScreen className="comments" />
      ) : (
        <section>
          {hasComments ? (
            <section className="comments">
              <h2 className="header">COMMENTS</h2>
              <div className="commentsCard">
                <div className="commentsSortButtons">
                  <button
                    className={
                      sortCommentsByVotes
                        ? "sortButton"
                        : "sortButton--state-active"
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
                        ? "sortButton--state-active"
                        : "sortButton"
                    }
                    onClick={() => {
                      setSortCommentsByVotes(true);
                      setIsLoadingComments(true);
                    }}
                  >
                    votes
                  </button>
                </div>
                <ul className="comments comments__list">
                  {commentsOnReview.map((comment) => {
                    return (
                      <li key={comment.comment_id} className="commentCard">
                        <h3 className="comments comments__list comments__list__poster">{`posted by ${comment.author}`}</h3>
                        <p className="commentBody">{comment.body}</p>
                        <div className="commentData">
                          <p>posted on {dateMaker(comment.created_at)}</p>
                          <p>{comment.votes} votes</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
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
