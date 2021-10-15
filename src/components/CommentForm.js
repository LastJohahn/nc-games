import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { postComment } from "../utils/api";
import "../css/CommentForm.css";

const CommentForm = ({ review_id, setCommentsOnReview }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [isCommentError, setIsCommentError] = useState(false);

  return (
    <div className="commentForm">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          postComment(review_id, user.username, comment)
            .then((comment) => {
              setCommentsOnReview((currComments) => {
                const newComments = [comment[0], ...currComments];
                setComment("");
                return newComments;
              });
            })
            .catch((err) => {
              console.log(err);
              setIsCommentError(true);
            });
        }}
      >
        <label htmlFor="commentText" className="form__label">
          SUBMIT A COMMENT
        </label>
        <br />
        <textarea
          value={comment}
          type="textarea"
          id="commentText"
          name="commentText"
          className="form form__textarea"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          required
        ></textarea>
        <br />
        <input
          type="submit"
          value="POST COMMENT"
          className="form form__submit"
        ></input>
        {isCommentError && (
          <p className="p p__error">
            Oops, something went wrong with posting your comment!
          </p>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
