

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        timers: require.resolve("timers-browserify"),
        stream: require.resolve("stream-browserify"),
        // etc.
    });
    config.resolve.fallback = fallback;
    config.ignoreWarnings = [/Failed to parse source map/];  // gets rid of a billion source map warnings
    return config;
}

