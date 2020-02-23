import Phaser from 'phaser';
import BasicLayout from '../config/basic-layout';

/**
 * A basic test using no modifiers.
 */
class BasicTest extends Phaser.Scene {
    constructor() {
        super({key: 'BasicTest'});
        console.log("Basic Test...");
    }

    preload(){
        this.load.image('btn', 'assets/sprites/btn.png');
        this.load.image('orb', 'assets/sprites/orb.png');
        this.load.image('panel', 'assets/sprites/panel.png');
        this.load.image('health', 'assets/sprites/healthbar.png');
        this.load.image('mana', 'assets/sprites/manabar.png');
    }

    create(){
        this.phorge.build(BasicLayout);
    }

}

export default BasicTest;