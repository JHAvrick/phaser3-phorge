import Phaser from 'phaser';

import LayeredLayout from '../config/layered-layout';
import LayerBuilder from 'modifiers/layers/layer-builder';

class LayeredTest extends Phaser.Scene {
    constructor() {
        super({key: 'LayeredTest'});
        console.log("Layered Test...");
    }

    preload(){
        this.load.image('panel', 'assets/sprites/panel.png');
    }

    create(){
        this.phorge.use(LayerBuilder);
        let build = this.phorge.build(LayeredLayout);

        this.two.setInteractive();

        var originalLayer;
        this.two.on('pointerdown', () => {
            originalLayer = build.layers.getObjLayerKey(this.two);
            build.layers.moveToLayer(this.two, "four");
        })

        this.two.on('pointerup', (event) => {
            build.layers.moveToLayer(this.two, originalLayer);
        });

    }
    
}

export default LayeredTest;