module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    const tsRuleIndex = config.module.rules.findIndex((rule) =>
      rule.test.toString().includes('mjs|tsx?|jsx?')
    );
    const babelLoaderIndex = config.module.rules[tsRuleIndex].use.findIndex(
      (loader) => loader.loader === 'babel-loader'
    );

    config.module.rules[tsRuleIndex].use[babelLoaderIndex].options.presets.push(
      require.resolve('@emotion/babel-preset-css-prop')
    );

    return config;
  }
};
