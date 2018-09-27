// const APPLE_COLOR = 'red';

class Apple {
    constructor() {
        this.x = Math.floor(Math.random() * (canvas.width / SCALE - 1)) * SCALE;
        this.y = Math.floor(Math.random() * (canvas.height / SCALE - 1)) * SCALE;
    }

    draw() {
        // ctx.fillStyle = APPLE_COLOR;
        // ctx.fillRect(this.x, this.y, SCALE, SCALE);
        ctx.drawImage(appleImg, this.x, this.y, SCALE, SCALE);
    }

    // Instead of creating new Apple instances we redraw already existing apples on new postition to prevent memory leak 
    respawn() {
        this.x = Math.floor(Math.random() * (canvas.width / SCALE - 1)) * SCALE;
        this.y = Math.floor(Math.random() * (canvas.height / SCALE - 1)) * SCALE;
    }

    remove() {
        ctx.clearRect(this.x, this.y, SCALE, SCALE);
        this.respawn();
    }
}