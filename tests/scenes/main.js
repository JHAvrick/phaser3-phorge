import Phaser from 'phaser';
import TestLayout from '../config/test-layout';
import LayoutTwo from '../config/layout-two';
import ResizeManager from '../../src/resize/resize-manager';

class Main extends Phaser.Scene {
    constructor() {
        super({key: 'Main'});
        console.log("Main...");
    }

    create(){
        this.phorge.build(LayoutTwo);
    }

}

export default Main;