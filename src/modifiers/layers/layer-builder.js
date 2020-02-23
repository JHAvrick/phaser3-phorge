import LayerManager from './layer-manager';

/**
 * This modifier uses a 'layers' property to seperate objects into depth layers.
 * A LayerManager instance is returned, which has methods to add, remove, and 
 * arrange layers.
 */
const LayerBuilder = {
    scene: {
        prop: 'layers',
        returns: 'layers',
        modifier: function(scene, layers) {
            let layerManager = new LayerManager(scene);

            layers.forEach((layerKey) => {
                layerManager.addLayer(layerKey);
            })

            return layerManager;
        }
    },

    /**
     * The object modifier adds each object to it's designated layer. Objects
     * w/out a 'layer' property are ignored.
     */
    objects: {
        prop: 'layer',
        inclusive: false,
        modifier: function(scene, object, layerKey, layerManager){
            layerManager.addObject(layerKey, object);
        }
    }
}

export default LayerBuilder;
