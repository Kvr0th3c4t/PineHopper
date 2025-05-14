import { AudioManager } from "../utils/preload/audio/audioManager.js";

export class button {
    constructor(scene, x, y, texture, text, targetScene) {
        this.relatedScene = scene;
        this.targetScene = targetScene;
        this.audioManager = scene.registry.get('audioManager');
        if (!this.audioManager) {
            this.audioManager = new AudioManager(scene);
            scene.registry.set('audioManager', this.audioManager);
        }

        this.sprite = scene.add.sprite(x, y, texture)
            .setFrame(0)
            .setInteractive()
            .setScale(3.2);

        const textConfig = {
            fontSize: '30px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };

        this.text = scene.add.text(x, y, text, textConfig)
            .setOrigin(0.5, 0.75);

        this.setupEvents();
    }
    
    setupEvents() {

        this.sprite.on('pointerover', () => {
            this.sprite.setFrame(1);
            this.text.setOrigin(0.5, 0.6);
        });
        
        this.sprite.on('pointerout', () => {
            this.sprite.setFrame(0);
            this.text.setOrigin(0.5, 0.75);
        });

        this.sprite.on('pointerdown', () => {
            this.relatedScene.scene.start(this.targetScene);
            if (!this.audioManager.config.sfxMuted) {
                this.audioManager.playSfx('buttonClick');
            }
        });
    }
}