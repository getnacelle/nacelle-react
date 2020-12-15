module.exports = function (itemInIndex, lastFetched) {
  return (
    lastFetched === undefined ||
    (lastFetched !== undefined &&
      itemInIndex.indexedAt * 1000 - lastFetched > 0)
  );
};
