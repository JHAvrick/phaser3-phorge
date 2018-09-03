import Phaser from 'phaser';
import buildScene from './build/build-scene';

/**
 * The PhorgePlugin is mostly a wrapper class for the  subsystems returned from
 * buildScene(), which implements the core functionality of this plugin.
 */
class PhorgePlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager){
        super(scene, pluginManager);
        this.scene = scene;

        //NOTE: None of the following subsystems are assigned until the build()
        //function has been called.

        /**
         * A Pool class, contains a flat list of all game objects created during
         * the build.
         */
        this.objects;

        /**
         * A Pool class, contains references to each Phaser group created during
         * the build process.
         */
        this.groups;

        /**
         * LayerManager class, controls adding, removing, and reordering of depth
         * layers.
         */
        this.layers;

        /**
         * ResizerManager, allows for limited resizing of objects when the scene
         * calls the 'resize' event.
         */
        this.resizer;

    }

    /**
     * Creates and optionally adds objects to the current scene based on the 
     * provided layout object.
     * 
     * @param {Object} layout - The layout object
     * @param {Object} settings - A config/settings object
     * @param {Bool} [settings.addToScene=true] - Determines whether instances of 
     * Phaser.GameObjects will have scene.add.existing() called on them after creation.
     * @param {Bool} [settings.mapToScene=true] - Determines whether objects will be
     * mapped to the scene as properties via their keys
     */
    build(layout, settings){
        let sceneLayout = buildScene(this.scene, layout, settings);

        /**
         * Assign the subsystems as returned from the build process
         */
        this.objects = sceneLayout.objects;
        this.groups = sceneLayout.groups;
        this.layers = sceneLayout.layers;
        this.resizer = sceneLayout.resizer;

        return sceneLayout;
    }
    
}

export default PhorgePlugin;