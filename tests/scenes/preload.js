import Phaser from 'phaser';


class Preload extends Phaser.Scene {
    constructor() {
        super({key: 'Preload'});
        console.log("Preload...");
    }

    preload(){
        this.load.image('btn', 'assets/sprites/btn.png');
        this.load.image('orb', 'assets/sprites/orb.png');
        this.load.image('panel', 'assets/sprites/panel.png');
        this.load.image('health', 'assets/sprites/healthbar.png');
        this.load.image('mana', 'assets/sprites/manabar.png');
    }

    create(){
        this.scene.start('Main');
    }

}

export default Preload;