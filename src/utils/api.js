import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-johann.herokuapp.com/api",
});

export const getReviews = async (sortBy) => {
  if (sortBy === "") {
    try {
      const { data } = await gamesApi.get("/reviews");
      return data;
    } catch (err) {
      console.log(err, "getReviews no sort");
      return [];
    }
  } else {
    try {
      const { data } = await gamesApi.get(`/reviews?sort_by=${sortBy}`);
      return data;
    } catch (err) {
      console.log(err, "getReviews sort");
      return [];
    }
  }
};

export const getReviewById = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}`);
  return data;
};

export const getCommentsById = async (review_id) => {
  try {
    const { data } = await gamesApi.get(`/reviews/${review_id}/comments`);
    return data;
  } catch (err) {
    if (err.status === 404) {
      return [];
    } else {
      console.log(err);
      return [];
    }
  }
};

export const getCategories = async () => {
  const { data } = await gamesApi.get("/categories");
  return data;
};

export const voteAdder = async (review_id) => {
  const { data } = await gamesApi.patch(`/reviews/${review_id}`, {
    inc_votes: 1,
  });
  return data;
};

export const postComment = async (review_id, usernamePassed, bodyPassed) => {
  const response = await gamesApi.post(`/reviews/${review_id}/comments`, {
    username: usernamePassed,
    body: bodyPassed,
  });
  return response;
};
