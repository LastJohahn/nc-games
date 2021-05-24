import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://nc-games-johann.herokuapp.com/api",
});

export const getReviews = async (reviews) => {
  const { data } = await gamesApi.get("reviews");
  return data;
};
