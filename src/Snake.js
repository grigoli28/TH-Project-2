const BODY_COLOR = 'rgb(0, 155, 0)';
const HEAD_COLOR = 'rgb(0, 80, 0)';
const STROKE_COLOR = 'white';


class Snake {
    constructor(length = 3, speed = 1) {
        this.speed = speed;
        this.body = [];
        this.direction = 'UP';
        for (let i = 1; i <= length; i++) {
            // Unshift as we want head coordinates to be at 0 index
            this.body.unshift({
                // Choose middle spot on X axis
                x: (canvas.width / 2) - (canvas.width / 2 % SCALE),
                // Choose spot on Y axis according to initial snake length
                y: canvas.height - i * SCALE
            });
        }
    }

    draw() {
        this.body.forEach((bodyPart, index) => {
            ctx.fillStyle = (index == 0) ? HEAD_COLOR : BODY_COLOR;
            ctx.strokeStyle = STROKE_COLOR;
            ctx.fillRect(bodyPart.x, bodyPart.y, SCALE, SCALE);
            ctx.strokeRect(bodyPart.x, bodyPart.y, SCALE, SCALE);
        });
    }

    move() {
        let newHead = {
            x: this.body[0].x,
            y: this.body[0].y
        };
        if (this.direction == "LEFT") newHead.x -= SCALE;
        if (this.direction == "UP") newHead.y -= SCALE;
        if (this.direction == "RIGHT") newHead.x += SCALE;
        if (this.direction == "DOWN") newHead.y += SCALE;
        if (this.collision(newHead, this.body)) {
            game.stop();
        }
        apples.forEach((apple) => {
            if (newHead.x == apple.x && newHead.y == apple.y) {
                score += APPLE_SCORE;
                apple.remove();
                snake.grow(newHead.x, newHead.y);
            }
        });
        this.pop();
        this.body.unshift(newHead);
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


    collision(head, body) {
        if (this.bodyCollision(head, body) || this.wallCollision(head)) {
            return true;
        }
        return false;
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


    eats(head, apples) {
        for (let apple of apples) {
            if (head.x == apple.x && head.y == apple.y) {
                score += APPLE_SCORE;
                apple.remove();
                snake.grow(nextHead.x, nextHead.y);
            }
        }

        apples.forEach((apple) => {
            if (nextHead.x == apple.x && nextHead.y == apple.y) {
                score += APPLE_SCORE;
                apple.remove();
                snake.grow(nextHead.x, nextHead.y);
            }
        });
    }


    grow(x, y) {
        this.body.unshift({ x, y });
    }

    pop() {
        return this.body.pop();
    }

    // !!!unused
    setSpeed(spd) {
        if (spd > 0) {
            this.speed = spd;
        } else {
            throw new Error(`Speed can't have negative value`);
        }
    }

    // !!!unused
    get length() {
        return this.body.length;
    }
}