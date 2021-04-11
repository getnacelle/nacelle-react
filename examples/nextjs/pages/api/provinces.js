import countrycitystatejson from 'countrycitystatejson';

/**
 * Use the countrycitystatejson package to fetch the provinces belonging to a country
 * @param {Object} req - HTTP request object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 * @param {Object} req.body - HTTP request body
 * @param {Object} req.body.countryShortName - Country short name code (e.g. 'US' for United States, 'AR' for Argentina)
 * @param {Object} res - HTTP response object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 */
export default function (req, res) {
  const { countryShortName } = JSON.parse(req.body);
  try {
    if (!countryShortName) {
      res
        .status(400)
        .send(
          `'countryShortName' is required in the POST body by /api/get-provinces`
        );
    } else {
      res
        .status(200)
        .send(countrycitystatejson.getStatesByShort(countryShortName));
    }
  } catch (err) {
    res
      .status(500)
      .send(
        `Could not find states or provinces for country with name ${countryShortName} in countries database: ${err.message}`
      );
  }
}
