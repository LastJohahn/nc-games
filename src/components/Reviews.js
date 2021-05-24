import React, { useEffect, useState } from "react";
import { getReviews } from "../utils/api.js";

const Reviews = () => {
  const [reviews, setReviews] = useState();

  useEffect(() => {
    getReviews().then((result) => {
      setReviews(result.reviews);
    });
  }, []);

  return (
    <div className="reviews">
      <h2>test</h2>
      <ul>
        <li>review one</li>
        <li>review two</li>
        <li>review three</li>
      </ul>
    </div>
  );
};

export default Reviews;
