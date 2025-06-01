function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 150; i++) {
    rainDrops.push(new RainDrop());
  }
}

let carX = 0;
let rainDrops = [];

function draw() {
  backgroundSky();
  drawMoon();
  drawClouds();
  drawRain();
  drawStreetLights();
  drawRoad();
  drawCar(carX, height - 60);

  // Animate car
  carX += 2;
  if (carX > width + 100) carX = -100;
}

// Midnight sky
function backgroundSky() {
  let c1 = color(10, 10, 30);
  let c2 = color(5, 5, 15);
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let lerpCol = lerpColor(c1, c2, inter);
    stroke(lerpCol);
    line(0, y, width, y);
  }
}

// Moon
function drawMoon() {
  noStroke();
  fill(240, 240, 255, 220);
  ellipse(320, 80, 60, 60);
  fill(10, 10, 30);
  ellipse(330, 75, 50, 50);
}

// Clouds
function drawClouds() {
  fill(50, 50, 60, 180);
  noStroke();
  for (let x = 0; x < width; x += 100) {
    ellipse(x + 40, 100, 80, 40);
    ellipse(x + 70, 90, 60, 30);
    ellipse(x + 20, 90, 50, 30);
  }
}

// Rain class
class RainDrop {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.len = random(10, 20);
    this.speed = random(4, 10);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, 0);
      this.x = random(width);
    }
  }

  show() {
    stroke(173, 216, 230, 200);
    line(this.x, this.y, this.x, this.y + this.len);
  }
}

// Rain logic
function drawRain() {
  for (let drop of rainDrops) {
    drop.fall();
    drop.show();
  }
}

// Street Lights
function drawStreetLights() {
  for (let i = 50; i < width; i += 100) {
    stroke(100);
    strokeWeight(4);
    line(i, height - 50, i, height - 150);
    noStroke();
    fill(255, 255, 150, 200);
    ellipse(i, height - 150, 20, 20);
    fill(255, 255, 150, 40);
    triangle(i - 15, height - 150, i + 15, height - 150, i, height - 100);
  }
}

// Road
function drawRoad() {
  fill(30);
  rect(0, height - 50, width, 50);
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < width; i += 30) {
    line(i, height - 25, i + 15, height - 25);
  }
}

// Car
function drawCar(x, y) {
  push();
  translate(x, y);

  // Wheels with perspective
  fill(20);
  ellipse(15, 10, 16, 16);
  ellipse(55, 10, 16, 16);

  // Tire shine
  fill(80);
  ellipse(15, 10, 6, 6);
  ellipse(55, 10, 6, 6);

  // Lower body
  fill(220, 0, 0);
  rect(0, -10, 70, 20, 5);

  // Upper cabin
  fill(180, 0, 0);
  beginShape();
  vertex(15, -10);
  vertex(25, -25);
  vertex(45, -25);
  vertex(55, -10);
  endShape(CLOSE);

  // Windows
  fill(30, 30, 30, 200);
  rect(27, -22, 8, 10, 2);
  rect(38, -22, 8, 10, 2);

  // Headlights
  fill(255, 255, 160, 230);
  ellipse(70, 0, 6, 4);
  fill(255, 255, 160, 50);
  triangle(70, 0, 85, -5, 85, 5); // light beam

  // Spoiler
  fill(120);
  rect(-5, -12, 5, 3);
  rect(-7, -15, 10, 3);

  pop();
}