export function checkControls({character, keys}, game){

    const isCharacterTouchingfloor = character.body.touching.down;
    const isLeftKeyDown = keys.left.isDown;
    const isRightKeyDown = keys.right.isDown;
    const isUpKeyDown = keys.up.isDown;
    
    if (isLeftKeyDown) {
        isCharacterTouchingfloor && character.anims.play('characterWalk', true);
        character.setVelocityX(-150)
        character.flipX = true;

    } else if (isRightKeyDown) {
        isCharacterTouchingfloor && character.anims.play('characterWalk', true);
        character.setVelocityX(150)
        character.flipX = false;

    } else if(isCharacterTouchingfloor){
        character.anims.play('characterIdle', true);
        character.setVelocityX(0)
    }

    if (isUpKeyDown && isCharacterTouchingfloor){
        character.setVelocityY(-500)
        character.anims.play('characterJump', true)

        const audioManager = game.registry.get('audioManager') || game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playSfx('characterJump');
        }
    }
}