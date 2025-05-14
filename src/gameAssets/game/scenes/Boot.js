import * as gameFunctions from "../utils/gameFunctions.js"
import { INIT_BACKGROUNDS_BO } from '../utils/sceneSetUp/Boot/bootBG.js';
import { INIT_SFX } from '../utils/preload/audio/SFX.js';
import { INIT_MUSIC } from '../utils/preload/audio/music.js';
import { INIT_IMAGES } from '../utils/preload/images.js';
import { INIT_SPRITESHEETS } from '../utils/preload/sprites.js';
import { button } from '../entities/button.js';

export class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot' });
    }
    
    preload() {
        
        gameFunctions.loadImages(this, INIT_IMAGES);
        gameFunctions.loadSpritesheets(this, INIT_SPRITESHEETS);
        gameFunctions.loadAudio(this, INIT_SFX);
        gameFunctions.loadAudio(this, INIT_MUSIC);
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontFamily: 'Audiowide',
                fontSize: 24,
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

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        const percentText = this.add.text(width / 2, height / 2, '0%', {
            fontSize: '30px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        const assetText = this.add.text(width / 2, height / 2 + 50, '', {
            fontSize: '30px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00bde0, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);

            percentText.setText(`${parseInt(value * 100)}%`);
        });

        this.load.on('fileprogress', (file) => {
            assetText.setText(`Cargando: ${file.key}`);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            
            this.initializeGame();
        });

        
    }
    
    initializeGame() {
        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_BO);
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.backButton = new button(this, this.cameras.main.centerX, 350, 'horizontalLargeButton', 'START', 'Preloader');
    }
    
    create() {

    }
}

