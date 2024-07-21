const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
        transpileDependencies: true
      })
    ],
  },
  pwa: {
    workboxPluginMode: 'InjectManifest', // InjectManifest to inject custom service worker
    workboxOptions: {
      swSrc: '@/serviceWorker', // Specify the source of custom service worker file
    },
  },
  devServer: {
    proxy: {
      // Proxy API requests to OpenWeatherMap
      '/weather': {
        target: 'https://api.openweathermap.org',
        changeOrigin: true,
        pathRewrite: { '^/weather': '' },
      },
      // Proxy API requests to local backend
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
    historyApiFallback: true,
  },
})
