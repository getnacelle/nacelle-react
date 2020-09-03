require('dotenv-safe').config();

const chalk = require('chalk');
const { Interphase } = require('@nacelle/interphase-node');

const log = (...str) => console.log(chalk.cyanBright(...str));
const logInfo = (...str) => console.log(chalk.yellow(...str));
const logError = (...str) => console.log(chalk.redBright(...str));

log(`Initializing Shop: ${process.env.SHOPIFY_STORE_NAME}`);

addMetaFields();

async function addMetaFields() {
  console.log({
    store: process.env.SHOPIFY_STORE_NAME,
    token: process.env.SHOPIFY_ACCESS_TOKEN
  });
  const interphase = new Interphase(
    process.env.SHOPIFY_STORE_NAME,
    process.env.SHOPIFY_ACCESS_TOKEN
  );

  try {
    log('Exposing ReCharge metafields...');
    await interphase.Recharge.createAll();

    const { matchedFields, isValid, missingFields } = validateMetafields(
      interphase.Recharge.rechargeKeys,
      interphase.metafieldStorefrontVisibilities.edges
    );

    if (!isValid) {
      throw new Error(
        `Not all metafields exposed. Missing fields: ${missingFields}`
      );
    }

    log(`Success! Added metafields: ${matchedFields}`);
  } catch (err) {
    const { errors, status } = err.response;

    logError('============= Error =============\n');
    logError(`Status: ${status}\n`, errors);
    logInfo(
      '\nPlease double check you are passing the correct store and token'
    );
    logError('\n=================================');
  }
}

function validateMetafields(requiredFields, exposedMetafields) {
  const subscriptions = exposedMetafields.filter(
    ({ node }) => node.namespace === 'subscription'
  );

  const matchedFields = subscriptions
    .filter(({ node }) => requiredFields.includes(node.key))
    .map(({ node }) => node.key);

  const isValid = matchedFields.length === requiredFields.length;

  const missingFields = subscriptions
    .filter(({ node }) => !requiredFields.includes(node.key))
    .map(({ node }) => node.key);

  return {
    matchedFields: JSON.stringify(matchedFields),
    isValid,
    missingFields: JSON.stringify(missingFields)
  };
}
