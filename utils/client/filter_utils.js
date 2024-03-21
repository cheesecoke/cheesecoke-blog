export const filterPostsByLabel = (posts, selectedLabel) => {
  if (selectedLabel === '') return posts;
  return posts.filter((post) => post.data.labels.includes(selectedLabel));
};

export const getCategoriesByLabel = (posts) => {
  const categories = new Set();

  posts.forEach((post) => {
    post.data.labels.forEach((label) => {
      categories.add(label);
    });
  });

  return [...categories];
};

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
