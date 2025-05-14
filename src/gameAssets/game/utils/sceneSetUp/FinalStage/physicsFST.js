import { collectItem, onHitMace, onHitSlime } from "../../gameLogic.js";
import { bannerAnimation } from "../../banner.js";
import { destroyPlatformAfterVictory } from "../FinalStage/bossDeath.js"

export function createPhysics_FST(game) {
    game.physics.add.collider(game.character, game.floor);
    
    game.physics.add.collider(game.boss, game.floor);
    game.physics.add.collider(game.character, game.boss, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.mace_FST1, game.floor);
    game.physics.add.collider(game.mace_FST2, game.floor);
    game.physics.add.collider(game.mace_FST3, game.floor);
    game.physics.add.collider(game.mace_FST4, game.floor);
    game.physics.add.collider(game.mace_FST5, game.floor);
    game.physics.add.collider(game.mace_FST6, game.floor);
    game.physics.add.collider(game.mace_FST7, game.floor);
    game.physics.add.collider(game.mace_FST8, game.floor);
    game.physics.add.collider(game.mace_FST9, game.floor);

    game.physics.add.collider(game.slime_FST1, game.floor);
    game.physics.add.collider(game.character, game.slime_FST1, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);
    
    game.physics.add.collider(game.slime_FST2, game.floor);
    game.physics.add.collider(game.character, game.slime_FST2, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_FST3, game.floor);
    game.physics.add.collider(game.character, game.slime_FST3, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_FST4, game.floor);
    game.physics.add.collider(game.character, game.slime_FST4, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_FST5, game.floor);
    game.physics.add.collider(game.character, game.slime_FST5, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);
    
    game.physics.add.collider(game.slime_FST6, game.floor);
    game.physics.add.collider(game.character, game.slime_FST6, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_FST7, game.floor);
    game.physics.add.collider(game.character, game.slime_FST7, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.character, game.mace_FST1, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_FST2, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_FST3, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_FST4, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_FST5, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_FST6, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_FST7, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_FST8, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_FST9, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);

    game.physics.add.overlap(game.character, game.checkpointFST, () => {
            if (game.checkpointActivated) return;
            game.checkpointActivated = true;
            game.checkpointFST.anims.play('flagOut');
        
            game.checkpointFST.once('animationcomplete', (animation) => {
                if (animation.key === 'flagOut') {
                    game.checkpointFST.anims.play('flagIdle');
                }
                if (game.saveManager) {
                    game.saveManager.saveCheckpoint(game.checkpointFST, game.score);
                    game.saveManager.showMessage('¡Checkpoint alcanzado!');
                }
            });
        });

        
    game.physics.add.overlap(game.character, game.endFST, () => {
    game.endFST.body.enable = false;

    if (game.boss && game.boss.body) {
        game.boss.body.enable = false;
    }

    destroyPlatformAfterVictory(game, game.boss, [
        { type: 'grassMidHEL', x: 5376, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5440, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5504, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5568, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5632, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5696, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5760, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5824, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5888, y: 600 - 64 },
        { type: 'grassMidHEL', x: 5952, y: 600 - 64 },
    ]);

    game.time.delayedCall(9000, () => {
        const audioManager = game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playSfx("Win");
            audioManager.stopMusic('FinalStage');
        }

        if (game.saveManager) {
            game.saveManager.clearProgress();
        }
        
        bannerAnimation(game, 'GAME COMPLETED');
        
        game.time.delayedCall(3500, () => {
            game.scene.start('Win');
        });
    });
});



    game.physics.add.overlap(game.character, game.collectible, (character, item) => {
        collectItem(character, item, game);
    }, null, game);
}