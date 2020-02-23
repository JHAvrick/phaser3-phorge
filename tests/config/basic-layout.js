import Phaser from 'phaser';

const BasicLayout = {
    objects: [
        {
            key: 'btn',
            layer: 'two',
            group: 'one',
            class: Phaser.GameObjects.Sprite,
            params: ["{SCENE}", 0, 0, 'btn'],
            props: {
                displayWidth: '90%',
                originY: 0.5,
                originX: 0.5,
                x: '50%',
                y: '5%'
            },
            post: function(object, scene){
                object.setInteractive();
                object.on('pointerover', () => {
                    console.log("Mouse over!");
                    object.alpha = .75;
                }, object);

                object.on('pointerout', () => {
                    console.log("Mouse out!");
                    object.alpha = 1;
                }, object);

            }
        },
        {
            key: 'btnTwo',
            clone: 'btn',
            props: {
                y: '15%',
            }
        },
        {
            key: 'btnThree',
            clone: 'btn',
            props: {
                y: '25%',
            }
        },
        {
            key: 'btnFour',
            clone: 'btn',
            props: {
                y: '35%',
            }
        },
        {
            key: 'btnFive',
            clone: 'btn',
            props: {
                y: '45%',
            }
        },
        {
            key: 'btnSix',
            clone: 'btn',
            props: {
                y: '55%',
            }
        },
        {
            key: 'btnSeven',
            clone: 'btn',
            props: {
                y: '65%',
            }
        },
        {
            key: 'btnEight',
            clone: 'btn',
            props: {
                y: '75%',
            }
        },
        {
            key: 'btnNine',
            clone: 'btn',
            props: {
                y: '85%',
            }
        }
    ]

}

export default BasicLayout;