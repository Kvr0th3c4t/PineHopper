import * as gameFunctions from "../utils/gameFunctions.js"
import { INIT_BACKGROUNDS_GO } from "../utils/sceneSetUp/GameOver/gameOverBG.js";
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { button } from "../entities/button.js";
import { INIT_BACKGROUNDS_WI } from "../utils/sceneSetUp/Win/winBG.js";

export class Win extends Phaser.Scene {

    constructor() {
        super({ key: 'Win' });
    }

    init(data){
        this.previousSceneName = data.fromScene
    }

    preload() {
        gameFunctions.loadImages(this, INIT_IMAGES);
        gameFunctions.loadSpritesheets(this, INIT_SPRITESHEETS);
        gameFunctions.loadAudio(this, INIT_SFX);
        gameFunctions.loadAudio(this, INIT_MUSIC);
    }

    create() {
        const audioManager = this.game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playMusic("Loose");
        }

        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_WI);

        const title = this.add.text(
            this.scale.width / 2,
            this.scale.height - 100,
            'VICTORY!!!',
            {
                fontFamily: 'Audiowide',
                fontSize: this.scale.width / 10,
                color: '#00BDE0',
                align: 'center',
                stroke: '#3D01E1',
                strokeThickness: 8,
                shadow: {
                    offsetX: 6,
                    offsetY: 6,
                    color: '#DB2CA4',
                    blur: 8,
                    stroke: true,
                    fill: true
                }
            }
        ).setOrigin(0.5, 0.5).setAlpha(0); 
        
        this.tweens.add({
            targets: title,
            alpha: 1, 
            duration: 2500, 
            ease: 'Power2'
        });
        
        this.time.delayedCall(5000, () => {
                this.scene.start('Credits');
            });
    }


    update() {

    }
}