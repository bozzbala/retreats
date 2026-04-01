const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
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
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            /*
            options: {
              sourceMap: true,
            },
            */
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            /*
            options: {
              sourceMap: true,
            },
            */
          },
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import "~@/styles/common.scss";`,
              //sourceMap: true,
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

  optimization: {
    nodeEnv: 'production',
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
};
