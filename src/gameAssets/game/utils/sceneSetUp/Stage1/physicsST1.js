import { collectItem, onHitMace, onHitSlime } from "../../../utils/gameLogic.js";
import { bannerAnimation } from "../../banner.js";

export function createPhysics_ST1(game) {
    
    game.physics.add.collider(game.character, game.floor);

    game.physics.add.collider(game.mace_ST11, game.floor);
    game.physics.add.collider(game.mace_ST12, game.floor);
    game.physics.add.collider(game.mace_ST13, game.floor);
    game.physics.add.collider(game.mace_ST14, game.floor);
    game.physics.add.collider(game.mace_ST15, game.floor);
    game.physics.add.collider(game.mace_ST16, game.floor);
    game.physics.add.collider(game.mace_ST17, game.floor);

    game.physics.add.collider(game.slime_ST11, game.floor);
    game.physics.add.collider(game.character, game.slime_ST11, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);
    
    game.physics.add.collider(game.slime_ST12, game.floor);
    game.physics.add.collider(game.character, game.slime_ST12, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_ST13, game.floor);
    game.physics.add.collider(game.character, game.slime_ST13, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_ST14, game.floor);
    game.physics.add.collider(game.character, game.slime_ST14, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_ST15, game.floor);
    game.physics.add.collider(game.character, game.slime_ST15, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.character, game.mace_ST11, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST12, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST13, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST14, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST15, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST16, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST17, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.character, game.mace_TUT2, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.character, game.platform_ST1Y1);
    game.physics.add.collider(game.character, game.platform_ST1Y2);
    game.physics.add.collider(game.character, game.platform_ST1Y3);
    game.physics.add.collider(game.character, game.platform_ST1X1);
    game.physics.add.collider(game.character, game.platform_ST1X2);
    game.physics.add.collider(game.character, game.platform_ST1X3);
    
    game.physics.add.overlap(game.character, game.checkpointST1, () => {
    if (game.checkpointActivated) return;
    game.checkpointActivated = true;
    game.checkpointST1.anims.play('flagOut');

    game.checkpointST1.once('animationcomplete', (animation) => {
        if (animation.key === 'flagOut') {
            game.checkpointST1.anims.play('flagIdle');
            
            if (game.saveManager) {
                game.saveManager.saveCheckpoint(game.checkpointST1, game.score);
                game.saveManager.showMessage('¡Checkpoint alcanzado!');
            }
        }
        });
    });

    game.physics.add.overlap(game.character, game.endST1, () => {
        game.endST1.body.enable = false;
            
        const audioManager = game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playSfx("Win");
            audioManager.stopMusic('Stage1');
        }
        
        if (game.saveManager) {

            const nextLevelStartPosition = {
                x: 50,
                y: game.scale.height -256
            }

            game.saveManager.saveCheckpoint(
                {
                    identifier: 'startST2',
                    x: nextLevelStartPosition.x,
                    y: nextLevelStartPosition.y
                },
                game.score
            );

            game.saveManager._saveCheckpointData(
            'startST2',
            nextLevelStartPosition,
            game.score,
            'Stage2' 
        );    
        }

        bannerAnimation(game, 'STAGE-1 COMPLETED');
        
        game.time.delayedCall(3500, () => {
            game.scene.start('Stage2');
        });
    });
    
    game.physics.add.overlap(game.character, game.collectible, (character, item) => {
        collectItem(character, item, game);
    }, null, game);
}