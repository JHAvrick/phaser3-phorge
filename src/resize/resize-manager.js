import Phaser from 'phaser';
import PriorityList from '../util/priority-list';
import isFunction from '../util/isfunction';
import ResolvableProps from '../parse/resolvable-props';

//Rule definitions
import aspectRatio from './rules/aspect-ratio';
import align from './rules/align';

/**
 * @description
 * The ResizeManager controls the resizing of objects according to a user-defined
 * config object by generating a resize function and calling it each time the 
 * 'resize' event is dispatched by the scene.
 * 
 * @property {Bool} [active=true] - Set to false to stop the ResizeManager
 * @property {Bool} [manageCameras=true] - Indicates whether the ResizeManager should also resize the camera on scene resize
 * 
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
         * Flag indicating whether or not the ResizeManager is activly resizing
         * or not
         */
        this.active = true;

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
        if (!this.active) return;

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
     * @param {Number | String} value
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
        let rulesList = new PriorityList(2);
        let props = [];
        for (let key in config){
            /**
             * If the key corresponds to a special rule, add it to the rules array.
             * Otherwise add it to the props array.
             */
            if (ResizeManager.Rules[key] != null){

                let userRule = { name: key, value: config[key] };
                let rulePriority = ResizeManager.Rules[key].priority;
                rulesList.add(userRule, rulePriority);

            } else {

                props.push({ 
                    key: key, 
                    value: this._resolveValue(config[key]) 
                });

            }
                
        }

        var rules = rulesList.toArray();
        return function(scene, target) {
            /**
             * Resolve props
             */
            for (let i = 0; i < props.length; i++){
                if (ResolvableProps[props[i].key] != null)
                    target[props[i].key] = ResolvableProps[props[i].key](scene, props[i].value)
            }
            
            /**
             * Apply rules
             */
            for (let i = 0; i < rules.length; i++){
                let rule = rules[i];
                ResizeManager.Rules[rule.name].func(scene, target, rule.value);
            }
        }

    }

    /**
     * Adds an object for the ResizeManager to manage according to the given config. Properties passed as strings will resolved as ratios of the scene's dimensions.
     * 
     * @param {Phaser.GameObjects.GameObject} target - The target object to resize
     * @param {Object} config - The resize config w/ transform properties 
     * @param {String | Number} config.x - The x position of the target object
     * @param {String | Number} config.y - The y position of the target object
     * @param {String | Number} config.displayWidth - The object's display width
     * @param {String | Number} config.displayHeight - The object's display height
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
        if (isFunction(config)) resizeFunc = config;
        else resizeFunc = this._getResizeFunc(config);

        this._targets.push({
            target: target,
            config: config,
            resize: resizeFunc
        });

    }

    /**
     * Forces the ResizeManager to do a resize pass as if the scene had just 
     * triggered the event.
     */
    forceResize(){
        this._resize(
            this.scene.sys.game.config.width, 
            this.scene.sys.game.config.height
        );
    }

}

/**
 * Functions which implement specific resize behaviors. Each function has a priority 
 * value which determines the order in which each is applied in ascending order
 * (i.e. lower priority values are applied first)
 */
ResizeManager.Rules = {
    aspectRatio: {
        priority: 0,
        func: aspectRatio
    },
    align: {
        priority: 1,
        func: align
    }
}

export default ResizeManager;