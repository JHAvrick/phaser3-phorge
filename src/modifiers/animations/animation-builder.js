/**
 * Currently just resolves generateFrameNames for an animation config so that
 * each frame doesn't have to be typed.
 * 
 * @param {} anims 
 * @param {*} resolvables 
 */
function _resolveAnimations(scene, anims = []){
    for (let i = 0; i < anims.length; i++){
        let animConfig = anims[i];

        if (animConfig.generateFrameNames != undefined){ 
            let framesConfig = animConfig.generateFrameNames;
            let textureKey = framesConfig.key || framesConfig.texture || framesConfig.textureKey;

            animConfig.frames = scene.anims.generateFrameNames(textureKey, framesConfig);
        }
    }
}


/**
 * Creates any animations included in the layout
 * 
 * @param {*} scene - The parent scene
 * @param {*} parsed - The parsed scene config
 */
function _buildAnimations(scene, parsed){

    var animConfigs = parsed.animations;
    var anims = new Pool();
    if (animConfigs != null){
        animConfigs.forEach((config) => {
            let anim = scene.anims.create(config);
            anims.add(config.key, anim, config);
        });
    }

    return { anims: anims };
}