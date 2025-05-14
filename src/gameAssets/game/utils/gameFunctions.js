import { OptionsPopUp } from "./preload/audio/optionPopUp"
import { characterIsDead } from "./gameLogic"
import { AudioManager } from "./preload/audio/audioManager"

/*Función para cargar los fondos*/
export const createBackgrounds = (game, array) => {
    array.forEach(ele =>{
        game.add.image(ele.x, ele.y, ele.key)
            .setScale(0.58)
            .setOrigin(0.5,0.5)
    })
}

/*Crear la posición de los coleccionables*/
export const createCollectibles = (game, array) => {
    array.forEach(ele =>{
        game.collectible.create(ele.x, ele.y, ele.key)
            .anims.play(ele.key, true)
            .setScale(2)
    })
}

/*Crear la posición de los suelos*/
export const createTiles =(game, array) => {
    array.forEach(tile => {
        game.floor.create(tile.x, tile.y, tile.type)
            .setOrigin(0, 0)
            .setScale(0.5)
            .refreshBody();
    });
}

/*Crea el recorrido de los slimes en la escena*/
export const createSlimesPath = (game, array) => {
    array.forEach(slime => {
        const sceneSlime = game[slime.name];

        if (sceneSlime.x >= slime.max) {
            sceneSlime.setVelocityX(-50);
            sceneSlime.flipX = false;
        } else if (sceneSlime.x <= slime.min) {
            sceneSlime.setVelocityX(50);
            sceneSlime.flipX = true;
        }
    });
};

export const createMacePath = (game, array) => {
    array.forEach(mace => {
        const sceneMace = game[mace.name];
        
        if (sceneMace) {
            // Si no tiene dirección asignada, inicializarla
            if (sceneMace.yDirection === undefined) {
                sceneMace.yDirection = 'up'; // Comenzar moviendo hacia arriba
            }
            
            // Cambiar dirección en los límites
            if (sceneMace.y <= mace.minY) {
                sceneMace.yDirection = 'down';
            } else if (sceneMace.y >= mace.maxY) {
                sceneMace.yDirection = 'up';
            }
            
            // Aplicar velocidad según la dirección
            if (sceneMace.yDirection === 'up') {
                sceneMace.setVelocityY(-120);
            } else {
                sceneMace.setVelocityY(60);
            }
        }
    });
};

/*Crea el recorrido de las plataformas horizontales en la escena*/
export const createPlatformXPath = (game, array) => {
    array.forEach(platform => {
        const scenePlatform = game[platform.name];
        
        if (scenePlatform.x >= platform.max) {
            scenePlatform.setVelocityX(-100);
        } else if (scenePlatform.x <= platform.min) {
            scenePlatform.setVelocityX(100)
        }
    })
}

export const createPlatformYPath = (game, array) => {
    array.forEach(platform => {
        const scenePlatform = game[platform.name];
        
        if (scenePlatform) {
            if (scenePlatform.yDirection === undefined) {
                scenePlatform.yDirection = 'up'; 
            }

            if (scenePlatform.y <= platform.minY) {
                scenePlatform.yDirection = 'down';
            } else if (scenePlatform.y >= platform.maxY) {
                scenePlatform.yDirection = 'up';
            }

            if (scenePlatform.yDirection === 'up') {
                scenePlatform.setVelocityY(-100);
            } else {
                scenePlatform.setVelocityY(100);
            }
        }
    });
};

/*Función para cargar los audios*/
export const loadAudio = ({ load }, array) => {
    array.forEach(audio =>{
        load.audio(audio.key, audio.url)
    });
}

/*Función para cargar las imágenes*/
export const loadImages = ({ load }, array) =>{
    array.forEach(image => {
            load.image(image.key, image.url);
        });
}

/*Función para cargar los sprites*/
export const loadSpritesheets = ({ load }, array) => {
    array.forEach(({ key, url, frameWidth, frameHeight }) => {
        load.spritesheet(key, url, { frameWidth, frameHeight })
    })
}

/*Carga el popUp en la escena*/
export const loadPopUp = (game) => {
    game.togglePopUp = game.add.sprite(750, 50, 'smallButton')
        .setFrame(90)
        .setInteractive()
        .setScale(3)
        .setScrollFactor(0);
    
    game.optionsPopUp = new OptionsPopUp(game);
    game.optionsPopUp.createPopUp();
    game.optionsPopUp.hide();
    
    game.togglePopUp.on('pointerover', () => {
        game.togglePopUp.setFrame(91);
    });
    
    game.togglePopUp.on('pointerout', () => {
        game.togglePopUp.setFrame(90);
    });
    
    game.togglePopUp.on('pointerdown', () => {
        game.optionsPopUp.show();
        
        if (game.registry.get('audioManager') && !game.registry.get('audioManager').config.sfxMuted) {
            game.registry.get('audioManager').playSfx('buttonClick');
        }
    });
}

/*Función para imagenes y texto de los controles*/
export const addControlSprite = (scene, x, y, textureKey, animKey, text) => {
    const sprite = scene.add.sprite(x, y, textureKey);
    
    if (scene.anims.exists(animKey)) {
        sprite.play(animKey);
    } else {
        console.warn(`Animation '${animKey}' does not exist`);
    }
    
    sprite.setScale(2.5); 
    
    scene.add.text(
        x + 100, 
        y,
        text,
        { 
            fontSize: '38px',
            color: '#FF9CC8',
            fontFamily: 'pixel',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center',
            shadow: {
                color: '#DB2CA4',
                blur: 5,
                stroke: true,
                fill: true
            }
        }
    ).setOrigin(0, 0.5);
}
/*Funcion para setear la camara en el 'BossArea'*/
export function enterBossArea(game) {

    const bossStartX = 5376;
    const bossEndX = 6464;
    const bossAreaWidth = bossEndX - bossStartX;
    
    game.cameras.main.stopFollow();

    const cameraCenterX = bossStartX + (bossAreaWidth / 2);

    game.cameras.main.pan(
        cameraCenterX,
        game.cameras.main.midPoint.y,
        1000, 
        'Sine.easeInOut'
    );
}

/*Funcion para determinar la lógica del boss*/
export function updateBoss(game, time, delta) {
    
    const boss = game.boss;

    if (!boss || !boss.active) return;

    if (game.projectilesList && game.character && game.character.active) {
        for (let i = game.projectilesList.length - 1; i >= 0; i--) {
            const projectile = game.projectilesList[i];
            
            if (projectile && projectile.active) {
                const distance = Phaser.Math.Distance.Between(
                    projectile.x, projectile.y,
                    game.character.x, game.character.y
                );
                
                const collisionRadius = (projectile.width * projectile.scaleX / 2) + 
                            (game.character.width / 2);
                
                if (distance < collisionRadius) {
                    
                    characterIsDead(game);

                    game.projectilesList.splice(i, 1);
                    projectile.destroy();
                }
            } else {
                game.projectilesList.splice(i, 1);
            }
        }
    }

    if (boss.jumpTimer === undefined) {
        boss.jumpTimer = 0;
        boss.throwTimer = 0;
        boss.isJumping = false;
        boss.isThrowing = false;

        if (!game.bossProjectiles) {
            game.bossProjectiles = game.physics.add.group();

            game.physics.add.collider(game.bossProjectiles, game.floor, (projectile) => {
                projectile.destroy();
            });

            game.physics.add.overlap(game.character, game.bossProjectiles, (character, projectile) => {
                characterIsDead(game);
                projectile.destroy();
            });
        }
    }

    boss.jumpTimer += delta;
    boss.throwTimer += delta;

    if (boss.jumpTimer >= 4000 && boss.body.blocked.down && !boss.isJumping && !boss.isThrowing) { 
        bossjump(boss, game);
        boss.jumpTimer = 0;
    }

    if (boss.throwTimer >= 2000 && boss.body.blocked.down && !boss.isJumping && !boss.isThrowing) {
        bossThrowProjectile(boss, game);
        boss.throwTimer = 0;
    }

    if (boss.isJumping && boss.body.blocked.down) {
        boss.isJumping = false;
        if (!boss.isThrowing && boss.anims.exists('Boss')) {
            boss.anims.play('Boss', true);
        }
    }
}

function bossjump(boss, scene) {
    boss.isJumping = true;
    boss.setVelocityY(-350);
    
    const audioManager = scene.registry.get('audioManager') || scene.game.registry.get('audioManager');
    if (audioManager) {
        audioManager.playSfx('bossJump');
    }
    
    if (boss.anims.exists('BossJump')) {
        boss.anims.play('BossJump', true);
    }
}

function bossThrowProjectile(boss, game) {
    if (!boss || !boss.active) return;
    
    boss.isThrowing = true;
    
    boss.anims.stop();
    boss.anims.play('BossThrow', true);

    const throwAnim = boss.anims.currentAnim;
    const frameDuration = throwAnim.msPerFrame;
    const totalFrames = throwAnim.frames.length;
    const animDuration = frameDuration * totalFrames;

    setTimeout(() => {
        if (boss && boss.active) {
            try {
                const minHeight = game.scale.height - 128;
                const maxHeight = game.scale.height - 64;
                const randomHeight = Phaser.Math.Between(minHeight, maxHeight);
                const offsetX = boss.width * 0.3;

                const projectile = boss.scene.add.sprite(
                    boss.x + offsetX, 
                    randomHeight, 
                    'bossProjectile'
                );
                
                projectile.setScale(1.5);

                projectile.isProjectile = true;

                if (!game.projectilesList) {
                    game.projectilesList = [];
                }
                game.projectilesList.push(projectile);

                boss.scene.tweens.add({
                    targets: projectile,
                    x: -50, 
                    duration: 12000,
                    ease: 'Linear',
                    onComplete: () => {

                        if (game.projectilesList) {
                            const index = game.projectilesList.indexOf(projectile);
                            if (index > -1) {
                                game.projectilesList.splice(index, 1);
                            }
                        }
                        projectile.destroy();
                    }
                });

                boss.scene.tweens.add({
                    targets: projectile,
                    angle: 360,
                    duration: 2000,
                    repeat: 2
                });

                const audioManager = game.registry.get('audioManager') || game.registry.get('audioManager');
                if (audioManager) {
                    audioManager.playSfx('bossThrow');
                }

                boss.anims.play('Boss', true);
            } catch (error) {
                console.error("Error en bossThrowProjectile:", error);
            }
            
            boss.isThrowing = false;
        } else {
            if (boss) boss.isThrowing = false;
        }
    }, animDuration);
}

