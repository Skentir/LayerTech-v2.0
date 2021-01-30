const { envPort } = require('../api/config');

module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: `http://localhost:${envPort}`,
          changeOrigin: true
        },
      }
    }
  },
};
