
/**
 * The ResolvableProps object contains keys/function pairs for properties which
 * can be resolved to other properties (usually in relation to the scene). For
 * example, "x: '30%'" can be  resolved to "scene.scene.sys.game.config.width * .3"
 */
const ResolvableProps = {
    x: function(scene, ratio){
        return scene.sys.game.config.width * ratio;
    },
    y: function(scene, ratio){
        return scene.sys.game.config.height * ratio;
    },
    displayWidth: function(scene, ratio){
        return scene.sys.game.config.width * ratio;
    },
    displayHeight: function(scene, ratio){
        return scene.sys.game.config.height * ratio;
    }
}

export default ResolvableProps;