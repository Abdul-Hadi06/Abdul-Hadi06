let mic, amplitude, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  mic = new p5.AudioIn();
  mic.start();

  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);

  fft = new p5.FFT();
  fft.setInput(mic);

  noFill();
  strokeWeight(2);
}

function draw() {
  setWarmGradientBackground();

  let level = amplitude.getLevel();

  drawWarmPulsingCircles(level);
  drawWarmWaveformShape();
  drawWarmFrequencyBars();
}

function setWarmGradientBackground() {
  // Vertical gradient from deep red to orange-yellow
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(15, 90, 80), color(40, 90, 90), inter); // Red to bright orange
    stroke(c);
    line(0, y, width, y);
  }
}

function drawWarmPulsingCircles(level) {
  let maxRadius = map(level, 0, 0.3, 50, 400, true);
  let alpha = map(level, 0, 0.3, 10, 70, true);

  push();
  translate(width / 2, height / 2);

  for (let i = 5; i > 0; i--) {
    stroke((frameCount * 4 + i * 35) % 50 + 10, 90, 90, alpha / i); // hues between 10-60 (warm)
    ellipse(0, 0, maxRadius * i * 0.6, maxRadius * i * 0.6);
  }

  pop();
}

function drawWarmWaveformShape() {
  let waveform = fft.waveform();
  strokeWeight(4);
  beginShape();
  noFill();
  stroke(30, 90, 95); // bright orange-yellow
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, height * 0.6, height * 0.4);
    vertex(x, y);
  }
  endShape();
}

function drawWarmFrequencyBars() {
  let spectrum = fft.analyze();
  let binWidth = width / spectrum.length;

  noStroke();
  for (let i = 0; i < spectrum.length; i += 10) {
    let freqValue = spectrum[i];
    let h = map(freqValue, 0, 255, 0, height / 3);
    fill((i * 3 + frameCount) % 50 + 10, 90, 95); // warm hues cycling 10-60
    rect(i * binWidth, height, binWidth * 9, -h);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}