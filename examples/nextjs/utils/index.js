/**
 * Use Nacelle data to create the `paths` object expected by `getStaticPaths()`
 * @param {Object} options
 * @param {Object[]} options.data - the Nacelle data containing the properties that will make up the `paths`
 * @param {String[]} options.dataProperties - the properties of objects in the `data` which should be included in the `params` given to `getStaticPaths()`
 * @returns {{ params: Object }[]} the `paths` expected by `getStaticPaths()`
 */
export function dataToPaths({ data, dataProperties = ['handle'] }) {
  return data.map((entry) => {
    const params = {};
    dataProperties.forEach((property) => (params[property] = entry[property]));

    return { params };
  });
}
