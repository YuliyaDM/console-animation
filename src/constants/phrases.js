/**
 * @typedef Phrase
 * @type { string[][][] }
 */

/**
 * @type {Phrase}
 */

const HAPPY_NEW_YEAR = [
  [
      'h     h\nh     h\nh hhh h\nh     h\nh     h',
      '    a\n   a a\n  a   a\n a aaa a\na       a',
      'p p p\np   p\np p p\np\np',
      'y     y\n  y y\n   y\n   y\n   y',
      'y     y\n  y y\n   y\n   y\n   y'
  ],
  [
      'n   n\nnn  n\nn n n\nn  nn\nn   n',
      'e eee\ne\ne eee\ne\ne eee',
      'w             w\n w     w     w\n  w   w w   w\n   w w   w w\n    w     w'
  ],
  [
      'y     y\n  y y\n   y\n   y\n   y',
      'e eee\ne\ne eee\ne\ne eee',
      '    a\n   a a\n  a   a\n a aaa a\na       a',
      'rrrr\nrrrr\nrr\nr r\nr  r',
      '!!\n!!\n!!\n \n@@',
  ]
].map(word => word.map(letters => letters.split('\n')));

/**
 * @file phrases.js is the file for phrases object
 * @author Julia Pirogova <juliapirogova03@gmail.com>
 * @see {@link https://github.com/YuliyaDM?tab=repositories My Github}
 * @license Apache-2.0
 */


module.exports = { HAPPY_NEW_YEAR };
