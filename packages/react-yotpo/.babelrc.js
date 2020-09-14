module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { esmodules: true } }],
        '@babel/preset-typescript'
      ]
    }
  }
};
