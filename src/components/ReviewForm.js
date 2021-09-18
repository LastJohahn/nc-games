import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { UserContext } from "../contexts/User";

const ReviewForm = ({ categories }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewDesigner, setReviewDesigner] = useState("");
  const [reviewCategory, setReviewCategory] = useState("");
  const [isReviewPosted, setIsReviewPosted] = useState(false);
  const [isReviewError, setIsReviewError] = useState(false);

  return (
    <div className="reviewForm">
      <form
        className="reviewForm__form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label htmlFor="reviewTitle">REVIEW TITLE</label>
        <br />
        <input
          id="reviewTitle"
          name="reviewTitle"
          type="text"
          onChange={(e) => {
            setReviewTitle(e.target.value);
          }}
        />
        <br />
        <label>DESIGNER</label>
        <br />
        <input
          id="reviewDesigner"
          name="reviewDesigner"
          type="text"
          onChange={(e) => {
            setReviewDesigner(e.target.value);
          }}
        />
        <br />
        <label htmlFor="reviewCategory">CATEGORY</label>
        <br />
        <select
          id="reviewCategory"
          name="reviewCategory"
          onChange={(e) => {
            setReviewCategory(e.target.value);
          }}
        >
          {categories.map((category) => {
            return (
              <option value={category.slug} key={category.slug}>
                {category.slug}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="reviewBody">REVIEW BODY</label>
        <br />
        <textarea
          id="reviewBody"
          name="reviewBody"
          onChange={(e) => {
            setReviewBody(e.target.value);
          }}
        />
        <br />
        <input type="submit" value="POST REVIEW"></input>
      </form>
    </div>
  );
};

export default ReviewForm;
