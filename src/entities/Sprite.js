class Sprite {
    constructor({ position, imageSrc, framesInSprite = 1, animations }) {
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width / this.framesInSprite;
            this.height = this.image.height;
        }
        this.image.src = imageSrc;
        this.loaded = false;
        this.framesInSprite = framesInSprite;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = 6;
        this.animations = animations;

        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image();
                image.src = this.animations[key].spriteSrc;

                this.animations[key].image = image;
            }
            console.log(this.animations)
        }
    }

    draw() {
        if (!this.loaded) return;

        const cropbox = {
            position: { x: this.width * this.currentFrame, y: 0},
            width: this.width,
            height: this.height
        }

        canvasContext.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.updateFrames();
    }

    updateFrames() {
        // Will only move to the next frame in the sprite if elapsed frames are dividable
        // by frameBuffer value. Increase frameBuffer value to make animation slower
        if (this.framesInSprite > 1) {
            if (this.elapsedFrames % this.frameBuffer === 0) {
                if (this.currentFrame < (this.framesInSprite - 1)) {
                    this.currentFrame++
                } else {
                    this.currentFrame = 0;
                }
            }

            this.elapsedFrames++;
        }
    }

    resetAnimation() {
        this.currentFrame = 0;
        this.elapsedFrames = 0;
    }
}
