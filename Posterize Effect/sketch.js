// Sketch Name: Posterize Effect
let img;
let posterImg;

function preload() {
  img = loadImage('set.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  posterImg = img.get();
  posterizeImage(posterImg, 5);
  image(posterImg, 0, 0, width, height);
  noLoop();
}

function posterizeImage(img, levels) {
  img.loadPixels();

  for (let i = 0; i < img.pixels.length; i += 4) {
    for (let j = 0; j < 3; j++) {
      let val = img.pixels[i + j];
      val = floor(val / 255 * levels) * (255 / levels);
      img.pixels[i + j] = val;
    }
  }

  img.updatePixels();
}
