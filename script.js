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

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  if (Date.parse(endtime) < Date.parse(new Date())) {
    return {
      'total': 0,
      'days': 0,
      'hours': 0,
      'minutes': 0,
      'seconds': 0
    };
  }
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline="October 1 2023 13:00:00 GMT+0300";
initializeClock('countdown', deadline);

function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
    if (x < w / zoom) {x = w / zoom;}
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
    if (y < h / zoom) {y = h / zoom;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - 175 - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

var timeout = {};
var rollSound = document.getElementById('rollSound');
rollSound.volume = 0.15;

function rollDice(element) {
  rollSound.play();
  var form = element.previousElementSibling;
  var formId = parseInt(form.id);

  var rollValue = getRollValue(formId);
  if (rollValue == 20) {
    form.style.color = "#9e0b0f"
  } else {
    form.style.color = "white"
  }
  form.innerHTML = rollValue;

  clearTimeout(timeout[form.id]);
  timeout[form.id] = setTimeout(function(){
    form.innerHTML = form.className;
    form.style.color = "white";
  }, 3000)
}

function getRollValue(max){
  return Math.floor(Math.random() * max + 1);
}

let attached = false;

let imageContainer;

const followMouse = (event) => {
  imageContainer.style.left = event.x + "px";
  imageContainer.style.top = event.y - 400 + "px";
}

function showImage(element) {
  imageContainer = element.nextElementSibling;
  if (!attached) {
    attached = true;
    imageContainer.style.display = "block";
    document.addEventListener("pointermove", followMouse);
  }
}

function hideImage() {
  attached = false;
  imageContainer.style.display = "";
  document.removeEventListener("pointermove", followMouse);
}


function ShowInfo(ele) {
    var x = ele;
	var y = x.getElementsByTagName('div')[1];
	var z = x.getElementsByTagName('p')[1];
	if (y.style.display === "none") {
		y.style.display = "inline-block";
		y.style.marginTop = "2vh";
		y.style.marginBottom = "1vh";
		z.innerHTML = "-";
	} else {
		y.style.display = "none";
		y.style.marginTop = "0vh";
		y.style.marginBottom = "0vh";
		z.innerHTML = "+";
	}
}
