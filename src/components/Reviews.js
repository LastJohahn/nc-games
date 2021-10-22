import React, { useEffect, useState } from "react";
import { getAllReviews, getReviews } from "../utils/api.js";
import { commentsSortBy } from "../utils/comments.js";
import ReviewCard from "./ReviewCard.js";
import LoadingScreen from "./LoadingScreen.js";
import "../css/Reviews.css";

const Reviews = ({ reviews, setReviews }) => {
  const [sortBy, setSortBy] = useState("");
  const [sortByComments, setSortByComments] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(100);

  useEffect(() => {
    getAllReviews().then((result) => {
      let maxPage = Math.floor(result.reviews.length / 10) + 1;
      setPageLimit(maxPage);
    });
  }, []);

  useEffect(() => {
    getReviews(sortBy, page).then((result) => {
      setIsLoading(false);
      const reviewsToUse = result.reviews;
      if (sortByComments === false) {
        setReviews(reviewsToUse);
      } else if (sortByComments === true) {
        commentsSortBy(reviewsToUse);
        setReviews(reviewsToUse);
      }
    });
  }, [sortBy, sortByComments, setReviews, page]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <div className="reviews">
      <h2 className="reviews__header">REVIEWS</h2>
      <div className="reviews__buttons">
        <div className="pageButtons">
          <button
            className={page === 1 ? "pageButton--state-inactive" : "pageButton"}
            disabled={page === 1}
            onClick={() => {
              let newPage = page - 1;
              setPage(newPage);
            }}
          >
            PREVIOUS PAGE
          </button>
          <button
            className={
              page === pageLimit ? "pageButton--state-inactive" : "pageButton"
            }
            disabled={page === pageLimit}
            onClick={() => {
              let newPage = page + 1;
              setPage(newPage);
            }}
          >
            NEXT PAGE
          </button>
        </div>
        <div className="sortButtons">
          <button
            className={
              sortBy === "" && sortByComments === false
                ? "sortButton--state-active"
                : "sortButton"
            }
            onClick={() => {
              setSortByComments(false);
              setSortBy("");
            }}
          >
            posted last
          </button>
          <button
            className={
              sortBy === "votes" && sortByComments === false
                ? "sortButton--state-active"
                : "sortButton"
            }
            onClick={() => {
              setSortByComments(false);
              setSortBy("votes");
            }}
          >
            votes
          </button>
          <button
            className={
              sortByComments === false
                ? "sortButton"
                : "sortButton--state-active"
            }
            onClick={() => {
              setSortByComments(true);
            }}
          >
            comments
          </button>
        </div>
      </div>
      <ul className="reviews__list">
        {reviews.map((review) => {
          return <ReviewCard review={review} key={review.review_id} />;
        })}
      </ul>
    </div>
  );
};

export default Reviews;
