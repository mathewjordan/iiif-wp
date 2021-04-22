const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
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
