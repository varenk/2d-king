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

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

// Creating an animation loop
function animate() {
    requestAnimationFrame(animate);
    fillBackground();

    player.velocity.x = 0;
    if (keys.d.pressed) {
        player.velocity.x = 5;
    } else if (keys.a.pressed) {
        player.velocity.x = -5;
    }

    // Drawing the player
    player.draw();
    player.update();
}

animate();
