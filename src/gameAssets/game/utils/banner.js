export function bannerAnimation(game, key) {
    // Usamos la cámara principal
    const camera = game.cameras.main;
    const width = camera.width;
    const height = camera.height;
    
    // Creamos el contenedor posicionado en la cámara actual
    const container = game.add.container(camera.scrollX, camera.scrollY + height / 2);
    
    const bannerText = game.add.text(width/2, -20, key, {
        fontSize: '50px',
        color: '#FF9CC8',
        fontFamily: 'pixel',
        stroke: '#000000',
        strokeThickness: 3,
        align: 'center'
    }).setOrigin(0.5);
    
    const banner = game.add.graphics();
    banner.fillStyle(0x000000, 0.8);
    banner.fillRect(0, -35, width, 50);
    
    container.add(banner);
    container.add(bannerText);
    
    // Primera animación: entrada con rebote
    game.tweens.add({
        targets: container,
        y: { from: camera.scrollY - 100, to: camera.scrollY + height / 2 + 35 },
        duration: 1250,
        ease: 'Bounce.Out',
        onComplete: () => {
            // Segunda animación: desvanecimiento
            game.tweens.add({
                targets: container,
                alpha: 0,
                duration: 500,
                ease: 'Linear',
                delay: 500,
                onComplete: () => {
                    container.destroy();
                }
            });
        }
    });
}