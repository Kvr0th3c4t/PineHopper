import * as gameFunctions from "../utils/gameFunctions.js";
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_BACKGROUNDS_CT } from "../utils/sceneSetUp/Controls/controlsBG.js";
import { createTitles } from "../utils/sceneSetUp/Controls/controlsTITLES.js";
import { createAnimations } from "../utils/animation.js";
import { button } from "../entities/button.js";
import { INIT_BACKGROUNDS_CNT } from "../utils/sceneSetUp/Continue/continueBG.js";
import { SaveManager } from "../utils/SaveManager.js";
import { AudioManager } from "../utils/preload/audio/audioManager.js";

export class Continue extends Phaser.Scene {

    constructor() {
        super({ key: 'Continue' });
        
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
            audioManager.playMusic("Continue");
        }

        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_CNT);

        this.add.text(this.cameras.main.centerX, 100, 'SAVED FILES', {
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

        this.saveManager = new SaveManager(this);

        const hasSavedData = this.saveManager.hasSavedGame();
        
        if (hasSavedData) {
            this.showSavedData();
        } else {
            this.showNoDataMessage();
        }
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }
    
    showSavedData() {

        const savedData = this.saveManager.loadGameProgress();
        this.audioManager = this.registry.get('audioManager') || scene.game.registry.get('audioManager');

        if (!savedData) {
            this.showNoDataMessage();
            return;
        }
        
        const x = this.cameras.main.centerX;
        const y = this.cameras.main.centerY + 8;
        const width = this.cameras.main.width - 125;
        const height = this.cameras.main.height / 4;
        const cornerRadius = 15; 
                
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.8);
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
        
        // Fecha formateada
        let dateString = "Unknown";
        try {
            const savedDate = new Date(savedData.savedAt);
            dateString = `${savedDate.toLocaleDateString()} ${savedDate.toLocaleTimeString()}`;
        } catch (e) {
            console.error("Error al formatear fecha:", e);
        }

        const textConfig = {
            fontFamily: 'pixel',
            fontSize: 30,
            fill: '#ffffff'
        };

        this.add.text(
            this.cameras.main.centerX - 250,
            this.cameras.main.centerY - 50,
            `${this.getSceneName(savedData.scene)}`,
            textConfig
        ).setOrigin(0,0.5);


        this.add.text(
            this.cameras.main.centerX - 250,
            this.cameras.main.centerY - 15,
            `${this.getCheckpointName(savedData.id)}`,
            textConfig
        ).setOrigin(0, 0.5);

        this.add.text(
            this.cameras.main.centerX  - 250,
            this.cameras.main.centerY + 20,
            `Score: ${savedData.score}`,
            textConfig
        ).setOrigin(0, 0.5);

        this.add.text(
            this.cameras.main.centerX - 250,
            this.cameras.main.centerY + 55,
            `Last save: ${dateString}`,
            { 
                fontFamily: 'pixel',
                fontSize: 18,
                fill: '#cccccc'
            }
        ).setOrigin(0, 0.5);
        
        this.loadGame = new button(
            this,
            this.cameras.main.centerX + 200,
            this.cameras.main.centerY - 30,
            'horizontalLargeButton',
            'LOAD GAME',
            savedData.scene)
        
        this.deleteButton =
            this.add.sprite(
                this.cameras.main.centerX + 200,
                this.cameras.main.centerY + 35,
                'horizontalLargeButton')
                .setFrame(10)
                .setInteractive()
                .setScale(3);
        
        const buttonTextConfig = {
            fontSize: '30px',
            color: '#B7BDED',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };

        this.deleteButtontext = this.add.text(
            this.cameras.main.centerX + 200,
            this.cameras.main.centerY + 35,
            'DELETE',
            buttonTextConfig)
            .setOrigin(0.5, 0.75);

        this.deleteButton.setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.deleteButton.setFrame(11);
                this.deleteButtontext.setOrigin(0.5, 0.6);
            })
            .on('pointerout', () => {
                this.deleteButton.setFrame(10);
                this.deleteButtontext.setOrigin(0.5, 0.75);
            })
            .on('pointerdown', () => {
    
            if (this.audioManager && !this.audioManager.config.sfxMuted) {
                try {
                    this.audioManager.playSfx('buttonClick');
                } catch (error) {
                    console.warn('Failed to play button sound:', error);
                }
            }
                this.showConfirmDialog()
            });
                
                
        
        this.backButton = new button(
            this,
            this.cameras.main.centerX,
            this.cameras.main.centerY + 140,
            'horizontalLargeButton',
            'MAIN MENU',
            'MainMenu'
        )
        
    }
    
    showNoDataMessage() {

        const x = this.cameras.main.centerX;
        const y = this.cameras.main.centerY;
        const width = this.cameras.main.width - 150;
        const height = this.cameras.main.height / 4;
        const cornerRadius = 15; 
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.7);
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
        
        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 50,
            'NO DATA SAVED',
            {
                fontFamily: 'pixel',
                fontSize: 45,
                fill: '#ffffff'
            }
        ).setOrigin(0.5);
        
        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 30,
            'Pass through any checkpoint to save your progress',
            {
                fontFamily: 'pixel',
                fontSize: 33,
                fill: '#cccccc'
            }
        ).setOrigin(0.5);

        this.backButton = new button(
            this,
            this.cameras.main.centerX,
            this.cameras.main.centerY + 140,
            'horizontalLargeButton',
            'MAIN MENU',
            'MainMenu'
        )
    }
    
    showConfirmDialog() {

        const dialogGroup = this.add.group();   
        const x = this.cameras.main.centerX;
        const y = this.cameras.main.centerY;
        const width = this.cameras.main.width - 400;
        const height = this.cameras.main.height - 400;
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
            'Are you sure you want to \ndelete all the data?',
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

                this.saveManager.clearProgress();
                dialogGroup.destroy(true);
                this.saveManager.showMessage('¡Datos borrados!');
                this.time.delayedCall(1500, () => {
                    this.scene.restart();
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

    getSceneName(sceneKey) {
        const sceneNames = {
            'Stage1': 'Planicie del Sol Muerto',
            'Stage2': 'Tundra de Hielonoche',
            'FinalStage': 'Fauces de Ignarok'
        };
        
        return sceneNames[sceneKey] || sceneKey;
    }
    
    getCheckpointName(checkpointId) {
        const checkpointNames = {
            'checkpointST1': 'Stage-1 || Half way',
            'startST2': 'Stage-2 || Starting point',
            'checkpointST2': 'Stage-2 || Half way',
            'startFST': 'Final Stage || Starting point',
            'checkpointFST': 'Final Stage || Half way'
        };
        
        return checkpointNames[checkpointId] || checkpointId;
    }

    update() {
    
    }
}
