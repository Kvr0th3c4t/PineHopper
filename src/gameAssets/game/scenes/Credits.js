import * as gameFunctions from "../utils/gameFunctions.js"
import { INIT_IMAGES } from "../utils/preload/images.js"
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js"
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_BACKGROUNDS_CR } from "../utils/sceneSetUp/Credits/creditsBG";
import { button } from "../entities/button.js";

export class Credits extends Phaser.Scene {

    constructor() {
        super({ key: 'Credits' });
    }

    init() {

    }

    preload() {
        gameFunctions.loadImages(this, INIT_IMAGES);
        gameFunctions.loadSpritesheets(this, INIT_SPRITESHEETS);
        gameFunctions.loadAudio(this, INIT_SFX);
        gameFunctions.loadAudio(this, INIT_MUSIC);
    }

    create() {
        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_CR);

        const audioManager = this.game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playMusic("Creditos");
        }
        const creditsGroup = this.add.group();

        const textConfig = {
            fontSize: '35px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };

        let yPosition = 650;
        const spacing = 80;
        
        const createdByText = this.add.text(400, yPosition, 'Created by', textConfig).setOrigin(0.5);
        yPosition += 50;
        const nameText = this.add.text(400, yPosition, 'Adrian "Kvr0th3c4t" Carmona', {
            fontSize: '40px',
            color: '#FFFFFF',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);
        
        yPosition += spacing;
        
        const specialThanksText = this.add.text(400, yPosition, 'Special Thanks', textConfig).setOrigin(0.5);
        yPosition += 50;
        const thanksList = this.add.text(400, yPosition, 'Jennifer Alonso',{
            fontSize: '40px',
            color: '#FFFFFF',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        yPosition += spacing;
        
        const thanksText = this.add.text(400, yPosition, 'Thank you for playing!', textConfig).setOrigin(0.5);
        yPosition += 50;
        const enjoyText = this.add.text(400, yPosition, 'Hope you enjoyed the game',textConfig).setOrigin(0.5);
        
        creditsGroup.add(createdByText);
        creditsGroup.add(nameText);
        creditsGroup.add(thanksText);
        creditsGroup.add(enjoyText);
        creditsGroup.add(specialThanksText);
        creditsGroup.add(thanksList);
        
        this.tweens.add({
            targets: creditsGroup.getChildren(),
            y: '-=1200', 
            duration: 9000,
            ease: 'Linear',
            onComplete: () => {
                this.showButtons();
            }
        });
        
        this.cameras.main.fadeIn(1000, 0, 0, 0);

    }
    
    showButtons() {        
        this.backButton = new button(this, 400, 250, 'horizontalLargeButton', 'GO BACK', 'MainMenu');

        this.githubButton =
            this.add.sprite(400, 350, 'horizontalLargeButton')
                .setFrame(0)
                .setInteractive()
                .setScale(3);
        
        const textConfig = {
            fontSize: '30px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };

        this.text = this.add.text(400, 350, 'GITHUB', textConfig)
            .setOrigin(0.5, 0.75);

        this.githubButton.setInteractive({ useHandCursor: true })
            .on('pointerover', () => {
                this.githubButton.setFrame(1);
                this.text.setOrigin(0.5, 0.6);
            })
            .on('pointerout', () => {
                this.githubButton.setFrame(0);
                this.text.setOrigin(0.5, 0.75);
            })
            .on('pointerdown', () => this.openGithub());

        this.tweens.add({
            targets: [this.backButton, this.githubButton],
            alpha: { from: 0, to: 1 },
            duration: 1000,
            ease: 'Power2'
        });
    }

    openGithub() {
        const githubURL = 'https://github.com/Kvr0th3c4t';
        window.open(githubURL, '_blank');
    }

    update() {

    }
}