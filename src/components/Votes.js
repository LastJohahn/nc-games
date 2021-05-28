import React, { useState } from "react";
import { voteAdder } from "../utils/api";

const Votes = ({ review }) => {
  const [reviewVotes, setReviewVotes] = useState(0);
  const [voteError, setVoteError] = useState(false);

  const isDisabled = reviewVotes > 0;

  return (
    <div className="votes">
      <p>{`votes: ${review.votes + reviewVotes}`}</p>
      <button
        className="votes votes__button"
        disabled={isDisabled}
        onClick={() => {
          setReviewVotes(1);
          voteAdder(review.review_id)
            .then(() => {
              setVoteError(false);
            })
            .catch((err) => {
              setVoteError(true);
            });
        }}
      >
        VOTE
      </button>
      {voteError && <p>Oops, voting is not working at the moment!</p>}
    </div>
  );
};

export default Votes;
