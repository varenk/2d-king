class Player {
    constructor(x = 100, y = 100, width = gameTileSizePx, height = gameTileSizePx) {
        this.position = { x, y };
        this.width = width;
        this.height = height;
        this.velocity = { x: 0, y: 0 };
        this.gravity = 1;
    }

    get playerBottom() {
        return this.position.y + this.height;
    }

    draw() {
        canvasContext.fillStyle = 'red';
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);

    }

    update() {
        this.position.y += this.velocity.y;

        if (this.playerBottom + this.velocity.y < canvasBottom) {
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }
    }
}
