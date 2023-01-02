const colors = require('../constants/colors');

/**
 * The Random function
 * @param {number} min [min = 1]
 * @param {number} max [max = 5]
 * @return {number} returns random number from min to max
 */
const randomNum = (min, max) => Math.round(Math.random() * (max - min) + min);

/**
 * @type {Function}
 * @return {colors.ColorsType}
 */
const randomColor = function() {
  const {COLORS_LIST} = colors;
  /** @type {number} */
  const randomIndex = randomNum(0, colors.COLORS_LIST.length - 1);

  return COLORS_LIST[randomIndex];
};

console.log(randomColor());

/**
 * @module Random
 */
module.exports = {randomNum, randomColor};
