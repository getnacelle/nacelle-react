import Storefront from '@nacelle/storefront-sdk';

const settings = {
  token: process.env.GATSBY_NACELLE_STOREFRONT_TOKEN,
  storefrontEndpoint: process.env.GATSBY_NACELLE_STOREFRONT_ENDPOINT
};

const $nacelle = new Storefront(settings);

export default $nacelle;
