import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { getReviews } from "../utils/api";

const ReviewsByCategory = ({ reviews, setReviews, categories }) => {
  const { category } = useParams();

  useEffect(() => {
    getReviews("").then((result) => {
      const reviewsToUse = result.reviews;
      setReviews(reviewsToUse);
    });
  }, []);

  return (
    <div classname="reviewsByCategory">
      <h1>{category.replace("-", " ").toUpperCase()}</h1>
      <ul className="reviewsByCategory reviewsByCategory__list">
        {reviews.map((review) => {
          if (review.category === category) {
            return (
              <li key={review.review_id}>
                <Link to={`/reviews/${review.review_id}`}>
                  <h2 className="reviews reviews__title">{review.title}</h2>
                </Link>
                <p>{`comments: ${review.comment_count}`}</p>
                <p>{`votes: ${review.votes}`}</p>
                <p>{`posted by: ${review.owner}`}</p>
                <img
                  src={review.review_img_url}
                  alt="image reviewer has chosen to represent the game"
                ></img>
                <p>{review.review_body}</p>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ReviewsByCategory;
