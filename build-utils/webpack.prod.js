const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '..', './.env.production'),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '..', './assets'),
  },
  devtool: 'source-map',
};
