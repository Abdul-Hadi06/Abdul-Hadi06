let data = [4.78, 1.51, 0.74, 0.6, 0.44, 0.43]; // 2025 Population in billions
let labels = ["Asia", "Africa", "Europe", "North America", "South America", "Oceania"];
let animatedData = [];
let targetData = [];
let barWidth;
let easing = 0.1;
let hoveredIndex = -1;

function setup() {
  createCanvas(800, 500);
  colorMode(HSB);
  textFont("Helvetica");

  // Initialize animated data
  for (let i = 0; i < data.length; i++) {
    let initial = random(0, data[i]);
    animatedData[i] = initial;
    targetData[i] = data[i];
  }

  barWidth = width / data.length;
}

function draw() {
  drawBackgroundGradient();

  hoveredIndex = -1;

  // Check if hovering over a bar
  for (let i = 0; i < data.length; i++) {
    let x = i * barWidth + 20;
    let barHeight = map(animatedData[i], 0, max(data), 0, height - 120);
    if (
      mouseX > x &&
      mouseX < x + (barWidth - 40) &&
      mouseY > height - barHeight - 60 &&
      mouseY < height - 60
    ) {
      hoveredIndex = i;
      break;
    }
  }

  // Animate and draw bars
  for (let i = 0; i < data.length; i++) {
    let diff = targetData[i] - animatedData[i];
    animatedData[i] += diff * easing;

    let x = i * barWidth + 20;
    let barHeight = map(animatedData[i], 0, max(data), 0, height - 120);
    let isHovered = i === hoveredIndex;

    // Colors
    let c1 = color((frameCount * 2 + i * 25) % 360, 80, 90);
    let c2 = color(((frameCount * 2 + i * 25) + 60) % 360, 80, 90);
    let fillColor = lerpColor(c1, c2, 0.5);

    if (isHovered) {
      // Glow effect
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = color(60, 100, 100);
      fillColor.setAlpha(255);
    } else {
      drawingContext.shadowBlur = 0;
    }

    fill(fillColor);
    noStroke();

    // Slight lift if hovered
    let lift = isHovered ? 8 : 0;
    rect(x, height - barHeight - 60 - lift, barWidth - 40, barHeight, 5);

    // Always show value
    drawingContext.shadowBlur = 0;
    fill(255);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text(nf(animatedData[i], 1, 2) + " B", x + (barWidth - 40) / 2, height - barHeight - 65 - lift);

    // Label
    textAlign(CENTER, TOP);
    text(labels[i], x + (barWidth - 40) / 2, height - 50);
  }

  // Title & source
  fill(255);
  textSize(22);
  textAlign(CENTER, TOP);
  text("World Population by Continent (2025)", width / 2, 10);

  textSize(14);
  text("Source: UN World Population Prospects 2025 (estimate)", width / 2, height - 20);
}

function drawBackgroundGradient() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(210, 80, 30), color(270, 80, 20), inter);
    stroke(c);
    line(0, y, width, y);
  }
}
