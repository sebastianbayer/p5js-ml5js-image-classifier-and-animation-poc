let classifier;
let video;
let label = "waiting...";
let animation;

function preload() {
  // load image classifier
  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/tOy9_dQ3Y/"
  );

  // load animation
  animation = createVideo(["media/test-video.mp4"]);
  animation.loop(); // Animation im Loop abspielen
  animation.hide(); // Video-Element selbst verstecken
}

function gotResults(results) {
  // console.log(results);
  label = results[0].label;
}

function setup() {
  createCanvas(640, 480);

  // define video stream from webcam
  video = createCapture(VIDEO, { flipped: true });
  video.size(160, 120);
  video.hide();

  classifier.classifyStart(video, gotResults);
}

function draw() {
  // set background to light gray
  background(220);

  // render animation
  image(animation, 0, 0, width, height);
  
  // render video
  image(video, 0, 0);

  // text background
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height - 20, width, 40);

  // text styling
  textSize(16);
  fill(255);
  textAlign(CENTER, CENTER);
  noStroke();

  // render label
  text(label, width / 2, height - 20);
}

// function to play the animation
function playAnimation() {}
