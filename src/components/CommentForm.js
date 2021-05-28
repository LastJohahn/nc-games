import React, { useState } from "react";
import { postComment } from "../utils/api";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  return (
    <div className="commentForm">
      <form
        className="commentForm__form"
        onSubmit={(e) => {
          e.preventDefault();

          // make utils function to post comment
          // call in here
          // update comments (have them be their own state or do it via rerender?)
          // clear form
        }}
      >
        <label htmlFor="commentText">SUBMIT A COMMENT</label>
        <br></br>
        <textarea
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
      </form>
    </div>
  );
};

export default CommentForm;
