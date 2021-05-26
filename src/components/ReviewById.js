import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../utils/api";

const ReviewById = () => {
  const [review, setReview] = useState([]);
  const { review_id } = useParams();

  useEffect(() => {
    getReviewById(review_id).then((result) => {
      //   console.log(result.review[0]);
      setReview(result.review[0]);
    });
  }, [review_id]);

  return (
    <div>
      <h1>{review.title}</h1>
      <p>{`comments: ${review.comment_count}`}</p>
      <p>{`votes: ${review.votes}`}</p>
      <p>{`posted by: ${review.owner}`}</p>
      {/* <img src={`${review.review_img_url}`} /> */}
      <p>{review.review_body}</p>
    </div>
  );
};

export default ReviewById;
