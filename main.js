const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

// Setting canvas size to 16:9 ratio
canvas.width = gameTileSizePx * 16;
canvas.height = gameTileSizePx * 9;

let backgroundLevel;
let parsedCollisions;
let collisionBlocks;
let doors;

const player = new Player(
    {
        imageSrc: './assets/king/idle.png',
        framesInSprite: 11,
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
                    console.log('completed');
                    gsap.to(overlay, {
                        opacity: 1,
                        onComplete: () => {
                            level++;

                            if (level === 4) {
                                level = 1;
                            }

                            player.currentAnimation.isCompleted = false;
                            levels[level].init();
                            gsap.to( overlay, {
                                opacity: 0
                            })
                        }
                    })
                }
            }
        }
    }
);

let level = 1;
let levels = {
    1: {
        init: () => {
            backgroundLevel = new Sprite({
                position: { x: 0, y: 0 },
                imageSrc: './assets/backgroundLevel1.png'
            });

            parsedCollisions = parse2D(collisionsLevel1);
            collisionBlocks = createCollisionBlocksFrom2DArray(
                parsedCollisions,
                CollisionBlock
            );
            player.collisionBlocks = collisionBlocks;
            player.switchSprite('idleRight');
            player.preventInput = false;

            doors = [
                new Sprite({
                    position: { x: 767, y: 270 },
                    imageSrc: './assets/doorOpen.png',
                    framesInSprite: 5,
                    frameBuffer: 6,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    2: {
        init: () => {
            backgroundLevel = new Sprite({
                position: { x: 0, y: 0 },
                imageSrc: './assets/backgroundLevel2.png'
            });

            parsedCollisions = parse2D(collisionsLevel2);
            collisionBlocks = createCollisionBlocksFrom2DArray(
                parsedCollisions,
                CollisionBlock
            );
            player.collisionBlocks = collisionBlocks;
            player.position.x = 96;
            player.position.y = 80;
            player.switchSprite('idleRight');
            player.preventInput = false;

            doors = [
                new Sprite({
                    position: { x: 772, y: 336 },
                    imageSrc: './assets/doorOpen.png',
                    framesInSprite: 5,
                    frameBuffer: 6,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    },
    3: {
        init: () => {
            backgroundLevel = new Sprite({
                position: { x: 0, y: 0 },
                imageSrc: './assets/backgroundLevel3.png'
            });

            parsedCollisions = parse2D(collisionsLevel3);
            collisionBlocks = createCollisionBlocksFrom2DArray(
                parsedCollisions,
                CollisionBlock,
                gameTileSizePx,
                250
            );
            player.collisionBlocks = collisionBlocks;
            player.position.x = 675;
            player.position.y = 245;
            player.switchSprite('idleRight');
            player.preventInput = false;

            doors = [
                new Sprite({
                    position: { x: 176, y: 335 },
                    imageSrc: './assets/doorOpen.png',
                    framesInSprite: 5,
                    frameBuffer: 6,
                    loop: false,
                    autoplay: false
                })
            ]
        }
    }
}

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

const overlay = {
    opacity: 0
}

// Creating an animation loop
function animate() {
    requestAnimationFrame(animate);
    // Drawing a background image
    backgroundLevel.draw();
    // Drawing collision blocks
    // collisionBlocks.forEach(collision => collision.draw());
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

    // Fading the canvas
    canvasContext.save();
    canvasContext.globalAlpha = overlay.opacity;
    canvasContext.fillStyle = '#000';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.restore();
}

levels[level].init();
animate();
