import Phaser from 'phaser';

import parseLayout from './phorge/parse/parse-layout';
import buildLayout from './phorge/build/build-layout';
import applyModifiers from './phorge/modify/apply-modifiers';

/**
 * The PhorgePlugin is mostly a wrapper class for the  subsystems returned from
 * buildScene(), which implements the core functionality of this plugin.
 */
class PhorgePlugin extends Phaser.Plugins.ScenePlugin {
    constructor(scene, pluginManager){
        super(scene, pluginManager);
        this.scene = scene;
        this.modififers = [];
    }

    use(modifier){
        this.modififers.push(modifier);
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

        /**
         * Parses the layoout, resolving classes and some special values
         */
        let parsed = parseLayout(this.scene, layout);

        /**
         * Creates the objects in the layout
         */
        let objects = buildLayout(this.scene, parsed, settings);

        /**
         * Applies any registered modifiers, completing the build
         */
        let final = applyModifiers(this.scene, this.modififers, layout, objects);


        return final;
    }
    
}

export default PhorgePlugin;