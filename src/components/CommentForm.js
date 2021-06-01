import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { postComment } from "../utils/api";

const CommentForm = ({ review_id, setCommentsOnReview }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const [isCommentError, setIsCommentError] = useState(false);

  return (
    <div className="commentForm">
      <form
        className="commentForm__form"
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
        <label htmlFor="commentText">SUBMIT A COMMENT</label>
        <br></br>
        <textarea
          value={comment}
          type="textarea"
          id="commentText"
          name="commentText"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          required
        ></textarea>
        <br></br>
        <input type="submit" value="POST COMMENT"></input>
        {isCommentError && (
          <p>Oops, something went wrong with posting your comment!</p>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
