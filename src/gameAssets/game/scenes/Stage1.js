import { Checkpoint } from "../entities/checkpointClass.js";
import { Player } from "../entities/playerClass.js";
import { Enemy } from "../entities/enemyClass.js"
import { createAnimations } from "../utils/animation.js";
import { checkControls } from "../utils/controls.js";
import * as gameFunctions from "../utils/gameFunctions.js";
import { characterIsDead } from "../utils/gameLogic.js";
import { createPhysics_ST1 } from "../utils/sceneSetUp/Stage1/physicsST1.js";
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { INIT_BACKGROUNDS_ST1 } from "../utils/sceneSetUp/Stage1/Stage1BG.js";
import { INIT_COLLECTIBLES_ST1 } from "../utils/sceneSetUp/Stage1/Stage1COLL.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { bannerAnimation } from "../utils/banner.js";
import { INIT_TILES_ST1 } from "../utils/sceneSetUp/Stage1/Stage1TILES.js";
import { createPlatforms_ST1 } from "../utils/sceneSetUp/Stage1/Stage1PLAT.js";
import { SLIME_PATH_ST1 } from "../utils/sceneSetUp/Stage1/Stage1SLI.js";
import { PLATFORMX_PATH_ST1 } from "../utils/sceneSetUp/Stage1/Stage1PLATX_PATH.js";
import { PLATFORMY_PATH_ST1 } from "../utils/sceneSetUp/Stage1/Stage1PLATY_PATH.js";
import { MACE_PATH_ST1 } from "../utils/sceneSetUp/Stage1/Stage1MAC.js";
import { SaveManager } from "../utils/SaveManager.js";

export class Stage1 extends Phaser.Scene {

    constructor() {
        super({ key: 'Stage1' });
    }

    init(){
        this.score = 0;
        this.lastCheckpointId = null;
        this.checkpointActivated = false;
    }

    preload() {
        gameFunctions.loadImages(this, INIT_IMAGES);
        gameFunctions.loadSpritesheets(this, INIT_SPRITESHEETS);
        gameFunctions.loadAudio(this, INIT_SFX);
        gameFunctions.loadAudio(this, INIT_MUSIC);
    }

    create() {
        this.physics.world.setBounds(0, 0, 6144, this.scale.height);

        const audioManager = this.game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playMusic("Stage1");
        }
        
        createAnimations(this);
        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_ST1);

        this.floor = this.physics.add.staticGroup();
        gameFunctions.createTiles(this, INIT_TILES_ST1);

        this.collectible = this.physics.add.staticGroup();
        gameFunctions.createCollectibles(this, INIT_COLLECTIBLES_ST1);
        
        createPlatforms_ST1(this);
        bannerAnimation(this, 'PLANICIE DEL SOL MUERTO');

        this.mace_ST11 = new Enemy(this, 2496, this.scale.height - 256, 'mace', 'mace');
        this.mace_ST12 = new Enemy(this, 2624, this.scale.height - 256, 'mace', 'mace');
        this.mace_ST13 = new Enemy(this, 2688, this.scale.height - 256, 'mace', 'mace');
        this.mace_ST14 = new Enemy(this, 5440, this.scale.height - 256, 'mace', 'mace');
        this.mace_ST15 = new Enemy(this, 5504, this.scale.height - 256, 'mace', 'mace');
        this.mace_ST16 = new Enemy(this, 5632, this.scale.height - 256, 'mace', 'mace');
        this.mace_ST17 = new Enemy(this, 5696, this.scale.height - 256, 'mace', 'mace');
        this.slime_ST11 = new Enemy(this, 512, this.scale.height - 64, 'slime', 'slime');
        this.slime_ST12 = new Enemy(this, 800, this.scale.height - 64, 'slime', 'slime');
        this.slime_ST13 = new Enemy(this, 1200, this.scale.height - 64, 'slime', 'slime');
        this.slime_ST14 = new Enemy(this, 4032, this.scale.height - 192, 'slime', 'slime');
        this.slime_ST15 = new Enemy(this, 4416, this.scale.height - 192, 'slime', 'slime');
        this.checkpointST1 = new Checkpoint(this, 1600, this.scale.height - 256, 'flagOut');
        this.checkpointST1.identifier = 'checkpointST1';
        this.start = new Checkpoint(this, 10, this.scale.height - 64, 'startIdle');
        this.endST1 = new Checkpoint(this, 5984, this.scale.height - 64, 'endIdle', 'endIdle')
        this.endST1.identifier = 'endST1';
        this.character = new Player(this, 50, this.scale.height - 256)

        this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
            fontFamily: "pixel",
            fontSize: 36,
            fill: "#000",
        }).setScrollFactor(0); 
        
        this.saveManager = new SaveManager(this);
        const saveData = this.saveManager.loadProgress();
        if (saveData) {
            this.character.x = saveData.position.x;
            this.character.y = saveData.position.y;
            this.score = saveData.score;
            this.scoreText.setText(`Score: ${this.score}`);
            this.saveManager.showMessage('Progress loaded successfully')
        }
        createPhysics_ST1(this)

        this.keys = this.input.keyboard.createCursorKeys();

        gameFunctions.loadPopUp(this);
        
        this.cameras.main.setBounds(0, 0, 6144, this.scale.height);
        this.cameras.main.startFollow(this.character);
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update() {

        checkControls(this, this)

        const {scale, character} = this
        
        if (character.y >= scale.height) {
            characterIsDead(this)
        }
        gameFunctions.createSlimesPath(this, SLIME_PATH_ST1);
        gameFunctions.createPlatformXPath(this, PLATFORMX_PATH_ST1)
        gameFunctions.createPlatformYPath(this, PLATFORMY_PATH_ST1)
        gameFunctions.createMacePath(this, MACE_PATH_ST1)
    }
}

