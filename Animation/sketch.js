let angleOffset = 0; 
 
function setup() { 
  createCanvas(400, 400); 
  angleMode(DEGREES); 
  strokeWeight(2);
} 
 
function draw() { 
  drawBackgroundGradient();
  
  translate(width / 2, height / 2); 
 
  // Pulsing scale with a bit of easing
  let pulse = map(sin(frameCount * 2), -1, 1, 0.85, 1.15);
 
  // Draw animated petals with rotation, scaling, and color shifts
  for (let i = 0; i < 8; i++) { 
    push(); 
    rotate(i * 45 + angleOffset); 
    scale(pulse * (0.8 + 0.2 * sin(frameCount + i * 20))); 
    
    // Dynamic petal color cycling
    let r = map(sin(frameCount + i * 30), -1, 1, 100, 200);
    let g = map(cos(frameCount * 1.5 + i * 25), -1, 1, 100, 180);
    let b = map(sin(frameCount * 0.5 + i * 40), -1, 1, 150, 255);
    fill(r, g, b, 180);
    stroke(r * 0.7, g * 0.7, b * 0.7);
    
    drawPetal();
    pop(); 
  } 
 
  // Rotating center with glow effect
  push(); 
  rotate(-angleOffset * 1.5);
  
  // Glow layers
  noFill();
  for (let r = 40; r <= 60; r += 7) {
    stroke(255, 204, 0, map(r, 40, 60, 100, 20));
    strokeWeight(map(r, 40, 60, 8, 2));
    ellipse(0, 0, r * 2);
  }
  
  // Core circle
  fill(255, 204, 0);
  stroke(255, 150, 0);
  strokeWeight(3);
  ellipse(0, 0, 50, 50);
  
  pop(); 
 
  angleOffset += 0.8; 
} 
 
function drawPetal() { 
  beginShape(); 
  vertex(0, -20); 
  bezierVertex(30, -60, 30, -100, 0, -120); 
  bezierVertex(-30, -100, -30, -60, 0, -20); 
  endShape(CLOSE); 
} 
 
function drawBackgroundGradient() {
  // Vertical gradient from dark blue to soft purple
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(20, 30, 70), color(100, 50, 120), inter);
    stroke(c);
    line(0, y, width, y);
  }
}