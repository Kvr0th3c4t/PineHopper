export function createPlatforms_ST1(game) {
    game.platform_ST1Y1 = game.physics.add.sprite(3104, 600 - 256, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();
    
    game.platform_ST1Y2 = game.physics.add.sprite(3232, 600 - 64, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();
    
    game.platform_ST1Y3 = game.physics.add.sprite(3360, 600 - 256, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();

    game.platform_ST1X1 = game.physics.add.sprite(896, 600 - 64, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();

    game.platform_ST1X1.body.allowGravity = false;

    game.platform_ST1X2 = game.physics.add.sprite(2240, 600 - 256, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();

    game.platform_ST1X2.body.allowGravity = false;

    game.platform_ST1X3 = game.physics.add.sprite(3744, 600 - 128, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();

    game.platform_ST1X3.body.allowGravity = false;
}