const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const uglifyJs = require('uglify-js');
const webpack = require('webpack');
require('dotenv').config();

const envVariables = ['API_URL'];

function optimization(mode) {
  if (mode === 'production') {
    return {
      minimize: true,
      minimizer: [new TerserPlugin()],
    };
  }

  return {
    minimizer: [
      new TerserPlugin({
        minify: (file, sourceMap) => {
          const uglifyJsOptions = {};

          if (sourceMap) {
            uglifyJsOptions.sourceMap = {
              content: sourceMap,
            };
          }

          return uglifyJs.minify(file, uglifyJsOptions);
        },
      }),
    ],
  };
}

module.exports = (env, argv) => {
  const publicPath = process.env.PUBLIC_PATH || '/';
  const config = {};

  envVariables.forEach(envVariable => {
    config[`process.env.${envVariable}`] = JSON.stringify(process.env[envVariable]);
  });

  config['process.env.PUBLIC_PATH'] = JSON.stringify(publicPath);
  config['process.env.ENV'] = JSON.stringify(process.env.ENV);

  return {
    entry: './src/index',
    output: {
      publicPath,
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js',
    },
    devServer: {
      historyApiFallback: true,
      headers: {
        'X-Powered-By': 'portal',
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|pcss)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|ico|svg)$/i,
          use: ['file-loader'],
        },
        {
          test: /\.(config|ttf|xlsx)$/,
          use: {
            loader: 'file-loader?name=[name].[ext]',
          },
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/assets/img/favicon.png',
      }),
      new webpack.DefinePlugin(config),
    ],
    optimization: optimization(argv.mode),
  };
};
