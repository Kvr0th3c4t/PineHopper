import { AudioManager } from "../audio/audioManager.js";

export class OptionsPopUp {
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

        this.uiElements = [];
    }
    
    createPopUp() {
        const x = this.scene.cameras.main.centerX;
        const y = this.scene.cameras.main.centerY;
        const width = this.scene.cameras.main.width - 200;
        const height = this.scene.cameras.main.height - 250;
        const cornerRadius = 15;

        const startY = this.scene.cameras.main.centerY - 100;
        const spacing = 50;
        const textConfig = {
            fontSize: '30px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        };

        const overlay = this.scene.add.group();

        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0x000000);
        graphics.fillRoundedRect(
            x - width/2,        
            y - height/2,       
            width, 
            height, 
            cornerRadius
        );

        graphics.lineStyle(2, 0xBA31AE, 1); 
        graphics.strokeRoundedRect(
            x - width/2, 
            y - height/2, 
            width, 
            height, 
            cornerRadius
        );

        overlay.add(graphics);

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

        this.resumeButton = this.scene.add.sprite(
            this.scene.cameras.main.centerX / 2,
            startY + spacing * 4,
            'horizontalLargeButton'
        )
            .setInteractive()
            .setScale(3);
        
        this.resumeText = this.scene.add.text(
            this.scene.cameras.main.centerX / 2,
            startY + spacing * 4,
            'RESUME',
            {
                fontFamily: 'pixel',
                fontSize: '30px',
                color: '#FF9CC8',
                stroke: '#000000',
                strokeThickness: 3,
                align: 'center'
            }
        ).setOrigin(0.5, 0.75);
        this.resumeButton.on('pointerover', () => {
            this.resumeButton.setFrame(1);
            this.resumeText.setOrigin(0.5, 0.6);
        });
        
        this.resumeButton.on('pointerout', () => {
            this.resumeButton.setFrame(0);
            this.resumeText.setOrigin(0.5, 0.75);
        });
        
        this.resumeButton.on('pointerdown', () => {

            if (!this.audioManager.config.sfxMuted) {
                this.audioManager.playSfx('buttonClick');
            }
            this.hide();
        });

        this.backButton = this.scene.add.sprite(
            this.scene.cameras.main.centerX * 1.5,
            startY + spacing * 4,
            'horizontalLargeButton'
        )
            .setInteractive()
            .setScale(3);
        
        this.backText = this.scene.add.text(
            this.scene.cameras.main.centerX * 1.5,
            startY + spacing * 4,
            'MAIN MENU',
            {
                fontFamily: 'pixel',
                fontSize: '30px',
                color: '#FF9CC8',
                stroke: '#000000',
                strokeThickness: 3,
                align: 'center'
            }
        ).setOrigin(0.5, 0.75);
        this.backButton.on('pointerover', () => {
            this.backButton.setFrame(1);
            this.backText.setOrigin(0.5, 0.6);
        });
        
        this.backButton.on('pointerout', () => {
            this.backButton.setFrame(0);
            this.backText.setOrigin(0.5, 0.75);
        });
        
        this.backButton.on('pointerdown', () => {

            if (!this.audioManager.config.sfxMuted) {
                this.audioManager.playSfx('buttonClick');
            }
            this.scene.physics.resume();
            this.scene.anims.resumeAll();
            this.scene.tweens.resumeAll();
            this.scene.scene.start('MainMenu');
        });

        overlay.add(this.muteSFX);
        overlay.add(this.muteMusic);
        overlay.add(this.minusButtonMusic);
        overlay.add(this.minusButtonSFX);
        overlay.add(this.plusButtonMusic);
        overlay.add(this.plusButtonSFX);
        overlay.add(this.volumeTextMusic);
        overlay.add(this.volumeTextSFX);
        overlay.add(this.muteMusicText);
        overlay.add(this.muteSFXText);
        overlay.add(this.resumeButton)
        overlay.add(this.resumeText)
        overlay.add(this.backButton)
        overlay.add(this.backText)
        this.overlay = overlay;
        
        return overlay;
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

    hide() {
        if (this.overlay) {
            
            this.overlay.setVisible(false);
            this.scene.physics.resume();
            this.scene.anims.resumeAll();
            this.scene.tweens.resumeAll();
        }
}

    show() {
        if (this.overlay) {

            this.overlay.setVisible(true);
            this.scene.physics.pause();
            this.scene.anims.pauseAll();
            this.scene.tweens.pauseAll();
            this.overlay.getChildren().forEach(child => {
                child.setScrollFactor(0),
                this.scene.children.bringToTop(child);
            });
        }
    }
}
