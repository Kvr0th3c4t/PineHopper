export function addToScore(points, origin, game) {
    game.score += points;

    const scoreText = game.add.text(
        origin.getBounds().x,
        origin.getBounds().y,
        `+${points}`,
        { fontFamily: "pixel", fontSize: game.scale.width / 30 }
    );

    game.tweens.add({
        targets: scoreText,
        duration: 500,
        y: scoreText.y - 20,
        onComplete: () => {
            game.tweens.add({
                targets: scoreText,
                duration: 100,
                alpha: 0,
                onComplete: () => scoreText.destroy(),
            });
        },
    });

    if (game.scoreText) {
        game.scoreText.setText(`Score: ${game.score}`);
    }
}

export function collectItem(character, item, game) {
    const { texture: { key } } = item;
    
    if (key === 'pinneapleIdle') {
        item.destroy();

        const audioManager = game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playSfx('collectPinneaple');
        }
        
        addToScore(100, item, game);
    }
}

export function characterIsDead(game) {
    const { character } = game;
    if (character.isDead) return;

    character.isDead = true;
    character.anims.play("characterDead");
    character.setCollideWorldBounds(false);

    const audioManager = game.registry.get('audioManager');
    if (audioManager) {
        audioManager.playSfx("gameOver", { volume: 0.2 });
    }

    character.body.checkCollision.none = true;

    setTimeout(() => {
        character.setVelocityX(0);
        character.setVelocityY(-350);
    }, 100);

    game.time.removeAllEvents();

    setTimeout(() => {
        game.scene.start('GameOver', { fromScene: game.scene.key });
    }, 2000);
}

export function onHitSlime(character, enemy, game) {
    if (character.body.touching.down && enemy.body.touching.up) {
        enemy.anims.play("slimeDead", true);
        enemy.setVelocityX(0);
        character.setVelocityY(-300);

        const audioManager = game.registry.get('audioManager');
        if (audioManager) {
            audioManager.playSfx("enemyDead");
        }
        
        addToScore(200, enemy, game);

        setTimeout(() => enemy.destroy(), 100);
    } else 
        characterIsDead(game);
}

export function onHitMace(character, enemy, game) {
        characterIsDead(game);
}