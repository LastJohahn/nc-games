import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { postReview } from "../utils/api";
import ReviewCard from "./ReviewCard.js";

const ReviewForm = ({ categories }) => {
  const { user } = useContext(UserContext);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewDesigner, setReviewDesigner] = useState("");
  const [reviewCategory, setReviewCategory] = useState("strategy");
  const [isReviewPosted, setIsReviewPosted] = useState(false);
  const [isReviewError, setIsReviewError] = useState(false);
  const [postedReview, setPostedReview] = useState({});

  return (
    <div className="reviewForm">
      <h2 className="header reviewForm__header">SUBMIT A REVIEW</h2>
      <form
        className="reviewForm__form"
        onSubmit={(e) => {
          e.preventDefault();
          postReview(
            user.username,
            reviewTitle,
            reviewBody,
            reviewDesigner,
            reviewCategory
          )
            .then((review) => {
              setIsReviewPosted(true);
              setPostedReview(review);
            })
            .catch((err) => {
              setIsReviewError(true);
              console.log(err);
            });
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
        {isReviewError && (
          <p>Oops, something went wrong with posting your review!</p>
        )}
      </form>
      {isReviewPosted && (
        <ReviewCard review={postedReview} key={postedReview.review_id} />
      )}
    </div>
  );
};

export default ReviewForm;
