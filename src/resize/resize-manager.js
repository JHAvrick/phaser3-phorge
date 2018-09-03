import isFunction from 'lodash.isfunction';
import ResolvableProps from '../parse/resolvable-props';

/**
 * The ResizeManager controls the resizing of objects according to a user-defined
 * config object by generating a resize function and calling it each time the 
 * 'resize' event is dispatched by the scene.
 */
class ResizeManager {
    constructor(scene){
        this.scene = scene;

        /**
         * Contains all targets
         */
        this._targets = [];

        /**
         * Flag indicating whether the ResizeManager should also resize 
         * the cameras when the scene resizes
         */
        this.manageCameras = true;

        /**
         * Subscription the scene's 'resize' event
         */
        this.scene.events.on('resize', this._resize, this);
    }

    /**
     * The 'resize' event callback, where each object's resize function is called
     * 
     * @param {Number} width - Width of the scene
     * @param {Number} height - Height of the scene
     */
    _resize(width, height){
        if (this.manageCameras)
            this.scene.cameras.resize(width, height);

        for (let i = 0; i < this._targets.length; i++){
            this._targets[i].resize(this.scene, this._targets[i].target);
        }
    }

    /**
     * If the given value is a string, resolves the value to it's integer or 
     * float equivalent, otherwise returns the input value.
     * 
     * @param {Number | String} value -
     */
    _resolveValue(value){
        if (typeof value === 'string')
            return (parseFloat(value.replace("%", '')) * .01).toFixed(4);
        return value;
    }

    /**
     * Returns the resize function for each target based on the given config
     * 
     * @param {Phaser.GameObject} target - The resize target
     * @param {Object} config - The resize config w/ transform properties
     */
    _getResizeFunc(config){
        /**
         * Parse the config, resolving string values or special flags
         */
        let props = [];
        for (let key in config){
            props.push({ key: key, value: this._resolveValue(config[key]) });
        }

        console.log(props);

        return function(scene, target){
            for (let i = 0; i < props.length; i++){
                if (ResolvableProps[props[i].key] != null)
                    target[props[i].key] = ResolvableProps[props[i].key](scene, props[i].value)
            }
        }
    }

    /**
     * Adds an object for the ResizeManager to managed according to the given config
     * 
     * @param {Phaser.GameObject} target - The target object to resize
     * @param {Object} config - The resize config w/ transform properties 
     */
    manage(target, config){
        if (!target || !config) return;

        /**
         * Get the insertion index. If the target is already being managed, it's
         * current index will be used (i.e. it will be replaced).
         */
        var index = this._targets.indexOf(target) !== -1 
                    ? this._targets.indexOf(target)
                    : this._targets.length;

        var resizeFunc;
        if (isFunction(config))
            resizeFunc = config;
        else
            resizeFunc = this._getResizeFunc(config);

        this._targets.push({
            target: target,
            config: config,
            resize: resizeFunc
        });

    }

}

export default ResizeManager;