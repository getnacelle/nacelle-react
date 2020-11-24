import NacelleClient from '@nacelle/client-js-sdk';

const settings = {
  id: process.env.GATSBY_NACELLE_SPACE_ID,
  token: process.env.GATSBY_NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: 'https://hailfrequency.com/v2/graphql',
  useStatic: false
};

const $nacelle = new NacelleClient(settings);

export default $nacelle;
