const LayeredLayout = {
    layers: ['one', 'two', 'three', 'four'],
    objects: [
        {
            key: "one",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            props: {
                scaleX: 2,
                scaleY: 2,
                x: '50%',
                y: '20%'
            }
        },
        {
            key: "two",
            layer: "two",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            props: {
                scaleX: 2,
                scaleY: 2,
                x: '50%',
                y: '30%'
            }
        },
        {
            key: "three",
            layer: "three",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            props: {
                scaleX: 2,
                scaleY: 2,
                x: '50%',
                y: '40%'
            }
        },
    ]
}

export default LayeredLayout;