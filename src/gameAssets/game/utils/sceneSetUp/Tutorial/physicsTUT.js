import { collectItem, onHitMace, onHitSlime } from "../../../utils/gameLogic.js";
import { bannerAnimation } from "../../banner.js";

export function createPhysics_TUT(game) {
    
    game.physics.add.collider(game.character, game.floor);
    game.physics.add.collider(game.mace_TUT1, game.floor);
    game.physics.add.collider(game.mace_TUT2, game.floor);
    game.physics.add.collider(game.slime_TUT1, game.floor);
    game.physics.add.collider(game.character, game.slime_TUT1, (character, enemy) => {
        onHitSlime(character, enemy, game);
    }, null, game);
    game.physics.add.collider(game.character, game.mace_TUT1, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.character, game.mace_TUT2, (character, enemy) => {
        onHitMace(character, enemy, game);
    }, null, game);

    game.physics.add.collider(game.character, game.platform_TUTY1);
    game.physics.add.collider(game.character, game.platform_TUTX1);
    
    game.physics.add.overlap(game.character, game.checkpoint, () => {
        if (game.checkpointActivated) return;
        game.checkpointActivated = true;
        game.checkpoint.anims.play('flagOut');
    
        game.checkpoint.once('animationcomplete', (animation) => {
            if (animation.key === 'flagOut') {
                game.checkpoint.anims.play('flagIdle');
            }
        });
    });

    game.physics.add.overlap(game.character, game.endTUT, () => {
    
        game.endTUT.body.enable = false;
            
        const audioManager = game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playSfx("Win");
            audioManager.stopMusic('Tutorial')
            }
        
        bannerAnimation(game, 'TUTORIAL COMPLETED');
        
        game.time.delayedCall(3500, () => {
            game.scene.start('Stage1');
        });
    });



    game.physics.add.overlap(game.character, game.collectible, (character, item) => {
        collectItem(character, item, game);
    }, null, game);
}