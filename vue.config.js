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
      swSrc: '@/service-worker', // Specify the source of custom service worker file
    },
  },
  devServer: {
    proxy: "https://api.openweathermap.org/",
    historyApiFallback: true,
  },
})
