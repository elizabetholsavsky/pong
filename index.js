import Ball from './Ball.js';
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById('ball'));
const playerPaddle = new Paddle(document.getElementById('player-paddle'));
const computerPaddle = new Paddle(document.getElementById('computer-paddle'));
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');

let lastTime;
function update(time) {
    if (lastTime != null) {
        // how much time passes between frames
        const delta = time - lastTime;
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);

        if (isLose()) {
            handleLose();
        };
    };

    lastTime = time;
    // creates infinite loop every time something is able to change
    // console.log(time);
    window.requestAnimationFrame(update)
};

function isLose() {
    const rect = ball.rect();
    return rect.right >= window.innerWidth || rect.left <= 0;
};

function handleLose() {
    // set score after loss
    const rect = ball.rect();
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1;
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1;
    }

    ball.reset();
    computerPaddle.reset();
};

document.addEventListener('mousemove', e => {
    // e.y is pixel value, convert to percentage (CSS)
    playerPaddle.position = (e.y / window.innerHeight) * 100;
});

// better choice than setInterval(not accurate)
window.requestAnimationFrame(update);