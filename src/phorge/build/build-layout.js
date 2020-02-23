import applyProps from 'util/apply-props';

function buildLayout(scene, parsed, settings){

    /**
     * Default build settings 
     */
    let meta = Object.assign({}, {
        mapToScene: true, //Whether the objects should be mapped to the scene via their keys
        addToScene: true //Whether Phaser.GameObjects instances should have scene.add.existing() called on them
    }, settings);

    /**
     * The object dictionary returned by this function
     */
    let objects = {};

    /**
     * Looping through all configs and creating the objects
     */
    parsed.objectsArr.forEach((config) => {

        //Create the object
        let obj = new config.class(...config.params);
        objects[config.key] = obj;

        //Apply it's properties
        applyProps(config.props, obj);

        /**
        * Check the flag denoting whether this object is an instance of 
        * Phaser.GameObject (created during config parse). If true, add it to
        * the stage.
        */
        if (meta.addToScene && config.flags.isPhaserObject)
            scene.add.existing(obj);

        /**
        * Map the object to the scene via key
        */
        if (meta.mapToScene)
            scene[config.key] = obj;   

    });

    return objects;
}

export default buildLayout;