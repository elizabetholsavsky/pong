export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem;
    }

    get position(){
        return parseFloat(getComputedStyle(this.paddleElem).getPropertyValue('--position')); // from CSS
    }

    set position(value) {
        this.paddleElem.style.setProperty('--position', value); // pass value to CSS var
    }

};