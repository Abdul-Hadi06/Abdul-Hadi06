// Sketch Name: Pointillism Effect
let img;

function preload() {
  img = loadImage('sunrise.jpg');
}

function setup() {
  createCanvas(600, 450);
  image(img, 0, 0, width, height); // Optional base image
  noStroke();
  frameRate(120);
}

function draw() {
  for (let i = 0; i < 300; i++) {
    let x = floor(random(img.width));
    let y = floor(random(img.height));
    let c = img.get(x, y);

    let dotSize = random(2, 5); // Small dots for fine pointillism
    fill(c);
    ellipse(x, y, dotSize, dotSize);
  }
}
