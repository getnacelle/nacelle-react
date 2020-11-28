/**
 * Shallow replace an object property
 * @param {Object} obj
 * @param {string} oldKey
 * @param {string} newKey
 * @returns {Object} New object with updated property
 */
module.exports = function (obj, oldKey, newKey) {
  delete Object.assign(obj, { [newKey]: obj[oldKey] })[oldKey];
  return obj;
};
