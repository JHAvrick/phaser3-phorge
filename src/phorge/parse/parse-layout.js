import merge from 'deepmerge';
import cloneDeep from 'util/clonedeep';
import ClassesFlat from './classes-flat';
import ResolvableProps from './resolvable-props';
import ResolvableClasses from './resolvable-classes';

/**
 * This function takes a PhaserForge layout and resolves classes and special
 * objects. An new config object is returned w/ the resolved values.
 * 
 * @param {Phaser.Scene} scene 
 * @param {Object} sceneConfig
 */
function parseLayout(scene, sceneConfig){
    var config = cloneDeep(sceneConfig);
    var objects = config.objects;
    
    var resolvables = {
        'scene': scene,
        'scene.width': scene.sys.game.config.width,
        'scene.height': scene.sys.game.config.height,
        'scene.centerX': scene.sys.game.config.width / 2,
        'scene.centerY': scene.sys.game.config.height / 2
    }

    /**
     * The return lists
     */
    var objectsArr = [];
    var objectsDict = [];
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
    }

    return {
        scene: config.scene,
        objectsArr: objectsArr,
        objectsDict: objectsDict
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
 *  > class - the object's class
 *  > params - the params for the class
 *  > post - the postscript
 */
function _resolveDefaults(layout, object, resolvables){
    object = Object.assign({}, {
        class: Phaser.GameObjects.Sprite,
        params: ['{scene}'],
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
            object.class = ResolvableClasses[object.class.toLowerCase()].class;

        //if (object.params == null)
            //object.params = ResolvableClasses[object.class.toLowerCase()].defaultParams;

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


export default parseLayout;
