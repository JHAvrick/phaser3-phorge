const LayeredLayout = {
    layers: ['one'],
    objects: [
        {
            key: "topleft",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            props: {
                originX: .2,
                originY: .7,
                displayOriginX: 24,
                displayOriginY: 76,
            },
            resize: {
                aspectRatio: '1:2',
                align: { to: "topleft" },
            }
        },
        {
            key: "topright",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            props: {
                originX: .2,
                originY: .7,
                displayOriginX: 24,
                displayOriginY: 76,
            },
            resize: {
                aspectRatio: '1:1',
                align: { to: "topright" },
            }
        },
        {
            key: "bottomleft",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            resize: {
                align: { to: "bottomleft" },
            }
        },
        {
            key: "bottomright",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            props: {
                originX: .2,
                originY: .7,
                displayOriginX: 24,
                displayOriginY: 76,
            },
            resize: {
                align: { to: "bottomright" },
            }
        },
        {
            key: "leftmiddle",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            props: {
                originX: .2,
                originY: .7,
                displayOriginX: 24
            },
            resize: {
                align: { to: "left" },
                y: '50%'
            }
        },
        {
            key: "rightmiddle",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            resize: {
                aspectRatio: 'original',
                align: { to: "right" },
                displayWidth: '20%',
                y: '50%'
            }
        },
        {
            key: "topmiddle",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            resize: {
                align: { to: "top" },
                x: '50%'
            }
        },
        {
            key: "bottommiddle",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            resize: {
                align: { to: "bottom" },
                x: '50%'
            }
        },
        {
            key: "center",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'panel'],
            resize: {
                y: '50%',
                x: '50%'
            }
        },
    ]
}

export default LayeredLayout;