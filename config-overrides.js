/* config-overrides.js */
// Basically I need to rewriter the create-react-app configuration if I can
// extact SASS into a CSS string to insert
// see: https://medium.com/manato/introduce-babel-new-plugins-to-create-react-app-ea55f56c3811
const { useBabelRc, override, useEslintRc } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  useEslintRc()
);
