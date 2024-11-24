const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { experiments } = require("webpack");

module.exports = [
  // 打包MyAxios
  {
    mode: "none",
    context: path.resolve(__dirname, "./"),
    entry: "./src/lib/MyAxios.ts",
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "bundle.js",
      chunkFilename: "chunk-[name]-[chunkhash:8].js",
      clean: true,
    },
    resolve: {
      mainFiles: ["index"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      descriptionFiles: ["package.json"],
      mainFields: ["main"],
      modules: ["./lib", "../node_modules"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts|tsx/,
          use: ["ts-loader"],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CSSMinimizerWebpackPlugin({
          parallel: true
        }),
        new TerserWebpackPlugin({
          parallel: true
        })
      ]
    },
  },
  // 打包DEMO
  {
    mode: "none",
    context: path.resolve(__dirname, "./"),
    entry: "./src/index.ts",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "js/bundle-[name]-[chunkhash:8].js",
      chunkFilename: "js/chunk-[name]-[chunkhash:8].js",
      clean: true,
      library: {
        type: 'module'
      },
    },
    experiments: {
      outputModule: true
    },
    resolve: {
      mainFiles: ["index"],
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      descriptionFiles: ["package.json"],
      mainFields: ["main"],
      modules: ["./lib", "../node_modules"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.ts|tsx/,
          use: ["ts-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: "body",
        template: "./template.html",
        minify: process.env.NODE_ENV === "production",
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new CSSMinimizerWebpackPlugin({
          parallel: true
        })
      ]
    },
    devServer: {
      host: "0.0.0.0",
      port: 8888,
      proxy: [
        {
          context: ['/api'],             // 匹配的路径
          target: 'http://0.0.0.0:9000', // 目标服务器地址
          changeOrigin: true,            // 是否修改 Origin
        },
      ],
    },
  },
]
