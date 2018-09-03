import Phaser from 'phaser';

const LayoutTwo = {
    layers: ['one', 'two', 'three', 'four', 'five'],
    groups: ['one', 'two', 'three', 'four', 'five'],
    objects: [
        {
            key: 'panel',
            layer: 'two',
            group: 'one',
            class: Phaser.GameObjects.Sprite,
            params: ["{SCENE}", 0, 0, 'panel'],
            props: {
                originY: 0.5,
                originX: 0.5,
                x: '10%',
                y: '50%',
                scaleX: 4,
                scaleY: 4
            },
            resize: {
                x: '10%',
                y: '50%'
            }
        },
        {
            key: "panelTwo",
            layer: 'three',
            group: 'two',
            clone: "panel",
            props: {
                x: '90%'
            },
            resize: {
                x: '90%',
            }
        }
    ]
}

export default LayoutTwo;