import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getReviews } from "../utils/api";
import ReviewCard from "./ReviewCard.js";

const ReviewsByCategory = ({ reviews, setReviews }) => {
  const { category } = useParams();

  useEffect(() => {
    getReviews("").then((result) => {
      const reviewsToUse = result.reviews;
      setReviews(reviewsToUse);
    });
  }, [setReviews]);

  return (
    <div className="reviewsByCategory">
      <h1>{category.replaceAll("-", " ").toUpperCase()}</h1>
      <ul className="reviewsByCategory reviewsByCategory__list">
        {
          // eslint-disable-next-line
          reviews.map((review) => {
            if (review.category === category) {
              return <ReviewCard review={review} key={review.review_id} />;
            }
          })
        }
      </ul>
    </div>
  );
};

export default ReviewsByCategory;
