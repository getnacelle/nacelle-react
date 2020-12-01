/**
 * Shallow replace an object's properties
 * @param {Object} obj - the object containing the old properties
 * @param {Object[]} keyMappings - an array of key mappings
 * @param {string} keyMappings[].oldKey - the property to be replaced
 * @param {string} keyMappings[].newKey - the property to replace with
 * @returns {Object} New object with updated properties
 */
module.exports = function (obj, keyMappings) {
  const o = { ...obj };
  try {
    for (const { oldKey, newKey } of keyMappings) {
      delete Object.assign(o, { [newKey]: o[oldKey] })[oldKey];
    }

    return o;
  } catch (err) {
    throw new Error(err);
  }
};
