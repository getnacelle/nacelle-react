#!/usr/bin/env node

const { args } = require('./util');

const store = args.store;
const token = args.token;

const chalk = require('chalk');
const { Interphase } = require('@nacelle/interphase-node');

const log = (...str) => console.log(chalk.cyanBright(...str));
const logInfo = (...str) => console.log(chalk.yellow(...str));
const logError = (...str) => console.log(chalk.redBright(...str));

log(`Initializing Shop: ${store}`);

addMetaFields();

async function addMetaFields() {
  console.log({ store, token });
  const interphase = new Interphase(store, token);

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
    ({ node }) => node.namespace === 'subscriptions'
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
