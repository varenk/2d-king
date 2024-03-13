class CollisionBlock {
    constructor({ position, width = 64, height = 64 }) {
        this.position = position;
        this.width = width;
        this.height = height;
    }

    draw() {
        canvasContext.fillStyle = 'rgba(255, 0, 0, 0.2)';
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
