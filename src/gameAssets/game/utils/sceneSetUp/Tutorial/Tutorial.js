import { Checkpoint } from "../entities/checkpointClass.js";
import { Enemy } from "../entities/enemyClass.js";
import { Player } from "../entities/playerClass.js";
import { createAnimations } from "../utils/animation.js";
import { checkControls } from "../utils/controls.js";
import * as gameFunctions from "../utils/gameFunctions.js";
import { characterIsDead } from "../utils/gameLogic.js";
import { createPhysics_TUT } from "../utils/sceneSetUp/Tutorial/physicsTUT.js";
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { INIT_BACKGROUNDS } from "../utils/sceneSetUp/Tutorial/tutorialBG.js";
import { INIT_COLLECTIBLES_TUT } from "../utils/sceneSetUp/Tutorial/tutorialCOLL.js";
import { createPlatforms_TUT } from "../utils/sceneSetUp/Tutorial/tutorialPLAT.js";
import { INIT_TILES } from "../utils/sceneSetUp/Tutorial/tutorialTILES.js";
import { OptionsPopUp } from "../utils/preload/audio/optionPopUp.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { bannerAnimation } from "../utils/banner.js";

export class Tutorial extends Phaser.Scene {

    constructor() {
        super({ key: 'Tutorial' });
    }

    init(){
        this.score = 0;
    }

    preload() {
        gameFunctions.loadImages(this, INIT_IMAGES);
        gameFunctions.loadSpritesheets(this, INIT_SPRITESHEETS);
        gameFunctions.loadAudio(this, INIT_SFX);
        gameFunctions.loadAudio(this, INIT_MUSIC);
    }

    create() {
        this.physics.world.setBounds(0, 0, 3072, this.scale.height);
        this.cameras.main.setBounds(0, 0, 3072, this.scale.height);

        const audioManager = this.game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playMusic("Tutorial");
        }
        
        createAnimations(this);
        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS);

        this.floor = this.physics.add.staticGroup();
        gameFunctions.createTiles(this, INIT_TILES);

        this.collectible = this.physics.add.staticGroup();
        gameFunctions.createCollectibles(this, INIT_COLLECTIBLES_TUT);

        createPlatforms_TUT(this);
        bannerAnimation(this,'TUTORIAL');
        this.mace_TUT1 = new Enemy(this, 1792, this.scale.height - 256, 'mace', 'mace');
        this.mace_TUT2 = new Enemy(this, 1920, this.scale.height - 256, 'mace', 'mace');
        this.slime_TUT1 = new Enemy(this, 512, this.scale.height - 64, 'slime', 'slime');
        this.checkpoint = new Checkpoint(this, 1600, this.scale.height - 64, 'flagOut');
        this.start = new Checkpoint(this, 10, this.scale.height - 64, 'startIdle');
        this.end = new Checkpoint(this, 2947,this.scale.height - 256, 'endIdle', 'endIdle' )
        this.character = new Player(this, 50, this.scale.height - 64)
        
        createPhysics_TUT(this)

        this.keys = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
            fontFamily: "pixel",
            fontSize: 36,
            fill: "#000",
        }).setScrollFactor(0); 

        this.togglePopUp = this.add.sprite(750, 50, 'smallButton')
            .setFrame(90)
            .setInteractive()
            .setScale(3)
            .setScrollFactor(0)
        
        this.optionsPopUp = new OptionsPopUp(this);
            this.optionsPopUp.createPopUp();
            this.optionsPopUp.hide();
        
            this.togglePopUp.on('pointerover', () => {
                this.togglePopUp.setFrame(91);
            });
        
            this.togglePopUp.on('pointerout', () => {
                this.togglePopUp.setFrame(90);
            });
        
            this.togglePopUp.on('pointerdown', () => {
                
                    this.optionsPopUp.show();
                
                if (this.registry.get('audioManager') && !this.registry.get('audioManager').config.sfxMuted) {
                    this.registry.get('audioManager').playSfx('buttonClick');
                }
            });
        this.cameras.main.setBounds(0, 0, 3072, this.scale.height);
        this.cameras.main.startFollow(this.character);
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update() {

        const { character, platform_TUTY1, platform_TUTX1, slime_TUT1, mace_TUT1, mace_TUT2 } = this

        checkControls(this)

        platform_TUTY1.anims.play('brownPlatformOn', true);

        if (platform_TUTY1.y >= this.scale.height - 64) {
            platform_TUTY1.setVelocityY(-400); 
        } else if (platform_TUTY1.y <= this.scale.height - 320) {
            platform_TUTY1.setVelocityY(50); 
        }

        if (platform_TUTX1.x >= 2432) { 
            platform_TUTX1.setVelocityX(-100); 
        } else if (platform_TUTX1.x <= 2112) { 
            platform_TUTX1.setVelocityX(100); 
        }
        
        /*Character*/
        if (character.y >= this.scale.height){
            characterIsDead(this)
        }

        if(slime_TUT1.x >= 650){
            slime_TUT1.setVelocityX(-50);
            slime_TUT1.flipX = false;

        }else if(slime_TUT1.x <= 512){
            slime_TUT1.setVelocityX(50);
            slime_TUT1.flipX = true;
        }
        
        if (mace_TUT1.y >= this.scale.height - 64) {
            mace_TUT1.setVelocityY(-250);

        } else if (mace_TUT1.y <= this.scale.height - 768) {
            mace_TUT1.setVelocityY(1500);
        }
            
        if (mace_TUT2.y >= this.scale.height - 64) {
            mace_TUT2.setVelocityY(-250);
        
        } else if (mace_TUT2.y <= this.scale.height - 768) {
            mace_TUT2.setVelocityY(1500);
        }
    }
}

