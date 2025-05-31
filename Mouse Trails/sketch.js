let trails = [];
const maxTrailLength = 80;
const layers = 3;

let stars = [];
const starCount = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  trails = Array.from({ length: layers }, () => []);

  // Initialize stars for background
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 2),
      twinkleSpeed: random(0.01, 0.05),
      baseBrightness: random(40, 90),
      phase: random(TWO_PI)
    });
  }
  frameRate(60);
}

function draw() {
  drawBackground();

  // Add current mouse positions to each trail layer with slight delay offset
  for (let l = 0; l < layers; l++) {
    let lastPos = trails[l].length > 0 ? trails[l][trails[l].length - 1] : { x: mouseX, y: mouseY };
    let targetX = lerp(lastPos.x, mouseX, 0.3 - l * 0.1);
    let targetY = lerp(lastPos.y, mouseY, 0.3 - l * 0.1);
    trails[l].push({ x: targetX, y: targetY, age: 0 });

    if (trails[l].length > maxTrailLength) trails[l].shift();
  }

  // Draw trails
  for (let l = layers - 1; l >= 0; l--) {
    drawTrail(trails[l], l);
  }

  drawSparkles();
}

// Gradient dark sky background with subtle animated nebula blobs & twinkling stars
function drawBackground() {
  // Gradient background (top dark blue to near black bottom)
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(220, 80, 15), color(260, 80, 3), inter);
    stroke(c);
    line(0, y, width, y);
  }

  // Draw twinkling stars
  noStroke();
  for (let star of stars) {
    let brightness = star.baseBrightness + 20 * sin(frameCount * star.twinkleSpeed + star.phase);
    fill(60, 0, brightness, 80);
    ellipse(star.x, star.y, star.size);
  }

  // Draw faint moving nebula blobs using multiple overlapping ellipses
  let nebulaColors = [
    color(290, 80, 50, 12),
    color(260, 70, 70, 15),
    color(310, 90, 40, 10),
  ];

  push();
  blendMode(ADD);
  translate(width * 0.5, height * 0.6);
  for (let i = 0; i < nebulaColors.length; i++) {
    let angle = frameCount * 0.005 + i * TWO_PI / nebulaColors.length;
    let x = cos(angle) * 200;
    let y = sin(angle) * 100;
    fill(nebulaColors[i]);
    ellipse(x, y, 600, 400);
  }
  pop();

  blendMode(BLEND);
}

function drawTrail(trail, layer) {
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    pos.age++;
    let baseSize = map(i, 0, trail.length, 30, 6) * (1 + 0.3 * sin(frameCount * 0.1 + i));
    let size = baseSize * (1 - layer * 0.3);

    let hue = (map(i, 0, trail.length, 0, 360) + frameCount * 2 + layer * 40) % 360;
    let saturation = 90 - layer * 20;
    let brightness = 100 - i * (100 / trail.length);

    let alpha = map(i, 0, trail.length, 70, 0) * (1 - layer * 0.4);

    push();
    translate(pos.x, pos.y);
    rotate(sin(pos.age * 0.05 + i) * 0.5);
    fill(hue, saturation, brightness, alpha);
    ellipse(0, 0, size, size * 0.7);
    pop();
  }
}

function drawSparkles() {
  for (let i = 0; i < 10; i++) {
    if (random() < 0.5) {
      let angle = random(TWO_PI);
      let radius = random(20, 80);
      let x = mouseX + cos(angle) * radius;
      let y = mouseY + sin(angle) * radius;
      let size = random(5, 12);
      let hue = (frameCount * 4 + i * 36) % 360;
      let alpha = map(sin(frameCount * 0.2 + i), -1, 1, 20, 80);

      fill(hue, 90, 100, alpha);
      ellipse(x, y, size, size);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}