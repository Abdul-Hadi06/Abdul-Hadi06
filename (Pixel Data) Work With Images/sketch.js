// Sketch Name: Pixel Data
let img;
let manipulatedImg;

function preload() {
  img = loadImage('sun.jpg'); // Use your sunset image
}

function setup() {
  createCanvas(600, 450);
  manipulatedImg = img.get(); // Copy the image so original remains safe
  manipulatedImg.loadPixels();

  for (let i = 0; i < manipulatedImg.pixels.length; i += 4) {
    let r = manipulatedImg.pixels[i];
    let g = manipulatedImg.pixels[i + 1];
    let b = manipulatedImg.pixels[i + 2];

    // Create a trippy effect by swapping and offsetting channels
    manipulatedImg.pixels[i]     = b;           // Red becomes Blue
    manipulatedImg.pixels[i + 1] = r * 0.8;     // Green becomes soft Red
    manipulatedImg.pixels[i + 2] = g * 1.2;     // Blue becomes brighter Green
  }

  manipulatedImg.updatePixels();
  noLoop(); // Static image
}

function draw() {
  background(0);
  image(manipulatedImg, 0, 0, width, height);
}
