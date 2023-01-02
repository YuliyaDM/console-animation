const size = require('window-size');

/**
 * @typedef LetterMargins
 * @property {number} vertical
 * @property {number} horizontal
 */

/**
 * @typedef AnimationParameters
 * @property {number} fps
 * @property {{width: number, height: number}} maxSize
 */

/** @type {LetterMargins} */
const LETTER_MARGINS = {
  vertical: 10,
  horizontal: 20,
};

/** @type {AnimationParameters} */
const ANIMATION_PARAMETERS = {
  fps: 35,
  maxSize: {
    width: size.width,
    height: size.height,
  },
};
/**
 * @module animationSettings
 */
module.exports = {LETTER_MARGINS, ANIMATION_PARAMETERS};
