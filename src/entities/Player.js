class Player extends Sprite {
    constructor({ imageSrc, framesInSprite = 1, collisionBlocks = [], x = 200, y = 200 }) {
        super({ imageSrc, framesInSprite });
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
    }

    get playerTop() {
        return this.position.y;
    }

    get playerBottom() {
        return this.position.y + this.height;
    }

    get playerLeft() {
        return this.position.x;
    }

    get playerRight() {
        return this.position.x + this.width;
    }

    update() {
        canvasContext.fillStyle = 'rgba(255, 0, 0, 0.3)'
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)

        // Move left / right
        this.position.x += this.velocity.x;

        // Check for horizontal collisions
        this.checkHorizontalCollision();

        // Move up, apply gravity
        this.applyGravity();

        // Check for vertical collisions
        this.checkVerticalCollision();
    }

    applyGravity() {
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    checkHorizontalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collision = this.collisionBlocks[i];

            // if a collision exist
            const collisionRight = collision.position.x + collision.width;
            const collisionLeft = collision.position.x;

            if (this.checkIsCollision(collision)) {
                // collision on x axis going to the left
                if (this.velocity.x < 0) {
                    this.position.x = collisionRight + 0.01;
                    break;
                }

                // collision on x axis going to the right
                if (this.velocity.x > 0) {
                    this.position.x = collisionLeft - this.width - 0.01;
                    break;
                }
            }
        }
    }

    checkVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collision = this.collisionBlocks[i];

            // if a collision exist
            const collisionTop = collision.position.y;
            const collisionBottom = collision.position.y + collision.height;
            if (this.checkIsCollision(collision)) {
                // collision on y axis going up
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBottom + 0.01;
                    break;
                }

                // collision on y axis falling down
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionTop - this.height - 0.01;
                    break;
                }
            }
        }
    }

    checkIsCollision(collision) {
        const collisionRight = collision.position.x + collision.width;
        const collisionLeft = collision.position.x;
        const collisionTop = collision.position.y;
        const collisionBottom = collision.position.y + collision.height;

        return this.playerLeft <= collisionRight &&
            this.playerRight >= collisionLeft &&
            this.playerTop <= collisionBottom &&
            this.playerBottom >= collisionTop
    }
}
