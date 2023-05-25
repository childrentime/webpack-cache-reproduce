const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

/**@type {import('webpack').Configuration} */
module.exports = {
  // 有development模式和production模式两种
  mode: "production",
  // 打包的入口文件地址
  entry: path.resolve(__dirname, "./src/index.js"),
  devtool: "source-map",
  output: {
    // 打包输出文件名称
    filename: "bundle.js",
    // 打包输出地址
    path: path.resolve(__dirname, "./dist"),
    // 清除之前的打包文件
    clean: true,
  },
  module: {
    rules: [
      {
        // 对项目中.js结尾的文件，使用babel-loader进行转义处理
        test: /\.js$/,
        loader: "babel-loader", // 排除node_modules
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "./custom-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                ident: "postcss",
                plugins: [["autoprefixer"]],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
    minimizer: [
      new TerserWebpackPlugin({
        exclude: [],
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
};
