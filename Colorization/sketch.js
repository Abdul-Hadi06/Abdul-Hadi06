function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  backgroundGradient(); // Add subtle background gradient

  translate(width / 2, height / 2); // Center the design
  strokeWeight(2);

  // Glow around flower
  noStroke();
  fill(255, 100, 150, 30);
  for (let r = 100; r < 180; r += 10) {
    ellipse(0, 0, r, r);
  }

  // Draw petals with gradient-style effect
  for (let i = 0; i < 8; i++) {
    push();
    rotate(i * 45);
    drawAdvancedPetal(i);
    pop();
  }

  // Center circle with texture rings
  for (let i = 0; i < 5; i++) {
    fill(255, 204, 0, 180 - i * 30);
    stroke(255, 150, 0, 200 - i * 20);
    ellipse(0, 0, 60 - i * 6, 60 - i * 6);
  }

  // Decorative radial dots
  stroke(255, 180, 220);
  fill(255, 220, 240);
  for (let i = 0; i < 16; i++) {
    let angle = i * 22.5;
    let x = cos(angle) * 140;
    let y = sin(angle) * 140;
    ellipse(x, y, 6, 6);
  }
}

// Petal with layered gradient-style fill
function drawAdvancedPetal(index) {
  for (let d = 0; d < 3; d++) {
    fill(255, 100 + d * 30, 150 + d * 20, 180 - d * 50);
    stroke(255, 50 + d * 10, 100 + d * 20, 200 - d * 40);
    beginShape();
    vertex(0, -20);
    bezierVertex(
      30 - d * 5,
      -60 - d * 10,
      30 - d * 5,
      -100 - d * 10,
      0,
      -120 - d * 10
    );
    bezierVertex(-30 + d * 5, -100 - d * 10, -30 + d * 5, -60 - d * 10, 0, -20);
    endShape(CLOSE);
  }
}

// Gradient background
function backgroundGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 240, 250), color(220, 240, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
}
