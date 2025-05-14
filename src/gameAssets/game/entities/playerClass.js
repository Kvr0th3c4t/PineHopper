export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'characterIdle');
        game.add.existing(this);
        game.physics.add.existing(this);
        
        this.body.setSize(
            this.width * 0.7,  
            this.height * 0.9, 
            true               
        );
        
        this.setOrigin(0, 1)
            .setScale(1.5)
            .setGravityY(1000)
            .setCollideWorldBounds(true);
    }
}