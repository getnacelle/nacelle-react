import NacelleClient from '@nacelle/client-js-sdk';

export default new NacelleClient({
  // for a full list of configuration options, please see
  // https://docs.getnacelle.com/api-reference/client-js-sdk.html
  id: process.env.NEXT_PUBLIC_NACELLE_SPACE_ID,
  token: process.env.NEXT_PUBLIC_NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.NEXT_PUBLIC_NACELLE_ENDPOINT,
  useStatic: false
});
