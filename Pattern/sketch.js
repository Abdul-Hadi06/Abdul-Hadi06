let cols, rows;
let cellWidth, cellHeight;

function setup() {
  createCanvas(600, 450);
  colorMode(HSB);
  cols = 20;
  rows = 20;
  cellWidth = width / cols;
  cellHeight = height / rows;
  noStroke();
}

function draw() {
  background(0, 0, 15); // dark midnight gray

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = j * cellWidth + cellWidth / 2;
      let y = i * cellHeight + cellHeight / 2;

      // Mouse interactivity: create dish-like wave distortion
      let dx = x - mouseX;
      let dy = y - mouseY;
      let distance = sqrt(dx * dx + dy * dy);
      let wave = sin(distance * 0.05 - frameCount * 0.1) * 0.5 + 0.5;

      let radius = wave * cellWidth * 0.8;

      // Dynamic rainbow coloring based on wave and position
      let hue = map(wave + j * 0.1 + i * 0.1, 0, 2, 150, 360) % 360;
      fill(hue, 80, 100);
      ellipse(x, y, radius, radius);
    }
  }
}