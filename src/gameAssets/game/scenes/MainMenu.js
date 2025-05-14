import * as gameFunctions from "../utils/gameFunctions.js"
import { INIT_IMAGES } from "../utils/preload/images.js"
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js"
import { INIT_BACKGROUNDS_MM } from "../utils/sceneSetUp/MainMenu/mainMenuBG.js"
import { button } from "../entities/button.js"
import { INIT_SFX } from "../utils/preload/audio/SFX.js"
import { INIT_MUSIC } from "../utils/preload/audio/music.js"
import { SaveManager } from "../utils/SaveManager.js"

export class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: 'MainMenu' });
    }

    init(){

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
            audioManager.playMusic("MainMenu");
        }
        const saveManager = new SaveManager();
        const savedData = saveManager.loadGameProgress();
        const buttonTextConfig = {
            fontSize: '30px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };

        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_MM);
        const title = this.add.text(
            this.scale.width / 2,
            this.scale.height / 4,
            'Pine Hopper',
            {
                fontFamily: 'Audiowide',
                fontSize: this.scale.width / 8,
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
            }
        ).setOrigin(0.5, 0.5).setAlpha(0); 
        
        this.tweens.add({
            targets: title,
            alpha: 1, 
            duration: 2500, 
            ease: 'Power2'
        });

        this.newGame =
        this.add.sprite(
            175,
            350,
            'horizontalLargeButton')
            .setFrame(0)
            .setInteractive()
            .setScale(3.2);

        this.newGameText = this.add.text(
            175,
            350,
            'NEW GAME',
            buttonTextConfig)
            .setOrigin(0.5, 0.75);

        this.newGame.setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.newGame.setFrame(1);
                this.newGameText.setOrigin(0.5, 0.6);
            })
            .on('pointerout', () => {
                this.newGame.setFrame(0);
                this.newGameText.setOrigin(0.5, 0.75);
            })
            .on('pointerdown', () => {

                if (!savedData) {
                    this.scene.start('Stage1')
                }
                this.showConfirmDialog();
            });
        
        this.continueButton = new button(this, 325, 350, 'horizontalLargeButton', 'CONTINUE', 'Continue');
        this.tutorialButton = new button(this, 175, 400, 'horizontalLargeButton', 'TUTORIAL', 'Tutorial');
        this.optionsButton = new button(this, 325, 400, 'horizontalLargeButton', 'CONTROLS', 'Controls'); 
        this.creditsButton = new button(this, 250, 450, 'horizontalLargeButton', 'CREDITS', 'Credits');

        this.controlButton =  this.add.sprite(750, 50, 'smallButton')
                .setFrame(90)
                .setInteractive()
                .setScale(3)
                .setScrollFactor(0);
            
            this.controlButton.on('pointerover', () => {
                this.controlButton.setFrame(91);
            });
            
            this.controlButton.on('pointerout', () => {
                this.controlButton.setFrame(90);
            });
            
            this.controlButton.on('pointerdown', () => {
                this.scene.start('Options')

            });

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        
    }

    showConfirmDialog() {

        const dialogGroup = this.add.group();   
        const x = this.cameras.main.centerX;
        const y = this.cameras.main.centerY;
        const width = this.cameras.main.width - 400;
        const height = this.cameras.main.height - 400;
        const cornerRadius = 15;
        const saveManager = new SaveManager();
        const savedData = saveManager.loadGameProgress();
        const buttonTextConfig = {
            fontSize: '30px',
            color: '#B7BDED',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };
                
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
            'You have saved data from another game. \nIf you start a new game your \nprogress will be lost.',
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
            'NEW GAME',
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
            'LOAD GAME',
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
            this.scene.start(savedData.scene)
            });
        
        dialogGroup.add(this.confirmCancelButtonDialog);
    }

    update() {

    }
}

