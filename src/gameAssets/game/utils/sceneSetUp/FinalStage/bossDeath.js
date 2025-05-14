export function destroyPlatformAfterVictory(scene, boss, platformTiles) {

    const audioManager = scene.registry.get('audioManager') || scene.game.registry.get('audioManager');

    const tileSprites = [];

    platformTiles.forEach(tileData => {
        scene.children.getChildren().forEach(child => {
            if (child.x === tileData.x && child.y === tileData.y) {
                tileSprites.push(child);
            }
        });
    });

    const middleTileX = platformTiles[Math.floor(platformTiles.length / 2)].x;
        scene.tweens.add({
        targets: boss,
        x: middleTileX,
        y: 600 - 192,
        duration: 800,
        ease: 'Quad.easeOut',
        onStart: () => {
            if (audioManager) {
                audioManager.playSfx('bossJump');
            }
            boss.flipX = true;
            if (boss.anims && boss.anims.exists('BossJump')) {
                boss.anims.play('BossJump');
            }
        },
        onComplete: () => {
            
            scene.tweens.add({
                targets: boss,
                y: 600 - 64, 
                duration: 500,
                ease: 'Bounce.easeOut',
                onComplete: () => {

                    if (audioManager) {
                        audioManager.playSfx('impact');
                    }

                    scene.tweens.add({
                        targets: tileSprites,
                        y: '+=8',
                        duration: 100,
                        yoyo: true,
                        repeat: 5,
                        ease: 'Sine.easeInOut',
                        onComplete: () => {
                            
                            if (audioManager) {
                                audioManager.playSfx('cracking');
                            }

                            scene.time.delayedCall(300, () => {
                                
                                let delay = 0;
                                
                                const centerIndex = Math.floor(tileSprites.length / 2);
                                let leftIndex = centerIndex - 1;
                                let rightIndex = centerIndex + 1;
                                destroyTile(tileSprites[centerIndex], 0);
                                while (leftIndex >= 0 || rightIndex < tileSprites.length) {
                                    delay += 400;
                                    
                                    if (leftIndex >= 0) {
                                        destroyTile(tileSprites[leftIndex], delay);
                                        leftIndex--;
                                    }
                                    
                                    if (rightIndex < tileSprites.length) {
                                        destroyTile(tileSprites[rightIndex], delay + 125);
                                        rightIndex++;
                                    }
                                }

                                scene.tweens.add({
                                    targets: boss,
                                    y: boss.y + 500, 
                                    angle: 180,      
                                    duration: 2000,
                                    delay: 300,
                                    ease: 'Quad.easeIn',
                                    onStart: () => {
                                        if (audioManager) {
                                            audioManager.playSfx('fall');
                                        }
                                    },
                                    onComplete: () => {
                                        scene.time.delayedCall(1000, () => {
                                            const flash = scene.add.rectangle(
                                                scene.cameras.main.centerX,
                                                scene.cameras.main.height, 
                                                scene.cameras.main.width,
                                                200,
                                                0xFFFFFF
                                            ).setAlpha(0);
                                            
                                            scene.tweens.add({
                                                targets: flash,
                                                alpha: 0.6,
                                                duration: 200,
                                                yoyo: true,
                                                onComplete: () => {
                                                    flash.destroy();
                                                }
                                            });

                                            if (audioManager) {
                                                audioManager.playSfx('explosion');
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    });


    function destroyTile(tile, delay) {
        scene.tweens.add({
            targets: tile,
            scaleY: 0.9,
            y: tile.y + 5,
            angle: Phaser.Math.Between(-5, 5),
            duration: 200,
            delay: delay,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                
                createDebris(tile.x, tile.y);

                if (audioManager) {
                    audioManager.playSfx('breaking');
                }

                scene.tweens.add({
                    targets: tile,
                    y: tile.y + 300,
                    angle: Phaser.Math.Between(-90, 90),
                    alpha: 0,
                    duration: 700,
                    ease: 'Quad.easeIn',
                    onComplete: () => {
                        if (tile.body) {
                            tile.body.enable = false;
                        }
                        tile.setVisible(false);
                    }
                });
            }
        });
    }

    function createDebris(x, y) {
        const debrisCount = Phaser.Math.Between(8, 16);
        
        for (let i = 0; i < debrisCount; i++) {
            const size = Phaser.Math.Between(5, 15);
            const debris = scene.add.rectangle(
                x + Phaser.Math.Between(-20, 20), 
                y + Phaser.Math.Between(-10, 10),
                size, size,
                0x4B4B4B
            );

            scene.tweens.add({
                targets: debris,
                y: y + 300,
                x: debris.x + Phaser.Math.Between(-50, 50),
                angle: Phaser.Math.Between(0, 360),
                alpha: 0,
                duration: Phaser.Math.Between(500, 800),
                ease: 'Quad.easeIn',
                onComplete: () => {
                    debris.destroy();
                }
            });
        }
    }
}