import Phaser from 'phaser';

/**
 * The ResolvableClasses object contains a subset of Phaser.GameObjects and a 
 * set of default params for each. This allows classes to be resolved via string
 * (i.e. 'sprite', 'bitmaptext') instead of importing the class definition. 
 * Container-like types are not included as they are defined differently in a 
 * layout.
 */
const ResolvableClasses = {
    bitmaptext: {
        class: Phaser.GameObjects.BitmapText,
        defaultParams: ['{SCENE}', 0, 0, "null"]
    },
    dynamicbitmaptext: {
        class: Phaser.GameObjects.DynamicBitmapText,
        defaultParams: ['{SCENE}', 0, 0, "null"]
    },
    graphics: {
        class: Phaser.GameObjects.Graphics,
        defaultParams: ['{SCENE}']
    },
    image: {
        class: Phaser.GameObjects.Image,
        defaultParams: ['{SCENE}', 0, 0, "null"]
    },
    rendertexture: {
        class: Phaser.GameObjects.RenderTexture,
        defaultParams: ['{SCENE}', 0, 0]
    },
    sprite: {
        class: Phaser.GameObjects.Sprite,
        defaultParams: ['{SCENE}', 0, 0, 'null']
    },
    sprite3d: {
        class: Phaser.GameObjects.Sprite3D,
        defaultParams: ['{SCENE}', 0, 0, 0, 'null']
    },
    text: {
        class: Phaser.GameObjects.Text,
        defaultParams: ['{SCENE}', 0, 0, "TEXT"]
    },
    tilesprite: {
        class: Phaser.GameObjects.TileSprite,
        defaultParams: ['{SCENE}', 0, 0, '{SCENE.WIDTH}', '{SCENE.HEIGHT}', 'null']
    },
    zone: {
        class: Phaser.GameObjects.Zone,
        defaultParams: ['{SCENE}', 0, 0]        
    }
}

export default ResolvableClasses;