export class Checkpoint extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        this.setOrigin(0, 1);

        if(key === 'startIdle'){
            this.anims.play('startIdle', true)
            .setScale(1.5)
        }else if( key === 'endIdle'){
            this.anims.play('endIdle', true)
            .setScale(0.9)
        }
    }
}