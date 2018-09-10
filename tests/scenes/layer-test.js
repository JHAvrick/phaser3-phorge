import Phaser from 'phaser';
import LayeredLayout from '../config/layered-layout';

class LayerTest extends Phaser.Scene {
    constructor() {
        super({key: 'LayerTest'});
        console.log("Layer Test...");
    }

    create(){
        this.phorge.build(LayeredLayout);
        this.phorge.resizer.forceResize();
        console.log(this.topleft)
    }

}

export default LayerTest;