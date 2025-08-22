const { getDefaultConfig } = require("expo/metro-config");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");
const { withNativeWind } = require("nativewind/metro");

// Start with Expo default config
let config = getDefaultConfig(__dirname);

// Wrap with Sentry config
config = getSentryExpoConfig(__dirname, config);

// Wrap with NativeWind config
config = withNativeWind(config, { input: "./app/globals.css" });

module.exports = config;
