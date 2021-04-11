import countrycitystatejson from 'countrycitystatejson'

/**
 * Use the countrycitystatejson package to fetch the provinces belonging to a country
 * @param {Object} req - HTTP request object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 * @param {Object} res - HTTP response object (see https://vercel.com/docs/runtimes#official-runtimes/node-js/node-js-request-and-response-objects/node-js-helpers)
 */
export default function (_req, res) {
  try {
    res.status(200).send(countrycitystatejson.getCountries())
  } catch (err) {
    res
      .status(500)
      .send(
        `Could not find get countries from countries database: ${err.message}`
      )
  }
}
