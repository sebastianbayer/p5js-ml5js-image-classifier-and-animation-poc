let classifier;
let video;
let label = "en moment bitte...";
let idleVideo;
let blueVideo;
let orangeVideo;
let pinkVideo;
let videoPlaying = false;
let lastVideoEnded = 0;  // Add timestamp tracking
let lastLabel = "";
let labelStartTime = 0;
const IDLE_THRESHOLD = 5000;  // 5 seconds in milliseconds
const CONFIRMATION_THRESHOLD = 1000;  // 1 seconds in milliseconds


function preload() {
  // load image classifier
  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/0G91RgG8X/"
    // "https://teachablemachine.withgoogle.com/models/fhh7wkV6R/"
  );
}

function gotResults(results) {
  label = results[0].label;
}

function setupVideo(video) {
  video.onended = () => {
    console.log(`Video ended`);
    video.classList.remove("visible");
    video.currentTime = 0;
    videoPlaying = false;
    lastVideoEnded = millis();
    idleVideo.currentTime = 0;
    idleVideo.classList.add("visible");
    idleVideo.play();
  };
}

function setup() {
  var canvas = createCanvas(160, 160);
  canvas.parent('p5js-wrapper');

  // define video stream from webcam
  video = createCapture(VIDEO, { flipped: true });
  video.size(160, 120);
  video.hide();

  classifier.classifyStart(video, gotResults);
  idleVideo = document.getElementById("idle");
  blueVideo = document.getElementById("blue");
  orangeVideo = document.getElementById("orange");
  pinkVideo = document.getElementById("pink");

  idleVideo.classList.add("visible");
  idleVideo.play();
  
  // Setup end event listeners
  setupVideo(blueVideo);
  setupVideo(orangeVideo);
  setupVideo(pinkVideo);
}

function draw() {
  // render video
  image(video, 0, 0);

  // Only check for other labels if enough time has passed since the last video has ended
  if (millis() - lastVideoEnded >= IDLE_THRESHOLD) {
    // Handle other videos only if no video is currently playing
    if (!videoPlaying) {
      // Store current label and time if it's a new label
      if (lastLabel !== label) {
        lastLabel = label;
        labelStartTime = millis();
      }
      
      // Check if the label has been consistent for the threshold duration
      if (millis() - labelStartTime >= CONFIRMATION_THRESHOLD) {
        if (label === "blue") {
          idleVideo.classList.remove("visible");
          idleVideo.currentTime = 0;
          blueVideo.classList.add("visible");
          blueVideo.play();
          videoPlaying = true;
        } else if (label === "orange") {
          idleVideo.classList.remove("visible");
          idleVideo.currentTime = 0;
          orangeVideo.classList.add("visible");
          orangeVideo.play();
          videoPlaying = true;
        } else if (label === "pink") {
          idleVideo.classList.remove("visible");
          idleVideo.currentTime = 0;
          pinkVideo.classList.add("visible");
          pinkVideo.play();
          videoPlaying = true;
        }
      }
    }
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

function keyPressed() {
  if (key === 'f') {
    let fs = fullscreen();
    fullscreen(!fs); // Toggle fullscreen mode
  }
}
