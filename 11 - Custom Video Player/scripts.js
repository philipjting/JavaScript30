/* get elements */
const player = document.querySelector('.player');
const viewer = player.querySelector('.viewer');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const sliders = document.querySelectorAll('.player__slider');
const progressFilled = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');

let mousedownFlag = false;


/* build functions */
function togglePlay() {
  // play if paused, otherwise pause
  viewer[viewer.paused ? 'play' : 'pause']();
}

function togglePlayIcon() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function handleSkip(e) {
  viewer.currentTime += parseFloat(this.dataset.skip);
}

function handleSlide(e) {
  if (mousedownFlag || e.type === 'change') {
    viewer[this.name] = this.value;
  }
}

function updateProgressFilled(e) {
  const percentagePlayed = this.currentTime / this.duration * 100;
  progressFilled.style.flexBasis = `${percentagePlayed}%`;
}

function scrub(e) {
  if (mousedownFlag || e.type === 'click') {
    viewer.currentTime = e.offsetX / this.offsetWidth * viewer.duration;
  }
}


/* hook listeners */
player.addEventListener('mousedown', () => {mousedownFlag = true;})
player.addEventListener('mouseup', () => {mousedownFlag = false;})

viewer.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

viewer.addEventListener('play', togglePlayIcon);
viewer.addEventListener('pause', togglePlayIcon);

skipButtons.forEach((skip) => skip.addEventListener('click', handleSkip));

sliders.forEach((slider) => slider.addEventListener('change', handleSlide));
sliders.forEach((slider) => slider.addEventListener('mousemove', handleSlide));

viewer.addEventListener('timeupdate', updateProgressFilled);
viewer.addEventListener('loadedmetadata', updateProgressFilled);

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', scrub);

