import NacelleClient from '@nacelle/client-js-sdk';

export default new NacelleClient({
  // for a full list of configuration options, please see
  // https://docs.getnacelle.com/api-reference/client-js-sdk.html
  id: process.env.NACELLE_SPACE_ID,
  token: process.env.NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: 'https://hailfrequency.com/v3/graphql',
  useStatic: false
});
