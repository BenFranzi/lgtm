const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function setDimensions() {
  ctx.canvas.height = window.innerHeight - 64;
  ctx.canvas.width = window.innerWidth - 32;
}

const rnd = {
  r: Math.random() * 1000000,
  g: Math.random() * 1000000,
  b: Math.random() * 1000000,
};
setDimensions();

function getRandomColor(seed) {
  var r = Math.floor(seed * rnd.r % 256);
  var g =Math.floor(seed * rnd.g % 256);
  var b = Math.floor(seed * rnd.b % 256);
  return `rgb(${r}, ${g}, ${b})`;
}

const reduction =  {length: .70, radianLeft: 0, radianRight: 0.0};


function branch({length, radians, level = 0}) {
  ctx.strokeStyle = getRandomColor(level);
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.translate(0, -length);

  if (length < 5) {
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.rotate(radians);
  branch({x: 0, y: -length, length: length * reduction.length, radians: radians + reduction.radianLeft, level: level + 1})
  ctx.restore()

  ctx.rotate(-radians);
  branch({x: 0, y: -length, length: length * reduction.length, radians: radians + reduction.radianRight, level: level + 1})
  ctx.restore();
}


function draw({x, y, length, radians}) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(x, y);
  branch({length, radians});
  ctx.restore();
}


const properties = {
  x: ctx.canvas.width/2,
  y: ctx.canvas.height,
  length: 250,
  radians: 30 * (Math.PI / 180),
}

const angleSlider = document.getElementById('angleSlider');
const currentAngle = document.getElementById('currentAngle');

angleSlider.addEventListener('input', (event) => {
  properties.radians = event.target.value * (Math.PI / 180);
  currentAngle.textContent = event.target.value;
  draw(properties);
});

const lengthSlider = document.getElementById('lengthSlider');
const currentLength = document.getElementById('currentLength');

lengthSlider.addEventListener('input', (event) => {
  properties.length = event.target.value;
  currentLength.textContent = event.target.value;
  draw(properties);
});

draw(properties);

function run(timestamp) {
  if (timestamp % 1) {
  properties.radians = properties.radians + (.5* (Math.PI / 180));
  draw(properties);
  }

  requestAnimationFrame(run);
}
requestAnimationFrame(run);
