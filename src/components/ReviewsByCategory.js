import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getReviews } from "../utils/api";
import ReviewCard from "./ReviewCard.js";
import WrongPath from "./WrongPath";
import LoadingScreen from "./LoadingScreen.js";

const ReviewsByCategory = ({ reviews, setReviews }) => {
  const { category } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews("").then((result) => {
      setIsLoading(false);
      const reviewsToUse = result.reviews;
      setReviews(reviewsToUse);
    });
  }, [setReviews]);

  const reviewsInCategory = [];
  let reviewLoopCounter = 0;

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="reviewsByCategory">
      <h2 className="header reviewsByCategory__header">
        {category.replaceAll("-", " ").toUpperCase()}
      </h2>
      <ul className="reviews__list">
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
