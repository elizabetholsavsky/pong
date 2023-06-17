const INITIAL_VELOCITY = .025;

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

    update(delta) {
        this.x += this.direction.x * this.velocity * delta;
        this.y += this.direction.y * this.velocity * delta;
    }
}

// create random number for heading
function randomNumberBetween(min, max) {
    return Math.random() *  (max - min) + min;
};