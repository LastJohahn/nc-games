import React, { useEffect, useState } from "react";
import { getCategories, getReviews } from "../utils/api";

const ReviewsByCategory = ({ reviews, setReviews }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getReviews("").then((result) => {
      const reviewsToUse = result.reviews;
      setReviews(reviewsToUse);
    });
  }, []);

  useEffect(() => {
    getCategories().then((result) => {
      const categoriesToUse = result.categories;
      setCategories(categoriesToUse);
    });
  }, []);

  console.log(categories);

  return (
    <div classname="reviewsByCategory">
      <h1>CATEGOREH</h1>
      <ul className="reviewsByCategory reviewsByCategory__list"></ul>
    </div>
  );
};

export default ReviewsByCategory;

// state category
// prop drill reviews
