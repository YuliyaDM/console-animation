const {Animation} = require('termination');
const BezierEasing = require('bezier-easing');
const size = require('window-size');
const random = require('./utils/random');
const phrases = require('./constants/phrases');
const animationSettings = require('./constants/animationSettings');

/**
 * @type {object}
 * @property {number} width
 * @property {number} height
 */
const {width, height} = size;

/**
 * @type {object}
 * @property {animationSettings.LetterMargins} LETTER_MARGINS
 * @property {animationSettings.AnimationParameters} ANIMATION
 */
const {LETTER_MARGINS, ANIMATION_PARAMETERS} = animationSettings;

/**
 * @type {Animation}
 */
const animation = new Animation(ANIMATION_PARAMETERS);

/**
 * @type {object}
 * @property {number[]} width
 * @property {number[]} height
 */
const wordsSize = {
  width: [],
  height: [],
};

const phrasesCoordinates = phrases.HAPPY_NEW_YEAR.map((word, wordIndex) => {
  /** @type {number} */
  let wordLength = 0;
  /** @type {number} */
  let wordHeight = 0;

  const lettersLength = word.map((letter, letterIndex) => {
    /** @type {number} */
    let lastLayerLength = 0;

    /** @type {number} */
    let maxLayerHeight = 0;

    const coordinates = {
      x: letterIndex * LETTER_MARGINS.horizontal,
      y: wordIndex * LETTER_MARGINS.vertical,
    };

    const layersLength = letter.map((layer, layerIndex) => {
      if (layerIndex === letter.length - 1) {
        lastLayerLength = layer.length;
      }
      if (maxLayerHeight < letter.length) {
        maxLayerHeight = letter.length;
      }
    });

    if (letterIndex === word.length - 1) {
      wordLength = (lastLayerLength + coordinates.x);
      wordHeight = (maxLayerHeight);
    }
  });

  wordsSize.width.push(wordLength);
  wordsSize.height.push(wordHeight);
});

const phraseHeight = wordsSize.height.reduce((preEl, currEl) => {
  return preEl + LETTER_MARGINS.vertical + currEl;
}, 0) - LETTER_MARGINS.vertical;

const phrasesAnimate = phrases.HAPPY_NEW_YEAR.map((word, wordIndex) => {
  const wordFrames = word.map((letter, letterIndex) => {
    const wordLength = wordsSize.width[wordIndex];
    // eslint-disable-next-line max-len
    const horizontalCenter = (width - LETTER_MARGINS.horizontal / 2 - wordLength) / 2;
    // eslint-disable-next-line max-len
    const vericalCenter = (height - phraseHeight) / 2 + LETTER_MARGINS.vertical / 2;

    const coordinates = {
      x: letterIndex * LETTER_MARGINS.horizontal + horizontalCenter,
      y: wordIndex * LETTER_MARGINS.vertical + vericalCenter,
    };

    const letterAnimation = animation.add({
      x: coordinates.x,
      y: coordinates.y,
      color: random.randomColor(),
      content: letter[0],
      replaceSpace: true,
    });

    const letterFrames = letter.map((layer, layerIndex) => {
      const content = letter.slice(0, layerIndex + 1).join('\n');
      const updateFrame = {
        props: {content: content, color: random.randomColor()},
        duration: (layerIndex === letter.length - 1) ? 500 : 200,
        // @ts-ignore
        func: (t) => new BezierEasing(0.73, -0.18, 0, 0.66)(t),
      };

      return updateFrame;
    });

    const letterTransition = letterAnimation.transition(letterFrames,
        {
          loop: true,
          loopInterval: 100,
          alternate: true,
        });

    return letterTransition;
  });

  return wordFrames;
});

animation.start();

phrasesAnimate.forEach((word) => {
  word.forEach((letter) => {
    letter.run();
  });
});
