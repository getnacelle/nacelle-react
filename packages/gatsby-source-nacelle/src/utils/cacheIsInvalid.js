module.exports = function (timestamp, pluginOptions) {
  return (
    Date.now() - timestamp >
    (pluginOptions.cacheDuration || 24 * 60 * 60 * 1000)
  );
};
