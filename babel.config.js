module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // make sure this is last in the list
      'react-native-reanimated/plugin',
    ],
  };
};
