const { resolve } = require('path');

module.exports = {
  webpack: {
    alias: {
      '@app': resolve(__dirname, 'src'),
    },
  },
};
