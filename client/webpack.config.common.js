const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: "chunks/[name].[contenthash].js",
    assetModuleFilename: 'assets/[name].[contenthash][ext][query]',
    clean: true,
  },

  resolve: {
    alias: {
       "@": path.resolve(__dirname, "src"),
    }
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "styleTag" } },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: "style-loader", options: { injectType: "styleTag" } },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import "~@/styles/common.scss";`,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "chunks/[name].[contenthash].css",
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    })
  ],
};
