export const createAnimations = (game) => {
    /* Characters */
    if (!game.anims.exists('characterWalk')) {
        game.anims.create({
            key: 'characterWalk',
            frames: game.anims.generateFrameNumbers('characterRun', { start: 0, end: 5 }),
            frameRate: 15,
            repeat: -1
        });
    }

    if (!game.anims.exists('characterIdle')) {
        game.anims.create({
            key: 'characterIdle',
            frames: game.anims.generateFrameNumbers('characterIdle', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    if (!game.anims.exists('characterJump')) {
        game.anims.create({
            key: 'characterJump',
            frames: game.anims.generateFrameNumbers('characterJump', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }

    if (!game.anims.exists('characterDead')) {
        game.anims.create({
            key: 'characterDead',
            frames: game.anims.generateFrameNumbers('characterDead', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        });
    }

    /*Enemies*/
    if (!game.anims.exists('slimeWalk')) {
        game.anims.create({
            key: 'slimeWalk',
            frames: game.anims.generateFrameNumbers('slime', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
    }

    if (!game.anims.exists('slimeDead')) {
        game.anims.create({
            key: 'slimeDead',
            frames: game.anims.generateFrameNumbers('slimeDead', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });
    }

    if (!game.anims.exists('Boss')) {
        game.anims.create({
            key: 'Boss',
            frames: game.anims.generateFrameNumbers('Boss', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
    }

    if (!game.anims.exists('BossThrow')) {
        game.anims.create({
            key: 'BossThrow',
            frames: game.anims.generateFrameNumbers('BossThrow', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });
    }

    if (!game.anims.exists('BossDeath')) {
        game.anims.create({
            key: 'BossDeath',
            frames: game.anims.generateFrameNumbers('BossDeath', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1
        });
    }

    if (!game.anims.exists('BossJump')) {
        game.anims.create({
            key: 'BossJump',
            frames: game.anims.generateFrameNumbers('BossJump', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
    }

    /* Platforms */
    if (!game.anims.exists('brownPlatformOn')) {
        game.anims.create({
            key: 'brownPlatformOn',
            frames: game.anims.generateFrameNumbers('brownPlatformOn', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
    }

    /* Checkpoints */
    if (!game.anims.exists('flagOut')) {
        game.anims.create({
            key: 'flagOut',
            frames: game.anims.generateFrameNumbers('flagOut', { start: 0, end: 25 }),
            frameRate: 20,
            repeat: 0
        });
    }

    if (!game.anims.exists('flagIdle')) {
        game.anims.create({
            key: 'flagIdle',
            frames: game.anims.generateFrameNumbers('flagIdle', { start: 0, end: 9 }),
            frameRate: 15,
            repeat: -1
        });
    }

    if (!game.anims.exists('startIdle')) {
        game.anims.create({
            key: 'startIdle',
            frames: game.anims.generateFrameNumbers('startIdle', { start: 0, end: 16 }),
            frameRate: 15,
            repeat: -1
        });
    }

    if (!game.anims.exists('endIdle')) {
        game.anims.create({
            key: 'endIdle',
            frames: game.anims.generateFrameNumbers('endIdle', { start: 0, end: 7 }),
            frameRate: 15,
            repeat: -1
        });
    }
    
    /*Collectibles */
    if (!game.anims.exists('pinneapleIdle')) {
        game.anims.create({
            key: 'pinneapleIdle',
            frames: game.anims.generateFrameNumbers('pinneapleIdle', { start: 0, end: 16 }),
            frameRate: 15,
            repeat: -1
        });
    }

    /*GUI*/
    if (!game.anims.exists('play')) {
        game.anims.create({
            key: 'play',
            frames: game.anims.generateFrameNumbers('horizontalLargeButton', { start: 32, end: 33 }),
            frameRate: 15,
            repeat: 0
        });
    }
    if (!game.anims.exists('continue')) {
        game.anims.create({
            key: 'continue',
            frames: game.anims.generateFrameNumbers('horizontalLargeButton', { start: 34, end: 35 }),
            frameRate: 15,
            repeat: 0
        });
    }
    if (!game.anims.exists('options')) {
        game.anims.create({
            key: 'options',
            frames: game.anims.generateFrameNumbers('horizontalLargeButton', { start: 38, end: 39 }),
            frameRate: 15,
            repeat: 0
        });
    }
    if (!game.anims.exists('credits')) {
        game.anims.create({
            key: 'credits',
            frames: game.anims.generateFrameNumbers('horizontalLargeButton', { start: 20, end: 21 }),
            frameRate: 15,
            repeat: 0
        });
    }
    if (!game.anims.exists('controls')) {
        game.anims.create({
            key: 'controls',
            frames: game.anims.generateFrameNumbers('horizontalLargeButton', { start: 20, end: 21 }),
            frameRate: 15,
            repeat: 0
        });
    }

    if (!game.anims.exists('pause')) {
        game.anims.create({
            key: 'pause',
            frames: game.anims.generateFrameNumbers('smallButton', { start: 10, end: 11 }),
            frameRate: 5,
            repeat: -1
        });
    }
}
