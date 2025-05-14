export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#5DF4F0',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            pixelArt:true,
            // debug: true
        }
    }
};

