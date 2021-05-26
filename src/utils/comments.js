export const commentAttacher = (reviews, commentCount) => {
  // then after that's done sort by comment_count
  for (const commentObj of commentCount) {
    const keyIdStr = Object.keys(commentObj);
    const keyId = parseInt(keyIdStr[0]);
    for (let i = 0; i < reviews.length; i++) {
      if (keyId === reviews[i].review_id) {
        reviews[i].comment_count = commentObj[keyIdStr];
      }
    }
  }
};

export const commentsSortBy = (commentCount, sortByComments) => {};
