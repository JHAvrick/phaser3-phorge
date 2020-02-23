import ResizeManager from './resize-manager';

const ResizeBuilder = {
    scene: {
        returns: 'resizer',
        modifier: function(scene) {
            return new ResizeManager(scene);
        }
    },
    objects: {
        prop: 'resize',
        inclusive: false,
        modifier: function(scene, object, resizeConfig, resizeManager){
            resizeManager.manage(object, resizeConfig);
        }
    }
}

export default ResizeBuilder;
