import React, { useState } from "react";
import { voteAdder } from "../utils/api";

const Votes = ({ review }) => {
  const [reviewVotes, setReviewVotes] = useState(review.votes);
  const [voteError, setVoteError] = useState(false);

  return (
    <div className="votes">
      <p>{`votes: ${reviewVotes}`}</p>
      <button
        className="votes votes__button"
        onClick={() => {
          voteAdder(review.review_id)
            .then(() => {
              setVoteError(false);
              setReviewVotes((currVotes) => {
                let newVotes = currVotes + 1;
                return newVotes;
              });
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
