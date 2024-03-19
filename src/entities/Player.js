class Player extends Sprite {
    constructor({
        imageSrc,
        framesInSprite = 1,
        collisionBlocks = [],
        animations,
        x = 200,
        y = 200
    }) {
        super({ imageSrc, framesInSprite, animations });
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
    }

    get playerTop() {
        return this.playerHitbox?.position.y;
    }

    get playerBottom() {
        return this.playerHitbox?.position.y + this.playerHitbox?.height;
    }

    get playerLeft() {
        return this.playerHitbox?.position.x;
    }

    get playerRight() {
        return this.playerHitbox?.position.x + this.playerHitbox?.width;
    }

    // Creating a player hitbox relatively to main player box (sprite) position
    get playerHitbox() {
        const spriteOffsetX = 58;
        const spriteOffsetY = 38;
        return {
            position: { x: this.position.x + spriteOffsetX, y: this.position.y + spriteOffsetY },
            width: 50,
            height: 50
        }
    }

    update() {
        // Move left / right
        this.position.x += this.velocity.x;

        // Check for horizontal collisions
        this.checkHorizontalCollision();

        // Move up, apply gravity
        this.applyGravity();

        // canvasContext.fillStyle = 'rgba(255, 0, 0, 0.3)'
        // canvasContext.fillRect(this.playerHitbox.position.x, this.playerHitbox.position.y, this.playerHitbox.width, this.playerHitbox.height)

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
                    const hitboxOffset = this.playerHitbox.position.x - this.position.x;
                    this.position.x = collisionRight - hitboxOffset + 0.01;
                    break;
                }

                // collision on x axis going to the right
                if (this.velocity.x > 0) {
                    const hitboxOffset = this.playerHitbox.position.x - this.position.x + this.playerHitbox.width;
                    this.position.x = collisionLeft - hitboxOffset - 0.01;
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

                    const hitboxOffset = this.playerHitbox.position.y - this.position.y;
                    this.position.y = collisionBottom - hitboxOffset + 0.01;
                    break;
                }

                // collision on y axis falling down
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const hitboxOffset = this.playerHitbox.position.y - this.position.y + this.playerHitbox.height;
                    this.position.y = collisionTop - hitboxOffset - 0.01;
                    break;
                }
            }
        }
    }

    checkIsCollision(collision, playerInMiddle = false) {
        const collisionRight = collision.position.x + collision.width;
        const collisionLeft = collision.position.x;
        const collisionTop = collision.position.y;
        const collisionBottom = collision.position.y + collision.height;

        return (playerInMiddle ? this.playerLeft + this.playerHitbox.width : this.playerLeft) <= collisionRight &&
            (playerInMiddle ? this.playerHitbox.position.x : this.playerRight) >= collisionLeft &&
            this.playerTop <= collisionBottom &&
            this.playerBottom >= collisionTop
    }

    switchSprite(spriteName) {
        const animation = this.animations[spriteName];

        if (this.image === animation.image) return;

        this.resetAnimation();

        this.image = animation.image;
        this.framesInSprite = animation.framesInSprite;
        this.frameBuffer = animation.frameBuffer;
        this.loop = animation.loop;

        this.currentAnimation = animation;
    }
}
