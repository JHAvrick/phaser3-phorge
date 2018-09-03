import Phaser from 'phaser';
import LayoutTwo from '../config/layout-two';

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