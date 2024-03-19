const playerJump = () => {
    // Detect if there is a collision with door
    // to enter it instead of jumping
    for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (player.checkIsCollision(door, true)) {
            console.log('door collision');
            player.preventInput = true;
            player.velocity.x = 0;
            player.velocity.y = 0;

            door.startAnimation();
            player.switchSprite('enterDoor');

            return;
        }
    }

    // Actual jump logic
    if (player.velocity.y === 0) {
        player.velocity.y = -15;
    }
}

const playerMoveLeft = () => {
    keys.a.pressed = true;
    player.switchSprite('runLeft');
}

const playerMoveRight = () => {
    keys.d.pressed = true;
    player.switchSprite('runRight');
}

const playerStopMovingLeft = () => {
    keys.a.pressed = false;
    player.switchSprite('idleLeft');
}

const playerStopMovingRight = () => {
    keys.d.pressed = false;
    player.switchSprite('idleRight');
}

const keyDownActions = {
    ' ': playerJump,
    'w': playerJump,
    'a': playerMoveLeft,
    'd': playerMoveRight
}

const keyUpActions = {
    'a': playerStopMovingLeft,
    'd': playerStopMovingRight
}

window.addEventListener('keydown', (event) => {
    if (player.preventInput) return;

    const keyAction = keyDownActions[event.key];

    if (keyAction) {
        keyAction();
    }
})

window.addEventListener('keyup', (event) => {
    if (player.preventInput) return;

    const keyAction = keyUpActions[event.key];

    if (keyAction) {
        keyAction();
    }
})
