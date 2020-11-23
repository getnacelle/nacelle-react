const isObject = require('lodash.isobject');
const transform = require('lodash.transform');

// courtesy of Ori Drori (https://stackoverflow.com/a/39126851/6387812)
function replaceKeysDeep(obj, keysMap) {
  // keysMap = { oldKey1: newKey1, oldKey2: newKey2, etc...
  return transform(obj, function (result, value, key) {
    // transform to a new object

    var currentKey = keysMap[key] || key; // if the key is in keysMap use the replacement, if not use the original key

    result[currentKey] = isObject(value)
      ? replaceKeysDeep(value, keysMap)
      : value; // if the key is an object run it through the inner function - replaceKeys
  });
}

module.exports = replaceKeysDeep;
