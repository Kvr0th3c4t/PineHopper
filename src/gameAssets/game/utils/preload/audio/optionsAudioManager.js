// src/entities/AudioOptionsManager.js
import { AudioManager } from "../../../utils/preload/audio/audioManager.js";
import { button } from "../../../entities/button.js"

export class OptionAudioManager {
    constructor(scene) {
        this.scene = scene;

        this.audioManager = scene.registry.get('audioManager');
        if (!this.audioManager) {
            this.audioManager = new AudioManager(scene);
            scene.registry.set('audioManager', this.audioManager);
        }

        this.muteSFX = null;
        this.muteMusic = null;
        this.muteSFXText = null;
        this.muteMusicText = null;
        this.volumeTextSFX = null;
        this.volumeTextMusic = null;
        this.plusButtonSFX = null;
        this.minusButtonSFX = null;
        this.plusButtonMusic = null;
        this.minusButtonMusic = null;
        this.backButton = null;
    }
    
    createOptionsUI() {
        const startY = 180;
        const spacing = 100;
        const textConfig = {
            fontSize: '30px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };

        this.muteSFX = this.scene.add.sprite(this.scene.cameras.main.centerX / 2, startY, 'horizontalLargeButton')
            .setFrame(this.audioManager.config.sfxMuted ? 1 : 0)
            .setInteractive()
            .setScale(3);

        this.muteSFXText = this.scene.add.text(this.scene.cameras.main.centerX / 2, startY,
            this.audioManager.config.sfxMuted ? 'UNMUTE SFX' : 'MUTE SFX', textConfig)
            .setOrigin(0.5, 0.75);

        this.muteSFX.on('pointerover', () => {
            this.muteSFX.setFrame(1);
            this.muteSFXText.setOrigin(0.5, 0.6);
        });
        
        this.muteSFX.on('pointerout', () => {
            if (!this.audioManager.config.sfxMuted) {
                this.muteSFX.setFrame(0);
                this.muteSFXText.setOrigin(0.5, 0.75);
            }
        });

        this.muteSFX.on('pointerdown', () => {
            const isMuted = this.audioManager.toggleSfxMute();
            this.muteSFXText.setText(isMuted ? 'UNMUTE SFX' : 'MUTE SFX');
            this.muteSFX.setFrame(isMuted ? 1 : 0);

            if (!isMuted) {
                this.audioManager.playSfx('buttonClick');
            }
        });

        this.volumeTextSFX = this.scene.add.text(
            this.scene.cameras.main.centerX,
            startY,
            Math.round(this.audioManager.config.sfxVolume * 100) + '%',
            textConfig
        ).setOrigin(0.5, 0.6);

        this.plusButtonSFX = this.scene.add.sprite(this.scene.cameras.main.centerX * 1.25, startY, 'smallButton')
            .setFrame(140)
            .setInteractive()
            .setScale(3);

        this.plusButtonSFX.on('pointerover', () => {
            this.plusButtonSFX.setFrame(141);
        });
        
        this.plusButtonSFX.on('pointerout', () => {
            this.plusButtonSFX.setFrame(140);
        });

        this.plusButtonSFX.on('pointerdown', () => {
            if (this.audioManager.config.sfxVolume < 1) {
                const newVolume = Math.min(1, this.audioManager.config.sfxVolume + 0.1);
                this.audioManager.setSfxVolume(newVolume);
                this.volumeTextSFX.setText(Math.round(newVolume * 100) + '%');

                this.audioManager.playSfx('buttonClick');
            }
        });

        this.minusButtonSFX = this.scene.add.sprite(this.scene.cameras.main.centerX * 1.65, startY, 'smallButton')
            .setFrame(150)
            .setInteractive()
            .setScale(3);

        this.minusButtonSFX.on('pointerover', () => {
            this.minusButtonSFX.setFrame(151);
        });
        
        this.minusButtonSFX.on('pointerout', () => {
            this.minusButtonSFX.setFrame(150);
        });

        this.minusButtonSFX.on('pointerdown', () => {
            if (this.audioManager.config.sfxVolume > 0) {
                const newVolume = Math.max(0, this.audioManager.config.sfxVolume - 0.1);
                this.audioManager.setSfxVolume(newVolume);
                this.volumeTextSFX.setText(Math.round(newVolume * 100) + '%');

                if (newVolume > 0) {
                    this.audioManager.playSfx('buttonClick');
                }
            }
        });

        this.muteMusic = this.scene.add.sprite(this.scene.cameras.main.centerX / 2, startY + spacing * 1.5, 'horizontalLargeButton')
            .setFrame(this.audioManager.config.musicMuted ? 1 : 0)
            .setInteractive()
            .setScale(3);
        
        this.muteMusicText = this.scene.add.text(this.scene.cameras.main.centerX / 2, startY + spacing * 1.5,
            this.audioManager.config.musicMuted ? 'UNMUTE MUSIC' : 'MUTE MUSIC', textConfig)
            .setOrigin(0.5, 0.75);

        this.muteMusic.on('pointerover', () => {
            this.muteMusic.setFrame(1);
            this.muteMusicText.setOrigin(0.5, 0.6);
        });
        
        this.muteMusic.on('pointerout', () => {
            if (!this.audioManager.config.musicMuted) {
                this.muteMusic.setFrame(0);
                this.muteMusicText.setOrigin(0.5, 0.75);
            }
        });

        this.muteMusic.on('pointerdown', () => {
            const isMuted = this.audioManager.toggleMusicMute();
            this.muteMusicText.setText(isMuted ? 'UNMUTE MUSIC' : 'MUTE MUSIC');
            this.muteMusic.setFrame(isMuted ? 1 : 0);
            if (!this.audioManager.config.sfxMuted) {
                this.audioManager.playSfx('buttonClick');
            }
        });

        this.volumeTextMusic = this.scene.add.text(
            this.scene.cameras.main.centerX,
            startY + spacing * 1.5,
            Math.round(this.audioManager.config.musicVolume * 100) + '%',
            textConfig
        ).setOrigin(0.5, 0.6);

        this.plusButtonMusic = this.scene.add.sprite(this.scene.cameras.main.centerX * 1.25, startY + spacing * 1.5, 'smallButton')
            .setFrame(140)
            .setInteractive()
            .setScale(3);

        this.plusButtonMusic.on('pointerover', () => {
            this.plusButtonMusic.setFrame(141);
        });
        
        this.plusButtonMusic.on('pointerout', () => {
            this.plusButtonMusic.setFrame(140);
        });

        this.plusButtonMusic.on('pointerdown', () => {
            if (this.audioManager.config.musicVolume < 1) {
                const newVolume = Math.min(1, this.audioManager.config.musicVolume + 0.1);
                this.audioManager.setMusicVolume(newVolume);
                this.volumeTextMusic.setText(Math.round(newVolume * 100) + '%');
                if (!this.audioManager.config.sfxMuted) {
                    this.audioManager.playSfx('buttonClick');
                }
            }
        });

        this.minusButtonMusic = this.scene.add.sprite(this.scene.cameras.main.centerX * 1.65, startY + spacing * 1.5, 'smallButton')
            .setFrame(150)
            .setInteractive()
            .setScale(3);

        this.minusButtonMusic.on('pointerover', () => {
            this.minusButtonMusic.setFrame(151);
        });
        
        this.minusButtonMusic.on('pointerout', () => {
            this.minusButtonMusic.setFrame(150);
        });

        this.minusButtonMusic.on('pointerdown', () => {
            if (this.audioManager.config.musicVolume > 0) {
                const newVolume = Math.max(0, this.audioManager.config.musicVolume - 0.1);
                this.audioManager.setMusicVolume(newVolume);
                this.volumeTextMusic.setText(Math.round(newVolume * 100) + '%');
                if (!this.audioManager.config.sfxMuted) {
                    this.audioManager.playSfx('buttonClick');
                }
            }
        });

        this.createNavigationButtons(startY, spacing);
    }
    
    createNavigationButtons(startY, spacing) {

        this.backButton = new button(
            this.scene,
            this.scene.cameras.main.centerX,
            startY + spacing * 3,
            'horizontalLargeButton',
            'BACK',
            'MainMenu'
        );
    }

    updateButtonStates() {

        if (this.audioManager.config.sfxMuted) {
            this.muteSFX.setFrame(1);
            this.muteSFXText.setText('UNMUTE SFX');
        }
        
        if (this.audioManager.config.musicMuted) {
            this.muteMusic.setFrame(1);
            this.muteMusicText.setText('UNMUTE MUSIC');
        }
    }
}