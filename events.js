const playerJump = () => {
    if (player.velocity.y === 0) {
        player.velocity.y = -15;
    }
}

const playerMoveLeft = () => {
    keys.a.pressed = true;
}

const playerMoveRight = () => {
    keys.d.pressed = true;
}

const playerStopMovingLeft = () => {
    keys.a.pressed = false;
}

const playerStopMovingRight = () => {
    keys.d.pressed = false;
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
    console.log(event);
    const keyAction = keyDownActions[event.key];

    if (keyAction) {
        keyAction();
    }
})

window.addEventListener('keyup', (event) => {
    const keyAction = keyUpActions[event.key];

    if (keyAction) {
        keyAction();
    }
})
