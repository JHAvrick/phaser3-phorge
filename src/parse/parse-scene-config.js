import merge from 'deepmerge';
import cloneDeep from '../util/clonedeep';
import ClassesFlat from './classes-flat';
import ResolvableProps from './resolvable-props';
import ResolvableClasses from './resolvable-classes';

/**
 * This function takes a PhaserForge layout and resolves classes and special
 * objects. It also restructures the layout in an easier way to work with
 * 
 * @param {Phaser.Scene} scene 
 * @param {Object} layout 
 * @param {Object} resolvables 
 */
function parseSceneConfig(scene, sceneConfig){
    var config = cloneDeep(sceneConfig);
    var objects = config.objects;
    
    var resolvables = {
        'scene': scene,
        'scene.width': scene.sys.game.config.width,
        'scene.height': scene.sys.game.config.height,
        'scene.centerX': scene.sys.game.config.width / 2,
        'scene.centerY': scene.sys.game.config.height / 2
    }

    _resolveLayoutDefaults(config);
    _resolveAnimations(scene, config.animations);

    /**
     * The return lists
     */
    var objectsArr = [];
    var objectsDict = [];
    var layers = config.layers.map(layer => {
        return { key: layer, objects: [] } 
    });

    for (let i = 0; i < objects.length; i++ ){
        let obj = chain([config, objects[i], resolvables],
            [
                _resolveClone,
                _resolveDefaults,
                _resolveParams,
                _resolveClass,
                _resolveProps,
                _addFlags
            ]
        )

        objectsArr.push(obj);
        objectsDict[obj.key] = obj;
        layers.find((layer) => layer.key === obj.layer).objects.push(obj);
    }

    return {
        animations: config.animations,
        scene: config.scene,
        objectsArr: objectsArr,
        objectsDict: objectsDict,
        layers: layers,
    };

}

/**
 * Used to chain the object modification functions
 */
function chain(arr, funcs){
    var returnVal = arr;
    for (let i = 0; i < funcs.length; i++){
        returnVal = funcs[i](...returnVal);
    }
    return returnVal;
}

/**
 * Resolves default properties for the scene layout if they don't exist
 */
function _resolveLayoutDefaults(layout, object, resolvables){
    //Set the layout's default layers
    if (layout.layers == null || layout.layers.constructor !== Array){
        layout.layers = ["defaultLayer"]
    }
}

/**
 * Currently just resolves generateFrameNames for an animation config so that
 * each frame doesn't have to be typed.
 * 
 * @param {} anims 
 * @param {*} resolvables 
 */
function _resolveAnimations(scene, anims = []){
    for (let i = 0; i < anims.length; i++){
        let animConfig = anims[i];

        if (animConfig.generateFrameNames != undefined){ 
            let framesConfig = animConfig.generateFrameNames;
            let textureKey = framesConfig.key || framesConfig.texture || framesConfig.textureKey;

            animConfig.frames = scene.anims.generateFrameNames(textureKey, framesConfig);
        }
    }
}

/**
 * If an object specifies the "clone" property, a new object is created which 
 * merges the cloned object and the clonee. If the "cloned" property is not set
 * the original object is passed through.
 */
function _resolveClone(layout, object, resolvables){

    if (object.clone != null){
        let cloned = layout.objects.filter(cloneable => {
            return cloneable.key === object.clone;
        })[0];
        
        //Merges the two objects into a new one, DOES NOT merge arrays
        object = merge(cloned, object, { 
            arrayMerge: (destination, source) => source
        });
        
    }

    return [layout, object, resolvables];
}

/**
 * Resolves any missing mandatory properties to their defaults. Currently the 
 * only mandatory properties are the following:
 *  > layer - the object's z-layer
 *  > class - the object's class
 *  > params - the params for the class
 *  > post - the postscript
 */
function _resolveDefaults(layout, object, resolvables){
    object = merge({
        layer: layout.layers[0],
        class: Phaser.GameObjects.Sprite,
        params: [],
        post: function(){}
    }, object);

    return [layout, object, resolvables];
}

/**
 * Resolves any special param strings to their matching objects found in the 
 * "resolvables" dictionary 
 */
function _resolveParams(layout, object, resolvables){

    let arr = object.params;
    let resolved = [];
    arr.forEach((item) => {

        //If the item is a string, check if it matches a resolvable object
        if (typeof item == 'string'){
            let resolvableKey = item.substring(
                item.lastIndexOf("{") + 1, 
                item.lastIndexOf("}")
            ).toLowerCase();

            if (resolvableKey.length > 0 && resolvables[resolvableKey] !== null)
                resolved.push(resolvables[resolvableKey]);
            else
                resolved.push(item);
            
        } else {

            resolved.push(item);

        }

    });

    object.params = resolved;

    return [layout, object, resolvables];
}

/**
 * Resolves a string to a class if possible
 */
function _resolveClass(layout, object, resolvables){
    //A string key for a Phaser.GameObjects class was used
    if (typeof object.class === "string"){
        if (ResolvableClasses[object.class.toLowerCase()] != null){
            object.class = ResolvableClasses[object.class.toLowerCase()];
        }
    }

    return [layout, object, resolvables];
}

/**
 * Resolves any properties that are defined in percentage of scene width or height
 */
function _resolveProps(layout, object, resolvables){
    if (object.props != null){
        for (let key in object.props){
            if (typeof object.props[key] === "string" && ResolvableProps[key] != null) {

                //Parse the ratio string
                let stringNum = object.props[key].replace("%", '');
                let ratio = (parseFloat(stringNum) * .01).toFixed(4);

                //Pass the ratio to the ResolvableProps function
                object.props[key] = ResolvableProps[key](resolvables.scene, ratio);

            }
        }
    }

    return [layout, object, resolvables];
}

/**
 * Adds some flags to the config which make the building process easier. Currently
 * the only flag is "isPhaserobject" which tells the build process whether it needs
 * to call scene.add.existing() on the object.
 */
function _addFlags(layout, object, resolvables){
    object.flags = {};
    if (ClassesFlat.includes(object.class))
        object.flags.isPhaserObject = true;

    return object;
}


export default parseSceneConfig;
