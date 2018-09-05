const LayeredLayout = {
    layers: ['one', 'two', 'three', 'four', 'five'],
    objects: [
        {
            key: "one",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            props: {
                tint: 0xff0000,
                anchorX: 0.5,
                anchorY: 0,
                scaleX: 2.5,
                scaleY: 2.5,
                x: '30%',
                y: '30%'
            },
            resize: {
                x: '30%',
                displayWidth: '50%'
            }
        },
        {
            key: "two",
            layer: "two",
            clone: "one",
            props: {
                tint: 0x00ff00,
                x: '40%',
                y: '40%'
            },
            resize: {
                x: '40%',
            }
        },
        {
            key: "three",
            layer: "three",
            clone: "one",
            props: {
                tint: 0x0000ff,
                x: '50%',
                y: '50%'
            },
            resize: {
                x: '50%',
            }
        },
        {
            key: "four",
            layer: "four",
            clone: "one",
            props: {
                tint: 0x551a8b,
                x: '60%',
                y: '60%'
            },
            resize: {
                x: '60%',
            }
        },
    ]
}

export default LayeredLayout;