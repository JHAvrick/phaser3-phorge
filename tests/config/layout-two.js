import Phaser from 'phaser';

const LayoutTwo = {
    layers: ['one', 'two', 'three', 'four', 'five'],
    groups: ['one', 'two', 'three', 'four', 'five'],
    objects: [
        {
            key: 'orb',
            layer: 'two',
            group: 'one',
            class: Phaser.GameObjects.Sprite,
            params: ["{SCENE}", 0, 0, 'orb'],
            props: {
                displayWidth: '50%',
                originY: 0.5,
                originX: 0.5,
                x: '50%',
                y: '50%'
            },
            resize: {
                displayWidth: '50%',
                x: '50%',
                y: '50%'
            }
        },
        {
            key: 'panel',
            layer: 'two',
            group: 'one',
            class: Phaser.GameObjects.Sprite,
            params: ["{SCENE}", 0, 0, 'panel'],
            props: {
                originY: 0.5,
                originX: 0.5,
                x: '50%',
                y: '50%',
                scaleX: 4,
                scaleY: 4
            },
            resize: {
                x: '50%',
                y: '50%'
            }
        }
    ]
}

export default LayoutTwo;