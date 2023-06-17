// max speed for computer paddle
const SPEED = 0.02;
export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem;
        this.reset();
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('--position')); // from CSS
    }

    set position(value) {
        this.paddleElem.style.setProperty('--position', value); // pass value to CSS var
    }

    reset() {
        this.position = 50;
    }
    
    update(delta, ballHeight) {
        this.position += SPEED * delta * (ballHeight - this.position)
    }

};