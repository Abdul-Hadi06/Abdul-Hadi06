// Sketch Name: Pixel Data
let img;
let manipulatedImg;

function preload() {
  img = loadImage('sun.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  manipulatedImg = img.get();
  manipulatedImg.loadPixels();

  for (let i = 0; i < manipulatedImg.pixels.length; i += 4) {
    let r = manipulatedImg.pixels[i];
    let g = manipulatedImg.pixels[i + 1];
    let b = manipulatedImg.pixels[i + 2];

    // Create a trippy effect by swapping and offsetting channels
    manipulatedImg.pixels[i]     = b;
    manipulatedImg.pixels[i + 1] = r * 0.8;
    manipulatedImg.pixels[i + 2] = g * 1.2;
  }

  manipulatedImg.updatePixels();
  noLoop();
}

function draw() {
  background(0);
  image(manipulatedImg, 0, 0, width, height);
}
