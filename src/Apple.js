class Apple {
    constructor() {
        this.x = Math.floor(Math.random() * (canvas.width / SCALE - 1)) * SCALE;
        this.y = Math.floor(Math.random() * (canvas.height / SCALE - 1)) * SCALE;
    }

    draw() {
        ctx.drawImage(appleImg, this.x, this.y, SCALE, SCALE);
    }

    respawn() {
        let x = Math.floor(Math.random() * (canvas.width / SCALE - 1)) * SCALE;
        let y = Math.floor(Math.random() * (canvas.height / SCALE - 1)) * SCALE;

        // If apple spawns on snake body
        for (let part of snake.body) {
            if (part.x == x && part.y == y) {
                this.respawn();
                return;
            } else {
                this.x = x;
                this.y = y;
            }
        }
    }

    remove() {
        ctx.clearRect(this.x, this.y, SCALE, SCALE);
        // When apple is eaten instead of creating new instance we reposition already existing to prevent memory leak 
        this.respawn();
    }
}