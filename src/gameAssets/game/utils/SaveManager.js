export class SaveManager {
    constructor(scene, gameId = 'PineHopper') {
        this.scene = scene;
        this.gameId = gameId;
        this.saveKey = `${this.gameId}-save-data`;
        this.lastCheckpointKey = `${this.gameId}-last-checkpoint`;
        this.lastCheckpointId = null;
    }

    loadProgress() {
        const savedData = this.loadGameProgress();
        
        if (savedData && savedData.scene === this.scene.scene.key) {
            this.lastCheckpointId = savedData.id;
            console.log(`Progreso cargado para escena ${savedData.scene}: Score ${savedData.score}`);
            return savedData;
        }
        return null;
    }

    saveCheckpoint(checkpoint, score) {
        const checkpointId = checkpoint.identifier || 'checkpoint';
        
        this.lastCheckpointId = checkpointId;

        const success = this._saveCheckpointData(
            checkpointId,
            { x: checkpoint.x, y: checkpoint.y - 256 }, 
            score,
            this.scene.scene.key
        );
        
        console.log(`Checkpoint ${checkpointId} guardado en escena ${this.scene.scene.key}`);
        return success;
    }

    saveManual(position, score) {
        if (!this.lastCheckpointId) {
            console.warn("No hay checkpoint activo para guardar manualmente");
            return false;
        }

        const success = this._saveCheckpointData(
            this.lastCheckpointId,
            position,
            score,
            this.scene.scene.key
        );
        
        console.log(`Guardado manual en escena ${this.scene.scene.key}`);
        return success;
    }
    
    _saveCheckpointData(checkpointId, position, score, sceneName) {
        const checkpointData = {
            id: checkpointId,
            position: position,
            score: score,
            scene: sceneName,
            timestamp: new Date().toISOString()
        };

        try {

            localStorage.setItem(this.lastCheckpointKey, JSON.stringify(checkpointData));

            this._saveGameProgressData(checkpointData);
            
            return true;
        } catch (error) {
            console.error("Error al guardar checkpoint:", error);
            return false;
        }
    }

    _saveGameProgressData(checkpointData) {

        if (!checkpointData) {
            const lastCheckpoint = this.getLastCheckpoint();
            if (!lastCheckpoint) {
                console.error("No hay checkpoint guardado. No se puede guardar el progreso.");
                return false;
            }
            checkpointData = lastCheckpoint;
        }

        const saveData = {
            ...checkpointData,
            savedAt: new Date().toISOString(), 
            gameVersion: '1.0.0'
        };

        try {
            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            console.log("Progreso del juego guardado con éxito.");
            return true;
        } catch (error) {
            console.error("Error al guardar progreso:", error);
            return false;
        }
    }

    getLastCheckpoint() {
        try {
            const checkpointData = localStorage.getItem(this.lastCheckpointKey);
            if (!checkpointData) {
                return null;
            }
            return JSON.parse(checkpointData);
        } catch (error) {
            console.error("Error al obtener el último checkpoint:", error);
            return null;
        }
    }

    loadGameProgress() {
        try {
            const saveData = localStorage.getItem(this.saveKey);
            if (!saveData) {
                console.log("No hay datos de progreso guardados.");
                return null;
            }
            return JSON.parse(saveData);
        } catch (error) {
            console.error("Error al cargar el progreso guardado:", error);
            return null;
        }
    }

    hasSavedGame() {
        return localStorage.getItem(this.saveKey) !== null;
    }

    clearProgress() {
        try {
            localStorage.removeItem(this.saveKey);
            localStorage.removeItem(this.lastCheckpointKey);
            console.log("Datos de progreso eliminados con éxito.");
            return true;
        } catch (error) {
            console.error("Error al eliminar datos de progreso:", error);
            return false;
        }
    }

    hasActiveCheckpoint() {
        return this.lastCheckpointId !== null;
    }

    showMessage(text) {
    
    const container = this.scene.add.container(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY - 100
        );
    
    const message = this.scene.add.text(
        0, 0,
        text,
        { 
            fontFamily: "pixel", 
            fontSize: 32, 
            fill: "#fff",
            padding: {
                x: 5, y: 5
            }
        }
    ).setOrigin(0.5);
    
    container.add(message);
        
    const width = message.width;
    const height = message.height;
    const cornerRadius = 15;

    const rectKey = 'message-rect-' + Date.now();
    const rectGraphics = this.scene.make.graphics();

    rectGraphics.fillStyle(0x000000, 0.7);
    rectGraphics.fillRoundedRect(0, 0, width, height, cornerRadius);

    rectGraphics.lineStyle(2, 0x00BDE0, 1);
    rectGraphics.strokeRoundedRect(0, 0, width, height, cornerRadius);

    rectGraphics.generateTexture(rectKey, width, height);

    const rect = this.scene.add.sprite(0, 0, rectKey).setOrigin(0.5);

    container.addAt(rect, 0);

    container.setDepth(1000);
    container.setScrollFactor(0);

        this.scene.time.delayedCall(1500, () => {
        this.scene.tweens.add({
            targets: container,
            alpha: { from: 1, to: 0 },
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                container.destroy();
                this.scene.textures.remove(rectKey);
            }
        });
    });
}
}