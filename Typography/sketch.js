let quote = ["Be", "yourself;", "everyone", "else", "is", "already", "taken."];
let positions = [];
let velocities = [];
let angles = [];
let fonts = [];
let stars = [];

function preload() {
  fonts.push(loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf'));
  fonts.push(loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceSansPro-Regular.otf'));
  fonts.push(loadFont('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf'));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < quote.length; i++) {
    positions.push(createVector(random(200, 800), random(200, 800)));
    velocities.push(createVector(random(-1.5, 1.5), random(-1.5, 1.5)));
    angles.push(random(TWO_PI));
  }

  // Generate stars for background
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      alpha: random(100, 255)
    });
  }
}

function draw() {
  drawGradientBackground();
  drawStars();
  drawOrbs();

  // Typography quote animation
  for (let i = 0; i < quote.length; i++) {
    push();
    translate(positions[i].x, positions[i].y);
    rotate(sin(frameCount * 0.01 + i) * 0.5);
    
    textFont(fonts[i % fonts.length]);
    textSize(48);
    fill(lerpColor(color('#FF6B6B'), color('#4D96FF'), sin(frameCount * 0.02 + i)));
    text(quote[i], 0, 0);
    pop();

    // Bounce logic
    positions[i].add(velocities[i]);
    if (positions[i].x < 0 || positions[i].x > width) velocities[i].x *= -1;
    if (positions[i].y < 0 || positions[i].y > height) velocities[i].y *= -1;
  }
}

// Mouse click to change words and bounce
function mousePressed() {
  for (let i = 0; i < quote.length; i++) {
    let d = dist(mouseX, mouseY, positions[i].x, positions[i].y);
    if (d < 100) {
      velocities[i] = p5.Vector.random2D().mult(random(2, 5));
      quote[i] = random(["Shine", "Dream", "Fly", "Bold", "Live", "Rise", "Laugh"]);
    }
  }
}

// Gradient background
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(15, 10, 50), color(5, 5, 25), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// Twinkling stars
function drawStars() {
  for (let s of stars) {
    fill(255, s.alpha);
    noStroke();
    ellipse(s.x, s.y, s.size);
    s.alpha += random(-5, 5);
    s.alpha = constrain(s.alpha, 100, 255);
  }
}

// Moving orbs (atmospheric touch)
function drawOrbs() {
  for (let i = 0; i < 10; i++) {
    let x = noise(frameCount * 0.001 + i) * width;
    let y = noise(frameCount * 0.001 + i + 100) * height;
    let r = map(sin(frameCount * 0.01 + i), -1, 1, 30, 60);
    fill(255, 255, 255, 10);
    noStroke();
    ellipse(x, y, r);
  }
}