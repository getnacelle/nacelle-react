const { parsed } = require('dotenv-safe').config();

export default function (config, env, helpers) {
  // dotenv injection
  const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
  Object.assign(
    plugin.definitions,
    Object.keys(parsed).reduce(
      (env, key) => ({
        ...env,
        [`process.env.${key}`]: JSON.stringify(parsed[key])
      }),
      {}
    )
  );
}
