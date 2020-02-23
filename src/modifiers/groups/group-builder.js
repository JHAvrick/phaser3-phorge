import Phaser from 'phaser';

const GroupBuilder = {
    scene: {
        prop: 'groups',
        returns: 'groups',
        modifier: function(scene, groupKeys) {
            let groups = {};
            groupKeys.forEach((key) => {
                groups[key] = new Phaser.GameObjects.Group(scene);
            });
            return groups;
        }
    },
    objects: {
        prop: 'group',
        inclusive: false,
        modifier: function(scene, object, groupKey, groups){
            groups[groupKey].add(object);
        }
    }
}

export default GroupBuilder;
