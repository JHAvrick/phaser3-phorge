import Phaser from 'phaser';
import PhorgePlugin from '../build/phaser3-phorge';
import fitContainer from './fit-container';

/**
 * Scenes
 */
import Preload from './scenes/preload';
import Main from './scenes/main';

/**
 * Set up game config and create scenes
 */
const config = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    width: 200,
    height: 400,
    scene: [
        Preload,
        Main
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

