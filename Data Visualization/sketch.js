let data = []; // Current data values (animated)
let targetData = []; // Target values to animate toward
let barWidth;
let maxData;
let easing = 0.1;
let hoveredIndex = -1;

function setup() {
  createCanvas(700, 500);

  // Generate initial random data
  for (let i = 0; i < 15; i++) {
    let val = random(10, height - 50);
    data.push(val);
    targetData.push(val);
  }

  maxData = height - 60; // Maximum bar height to fit nicely

  barWidth = width / data.length;

  textFont('Helvetica');
  textSize(14);

  // No loop: we'll call redraw() on animation
  frameRate(60);
}

function draw() {
  drawBackgroundGradient();

  maxData = height - 60;
  barWidth = width / data.length;

  // Animate data values easing toward targetData
  for (let i = 0; i < data.length; i++) {
    let diff = targetData[i] - data[i];
    data[i] += diff * easing;
  }

  // Draw bars with gradient colors cycling
  for (let i = 0; i < data.length; i++) {
    let x = i * barWidth;
    let barHeight = map(data[i], 0, maxData, 0, maxData);

    // Gradient color cycling over time
    let c1 = color((frameCount * 2 + i * 15) % 360, 80, 90);
    let c2 = color(((frameCount * 2 + i * 15) + 60) % 360, 80, 90);
    let c = lerpColor(c1, c2, 0.5);

    if (i === hoveredIndex) {
      fill(60, 100, 100); // Highlight color (bright yellow)
      stroke(0);
      strokeWeight(2);
      rect(x, height - barHeight - 30, barWidth, barHeight, 5);
      noStroke();

      // Tooltip above bar
      fill(255);
      textAlign(CENTER, BOTTOM);
      text(round(data[i]), x + barWidth / 2, height - barHeight - 35);
    } else {
      noStroke();
      fill(c);
      rect(x, height - barHeight - 30, barWidth, barHeight, 5);
    }

    // Draw x-axis labels
    fill(255);
    noStroke();
    textAlign(CENTER, TOP);
    text("Item " + (i + 1), x + barWidth / 2, height - 25);
  }

  // Draw title and axis label
  fill(255);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text("Interactive Data Visualization: Sample Data", width / 2, 10);

  textSize(14);
  textAlign(LEFT, CENTER);
  text("Value", 5, height / 2);
  textAlign(CENTER, BOTTOM);
  text("Items", width / 2, height - 5);
}

function drawBackgroundGradient() {
  // Vertical blue to dark purple gradient background
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(210, 80, 30), color(270, 80, 20), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

// Update data with new random values on mouse press
function mousePressed() {
  for (let i = 0; i < targetData.length; i++) {
    targetData[i] = random(10, height - 50);
  }
}

// Detect if mouse is over a bar to highlight and show tooltip
function mouseMoved() {
  hoveredIndex = -1;
  for (let i = 0; i < data.length; i++) {
    let x = i * barWidth;
    if (mouseX > x && mouseX < x + barWidth && mouseY > height - maxData - 30) {
      hoveredIndex = i;
      break;
    }
  }
}