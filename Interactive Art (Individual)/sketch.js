let buildingColors = ['#FFB300', '#E91E63', '#2196F3', '#4CAF50', '#9C27B0'];
let currentColorIndex = 0;
let ripples = [];
let moonX, moonY;
let cloudX1, cloudX2;
let stars = [];

function setup() {
  createCanvas(800, 600);
  moonX = width - 100;
  moonY = 120;
  cloudX1 = -200;
  cloudX2 = width;

  // Create star positions
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: random(width),
      y: random(height / 2),
      size: random(1, 3),
      twinkle: random(1000)
    });
  }
}

function draw() {
  drawNightSky();
  drawMoon();
  drawCloud(cloudX1, 120);
  drawCloud(cloudX2, 170);

  // Move clouds
  cloudX1 += 0.3;
  cloudX2 -= 0.2;
  if (cloudX1 > width + 200) cloudX1 = -200;
  if (cloudX2 < -200) cloudX2 = width + 200;

  drawUniversity(); // New function
  drawRipples();
  drawText();
}

// ----- Sky and Background -----
function drawNightSky() {
  for (let y = 0; y < height / 2; y++) {
    let inter = map(y, 0, height / 2, 0, 1);
    let c = lerpColor(color(10, 10, 35), color(0, 0, 10), inter);
    stroke(c);
    line(0, y, width, y);
  }

  fill(15, 35, 10);
  noStroke();
  rect(0, height / 2, width, height / 2);

  noStroke();
  for (let star of stars) {
    let twinkleFactor = map(sin((frameCount + star.twinkle) * 0.05), -1, 1, 150, 255);
    fill(255, 255, 255, twinkleFactor);
    ellipse(star.x, star.y, star.size);
  }
}

// ----- Moon -----
function drawMoon() {
  noStroke();
  for (let r = 60; r > 30; r -= 5) {
    fill(255, 255, 200, map(r, 60, 30, 20, 80));
    ellipse(moonX, moonY, r * 2);
  }
  fill(255, 255, 220);
  ellipse(moonX, moonY, 60);
  fill(230, 230, 200, 180);
  ellipse(moonX - 15, moonY - 10, 10, 7);
  ellipse(moonX + 10, moonY + 5, 12, 8);
  ellipse(moonX + 5, moonY - 15, 7, 7);
}

// ----- Cloud -----
function drawCloud(x, y) {
  fill(255, 255, 255, 70);
  noStroke();
  ellipse(x, y, 120, 80);
  ellipse(x + 60, y - 30, 100, 70);
  ellipse(x + 120, y, 120, 80);
}

// ----- University Building -----
function drawUniversity() {
  // Base
  let baseY = height / 2;
  fill(buildingColors[currentColorIndex]);
  noStroke();
  rect(200, baseY - 120, 400, 120, 5);

  // Dome
  fill(200, 200, 255);
  arc(400, baseY - 120, 100, 100, PI, TWO_PI);

  // Pillars
  fill(255, 255, 255, 150);
  for (let x = 240; x <= 560; x += 40) {
    rect(x, baseY - 100, 20, 100, 5);
  }

  // Flag poles
  stroke(255);
  line(390, baseY - 170, 390, baseY - 120);
  line(410, baseY - 170, 410, baseY - 120);

  // Animated flags
  noStroke();
  fill('#FF5252');
  let flagW = 20 + sin(frameCount * 0.1) * 5;
  triangle(390, baseY - 170, 390 + flagW, baseY - 165, 390, baseY - 160);
  fill('#2196F3');
  flagW = 20 + cos(frameCount * 0.1) * 5;
  triangle(410, baseY - 170, 410 + flagW, baseY - 165, 410, baseY - 160);

  // Windows
  for (let x = 220; x < 580; x += 50) {
    for (let y = baseY - 100; y < baseY - 20; y += 30) {
      let flicker = random(150, 255);
      fill(255, 255, 150, flicker);
      rect(x, y, 20, 20, 3);
    }
  }
}

// ----- Ripples -----
function drawRipples() {
  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];
    noFill();
    stroke(150, 200, 255, ripple.alpha);
    strokeWeight(2);
    ellipse(ripple.x, ripple.y, ripple.diameter);
    ripple.diameter += 3;
    ripple.alpha -= 4;
    if (ripple.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }
}

// ----- Text Placeholder -----
function drawText() {
  fill(200, 200, 255, 180);
  textAlign(CENTER);
  textSize(16);
  text("University at Night - Click to change color", width / 2, height - 30);
}

// ----- Interactions -----
function mousePressed() {
  currentColorIndex = (currentColorIndex + 1) % buildingColors.length;
}

function mouseMoved() {
  ripples.push({
    x: mouseX,
    y: mouseY,
    diameter: 10,
    alpha: 255
  });
}

function keyPressed() {
  // Reserved for future enhancements
}