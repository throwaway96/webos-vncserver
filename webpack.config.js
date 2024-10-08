const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const AddAssetWebpackPlugin = require("add-asset-webpack-plugin");

module.exports = (env) => [
  // Web configuration
  {
    mode: env.production ? "production" : "development",

    target: "es5",

    // Builds with devtool support (development) contain very big eval chunks,
    // which seem to cause segfaults (at least) on nodeJS v0.12.2 used on webOS 3.x.
    // This feature makes sense only when using recent enough chrome-based
    // node inspector anyway.
    devtool: false,

    entry: {
      index: "./frontend/index.js",
      // userScript: './src/userScript.js',
    },
    output: {
      path: path.resolve(__dirname, "./build/frontend"),
      filename: ({ chunk: { name } }) =>
        name === "userScript" ? "webOSUserScripts/[name].js" : "[name].js",
      chunkFormat: "commonjs",
    },
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx", ".mjs"],
      fallback: { stream: false },
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: "38",
                    },
                    useBuiltIns: "entry",
                    corejs: "3.0",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
        /*
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        */
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { context: "assets", from: "**/*" },
          { context: "frontend", from: "index.html" },
        ],
      }),

      // Populate appinfo.json with package id and version
      new AddAssetWebpackPlugin("appinfo.json", (compilation) => {
        const packageJson = require("./package.json");
        const appinfoJson = require("./appinfo.json");
        return JSON.stringify({
          ...appinfoJson,
          id: packageJson.name,
          version: packageJson.version,
        });
      }),
    ],

    devServer: {
      // contentBase: path.resolve(__dirname, './dist'),
      hot: true,
    },
  },
];
