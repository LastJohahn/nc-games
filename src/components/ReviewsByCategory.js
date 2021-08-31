import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getReviews } from "../utils/api";
import ReviewCard from "./ReviewCard.js";
import WrongPath from "./WrongPath";

const ReviewsByCategory = ({ reviews, setReviews }) => {
  const { category } = useParams();

  useEffect(() => {
    getReviews("").then((result) => {
      const reviewsToUse = result.reviews;
      setReviews(reviewsToUse);
    });
  }, [setReviews]);

  const reviewsInCategory = [];
  let reviewLoopCounter = 0;

  return (
    <div className="reviewsByCategory">
      <h1>{category.replaceAll("-", " ").toUpperCase()}</h1>
      <ul className="reviewsByCategory reviewsByCategory__list">
        {
          // eslint-disable-next-line
          reviews.map((review) => {
            if (review.category === category) {
              reviewsInCategory.push(review);
              reviewLoopCounter++;
              return <ReviewCard review={review} key={review.review_id} />;
            } else if (
              review.category !== category &&
              reviewLoopCounter !== reviews.length - 1
            ) {
              reviewLoopCounter++;
            } else if (
              review.category !== category &&
              reviewLoopCounter === reviews.length - 1 &&
              reviewsInCategory.length === 0
            ) {
              return <WrongPath />;
            }
          })
        }
      </ul>
    </div>
  );
};

export default ReviewsByCategory;
