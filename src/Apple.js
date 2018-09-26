const APPLE_COLOR = 'red';

class Apple {
    constructor() {
        this.x = Math.floor(Math.random() * (canvas.width / SCALE - 1)) * SCALE;
        this.y = Math.floor(Math.random() * (canvas.height / SCALE - 1)) * SCALE;
    }

    static drawApples(num) {

    }

    draw() {
        ctx.fillStyle = APPLE_COLOR;
        ctx.fillRect(this.x, this.y, SCALE, SCALE);
    }

    respawn() {
        this.x = Math.floor(Math.random() * (canvas.width / SCALE - 1) + 1) * SCALE;
        this.y = Math.floor(Math.random() * (canvas.height / SCALE - 1) + 1) * SCALE;
    }

    remove() {
        ctx.clearRect(this.x, this.y, SCALE, SCALE);
        this.respawn();
    }
}