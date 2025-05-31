let stars = [];
let spaceships = [];
let alienY = 0;
let alienDirection = 1;

function setup() {
  createCanvas(600, 450);
  
  // Generate stars
  for (let i = 0; i < 100; i++) {
    stars.push({ x: random(width), y: random(height), size: random(1, 3) });
  }

  // Generate spaceships
  for (let i = 0; i < 2; i++) {
    spaceships.push({
      x: random(width),
      y: random(height / 2),
      speed: random(1, 2),
    });
  }
}

function draw() {
  backgroundSpace();
  moveSpaceships();
  drawSpaceships();
  drawAlien(width / 2, height / 2 - 50 + alienY);
  moveAlien();
}

// Moving Starfield
function backgroundSpace() {
  background(10, 10, 30);
  noStroke();
  for (let s of stars) {
    fill(255);
    ellipse(s.x, s.y, s.size);
    s.y += 1;
    if (s.y > height) {
      s.y = 0;
      s.x = random(width);
    }
  }
}

// Spaceship animation
function moveSpaceships() {
  for (let ship of spaceships) {
    ship.x += ship.speed;
    if (ship.x > width + 20) {
      ship.x = -40;
      ship.y = random(height / 2);
    }
  }
}

function drawSpaceships() {
  for (let ship of spaceships) {
    drawSpaceship(ship.x, ship.y);
  }
}

function drawSpaceship(x, y) {
  fill(180);
  ellipse(x, y, 40, 15);
  fill(100);
  ellipse(x, y - 5, 20, 8);
  fill(255, 255, 0, 100);
  triangle(x - 10, y + 7, x + 10, y + 7, x, y + 20); // light beam
}

// Alien
function drawAlien(x, y) {
  push();
  translate(x, y);
  
  // Glow effect
  for (let i = 0; i < 5; i++) {
    fill(0, 255, 0, 40 - i * 8);
    ellipse(0, 0, 60 + i * 8, 80 + i * 8);
  }

  // Head
  fill(60, 255, 60);
  ellipse(0, 0, 60, 80);

  // Eyes
  fill(0);
  ellipse(-15, -10, 10, 20);
  ellipse(15, -10, 10, 20);
  fill(255);
  ellipse(-15, -15, 3, 3);
  ellipse(15, -15, 3, 3);

  // Mouth
  fill(0);
  arc(0, 10, 20, 10, 0, PI);

  // Antennas
  stroke(0, 255, 0);
  strokeWeight(2);
  line(-15, -40, -20, -60);
  line(15, -40, 20, -60);
  fill(255, 0, 0);
  ellipse(-20, -60, 5);
  ellipse(20, -60, 5);

  noStroke();

  // Body
  fill(60, 255, 60);
  rect(-30, 40, 60, 80, 20);

  // Chest light
  fill(255, 0, 100);
  ellipse(0, 70, 15);

  // Arms
  rect(-50, 50, 20, 60, 20);
  rect(30, 50, 20, 60, 20);

  // Legs
  rect(-20, 120, 15, 40, 10);
  rect(5, 120, 15, 40, 10);

  pop();
}

// Alien bobbing
function moveAlien() {
  alienY += alienDirection * 1.5;
  if (alienY > 20 || alienY < -20) {
    alienDirection *= -1;
  }
}