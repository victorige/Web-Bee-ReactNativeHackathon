module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "babel-plugin-styled-components",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "~components": "./src/components",
            "~constants": "./src/constants",
            "~store": "./src/store",
            "~models": "./src/models",
            "~views": "./src/views",
            "~types": "./src/types",
            "~src": "./src",
          },
        },
      ],
    ],
  };
};