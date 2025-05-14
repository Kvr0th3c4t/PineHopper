export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, type) {
        super(scene, x, y, texture);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.type = type;
        this.setOrigin(0, 1);

        if (type === 'mace') {
            this.setScale(0.25);
            this.body.setSize(
            this.width * 0.7,  
            this.height * 0.9,
            true               
            );
            this.body.immovable = true;
        } else if (type === 'slime') {
            this.setVelocityX(50);
            this.anims.play('slimeWalk', true);            
        } else if (type === 'boss') {
            this.setScale(3.5);
            this.flipX = true;
            this.body.setSize(
            this.width * 0.7,  
            this.height * 1,
            true               
            );
            this.anims.play('Boss', true);
        }
    }
}

