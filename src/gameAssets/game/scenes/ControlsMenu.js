import * as gameFunctions from "../utils/gameFunctions.js";
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_BACKGROUNDS_CT } from "../utils/sceneSetUp/Controls/controlsBG.js";
import { createTitles } from "../utils/sceneSetUp/Controls/controlsTITLES.js";
import { createAnimations } from "../utils/animation.js";
import { button } from "../entities/button.js";

export class Controls extends Phaser.Scene {
    constructor() {
        super({ key: 'Controls' });
    }

    preload() {
        gameFunctions.loadImages(this, INIT_IMAGES);
        gameFunctions.loadSpritesheets(this, INIT_SPRITESHEETS)
        gameFunctions.loadAudio(this, INIT_SFX);
        gameFunctions.loadAudio(this, INIT_MUSIC);
    }

    create() {
        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_CT);
        
        createAnimations(this);
        
        this.add.text(this.cameras.main.centerX, 100, 'GAME CONTROLS', {
            fontFamily: 'Audiowide',
            fontSize: this.scale.width / 16,
            color: '#00BDE0',
            align: 'center',
            stroke: '#3D01E1',
            strokeThickness: 8,
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#DB2CA4',
                blur: 8,
                stroke: true,
                fill: true
            }
        }).setOrigin(0.5);

        const startY = 200;
        const spacing = 100;
        
        
        const titles = createTitles(this, startY, spacing);

        titles.forEach(item => {
            gameFunctions.addControlSprite(
                this,
                item.x,
                item.y,
                item.texture,
                item.animation,
                item.text
            );
        });

        this.backButton = new button(this, this.cameras.main.centerX, startY + spacing * 3, 'horizontalLargeButton', 'BACK', 'MainMenu');
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }
}