import MapList from '../util/map-list';

/**
 * The LayerManager is a scene subsystem which can be used to order the scene's
 * display objects into conceptual layers. 
 * 
 * TO DO:
 *  - Consider extending MapList instead of just using it internally
 */
class LayerManager {

    /**
     * 
     * @param {*} scene - The parent scene
     */
    constructor(scene){
        this.scene = scene;

        /**
         * The map which holds each layer (an array of objects)
         */
        this._layers = new MapList();
    }

    /**
     * Restack layers above the given layer index
     */
    _restack(){
        this._layers.forEach( (layer, key, index) => {
            layer.objects.forEach(obj => {
                obj.depth = index;
            });
        });
    }

    _getLayerDepth(layerKey){
        return this._layers.indexOfKey(layerKey);
    }

    /**
     * 
     * @param {String} key - The layer key
     * @param {Objects} objects - An array of objects that belong to this layer
     */
    addLayer(layerKey, objects = []){
        this._layers.set(objects, layerKey);
    }

    /**
     * Adds an object to the given layer. Also triggers a restack for all layers
     * above the given layer.
     * 
     * @param {*} layerKey - The layer into which the object will be added
     * @param {*} object - The object to add
     */
    addToLayer(layerKey, object){
        let layerObjects = this._layers.get(layerKey);
            layerObjects.push(object);
            object.depth = this._getLayerDepth(layerKey);
    }

    getObjLayerKey(object){
        var layerKey = false;
        this._layers.forEach( (layer, key, index) => {
            if (layer.includes(object))
                layerKey =  key;
        })

        return layerKey;
    }

    moveToLayer(object, newLayerKey){
        let originalLayerKey = this.getObjLayerKey(object);
        let originalLayer = this._layers.get(originalLayerKey);

        //Remove object from original layer
        originalLayer.splice(originalLayer.indexOf(object), 1);

        //Add same object to the other layer
        this.addToLayer(newLayerKey, object);
    }

    /**
     * Set a property on ALL objects in a layer
     * 
     * @param {String} layerKey - The layer key
     * @param {String} prop - The property to set on each object
     * @param {Any} value - The value of the given property
     */
    setOnLayer(layerKey, prop, value){
        let layerObjects = this._layers.get(layerKey);
        layerObjects.forEach(obj => {
            obj[prop] = value;
        });
    }

    /**
     * Call a function on every object in a layer
     * 
     * @param {String} layerKey - The layer key
     * @param {String} func - The name of the function
     * @param {Array} params - The params to pass to the function
     */
    callOnLayer(layerKey, func, params){
        let layerObjects = this._layers.get(layerKey);
        layerObjects.forEach(obj => {
            obj[func](...params);
        });       
    }

    /**
     * Merges two layers. The new layer will replace the layer with the first
     * key passed in z-order.
     * 
     * @param {*} layerOneKey 
     * @param {*} layerTwoKey 
     */
    mergeLayers(layerOneKey, layerTwoKey, newLayerKey){
        let layerOne = this._layers.get(layerOneKey);
        let layerTwo = this._layers.get(layerTwoKey);

        let atIndex = this._layers.indexOfKey(layerOneKey);
        let merged = layerOne.concat(layerTwo);

        //Delete the original layers
        this._layers.deleteAtIndex(this._layers.indexOfKey(layerOneKey));
        this._layers.deleteAtIndex(this._layers.indexOfKey(layerTwoKey));

        //Create the new layer at the first key's index
        this._layers.set(merged, newLayerKey, atIndex);

        //Restack all layers
        this._restack();
    }

    reorder(){
        //TO DO: Write this function? 
    }

    bringUp(layerKey){
         //TO DO: Write this function
    }

    bringToTop(layerKey){
        //TO DO: Write this function
    }

    sendToBack(layerKey){
        //TO DO: Write this function
    }

}

export default LayerManager;