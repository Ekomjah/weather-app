const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new Dotenv(),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: "." }, // copies public/* → dist/public/*
      ],
    }),
  ],
  stats: {
    children: true,
  },
  mode: "production",
};
