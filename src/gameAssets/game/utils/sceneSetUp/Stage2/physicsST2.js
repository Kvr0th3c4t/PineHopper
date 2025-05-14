import { collectItem, onHitMace, onHitSlime } from "../../../utils/gameLogic.js";
import { bannerAnimation } from "../../banner.js";


export function createPhysics_ST2(game) {
    game.physics.add.collider(game.character, game.floor);

    
    game.physics.add.collider(game.mace_ST21, game.floor);
    game.physics.add.collider(game.mace_ST22, game.floor);
    game.physics.add.collider(game.mace_ST23, game.floor);
    game.physics.add.collider(game.mace_ST24, game.floor);
    game.physics.add.collider(game.mace_ST25, game.floor);
    game.physics.add.collider(game.mace_ST26, game.floor);

    game.physics.add.collider(game.slime_ST21, game.floor);
    game.physics.add.collider(game.character, game.slime_ST21, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);
    
    game.physics.add.collider(game.slime_ST22, game.floor);
    game.physics.add.collider(game.character, game.slime_ST22, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_ST23, game.floor);
    game.physics.add.collider(game.character, game.slime_ST23, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_ST24, game.floor);
    game.physics.add.collider(game.character, game.slime_ST24, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.slime_ST25, game.floor);
    game.physics.add.collider(game.character, game.slime_ST25, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);
    
    game.physics.add.collider(game.slime_ST26, game.floor);
    game.physics.add.collider(game.character, game.slime_ST26, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);

    
    game.physics.add.collider(game.character, game.mace_ST21, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST22, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST23, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST24, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST25, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_ST26, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.character, game.platform_ST2Y1);
    game.physics.add.collider(game.character, game.platform_ST2Y2);
    game.physics.add.collider(game.character, game.platform_ST2Y3);

    game.physics.add.overlap(game.character, game.checkpointST2, () => {
        if (game.checkpointActivated) return;
        game.checkpointActivated = true;
        game.checkpointST2.anims.play('flagOut');
    
        game.checkpointST2.once('animationcomplete', (animation) => {
            if (animation.key === 'flagOut') {
                game.checkpointST2.anims.play('flagIdle');
            }
            if (game.saveManager) {
                game.saveManager.saveCheckpoint(game.checkpointST2, game.score);
                game.saveManager.showMessage('¡Checkpoint alcanzado!');
            }
        });
    });

    game.physics.add.overlap(game.character, game.endST2, () => {
        
        game.endST2.body.enable = false;
            
        const audioManager = game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playSfx("Win");
            audioManager.stopMusic('Stage2')
        }

        if (game.saveManager) {

            const nextLevelStartPosition = {
                x: 50,
                y: game.scale.height - 256
            }

            game.saveManager.saveCheckpoint(
                {
                    identifier: 'startFST',
                    x: nextLevelStartPosition.x,
                    y: nextLevelStartPosition.y
                },
                game.score
            );

            game.saveManager._saveCheckpointData(
                'startFST',
                nextLevelStartPosition,
                game.score,
                'FinalStage'
            );
        }
            bannerAnimation(game, 'STAGE-2 COMPLETED');
        
            game.time.delayedCall(3500, () => {
                game.scene.start('FinalStage');
            });
        });

    game.physics.add.overlap(game.character, game.collectible, (character, item) => {
        collectItem(character, item, game);
    }, null, game);
}