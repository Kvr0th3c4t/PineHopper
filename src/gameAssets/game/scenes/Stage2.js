
import { Checkpoint } from "../entities/checkpointClass.js";
import { Player } from "../entities/playerClass.js";
import { Enemy } from "../entities/enemyClass.js"
import { createAnimations } from "../utils/animation.js";
import { checkControls } from "../utils/controls.js";
import * as gameFunctions from "../utils/gameFunctions.js";
import { characterIsDead } from "../utils/gameLogic.js";
import { createPhysics_ST2 } from "../utils/sceneSetUp/Stage2/physicsST2.js";
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { INIT_BACKGROUNDS_ST2 } from "../utils/sceneSetUp/Stage2/Stage2BG.js";
import { INIT_COLLECTIBLES_ST2 } from "../utils/sceneSetUp/Stage2/Stage2COLL.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { bannerAnimation } from "../utils/banner.js";
import { INIT_TILES_ST2 } from "../utils/sceneSetUp/Stage2/Stage2TILES.js";
import { createPlatforms_ST2 } from "../utils/sceneSetUp/Stage2/Stage2PLAT.js";
import { SLIME_PATH_ST2 } from "../utils/sceneSetUp/Stage2/Stage2SLI.js";
import { PLATFORMY_PATH_ST2 } from "../utils/sceneSetUp/Stage2/Stage2PLATY_ST2.js";
import { MACE_PATH_ST2 } from "../utils/sceneSetUp/Stage2/Stage2MAC.js";
import { SaveManager } from "../utils/SaveManager.js";

export class Stage2 extends Phaser.Scene {

    constructor() {
        super({ key: 'Stage2' });
    }

    init() {
        this.score = 0;
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
            audioManager.playMusic("Stage2");
        }
        
        createAnimations(this);
        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_ST2);

        this.floor = this.physics.add.staticGroup();
        gameFunctions.createTiles(this, INIT_TILES_ST2);

        this.collectible = this.physics.add.staticGroup();
        gameFunctions.createCollectibles(this, INIT_COLLECTIBLES_ST2);
        
        createPlatforms_ST2(this);
        bannerAnimation(this, 'TUNDRA DE HIELONOCHE');

        this.mace_ST21= new Enemy(this, 1120, this.scale.height - 160, 'mace', 'mace');
        this.mace_ST22 = new Enemy(this, 2048, this.scale.height - 224, 'mace', 'mace');
        this.mace_ST23 = new Enemy(this, 2496, this.scale.height - 320, 'mace', 'mace');
        this.mace_ST24 = new Enemy(this, 2816, this.scale.height - 272, 'mace', 'mace');
        this.mace_ST25 = new Enemy(this, 3520, this.scale.height - 192, 'mace', 'mace');
        this.mace_ST26 = new Enemy(this, 5312, this.scale.height - 240, 'mace', 'mace');

        this.slime_ST21 = new Enemy(this, 384, this.scale.height - 64, 'slime', 'slime');
        this.slime_ST22 = new Enemy(this, 1536, this.scale.height - 128, 'slime', 'slime');
        this.slime_ST23 = new Enemy(this, 2600, this.scale.height - 320, 'slime', 'slime');
        this.slime_ST24 = new Enemy(this, 3968, this.scale.height - 256, 'slime', 'slime');
        this.slime_ST25 = new Enemy(this, 5000, this.scale.height - 160, 'slime', 'slime');
        this.slime_ST26 = new Enemy(this, 5760, this.scale.height - 128, 'slime', 'slime');
        this.startST2 = new Checkpoint(this, 10, this.scale.height - 64, 'startIdle');
        this.startST2.identifier = 'startST2';
        this.checkpointST2 = new Checkpoint(this, 3648, this.scale.height - 192, 'flagOut');
        this.checkpointST2.identifier = 'chekpointST2'
        this.endST2 = new Checkpoint(this, 5984, this.scale.height - 64, 'endIdle', 'endIdle')
        this.character = new Player(this, 50, this.scale.height - 256)

        createPhysics_ST2(this)

        this.keys = this.input.keyboard.createCursorKeys();

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

        gameFunctions.loadPopUp(this);
        
        this.cameras.main.setBounds(0, 0, 6144, this.scale.height);
        this.cameras.main.startFollow(this.character);
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    update() {

        checkControls(this, this)

        const { scale, character } = this
        
        if (character.y >= scale.height) {
            characterIsDead(this)
        }
        
        gameFunctions.createSlimesPath(this, SLIME_PATH_ST2);
        gameFunctions.createPlatformYPath(this, PLATFORMY_PATH_ST2);
        gameFunctions.createMacePath(this, MACE_PATH_ST2);
    }
}