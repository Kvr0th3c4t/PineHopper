import { Scene } from 'phaser';
import { AudioManager } from '../utils/preload/audio/audioManager.js';
import * as gameFunctions from "../utils/gameFunctions.js"
import { INIT_SFX } from '../utils/preload/audio/SFX.js';
import { INIT_MUSIC } from '../utils/preload/audio/music.js';
import { INIT_IMAGES } from '../utils/preload/images.js';
import { INIT_SPRITESHEETS } from '../utils/preload/sprites.js';

export class Preloader extends Scene
{
    constructor ()
    {
        super({ key: 'Preloader' });
    }

preload() {

    gameFunctions.loadImages(this, INIT_IMAGES);
    gameFunctions.loadSpritesheets(this, INIT_SPRITESHEETS);
    gameFunctions.loadAudio(this, INIT_SFX);
    gameFunctions.loadAudio(this, INIT_MUSIC);

}

create() {

        const audioManager = new AudioManager(this);
        this.registry.set('audioManager', audioManager);
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.scene.start('MainMenu');
    }
}