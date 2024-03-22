export const getDataByKey = (posts, key) => {
  const data = new Set();

  posts.forEach((post) => {
    const keyValue = post.data[key];
    if (keyValue !== undefined) {
      if (Array.isArray(keyValue)) {
        keyValue.forEach((i) => {
          data.add(i);
        });
      } else {
        data.add(keyValue);
      }
    }
  });

  return [...data];
};

export function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
