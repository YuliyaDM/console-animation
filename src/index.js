const { Animation } = require('termination');
const BezierEasing = require('bezier-easing');
const { random } = require('./utils/random');
const Phrases = require('./constants/phrases');
const Colors = require('./constants/colors');
const size = require('window-size');

/**
 * @type {object}
 * @property {number} width
 * @property {number} height
 */
const { width, height } = size;

/**
 * @type {Animation}
 */
const animation = new Animation({
    fps: 35,
    maxSize: {
        width: width,
        height: height,
    }
});

/**
 * @type {Function}
 * @returns {Colors.ColorsType}
 */
const RandomColor = () => Colors.COLORS_LIST[random(0, Colors.COLORS_LIST.length - 1)];

/** @type {number[]} */
let wordsLength = [];
/** @type {number[]} */
let wordsHeight = [];

const letterMargins = {
    bottom_top: 10,
    right_left: 20, 
}

const phrasesAnimation = Phrases.HAPPY_NEW_YEAR.map((word, wordIndex) => {

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
            x: letterIndex * letterMargins.bottom_top,
            y: wordIndex * letterMargins.right_left,
        };

        const layersLength = letter.map((layer, layerIndex) => {
            layerIndex === letter.length - 1 ? lastLayerLength = layer.length : '';
            maxLayerHeight < letter.length ? maxLayerHeight = letter.length : '';
        });

        if (letterIndex === word.length - 1){ 
            wordLength = (lastLayerLength + coordinates.x);
            wordHeight = (maxLayerHeight);
        }
    });
    
    wordsHeight.push(wordHeight);
    wordsLength.push(wordLength);

})

const phraseHeight = wordsHeight.reduce((preEl, currEl) => preEl + 10 + currEl, 0) - 10;

const phrasesAnimate = Phrases.HAPPY_NEW_YEAR.map((word, wordIndex) => {
    const wordFrames = word.map((letter, letterIndex) => {

        const coordinates = {
            x: letterIndex * letterMargins.right_left + (width - wordsLength[wordIndex]) / 2,
            y: wordIndex * letterMargins.bottom_top + (height - phraseHeight) / 2 + 5,
        };

        const letterAnimation = animation.add({
            x: coordinates.x,
            y: coordinates.y,
            color: RandomColor(),
            content: letter[0],
            replaceSpace: true,
        });

        const letterFrames = letter.map((layer, layerIndex) => {
            
            const content = letter.slice(0, layerIndex + 1).join('\n');
            const updateFrame = {
                props: { content: content, color: RandomColor() },
                duration: (layerIndex === letter.length - 1) ? 500 : 200,
                // @ts-ignore
                func: t => new BezierEasing(0.73, -0.18, 0, 0.66)(t),
            };

            return updateFrame;

        })

        const letterTransition = letterAnimation.transition(letterFrames, { loop: true, loopInterval: 100, alternate: true });

        return letterTransition;
    
    })

    return wordFrames;
})

animation.start();

phrasesAnimate.forEach(word => {
    word.forEach(letter => {
        letter.run();
    });
});
