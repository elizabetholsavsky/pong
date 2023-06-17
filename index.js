import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));

let lastTime;
function update(time) {
    if (lastTime != null) {
    // how much time passes between frames
    const delta = time - lastTime;
    // ball.update(delta);
    computerPaddle.update(delta, ball.y);
    }

    lastTime = time;
    // creates infinite loop every time something is able to change
    // console.log(time);
    window.requestAnimationFrame(update)
}

document.addEventListener('mousemove', e => {
    // e.y is pixel value, convert to percentage (CSS)
    playerPaddle.position = (e.y / window.innerHeight) * 100;
})

// better choice than setInterval(not accurate)
window.requestAnimationFrame(update)