import { Checkpoint } from "../entities/checkpointClass.js";
import { Player } from "../entities/playerClass.js";
import { Enemy } from "../entities/enemyClass.js"
import { createAnimations } from "../utils/animation.js";
import { checkControls } from "../utils/controls.js";
import * as gameFunctions from "../utils/gameFunctions.js";
import { characterIsDead } from "../utils/gameLogic.js";
import { createPhysics_FST } from "../utils/sceneSetUp/FinalStage/physicsFST.js";
import { INIT_IMAGES } from "../utils/preload/images.js";
import { INIT_SPRITESHEETS } from "../utils/preload/sprites.js";
import { INIT_BACKGROUNDS_FST } from "../utils/sceneSetUp/FinalStage/FinalStageBG.js";
import { INIT_COLLECTIBLES_FST } from "../utils/sceneSetUp/FinalStage/FinalStageCOLL.js";
import { INIT_SFX } from "../utils/preload/audio/SFX.js";
import { INIT_MUSIC } from "../utils/preload/audio/music.js";
import { bannerAnimation } from "../utils/banner.js";
import { INIT_TILES_FST } from "../utils/sceneSetUp/FinalStage/FinalStageTILES.js";
import { SLIME_PATH_FST } from "../utils/sceneSetUp/FinalStage/FinalStageSLI.js";
import { MACE_PATH_FST } from "../utils/sceneSetUp/FinalStage/FinalStageMAC.js";
import { updateBoss } from "../utils/gameFunctions.js";
import { SaveManager } from "../utils/SaveManager.js";

export class FinalStage extends Phaser.Scene {

    constructor() {
        super({ key: 'FinalStage' });
        this.bossMusic = false;
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
        
        this.bossMusic = false;

        const audioManager = this.game.registry.get('audioManager') || this.registry.get('audioManager');
        if (audioManager) {
            audioManager.playMusic("FinalStage");
        }

        createAnimations(this);
        gameFunctions.createBackgrounds(this, INIT_BACKGROUNDS_FST);

        this.floor = this.physics.add.staticGroup();
        gameFunctions.createTiles(this, INIT_TILES_FST);
        
        this.collectible = this.physics.add.staticGroup();
        gameFunctions.createCollectibles(this, INIT_COLLECTIBLES_FST);
        
        this.mace_FST1 = new Enemy(this, 512, this.scale.height - 128, 'mace', 'mace');
        this.mace_FST2 = new Enemy(this, 704, this.scale.height - 192, 'mace', 'mace');
        this.mace_FST3 = new Enemy(this, 1024, this.scale.height - 256, 'mace', 'mace');
        this.mace_FST4 = new Enemy(this, 1920, this.scale.height - 128, 'mace', 'mace');
        this.mace_FST5 = new Enemy(this, 2432, this.scale.height - 384, 'mace', 'mace');
        this.mace_FST6 = new Enemy(this, 2816, this.scale.height - 256, 'mace', 'mace');
        this.mace_FST7 = new Enemy(this, 3712, this.scale.height - 192, 'mace', 'mace');
        this.mace_FST8 = new Enemy(this, 4416, this.scale.height - 192, 'mace', 'mace');
        this.mace_FST9 = new Enemy(this, 5248, this.scale.height - 128, 'mace', 'mace');

        this.slime_FST1 = new Enemy(this, 608, this.scale.height - 128, 'slime', 'slime');
        this.slime_FST2 = new Enemy(this, 800, this.scale.height - 192, 'slime', 'slime');
        this.slime_FST3 = new Enemy(this, 1200, this.scale.height - 128, 'slime', 'slime');
        this.slime_FST4 = new Enemy(this, 1400, this.scale.height - 64, 'slime', 'slime');
        this.slime_FST5 = new Enemy(this, 1600, this.scale.height - 64, 'slime', 'slime');
        this.slime_FST6 = new Enemy(this, 3000, this.scale.height - 256, 'slime', 'slime');
        this.slime_FST7 = new Enemy(this, 4500, this.scale.height - 256, 'slime', 'slime');
        this.boss = new Enemy(this, 5900, this.scale.height - 256, 'boss', 'boss');
        
        this.startFST = new Checkpoint(this, 10, this.scale.height - 64, 'startIdle');
        this.startFST.identifier = "startFST"; 

        this.checkpointFST = new Checkpoint(this, 3552, this.scale.height - 256, 'flagOut');
        this.checkpointFST.identifier = "checkpointFST"

        this.endFST = new Checkpoint(this, 6048, this.scale.height - 64, 'endIdle', 'endIdle')
        this.character = new Player(this, 50, this.scale.height - 400)

        bannerAnimation(this, 'FAUCES DE IGNAROK');
        createPhysics_FST(this)

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

    update(time, delta) {

        checkControls(this,this)

        const bossStartX = 5376;
        if (this.character.x >= bossStartX) {
            gameFunctions.enterBossArea(this);
            updateBoss(this, time, delta);
            if (this.updateProjectiles) this.updateProjectiles(delta);
        }

        if (this.character.x >= bossStartX && !this.bossMusic) {            
            const audioManager = this.game.registry.get('audioManager') || this.registry.get('audioManager');
            
            if (audioManager) {
                audioManager.playMusic('Boss');
                this.bossMusic = true; 
            }
        }
        const { scale, character } = this
        
        if (character.y >= scale.height) {
            characterIsDead(this)
        }

        gameFunctions.createSlimesPath(this, SLIME_PATH_FST);
        gameFunctions.createMacePath(this, MACE_PATH_FST);

    }
}