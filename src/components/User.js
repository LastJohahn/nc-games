import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAllReviews } from "../utils/api";
import LoadingScreen from "./LoadingScreen";
import ReviewCard from "./ReviewCard";

const User = ({ reviews, setReviews }) => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllReviews().then((result) => {
      const reviewsByUser = result.reviews.filter(
        (review) => review.owner === username
      );
      setReviews(reviewsByUser);
      setIsLoading(false);
    });
  }, [username, setReviews]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div>
      <h2 className="header user__header">{username.toUpperCase()}</h2>
      <section className="reviews">
        <ul className="reviews reviews__list">
          {reviews.map((review) => {
            return <ReviewCard review={review} key={review.review_id} />;
          })}
        </ul>
      </section>
    </div>
  );
};

export default User;
