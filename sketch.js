let classifier;
let video;
let label = "waiting...";
let video1;


function preload() {
  // load image classifier
  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/tOy9_dQ3Y/"
  );
}

function gotResults(results) {
  // console.log(results);
  label = results[0].label;
}

function setup() {
  var canvas = createCanvas(640, 480);
  canvas.parent('p5js-wrapper');

  // define video stream from webcam
  video = createCapture(VIDEO, { flipped: true });
  video.size(160, 120);
  video.hide();

  classifier.classifyStart(video, gotResults);
  video1 = document.getElementById("video-1");
  video2 = document.getElementById("video-2");
  video3 = document.getElementById("video-3");
}

function draw() {
  // render video
  image(video, 0, 0);

  // if bottle is detected
  if (label === "bottle") {
    console.log("Bottle detected -> show video-1");
    video1.classList.add("visible");
    video1.play()
  } else {
    console.log("Bottle not detected -> hide video-1");
    video1.classList.remove("visible");
    setTimeout(() => {
      video1.currentTime = 0; // reset video to start frame after a delay of 0.8s (50ms after css transition)
    }, 800);
  }

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