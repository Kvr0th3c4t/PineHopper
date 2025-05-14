export function createPlatforms_TUT(game) {
    game.platform_TUTY1 = game.physics.add.sprite(1408, 600 - 256, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();

    game.platform_TUTX1 = game.physics.add.sprite(2112, 600 - 64, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();

    game.platform_TUTX1.body.allowGravity = false;
}