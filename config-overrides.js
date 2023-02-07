/* config-overrides.js */

module.exports = function override(config, env) {
    config.experiments = {
        asyncWebAssembly: true,
        topLevelAwait: true,
        layers: true // optional, with some bundlers/frameworks it doesn't work without
    };
    return config;
}