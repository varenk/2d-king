class Sprite {
    constructor({
                    position,
                    imageSrc,
                    framesInSprite = 1,
                    animations,
                    frameBuffer = 6,
                    loop = true,
                    autoplay = true
    }) {
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
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;
        this.currentAnimation = null;

        if (this.animations) {
            for (let key in this.animations) {
                const image = new Image();
                image.src = this.animations[key].spriteSrc;

                this.animations[key].image = image;
            }
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

    startAnimation() {
        this.autoplay = true;
    }

    updateFrames() {
        if (!this.autoplay) return;
        // Will only move to the next frame in the sprite if elapsed frames are dividable
        // by frameBuffer value. Increase frameBuffer value to make animation slower
        if (this.framesInSprite > 1) {
            if (this.elapsedFrames % this.frameBuffer === 0) {
                if (this.currentFrame < (this.framesInSprite - 1)) {
                    this.currentFrame++
                } else {
                    if (this.loop) this.currentFrame = 0;
                }
            }

            this.elapsedFrames++;
        }

        if (this.currentAnimation?.onComplete) {
            if (this.elapsedFrames === (this.framesInSprite - 1) && !this.currentAnimation.isCompleted) {
                this.currentAnimation.onComplete();
                this.currentAnimation.isCompleted = true;
            }
        }
    }

    resetAnimation() {
        this.currentFrame = 0;
        this.elapsedFrames = 0;
    }
}
