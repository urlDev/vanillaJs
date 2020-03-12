const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Play and pause video
// play, pause and paused are default functions
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update play and pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x">';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x">';
  }
}

// update progress and timestamp
function updateProgress() {
    // progress has a value because its a range
    // this gets the value as a percantage of currenttime/duration
    progress.value = (video.currentTime / video.duration) * 100;

    // get minutes
    let mins = Math.floor((video.currentTime / 60));
    if(mins < 10) {
        mins = "0" + String(mins)
    }

    // get seconds
    let secs = Math.floor((video.currentTime % 60));
    if(secs < 10) {
        secs = "0" + String(secs)
    }

    timestamp.innerHTML = `${mins}:${secs}`
}

// set video time to progress
function setVideoProgress() {
    video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
// there is no default stop function. so we first set the current time to 0 and then pause it there
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}


// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
