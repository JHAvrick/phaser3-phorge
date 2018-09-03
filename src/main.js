import Phaser from 'phaser';
import buildScene from './build/build-scene';


class PhorgePlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager){
        super(scene, pluginManager);
        this.scene = scene;
    }

    build(layout){
        let sceneLayout = buildScene(this.scene, layout);

        this.objects = sceneLayout.objects;
        this.groups = sceneLayout.groups;
        this.layers = sceneLayout.layers;
        this.resizer = sceneLayout.resizer;

        return sceneLayout;
    }
    
}

export default PhorgePlugin;