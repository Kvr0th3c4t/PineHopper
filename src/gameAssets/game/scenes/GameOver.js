import * as gameFunctions from "../utils/gameFunctions.js"
import { INIT_BACKGROUNDS_GO } from "../utils/sceneSetUp/GameOver/gameOverBG.js";
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { button } from "../entities/button.js";
import { SaveManager } from "../utils/SaveManager.js";

export class GameOver extends Phaser.Scene {

    constructor() {
        super({ key: 'GameOver' });
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
        this.audioManager = this.registry.get('audioManager') || scene.game.registry.get('audioManager'); 
        
        const buttonTextConfig = {
            fontSize: '30px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };
        const saveManager = new SaveManager();

        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_GO);

        const title = this.add.text(
            this.scale.width / 2,
            this.scale.height / 4,
            'Game Over',
            {
                fontFamily: 'Audiowide',
                fontSize: this.scale.width / 8,
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

        this.currentScene = this.scene.key;

        this.retry = new button(this, this.scale.width / 2 - 200, 450, 'horizontalLargeButton', 'RETRY STAGE', this.previousSceneName);

        
        if (this.previousSceneName !== 'Tutorial') {

        this.restartButton =
        this.add.sprite(
            this.scale.width / 2,
            450,
            'horizontalLargeButton')
            .setFrame(0)
            .setInteractive()
            .setScale(3);

        this.restartButtonText = this.add.text(
            this.scale.width / 2,
            450,
            'RESTART',
            buttonTextConfig)
            .setOrigin(0.5, 0.75);

        this.restartButton.setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.restartButton.setFrame(1);
                this.restartButtonText.setOrigin(0.5, 0.6);
            })
            .on('pointerout', () => {
                this.restartButton.setFrame(0);
                this.restartButtonText.setOrigin(0.5, 0.75);
            })
            .on('pointerdown', () => {
                if (this.audioManager && !this.audioManager.config.sfxMuted) {
                    try {
                        this.audioManager.playSfx('buttonClick');
                    } catch (error) {
                        console.warn('Failed to play button sound:', error);
                    }
                }
                    this.showConfirmDialog();
                
            });

            this.mainMenu = new button(this, this.scale.width / 2 + 200, 450, 'horizontalLargeButton', 'MAIN MENU', 'MainMenu');
        } else {

            this.mainMenu = new button(this, this.scale.width / 2 + 200, 450, 'horizontalLargeButton', 'MAIN MENU', 'MainMenu');
        }
        
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    showConfirmDialog() {

        const dialogGroup = this.add.group();   
        const x = this.cameras.main.centerX;
        const y = this.cameras.main.centerY;
        const width = this.cameras.main.width - 400;
        const height = this.cameras.main.height - 400;
        const saveManager = new SaveManager();
        const cornerRadius = 15;
        const buttonTextConfig = {
            fontSize: '30px',
            color: '#B7BDED',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };

        this.audioManager = this.registry.get('audioManager') || scene.game.registry.get('audioManager');  
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000);
        graphics.fillRoundedRect(
            x - width/2,        
            y - height/2,       
            width, 
            height, 
            cornerRadius
        );

        graphics.lineStyle(2, 0x00BDE0, 1); 
        graphics.strokeRoundedRect(
            x - width/2, 
            y - height/2, 
            width, 
            height, 
            cornerRadius
        );
        dialogGroup.add(graphics);

        const text = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 40,
            'If you restart the game \nyour progress will be lost. \nAre you sure about restarting the game?',
            {
                fontFamily: 'pixel',
                fontSize: 24,
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
        dialogGroup.add(text);
        
        this.confirmButtonDialog =
            this.add.sprite(
                this.cameras.main.centerX - 100,
                this.cameras.main.centerY + 40,
                'horizontalLargeButton')
                .setFrame(30)
                .setInteractive()
                .setScale(3);

        this.confirmButtonText = this.add.text(
            this.cameras.main.centerX -100,
            this.cameras.main.centerY + 40,
            'CONFIRM',
            buttonTextConfig)
            .setOrigin(0.5, 0.75);
        
        dialogGroup.add(this.confirmButtonText);

        this.confirmButtonDialog.setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.confirmButtonDialog.setFrame(31);
                this.confirmButtonText.setOrigin(0.5, 0.6);
            })
            .on('pointerout', () => {
                this.confirmButtonDialog.setFrame(30);
                this.confirmButtonText.setOrigin(0.5, 0.75);
            })
            .on('pointerdown', () => {
                if (this.audioManager && !this.audioManager.config.sfxMuted) {
                    try {
                        this.audioManager.playSfx('buttonClick');
                    } catch (error) {
                        console.warn('Failed to play button sound:', error);
                    }
                }
                saveManager.clearProgress();
                dialogGroup.destroy(true);
                this.time.delayedCall(1500, () => {
                    this.scene.start('Stage1');
                });
            });
        
        dialogGroup.add(this.confirmButtonDialog);
        
        this.confirmCancelButtonDialog =
            this.add.sprite(
                this.cameras.main.centerX + 80,
                this.cameras.main.centerY + 40,
                'horizontalLargeButton')
                .setFrame(10)
                .setInteractive()
                .setScale(3);

        this.confirmCancelButtonText = this.add.text(
            this.cameras.main.centerX + 80,
            this.cameras.main.centerY + 40,
            'CANCEL',
            buttonTextConfig)
            .setOrigin(0.5, 0.75);
        
        dialogGroup.add(this.confirmCancelButtonText);

        this.confirmCancelButtonDialog.setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.confirmCancelButtonDialog.setFrame(11);
                this.confirmCancelButtonText.setOrigin(0.5, 0.6);
            })
            .on('pointerout', () => {
                this.confirmCancelButtonDialog.setFrame(10);
                this.confirmCancelButtonText.setOrigin(0.5, 0.75);
            })
            .on('pointerdown', () => {
                if (this.audioManager && !this.audioManager.config.sfxMuted) {
                    try {
                        this.audioManager.playSfx('buttonClick');
                    } catch (error) {
                        console.warn('Failed to play button sound:', error);
                    }
                }
                dialogGroup.destroy(true);
            });
        
        dialogGroup.add(this.confirmCancelButtonDialog);
    }

    update() {

    }
}
