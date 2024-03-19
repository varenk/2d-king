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

const player = new Player(
    {
        imageSrc: './assets/king/idle.png',
        framesInSprite: 11,
        collisionBlocks,
        animations: {
            idleRight: {
                framesInSprite: 11,
                frameBuffer: 6,
                loop: true,
                spriteSrc: './assets/king/idle.png'
            },
            idleLeft: {
                framesInSprite: 11,
                frameBuffer: 6,
                loop: true,
                spriteSrc: './assets/king/idleLeft.png'
            },
            runRight: {
                framesInSprite: 8,
                frameBuffer: 4,
                loop: true,
                spriteSrc: './assets/king/runRight.png'
            },
            runLeft: {
                framesInSprite: 8,
                frameBuffer: 4,
                loop: true,
                spriteSrc: './assets/king/runLeft.png'
            },
            enterDoor: {
                framesInSprite: 8,
                frameBuffer: 6,
                loop: false,
                spriteSrc: './assets/king/enterDoor.png',
                onComplete: () => {

                }
            }
        }
    }
);

const doors = [
    new Sprite({
        position: { x: 767, y: 270 },
        imageSrc: './assets/doorOpen.png',
        framesInSprite: 5,
        frameBuffer: 6,
        loop: false,
        autoplay: false
    })
]

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
    // Drawing doors
    doors.forEach(door => door.draw());

    // Determining if player moves on x-axis
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
