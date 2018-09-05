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

<a><a name="addlayer" />
<b> addLayer (layerKey, objects) </b> - Add a new layer to the top of the stack
 - <i> layerKey : String </i> - (Required) the layer key
 - <i> objects : Array </i> - (Optional) an array of game objects to add to this layer
 
<a><a name="removelayer" />
<b> removeLayer (layerKey, migrateTo) </b> - Dissolves a layer, does NOT destroy the layer's objects.
  - <i> layerKey : String </i> - (Required) the layer key
  - <i> migrateTo : Bool | String </i> - (Optional) The layer key to which to move this layers objects. If left empty (false), the objects will no longer be managed by the LayerManager.
  - <b>returns</b> <i> Array </i> - the objects from the removed layer

<a><a name="addObject" />
<b> addObject (layerKey, object) </b> - Adds an object to the designated layer
  - <i> layerKey : String </i> - (Required) the layer key
  - <i> object : Object </i> - (Required) The object to add

<a><a name="removeObject" />
<b> removeObject (object) </b> - Remove's a given object from the LayerManager
  - <i> object : Object </i> - (Required) The object to remove

<a><a name="removeObject" />
<b> moveToLayer (object) </b> - Move an object to a different layer
  - <i> object : Object </i> - (Required) The object to move
  - <i> layerKey : String </i> - (Required) the layer key

<a><a name="getObjLayerKey" />
<b> getObjLayerKey (object, layerKey) </b> - Returns the key of the layer where the given object resides
  - <i> object : Object </i> - (Required) The object for which to find the layer key
  - <b>returns</b> <i> String | Bool </i> - The layer key or `false` if the object is a part of no layers

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
