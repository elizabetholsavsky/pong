const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
    constructor(ballElem) {
        this.ballElem = ballElem;
        this.reset();
    };

    // helper functions to get x variable
    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--x')); // from CSS
    };

    set x(value) {
        this.ballElem.style.setProperty('--x', value); // pass value to CSS var
    };

    // helper functions to get y variable
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue('--y')); // from CSS
    };

    set y(value) {
        this.ballElem.style.setProperty('--y', value); // pass value to CSS var
    };

    // ball bounce off wall
    rect() {
        return this.ballElem.getBoundingClientRect();
    }

    // velocity/direction
    reset() {
        this.x = 50;
        this.y = 50;
        this.direction = { x: 0 }; 
        // length of a=1 (unit vector), unit vector(1) * velocity = x units in direction of a
        // velocity only determines speed, direction only determines direction
        while (Math.abs(this.direction.x <= .2) || Math.abs(this.direction >= .9)) {
            // runs to make game more interesting (.9 side to side, .2 up and down)
            // Math.abs gets absolute value in case of negative numbers
            const heading = randomNumberBetween(0, 2 * Math.PI); // 2PI ~360 degrees, creates random number 0-360ish
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }; // unit vector for position
        }
        this.velocity = INITIAL_VELOCITY;
    }

    update(delta, paddleRects) {
        // include delta to scale with frame time
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
        // increase velocity over game play
        this.velocity += VELOCITY_INCREASE * delta;
        const rect =  this.rect();

        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            // if ball goes past bottom or top, flip the y direction
            this.direction.y *= -1
        }

        if (paddleRects.some(r => isCollision(r, rect))) {
            // if ball hits right or left, flip the x direction
            this.direction.x *= -1
        }
    }
}

// create random number for heading
function randomNumberBetween(min, max) {
    return Math.random() *  (max - min) + min;
};

function isCollision(rect1, rect2) {
    return (
    rect1.left <= rect2.right && 
    rect1.right >= rect2.left && 
    rect1.top <= rect2.bottom && 
    rect1.bottom >= rect2.top
    );
};