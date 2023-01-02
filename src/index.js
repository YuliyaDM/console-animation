const { Animation } = require('termination');
const BezierEasing = require('bezier-easing');
const { Random } = require('./utils/random');
const Phrases = require('./constants/phrases');
const Colors = require('./constants/colors');

/**
 * @type {Animation}
 */
const animation = new Animation({
    fps: 35,
    maxSize: {
        width: 125,
        height: 125,
    }
});

/**
 * @type {Function}
 * @returns {Colors.ColorsType}
 */
const RandomColor = () => Colors.COLORS[Random(0, Colors.COLORS.length - 1)];

/** @type {number[]} */
let wordsLength = [];

const phrasesAnimation = Phrases.HAPPY_NEW_YEAR.map((word, wordIndex) => {

    /** @type {number} */
    let wordLength = 0;

    const lettersLength = word.map((letter, letterIndex) => {
        /** @type {number} */
        let lastLayerLength = 0;

        const coordinates = {
            x: (letterIndex + 1) * 20,
            y: (wordIndex + .5) * 10,
        };

        const layersLength = letter.map((layer, layerIndex) => {
            layerIndex === letter.length - 1 ? lastLayerLength = layer.length : '';
        });

        letterIndex === word.length - 1 ? wordLength = (lastLayerLength + coordinates.x) : '';
    });
    
    wordsLength.push(wordLength);

    const wordFrames = word.map((letter, letterIndex) => {

        const coordinates = {
            x: (letterIndex + 1) * 20 + (250 / 2 - wordsLength[wordIndex]) / 2,
            y: (wordIndex + .5) * 10,
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
                duration: 200,
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

phrasesAnimation.forEach(word => {
    word.forEach(letter => {
        // console.log(letter);
        letter.run();
    });
});
