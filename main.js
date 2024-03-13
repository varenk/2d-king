const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

// Setting canvas size to 16:9 ratio
canvas.width = gameTileSizePx * 16;
canvas.height = gameTileSizePx * 9;

const canvasBottom = canvas.height;

canvas.height = gameTileSizePx * 9;

const backgroundLevel1 = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './assets/backgroundLevel1.png'
});

const parsedCollisions = parse2D(collisionsLevel1);
const collisionBlocks = createCollisionBlocksFrom2DArray(
    parsedCollisions,
    CollisionBlock
);

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
    // Drawing a background image
    backgroundLevel1.draw();
    // Drawing collision blocks
    collisionBlocks.forEach(collision => collision.draw());

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
