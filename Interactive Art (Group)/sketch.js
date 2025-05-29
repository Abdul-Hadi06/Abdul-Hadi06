let phrases = ["Welcome", " to", " Bath Spa", " University"];
let allLetters = [];
let currentGroup = 0;
let start = false;
let groupDelay = 7;
let frameCounter = 0;
let stars = [];
let shootingStars = [];
let ripples = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(50);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < 200; i++) stars.push(new Star());
  for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar());

  let fullText = phrases.join("");
  let spacing = 18; // <-- Spacing set to 18 as requested
  let centerX = width / 2;
  let totalWidth = fullText.length * spacing;
  let startX = centerX - totalWidth / 2;
  let x = startX;

  let charIndex = 0;
  for (let p = 0; p < phrases.length; p++) {
    let line = phrases[p];
    let lineLetters = [];
    for (let i = 0; i < line.length; i++) {
      let char = line[i];
      let targetX = x;
      x += spacing;
      let targetY = height / 2;
      let letter = new RollingLetter(char, random(width), random(height), targetX, targetY, charIndex);
      lineLetters.push(letter);
      charIndex++;
    }
    allLetters.push(lineLetters);
  }
}

function draw() {
  drawGradientBackground();
  drawWaves();

  for (let s of stars) s.update(), s.display();
  for (let s of shootingStars) s.update(), s.display();
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].display();
    if (ripples[i].finished) ripples.splice(i, 1);
  }

  if (start) {
    frameCounter++;
    for (let g = 0; g <= currentGroup; g++) {
      for (let l of allLetters[g]) {
        l.update();
        l.display();
      }
    }

    if (frameCounter > groupDelay) {
      let currentLetters = allLetters[currentGroup];
      let done = currentLetters.every(l => l.done);
      if (done && currentGroup < allLetters.length - 1) {
        currentGroup++;
        frameCounter = 0;
      }
    }
  } else {
    fill(255, 180);
    textSize(24);
    text("Click to Begin", width / 2, height / 2);
  }
}

function mousePressed() {
  start = true;
  ripples.push(new Ripple(mouseX, mouseY));
  allLetters.flat().forEach(letter => {
    if (dist(mouseX, mouseY, letter.pos.x, letter.pos.y) < 30) {
      letter.triggerColorEffect();
    }
  });
}

class RollingLetter {
  constructor(letter, x, y, tx, ty, index) {
    this.letter = letter;
    this.pos = createVector(x, y);
    this.target = createVector(tx, ty);
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(0.3, 0.5);
    this.done = false;
    this.phase = index * 0.5;
    this.colorBoost = 0;
    this.opacity = 0;
    this.bouncePhase = random(TWO_PI);
  }

  update() {
    if (!this.done) {
      this.angle += this.rotationSpeed;
      this.pos.lerp(this.target, 0.09);
      if (p5.Vector.dist(this.pos, this.target) < 2) {
        this.done = true;
        this.angle = 0;
      }
    }

    let d = dist(mouseX, mouseY, this.pos.x, this.pos.y);
    this.bounce = (d < 80) ? sin(frameCount * 0.6 + this.bouncePhase) * 10 : 0;
    this.opacity = min(this.opacity + 12, 255);

    if (this.colorBoost > 0) this.colorBoost -= 4;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y + this.bounce);
    rotate(this.angle);

    let boost = this.colorBoost;
    let r = 130 + 125 * sin(frameCount * 0.05 + this.phase) + boost;
    let g = 130 + 125 * sin(frameCount * 0.05 + this.phase + TWO_PI / 3) + boost;
    let b = 130 + 125 * sin(frameCount * 0.05 + this.phase + (2 * TWO_PI) / 3) + boost;

    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = color(r, g, b);
    fill(r, g, b, this.opacity);
    stroke(255);
    strokeWeight(1);
    text(this.letter, 0, 0);
    drawingContext.shadowBlur = 0;
    pop();
  }

  triggerColorEffect() {
    this.colorBoost = 160;
  }
}

class Star {
  constructor() { this.reset(); }
  reset() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 2.5);
    this.speed = random(0.3, 0.6);
    this.alpha = random(100, 180);
  }
  update() {
    this.y += this.speed;
    if (this.y > height) { this.reset(); this.y = 0; }
  }
  display() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}

class ShootingStar {
  constructor() { this.reset(); }
  reset() {
    this.x = random(-width, 0);
    this.y = random(0, height / 2);
    this.len = random(80, 160);
    this.speed = random(8, 14);
    this.alpha = 255;
  }
  update() {
    this.x += this.speed;
    this.y += this.speed * 0.4;
    this.alpha -= 4;
    if (this.alpha < 0) this.reset();
  }
  display() {
    stroke(255, this.alpha);
    strokeWeight(2);
    line(this.x, this.y, this.x - this.len, this.y - this.len * 0.4);
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.maxR = 100;
    this.finished = false;
  }

  update() {
    this.r += 2;
    if (this.r > this.maxR) this.finished = true;
  }

  display() {
    noFill();
    stroke(255, 150 - this.r);
    strokeWeight(2);
    ellipse(this.x, this.y, this.r * 2);
  }
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(8, 12, 28), color(25, 5, 50), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function drawWaves() {
  noFill();
  stroke(255, 40);
  strokeWeight(1.2);
  let waveHeight = 10;
  for (let j = 0; j < 3; j++) {
    beginShape();
    for (let x = 0; x < width; x += 10) {
      let y = height - j * 20 - 20 + sin(x * 0.01 + frameCount * 0.05 + j) * waveHeight;
      vertex(x, y);
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
