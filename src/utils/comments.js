export const commentsSortBy = (reviews) => {
  reviews.sort((a, b) => {
    return b.comment_count - a.comment_count;
  });
};
