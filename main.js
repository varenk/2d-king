const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

const gameTileSizePx = 64;

// Setting canvas size to 16:9 ratio
canvas.width = gameTileSizePx * 16;
canvas.height = gameTileSizePx * 9;

const canvasBottom = canvas.height;



// Drawing the background of the game
function fillBackground() {
    canvasContext.fillStyle = '#fff';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

const player = new Player();

// Creating an animation loop
function animate() {
    requestAnimationFrame(animate);
    fillBackground();

    // Drawing the player
    player.draw();
    player.update();
}

animate();
