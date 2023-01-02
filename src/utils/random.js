/**
 * The Random function
 * @param {number} min [min = 1]
 * @param {number} max [max = 5]
 * @returns {number} returns random number from min to max
 */
const Random = (min, max) => Math.round(Math.random() * (max - min) + min);

/**
 * @module Random
 */
module.exports = { Random };
