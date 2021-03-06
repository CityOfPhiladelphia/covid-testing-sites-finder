const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  filenameHashing: false,
  //publicPath: "/covid-testing/dev/",
  publicPath: "/covid-testing-sites/",
  configureWebpack: {
    plugins: [
      new Visualizer({ filename: './statistics.html' }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](leaflet)[\\/]/,
            name: 'leaflet-chunk',
            chunks: 'all',
          },
          new: {
            test: /[\\/]node_modules[\\/](esri-leaflet)[\\/]/,
            name: 'esri-leaflet-chunk',
            chunks: 'all',
          },
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.symlinks(false);
  },
  lintOnSave: true,

  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: '@import "@/scss/global.scss;',
  //     },
  //   },
  // },

  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/_variables.scss";
              @import "@/scss/_mixins.scss";`,
      },
    },
  },

  // pluginOptions: {
  // //   'style-resources-loader': {
  // //     preProcessor: 'scss',
  // //     patterns: [
  // //       path.resolve(__dirname, '@/styles/global.scss'),
  // //     ],
  // //   },
  // // },
  // },
  assetsDir: 'static',
  transpileDependencies: [
    // can be string or regex
    '@phila/pinboard',
    '@phila/vue-comps',
    '@phila/vue-mapping',
    '@phila/vue-datafetch',
    // /other-dep/
  ],

};
