import MapList from '../util/map-list';
import Phaser from 'phaser';

/**
 * @typicalname layers
 */
class LayerManager {
    constructor (scene){
        this.scene = scene;

        /**
         * The map which holds each layer (an array of objects)
         */
        this._layers = new MapList();
    }

    /**
     * Reapplies the parent layers depth to each of the layer's children
     */
    restack (){
        this._layers.forEach( (layer, key, index) => {
            layer.setDepth(index);
            //layer.objects.forEach(obj => {
                //if (obj.active)
                    //obj.depth = index;
            //});
        });
    }

    /**
     * Given a layer key, returns the layer's index (which is also the depth value
     * that is assigned to the layer's children)
     * 
     * @private
     * @param {String} layerKey -  
     * @returns {Number} - The depth value of the layer
     */
    _getLayerDepth (layerKey) {
        return this._layers.indexOfKey(layerKey);
    }

    /**
     * Add's a new layer to the top of the stack
     * 
     * @param {String} key - The layer key
     * @param {Array.<Phaser.GameObjects.GameObject>} objects - An array of objects that belong to this layer
     * @return {Phaser.GameObjects.Group} - The new layer
     */
    addLayer (layerKey, objects = []){
        this._layers.set(
            new Phaser.GameObjects.Group(this.scene, objects), 
            layerKey
        );
    }

    /**
     * Removes a layer. Any objects in that layer will no longer be managed by
     * the LayerManager.
     * 
     * @param {String} layerKey - The layer to remove
     * @param {Bool} [destroyObjects=false] - Whether to call destroy() on 
     * all objects in the group
     * @return {Phaser.GameObjects.Group} - The removed layer
     */
    removeLayer (layerKey, destroyObjects = false) {
        let layer = this._layers.delete(layerKey);

        if (destroyObjects)
            layer.destroy(true);

        return layer;
    }

    /**
     * Returns the Phaser Group representing a given layer
     * 
     * @param {String} layerKey - The layer to get
     * @return {Phaser.GameObjects.Group} - The new layer
     */
    getLayer (layerKey) {
        return this._layers.get(layerKey);
    }

    /**
     * Merges two layers. The second layer will be merged into the first.
     * 
     * @param {String} layerOneKey - The first layer
     * @param {String} layerTwoKey - The second layer, which will be merged into the first
     * 
     */
    merge(layerOneKey, layerTwoKey){
        //Get the two instances of Phaser.GameObjects.Group
        let layerOne = this._layers.get(layerOneKey);
        let layerTwo = this._layers.get(layerTwoKey);

        //Get the children from the second layer as an array
        let layerTwoChildren = layerTwo.getChildren();

        //Add the children to the target layer
        layerOne.addMultiple(layerTwoChildren);

        //Delete the second layer
        this._layers.delete(layerTwoKey);

        //Destroy the second layer's group
        layerTwo.destroy();

        //Restack all layers
        this.restack();
    }

    /**
     * Swaps the depth order of two layers
     * 
     * @param {String} layerOne - The key of the first layer
     * @param {String} layerTwo - The key of the second layer
     */
    swap(layerOne, layerTwo){
        this._layers.swap(layerOne, layerTwo);
        this.restack();
    }

    /**
     * Switch the order of the given layer with the layer directly above it.
     * 
     * @param {String} layerKey - The key of the layer to bring up
     */
    bringUp(layerKey){
        this._layers.swap(
            this._layers.indexOfKey(layerKey),
            this._layers.indexOfKey(layerKey) + 1
        )
        this.restack();
    }

    /**
     * Switch the order of the given layer with the layer directly below it.
     * 
     * @param {String} layerKey - The key of the layer to bring up
     */
    bringDown(layerKey){
        this._layers.swap(
            this._layers.indexOfKey(layerKey),
            this._layers.indexOfKey(layerKey) - 1
        )
        this.restack();
    }

    /**
     * Brings a layer to the top of stack
     * 
     * @param {String} layerKey 
     */
    toTop(layerKey){
        this._layers.toLast(layerKey);
        this.restack();
    }

    /**
     * Sends a layer to the bottom of stack
     * 
     * @param {String} layerKey 
     */
    toBack(layerKey){
        this._layers.toFirst(layerKey);
        this.restack();
    }

    /**
     * Adds an object to the given layer
     * 
     * @param {String} layerKey - The layer into which the object will be added
     * @param {Phaser.GameObjects.GameObject} object - An valid object in the Phaser.GameObjects namespace
     */
    addObject (layerKey, object) {
        let layerObjects = this._layers.get(layerKey);
            layerObjects.add(object);

            //Set the object's depth
            object.depth = this._getLayerDepth(layerKey);
    }

    /**
     * Removes an object from any layer in which it resides.
     * 
     * @param {Phaser.GameObjects.GameObject} object - The object to remove
     */
    removeObject (object) {
        let layer = this._layers.get(this.getObjLayerKey(object));
            layer.remove(object);
    }

    /**
     * Returns the key of the layer that the given object resides in
     * 
     * @param {Object} object - The object for which to retrieve the layer key
     * @returns {String | Bool} - The layer key, or `false` if the object resides in no layers
     */
    getObjLayerKey (object) {
        var layerKey = false;
        this._layers.forEach( (layer, key, index) => {
            if (layer.contains(object))
                layerKey =  key;
        })

        return layerKey;
    }

    /**
     * Move an object to a different layer
     * 
     * @param {Object} object - The object to move
     * @param {String} newLayerKey - The destination layer key
     */
    moveToLayer(object, newLayerKey){
        let originalLayerKey = this.getObjLayerKey(object);
        let originalLayer = this._layers.get(originalLayerKey);

        //Remove object from original layer
        originalLayer.remove(object);

        //Add same object to the other layer
        this.addObject(newLayerKey, object);
    }
    
}

export default LayerManager;