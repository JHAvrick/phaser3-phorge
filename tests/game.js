import Phaser from 'phaser';
import PhorgePlugin from '../build/phaser3-phorge';
import fitContainer from './fit-container';

/**
 * Test scenes
 */
import BasicTest from './scenes/basic-test';
import LayeredTest from './scenes/layered-test';

/**
 * Set up game config and create scenes
 */
const config = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    width: 200,
    height: 400,
    scene: [
        LayeredTest,
        BasicTest
    ],
    plugins: {
        scene: [
            { 
                key: 'phorge', 
                mapping: 'phorge',
                plugin: PhorgePlugin
            }
        ]
    },
};

const game = new Phaser.Game(config);
document.addEventListener('DOMContentLoaded', () => {
    fitContainer('game-container', game);
}, false);

