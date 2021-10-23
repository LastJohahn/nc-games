import React, { useState } from "react";
import { voteAdder } from "../utils/api";
import "../css/Votes.css";

const Votes = ({ review }) => {
  const [reviewVotes, setReviewVotes] = useState(0);
  const [voteError, setVoteError] = useState(false);

  const isDisabled = reviewVotes > 0;

  const vote = () => {
    setReviewVotes(1);
    voteAdder(review.review_id)
      .then(() => {
        setVoteError(false);
      })
      .catch((err) => {
        setVoteError(true);
      });
  };

  return (
    <div className="votes">
      <p>{`${review.votes + reviewVotes} votes`}</p>
      <button
        className="votesButton"
        disabled={isDisabled}
        onClick={() => {
          vote();
        }}
      >
        VOTE
      </button>
      {voteError && <p>Oops, voting is not working at the moment!</p>}
    </div>
  );
};

export default Votes;
