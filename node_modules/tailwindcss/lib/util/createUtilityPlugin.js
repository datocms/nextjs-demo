"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUtilityPlugin;

var _fromPairs = _interopRequireDefault(require("lodash/fromPairs"));

var _toPairs = _interopRequireDefault(require("lodash/toPairs"));

var _castArray = _interopRequireDefault(require("lodash/castArray"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function className(classPrefix, key) {
  if (key === 'default') {
    return classPrefix;
  }

  if (key.startsWith('-')) {
    return `-${classPrefix}${key}`;
  }

  return `${classPrefix}-${key}`;
}

function createUtilityPlugin(themeKey, utilityVariations) {
  return function ({
    e,
    addUtilities,
    variants,
    theme
  }) {
    const utilities = utilityVariations.map(([classPrefix, properties]) => {
      return (0, _fromPairs.default)((0, _toPairs.default)(theme(themeKey)).map(([key, value]) => {
        return [`.${e(className(classPrefix, key))}`, (0, _fromPairs.default)((0, _castArray.default)(properties).map(property => [property, value]))];
      }));
    });
    return addUtilities(utilities, variants(themeKey));
  };
}