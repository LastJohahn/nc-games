import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-johann.herokuapp.com/api",
});

export const getReviews = async (sortBy) => {
  if (sortBy === "") {
    const { data } = await gamesApi.get("/reviews");
    return data;
  } else {
    const { data } = await gamesApi.get(`/reviews?sort_by=${sortBy}`);
    return data;
  }
};

export const getReviewById = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}`);
  return data;
};
