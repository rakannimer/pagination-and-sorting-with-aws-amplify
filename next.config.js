const withOffline = require("next-offline");

module.exports = withOffline({
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  }
});
