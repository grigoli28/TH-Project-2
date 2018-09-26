const BODY_COLOR = 'blue';
const HEAD_COLOR = 'black';

class Snake {
    constructor(length = 3, speed = 1) {
        this.speed = speed;
        this.body = [];
        this.direction = 'UP';
        for (let i = 1; i <= length; i++) {
            this.body.unshift({ // Unshift as we want head to be at 0 index
                x: (canvas.width / 2) - (canvas.width / 2 % SCALE), // choose middle spot on X axis
                y: canvas.height - i * SCALE
            });
        }
    }

    draw() {
        this.body.forEach((e, i) => {
            ctx.fillStyle = (i == 0) ? HEAD_COLOR : BODY_COLOR;
            ctx.fillRect(e.x, e.y, SCALE, SCALE);
        });
    }

    move() {


        // for (let i = 0; i < 3; i++) {
        let nextHead = {
            x: this.body[0].x,
            y: this.body[0].y
        };
        if (this.direction == "LEFT") nextHead.x -= SCALE;
        if (this.direction == "UP") nextHead.y -= SCALE;
        if (this.direction == "RIGHT") nextHead.x += SCALE;
        if (this.direction == "DOWN") nextHead.y += SCALE;
        // debugger;
        if (this.collision(nextHead, this.body)) {
            game.stop();
        }
        apples.forEach((apple) => {
            if (nextHead.x == apple.x && nextHead.y == apple.y) {
                score += APPLE_SCORE;
                apple.remove();
                snake.grow(nextHead.x, nextHead.y);
            }
        });
        this.body.pop();
        this.body.unshift(nextHead);
        // }

    }


    setDirection(direction) {
        if (direction == 'LEFT' && this.direction != 'RIGHT') {
            this.direction = 'LEFT';
        } else if (direction == 'UP' && this.direction != 'DOWN') {
            this.direction = 'UP';
        } else if (direction == 'RIGHT' && this.direction != 'LEFT') {
            this.direction = 'RIGHT';
        } else if (direction == 'DOWN' && this.direction != 'UP') {
            this.direction = 'DOWN';
        }
    }


    bodyCollision(head, body) {
        for (let part of body) {
            if (head.x == part.x && head.y == part.y) {
                return true;
            }
        }
        return false;
    }


    wallCollision(head) {
        if (head.x >= canvas.width || head.x < 0 ||
            head.y >= canvas.height || head.y < 0) {
            return true;
        }
        return false;
    }

    collision(head, body) {
        if (this.bodyCollision(head, body) || this.wallCollision(head)) {
            return true;
        }
        return false;
    }

    grow(x, y) {
        this.body.unshift({ x, y });
    }

    pop() {
        return this.body.pop();
    }

    setSpeed(spd) {
        if (spd > 0) {
            this.speed = spd;
        } else {
            throw new Error(`Speed can't have negative value`);
        }
    }

    get length() {
        return this.body.length;
    }
}