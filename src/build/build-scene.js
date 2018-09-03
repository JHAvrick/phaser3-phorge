import Phaser from 'phaser';
import LayerManager from '../layer/layer-manager';
import parseSceneConfig from '../parse/parse-scene-config';

import Pool from '../util/pool';
import applyProps from '../util/apply-props';
import ResizeManager from '../resize/resize-manager';

function buildScene(scene, config){

    /**
     * Performs some necessary processing on the scene object, resolving 
     * properties that are given as strings (such as position ratios), or special
     * parameters such as the Scene object
     */
    let parsed = parseSceneConfig(scene, config);

    /**
     * Creates and adds animations to the scene. Very little happens here as this
     * functionality basilly already exists for Phaser 3.
     */
    let anims = _buildAnimations(scene, parsed);

    /**
     * Creates all the objects, applies their properties, and adds then to their
     * respective layers and groups. Also adds each object with a 'resize' config
     * to the ResizeManager
     */
    let layout = _buildLayout(scene, parsed);

    /**
     * Return the various build results merged into a single object
     */
    return Object.assign({}, layout, anims);
}

/**
 * Creates any animations included in the layout
 * 
 * @param {*} scene - The parent scene
 * @param {*} parsed - The parsed scene config
 */
function _buildAnimations(scene, parsed){

    var animConfigs = parsed.animations;
    var anims = new Pool();
    if (animConfigs != null){
        animConfigs.forEach((config) => {
            let anim = scene.anims.create(config);
            anims.add(config.key, anim, config);
        });
    }

    return { anims: anims };
}


/**
 * Builds all objects, groups, and layers
 * 
 * @param {*} scene - The parent scene
 * @param {*} parsed - The parsed scene config
 * @returns {Object} - Returns an object holding the LayerManager, ResizeManager,
 * and object/group pools
 */
function _buildLayout(scene, parsed){
    /**
     * The return object of this function, containing subsystems for managing and
     * retreiving the built objects.
     */
   let build = {
        layers: new LayerManager(scene),
        resizer: new ResizeManager(scene),
        objects: new Pool(),
        groups: new Pool()
    }

   let layers = parsed.layers;
   layers.forEach(layer => {

       build.layers.addLayer(layer.key);
       layer.objects.forEach(config => {

           //Create the object
           let obj = new config.class(...config.params);

           //Apply it's properties
           applyProps(config.props, obj);

           /**
            * Add the object the LayerManager and ResizeManager, as well as the
            * object and groups pools
            */
           build.layers.addToLayer(layer.key, obj);
           build.objects.add(config.key, obj, config);
           build.resizer.manage(obj, config.resize);

           /**
            * If this object belongs to a group, check if the group exists.
            * If it does, add the object to it. If it does not, create it and
            * then add the object to it.
            */ 
            if (config.group != null){
                let group = build.groups.has(config.group) 
                            ? build.groups.get(config.group).item
                            : build.groups.add(config.group, new Phaser.GameObjects.Group(scene));
                
                group.add(obj);
            }
                
           /**
            * Check the flag denoting whether this object is an instance of 
            * Phaser.GameObject (created during config parse). If true, add it to
            * the stage.
            */
           if (config.flags.isPhaserObject)
               scene.add.existing(obj);

           scene[config.key] = obj;

       });
   });

   /**
    * Call the postscripts after all the objects are created
    */
   var allObjects = build.objects.asObject();
   build.objects.forEach((key, obj, config) => {
       config.post(obj, scene, allObjects)
   });

   return build;   
}

export default buildScene;