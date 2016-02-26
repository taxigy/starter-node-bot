var path = require('path');
var fs = require('fs');
var externals = {};

fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1;
}).forEach(function (mod) {
  externals[mod] = 'commonjs ' + mod;
});
console.log(externals);

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },
  target: 'node',
  loaders: [{
    test: /\.js$/,
    exclude: /node_modules/,
    loaders: ['babel']
  }],
  externals: externals
};
