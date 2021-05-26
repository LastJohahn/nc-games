import React from "react";
import { useParams } from "react-router-dom";

const ReviewById = () => {
  const { review_id } = useParams();

  return (
    <div>
      <h1>{review_id}</h1>
    </div>
  );
};

export default ReviewById;
