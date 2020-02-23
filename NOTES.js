var layerManager; //The artifact
const LayerBuilder = {
    /**
     * The scene modifier config - specify the scene-level property to receive
     * and create a modifer function to process the config. The scene modifier
     * is always called before the object modifiers.
     * 
     * You can also specify a `returns` string which will be used to map the
     * result of the scene-modifier function to the final build object. The 
     * returned value is also passed as the last parameter to the object modifier
     * function.
     * 
     */
    scene: {
        prop: 'layers',
        returns: 'layers',
        modifier: function(scene, layers) {
            return new LayerManager(layers);
        }
    },

    /**
     * The object modifier config - specify the object-level property to receive.
     * The modifier function for objects is called for each object that has the
     * given property.
     */
    objects: {
        prop: 'layer',
        modifier: function(scene, object, prop, artifact){

        }
    }
}

export default LayerBuilder;

phorge.use(LayerBuilder);
phorge.use(GroupBuilder);


/**
 * 
 * phorge.build(layout);
 * 
 * --parse
 * --build / create
 * --modifiers
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */