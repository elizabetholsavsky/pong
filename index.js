import Ball from './Ball.js'

const ball = new Ball(document.getElementById('ball'))

let lastTime;
function update(time) {
    if (lastTime != null) {
    // how much time passes between frames
    const delta = time - lastTime;
    ball.update(delta);
    }

    lastTime = time;
    // creates infinite loop every time something is able to change
    // console.log(time);
    window.requestAnimationFrame(update)
}

// better choice than setInterval(not accurate)
window.requestAnimationFrame(update)