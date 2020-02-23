/**
 * This rule function aligns an object to the given side of the scene regardless
 * of the object's origin.
 * 
 * @param {Phaser.Scene} scene 
 * @param {Phaser.GameObjects.GameObject} target 
 * @param {Object} config 
 */
export default function(scene, target, config) {
        AlignmentFunctions[config.to.toLowerCase()](scene, target, config);
}

const AlignmentFunctions = {
    left: function(scene, target, config){
        /**
         * (width * origin) + offsetX
         */
        target.x = (target.displayWidth * (target.displayOriginX / target.width)) + (config.offsetX || 0);
    },

    right: function(scene, target, config){
        /**
         * sceneWidth - (objWidth * inverseOrigin) - offsetX
         */
        target.x = scene.sys.game.config.width 
                    - (target.displayWidth * ((1 - (target.displayOriginX / target.width)))) 
                    - (config.offsetX || 0);
    },

    top: function(scene, target, config){
        target.y = (target.displayHeight * (target.displayOriginY / target.height)) + (config.offsetY || 0);
    },

    bottom: function(scene, target, config){
        target.y = scene.sys.game.config.height
                    - (target.displayHeight * (1 - (target.displayOriginY / target.height))) 
                    - (config.offsetY || 0);
    },

    topleft: function(scene, target, config){
        target.y = (target.displayHeight * (target.displayOriginY / target.height)) + (config.offsetY || 0);
        target.x = (target.displayWidth * (target.displayOriginX / target.width)) + (config.offsetX || 0);
    },

    topright: function(scene, target, config){
        target.y = (target.displayHeight * (target.displayOriginY / target.height)) + (config.offsetY || 0);
        target.x = scene.sys.game.config.width 
                    - (target.displayWidth * (1 - (target.displayOriginX / target.width)))
                    - (config.offsetX || 0);
    },

    bottomleft: function(scene, target, config){
        target.y = scene.sys.game.config.height
                    - (target.displayHeight * (1 - (target.displayOriginY / target.height))) 
                    - (config.offsetY || 0);
        
        target.x = (target.displayWidth * (target.displayOriginX / target.width)) + (config.offsetX || 0);
    },

    bottomright: function(scene, target, config){
        target.y = scene.sys.game.config.height
                    - (target.displayHeight * (1 - (target.displayOriginY / target.height))) 
                    - (config.offsetY || 0);

        target.x = scene.sys.game.config.width 
                    - (target.displayWidth * ((1 - (target.displayOriginX / target.width)))) 
                    - (config.offsetX || 0);
    }, 
}
