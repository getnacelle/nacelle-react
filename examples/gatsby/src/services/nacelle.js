import NacelleClient from '@nacelle/client-js-sdk';

const settings = {
  id: process.env.GATSBY_NACELLE_SPACE_ID,
  token: process.env.GATSBY_NACELLE_GRAPHQL_TOKEN,
  nacelleEndpoint: process.env.GATSBY_NACELLE_ENDPOINT,
  useStatic: false
};

const $nacelle = new NacelleClient(settings);

export default $nacelle;
