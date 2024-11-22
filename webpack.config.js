const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",
  context: path.resolve(__dirname, "./"),
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/bundle-[name]-[chunkhash:8].js",
    chunkFilename: "js/chunk-[name]-[chunkhash:8].js",
    clean: true,
  },
  resolve: {
    mainFiles: ["index"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    descriptionFiles: ["package.json"],
    mainFields: ["main"],
    modules: ["node_modules"],
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
  devServer: {
    host: "10.0.0.9",
    port: 8088,
    proxy: [
        {
          context: ['/api'],             // 匹配的路径
          target: 'http://10.0.0.9:9000', // 目标服务器地址
          changeOrigin: true,            // 是否修改 Origin
        },
      ],
  },
};
