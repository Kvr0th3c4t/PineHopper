import { INIT_BACKGROUNDS_OP } from "../utils/sceneSetUp/Options/optionsBG.js";
import * as gameFunctions from "../utils/gameFunctions.js"
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { AudioManager } from "../utils/preload/audio/audioManager.js";
import { OptionAudioManager } from "../utils/preload/audio/optionsAudioManager.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";

export class Options extends Phaser.Scene {

    constructor() {
        super({ key: 'Options' });
        this.audioManager = null;
        this.optionsManager = null;
    }

    init() {

        this.audioManager = this.registry.get('audioManager');
        if (!this.audioManager) {
            this.audioManager = new AudioManager(this);
            this.registry.set('audioManager', this.audioManager);
        }
    }

    preload() {
        gameFunctions.loadImages(this, INIT_IMAGES);
        gameFunctions.loadSpritesheets(this, INIT_SPRITESHEETS);
        gameFunctions.loadAudio(this, INIT_MUSIC);
        gameFunctions.loadAudio(this, INIT_SFX);
    }

    create() {

        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_OP);
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        this.optionsManager = new OptionAudioManager(this);

        this.optionsManager.createOptionsUI();

        this.optionsManager.updateButtonStates();
    }

    update() {
    
    }
}
