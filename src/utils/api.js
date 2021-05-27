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
