export function createPlatforms_ST2(game) {
     // Vertical moving platforms - alejadas de tiles y en espacios libres
    game.platform_ST2Y1 = game.physics.add.sprite(704, 600 - 128, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();

    game.platform_ST2Y2 = game.physics.add.sprite(2240, 600 - 280, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();
        
    game.platform_ST2Y3 = game.physics.add.sprite(3456, 600 - 250, 'brownPlatformOn')
        .setScale(1.5)
        .setImmovable(true)
        .refreshBody();

}