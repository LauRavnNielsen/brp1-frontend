const path = require("path");
const fs = require("fs");

const rewireBabelLoader = require("craco-babel-loader");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const os = require("os");

// helpers

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const smp = new SpeedMeasurePlugin();

module.exports = {
  babel: {
    plugins: ["babel-plugin-formatjs"],
    loaderOptions: {
      ignore: ["./node_modules/mapbox-gl/dist/mapbox-gl.js"],
    },
  },
  webpack: smp.wrap({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve("src"),
          use: [
            {
              loader: "thread-loader",
              workers: os.cpus() || 6,
            },
          ],
        },
      ],
    },
  }),
  plugins: [
    {
      plugin: rewireBabelLoader,
      options: {
        includes: [resolveApp("node_modules/isemail")],
        excludes: [/(node_modules|bower_components)/],
      },
    },
  ],
};
