import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-api-lastjohahn.herokuapp.com/api",
});

export const getReviews = async (sortBy, page) => {
  if (sortBy === "") {
    try {
      const { data } = await gamesApi.get(`/reviews?p=${page}`);
      return data;
    } catch (err) {
      console.log(err, "getReviews no sort");
      return [];
    }
  } else {
    try {
      const { data } = await gamesApi.get(
        `/reviews?sort_by=${sortBy}&p=${page}`
      );
      return data;
    } catch (err) {
      console.log(err, "getReviews sort");
      return [];
    }
  }
};

export const getReviewById = async (review_id) => {
  try {
    const { data } = await gamesApi.get(`/reviews/${review_id}`);
    return data;
  } catch (err) {
    console.log(err, "getREviewsById");
    return {};
  }
};

export const getAllReviews = async () => {
  try {
    const { data } = await gamesApi.get("/reviews?limit=10000");
    return data;
  } catch (err) {
    console.log(err, "getAllReviews");
    return [];
  }
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
  return response.data.comment;
};
