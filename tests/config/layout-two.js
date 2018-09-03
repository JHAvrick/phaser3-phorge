import Phaser from 'phaser';

const LayoutTwo = {
    layers: ['one', 'two', 'three', 'four', 'five'],
    groups: ['one', 'two', 'three', 'four', 'five'],
    objects: [
        {
            key: "health",
            layer: "one",
            class: 'sprite',
            props: {
                texture: "health",
                anchorX: 0,
                anchorY: .5,
                scaleX: .5,
                scaleY: .5,
                x: 100,
                y: '5%'
            },
            resize: {
                y: '5%'
            },
            post: function(scene, objects){
                this.setTexture("health");
            }
        },
        {
            key: "mana",
            layer: "one",
            class:  Phaser.GameObjects.Sprite,
            params: ["{SCENE}", 0, 0, 'mana'],
            props: {
                anchorX: 0,
                anchorY: .5,
                scaleX: .5,
                scaleY: .5,
                x: 100,
                y: '10%'
            },
            resize: {
                y: '10%'
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
                scaleX: 3.5,
                scaleY: 3.5
            },
            resize: {
                x: '50%',
                y: '50%'
            }
        }
    ]
}

export default LayoutTwo;