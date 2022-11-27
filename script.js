var audio_on = false;

function changeImage() {
  var img = document.getElementById('audio');
  if (audio_on == true) {
    img.src = "images/audio_off.png";
    audio_on = false
  } else {
    img.src = "images/audio_on.png";
    audio_on = true;
  }
};

var myAudio = document.getElementById('myAudio');
myAudio.volume = 0.5;

function togglePlay() {
  return myAudio.paused ? myAudio.play() : myAudio.pause();
};
