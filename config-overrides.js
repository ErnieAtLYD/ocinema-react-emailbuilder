/* config-overrides.js */
// Basically I need to rewriter the create-react-app configuration if I can extact SASS into a CSS string to insert
// see: https://medium.com/manato/introduce-babel-new-plugins-to-create-react-app-ea55f56c3811
const { useBabelRc, override, useEslintRc } = require('customize-cra');

module.exports = override(
  useBabelRc(),
  useEslintRc()
);

module.exports = {
  jest: config => {
    config.moduleNameMapper = Object.assign({}, config.moduleNameMapper, {
      '^dnd-core$': 'dnd-core/dist/cjs',
      '^react-dnd$': 'react-dnd/dist/cjs',
      '^react-dnd-html5-backend$': 'react-dnd-html5-backend/dist/cjs',
      '^react-dnd-touch-backend$': 'react-dnd-touch-backend/dist/cjs',
      '^react-dnd-test-backend$': 'react-dnd-test-backend/dist/cjs',
      '^react-dnd-test-utils$': 'react-dnd-test-utils/dist/cjs',
    })
    return config
  },
};
