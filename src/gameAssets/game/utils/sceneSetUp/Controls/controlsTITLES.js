export const createTitles = (scene, startY, spacing) => {
    return [
        {
            x: scene.cameras.main.centerX - 275,
            y: startY,
            texture: 'characterRun',
            animation: 'characterWalk',
            text: 'Run: Use the left and right keys'
        },
        {
            x: scene.cameras.main.centerX - 275,
            y: startY + spacing,
            texture: 'characterJump',
            animation: 'characterJump',
            text: 'Jump: Use the up key'
        },
        {
            x: scene.cameras.main.centerX - 275,
            y: startY + spacing * 2,
            texture: 'smallButton',
            animation: 'pause',
            text: 'Pause: Click the top right button'
        }
    ];
};