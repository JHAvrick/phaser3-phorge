# phaser3-phorge
A layout/scene building plugin for [Phaser 3](https://photonstorm.github.io/phaser3-docs/index.html). This plugin takes a user-defined config and creates the objects denoted therein.

 - [Features](#features) <br/>
 - [Install](#install) <br/>
 - [Usage](#usage)
 - [Schema](#schema)
 - [API](#api)
    - [LayerManager](#layermanager)
    - [ResizeManager](#resizemanager)
    - [Objects](#objects)
    - [Groups](#groups)
 - [Examples](#examples)

<a><a name="features" />
## Features
  - Seperate layout from game logic
  - Define object position as a ratio of scene size (i.e. '25%', '50%')
  - Seperate objects into rearrangeable layers
  - Add objects to groups
  - A simple resize manager to adjust certain position/size attributes on scene resize
  - Default values for most objects in the [Phaser.GameObject](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.html) namespace
  
<a><a name="install" />
## Install
`npm install phaser3-phorge`

<a><a name="usage" />
## Usage 

### Setup the Plugin
```javascript
import Phaser from 'phaser';
import PhorgePlugin from 'phaser3-phorge';

const gameConfig = {
    type: Phaser.WEBGL,
    parent: 'game-container',
    width: 400,
    height: 600,
    scene: [
        Preload,
        DemoScene
    ],
    plugins: {
        scene: [
            { 
                key: 'phorge', 
                mapping: 'phorge',
                plugin: PhorgePlugin
            }
        ]
    },
};

const game = new Phaser.Game(gameConfig);
```

### Build the Layout
```javascript
class Main extends Phaser.Scene {
    constructor() { super({key: 'Main'}); }
  
    create(){
        this.phorge.build(Layout);
    }
}

```
<a><a name="schema" />  
## Config Schema

`layers` - An array of strings, representing the layers in ascending order. <br/>
`groups` - An array of strings, each denoting an instance of [Phaser.GameObjects.Group](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Group.html). <br/>
`anims` - An array of animation configs, see [here](https://photonstorm.github.io/phaser3-docs/Phaser.Animations.Animation.html) for more info about what properties an animation config can contain. <br/>
`objects` - An array of object configs, with the properties: <br/>
  + `key` - (Required) The key by which this object can be retrieved from the plugin. Also used to map the object to the scene if `mapToScene` is true in the build config (as it is by default).
  + `class` - (Required) The class to instantiate this object. 
    - For many objects in the Phaser.GameObjects namespace, a string (case insensitive) can be used to resolve the class. This will work for any of the following: `BitmapText`, `DynamicBitmapText`, `Graphics`, `Image`, `RenderTexture`, `Sprite`, `Sprite3d`, `Text`, `TileSprite`, `Zone`.
  + `params` - (Optional) An array with params to pass the instantiated object. 
    - If you need to pass the parent scene, you can use `'{scene}'` as a placeholder and it will be resolved at runtime.
  + `layer` - (Optional) A string corresponding to one of your layers. Defaults to the first layer.
  + `group` - (Optional) A string correspnding to one of your groups.
  + `props` - (Optional) An object containing key/value pairs for each property to assign after this object's creation. 
    - Any property can be set here, not only those which are already owned by the object
    - Property chains (i.e. `prop.nextProp.whatever`) are valid
    - For the properties `x`, `y`, `displayWidth`, and `displayHeight`, you can pass a string such as '50%' to set the value based on a percentage of the scene dimensions. 
 + `resize` - (Optional) The plugins resize subsystem can manage the resizing of the following properties: `x`, `y`, `displayWidth`, and `displayHeight`.
    - By default the ResizeManager will subscribe to the scene's `resize` event and resize any object w/ a `resize` property in it's config. This can be disabled by using `phorge.resizer.stop()`
    - Use a ratio string such as `'50%'` to maintain a certain size relative to the scene dimensions.
   
<a><a name="api" />
## API
 
<a><a name="layermanager" />  
### LayerManager
The LayerManager maintains a list of semantic layers by setting the [depth](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.html#.Depth) property of each layer's children. The LayerManager has many methods for manipulating/reordering layers, however it can also be ignored after the initial build if desired. (You can always call `restack()` to reset the depth of each layer's children.)

<a name="LayerManager+restack"></a>
### layers.restack()
Reapplies the parent layers depth to each of the layer's children

**Kind**: instance method of [<code>LayerManager</code>](#LayerManager)
<a name="LayerManager+addLayer"></a>

### layers.addLayer(key, objects) ⇒ <code>Phaser.GameObjects.Group</code>
Add's a new layer to the top of the stack


**Returns**: <code>Phaser.GameObjects.Group</code> - - The new layer

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | The layer key |
| objects | <code>Array.&lt;Phaser.GameObjects.GameObject&gt;</code> | An array of objects that belong to this layer |

<a name="LayerManager+removeLayer"></a>
### layers.removeLayer(layerKey, [destroyObjects]) ⇒ <code>Phaser.GameObjects.Group</code>
the LayerManager.Any objects in that layer will no longer be managed by


**Returns**: <code>Phaser.GameObjects.Group</code> - - The removed layer

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| layerKey | <code>String</code> |  | The layer to remove |
| [destroyObjects] | <code>Bool</code> | <code>false</code> | Whether to call destroy() on  all objects in the group |

<a name="LayerManager+getLayer"></a>

### layers.getLayer(layerKey) ⇒ <code>Phaser.GameObjects.Group</code>
Returns the Phaser Group representing a given layer


**Returns**: <code>Phaser.GameObjects.Group</code> - - The new layer

| Param | Type | Description |
| --- | --- | --- |
| layerKey | <code>String</code> | The layer to get |

<a name="LayerManager+merge"></a>

### layers.merge(layerOneKey, layerTwoKey)
Merge two layers into one



| Param | Type |
| --- | --- |
| layerOneKey | <code>String</code> |
| layerTwoKey | <code>String</code> |

<a name="LayerManager+swap"></a>

### layers.swap(layerOne, layerTwo)
Swaps the depth order of two layers



| Param | Type | Description |
| --- | --- | --- |
| layerOne | <code>String</code> | The key of the first layer |
| layerTwo | <code>String</code> | The key of the second layer |

<a name="LayerManager+bringUp"></a>

### layers.bringUp(layerKey)
Switch the order of the given layer with the layer directly above it.



| Param | Type | Description |
| --- | --- | --- |
| layerKey | <code>String</code> | The key of the layer to bring up |

<a name="LayerManager+bringDown"></a>

### layers.bringDown(layerKey)
Switch the order of the given layer with the layer directly below it.



| Param | Type | Description |
| --- | --- | --- |
| layerKey | <code>String</code> | The key of the layer to bring up |

<a name="LayerManager+toTop"></a>

### layers.toTop(layerKey)
Brings a layer to the top of stack



| Param | Type |
| --- | --- |
| layerKey | <code>String</code> |

<a name="LayerManager+toBack"></a>

### layers.toBack(layerKey)
Sends a layer to the bottom of stack



| Param | Type |
| --- | --- |
| layerKey | <code>String</code> |

<a name="LayerManager+addObject"></a>

### layers.addObject(layerKey, object)
Adds an object to the given layer



| Param | Type | Description |
| --- | --- | --- |
| layerKey | <code>String</code> | The layer into which the object will be added |
| object | <code>Phaser.GameObjects.GameObject</code> | An valid object in the Phaser.GameObjects namespace |

<a name="LayerManager+removeObject"></a>

### layers.removeObject(object)
Removes an object from any layer in which it resides.

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Phaser.GameObjects.GameObject</code> | The object to remove |

<a name="LayerManager+getObjLayerKey"></a>

### layers.getObjLayerKey(object) ⇒ <code>String</code> \| <code>Bool</code>
Returns the key of the layer that the given object resides in


**Returns**: <code>String</code> \| <code>Bool</code> - - The layer key, or `false` if the object resides in no layers

| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object for which to retrieve the layer key |

<a name="LayerManager+moveToLayer"></a>

### layers.moveToLayer(object, newLayerKey)
Move an object to a different layer



| Param | Type | Description |
| --- | --- | --- |
| object | <code>Object</code> | The object to move |
| newLayerKey | <code>String</code> | The destination layer key |

<a><a name="examples" />
## Config Examples

A simple layout with only two objects:
```javascript
const SimpleLayout = {
    layers: ['one', 'two', 'three'],
    groups: ['one', 'two'],
    objects: [
        {
            key: "healthbar",
            layer: "one",
            class: 'sprite',
            params: ['{scene}', 0, 0, 'healthbar'],  //'{scene}' will resolve to the current scene
            props: { anchorX: 0.5, anchorY: 0.5, x: '50%', y: '50%' }
        },
        {
            key: "mana",
            layer: "two",
            clone:  'healthbar', //Use the settings from another config
            params: ["{SCENE}", 0, 0, 'mana']
        },
    ]
}

export default LayoutTwo;
```
