const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let frames = 0;
const gravity = 0.25;
const jump = 4.6;
let score = 0;
let best = 0;
let pipes = [];
let bird = {
  x: 50,
  y: 150,
  radius: 12,
  velocity: 0,
  draw() {
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fill();
  },
  update() {
    this.velocity += gravity;
    this.y += this.velocity;
    if (this.y + this.radius >= canvas.height) resetGame();
  },
  flap() {
    this.velocity = -jump;
  }
};

function resetGame() {
  bird.y = 150;
  bird.velocity = 0;
  pipes = [];
  score = 0;
}

function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach(p => {
    ctx.fillRect(p.x, 0, 50, p.top);
    ctx.fillRect(p.x, canvas.height - p.bottom, 50, p.bottom);
  });
}

function updatePipes() {
  if (frames % 100 === 0) {
    let top = Math.random() * (canvas.height / 2);
    let bottom = canvas.height - top - 120;
    pipes.push({ x: canvas.width, top, bottom });
  }
  pipes.forEach((p, i) => {
    p.x -= 2;
    if (p.x + 50 < 0) pipes.splice(i, 1);

    // collision
    if (bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + 50 &&
        (bird.y - bird.radius < p.top || bird.y + bird.radius > canvas.height - p.bottom)) {
      resetGame();
    }

    // scoring
    if (p.x + 50 === bird.x) score++;
  });
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.update();
  bird.draw();
  updatePipes();
  drawPipes();
  drawScore();
  frames++;
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", () => bird.flap());
document.addEventListener("click", () => bird.flap());

loop();
