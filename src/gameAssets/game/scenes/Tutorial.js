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
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { bannerAnimation } from "../utils/banner.js";
import { PLATFORMX_PATH_TUT } from "../utils/sceneSetUp/Tutorial/tutorialPLATX_PATH.js";
import { PLATFORMY_PATH_TUT } from "../utils/sceneSetUp/Tutorial/tutorialPLATY_PATH.js";
import { MACE_PATH_TUT } from "../utils/sceneSetUp/Tutorial/tutorialMAC.js";
import { SLIME_PATH_TUT } from "../utils/sceneSetUp/Tutorial/tutorialSLI.js";

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
        this.endTUT = new Checkpoint(this, 2947,this.scale.height - 256, 'endIdle', 'endIdle' )
        this.character = new Player(this, 50, this.scale.height - 64)
        
        createPhysics_TUT(this)

        this.keys = this.input.keyboard.createCursorKeys();

        this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
            fontFamily: "pixel",
            fontSize: 36,
            fill: "#000",
        }).setScrollFactor(0); 

        gameFunctions.loadPopUp(this);
        this.cameras.main.setBounds(0, 0, 3072, this.scale.height);
        this.cameras.main.startFollow(this.character);
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update() {

        const { character, platform_TUTY1, scale } = this

        checkControls(this, this)

        platform_TUTY1.anims.play('brownPlatformOn', true);

        if (character.y >= scale.height) {
            characterIsDead(this)
        }

        gameFunctions.createPlatformXPath(this, PLATFORMX_PATH_TUT)
        gameFunctions.createPlatformYPath(this, PLATFORMY_PATH_TUT)
        gameFunctions.createMacePath(this, MACE_PATH_TUT)
        gameFunctions.createSlimesPath(this, SLIME_PATH_TUT)
    }
}

