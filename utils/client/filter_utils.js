export const filterPostsByLabel = (posts, selectedLabel) => {
  return posts.filter((post) => post.data.labels.includes(selectedLabel));
};
