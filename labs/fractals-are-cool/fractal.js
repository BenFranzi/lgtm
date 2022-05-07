function fractal(ctx, {x, y, length, angle, thickness}) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'red';
  ctx.lineWidth = thickness;
  ctx.translate(x, y);
  ctx.rotate(angle * Math.PI / 180);
  ctx.moveTo(0,0);
  ctx.lineTo(0, length);
  ctx.stroke();

  if (length < 1) {
    ctx.restore();
    return;
  }

  fractal(ctx, {
    x: 0,
    y: -length * 0.75,
    angle: angle + 5,
    thickness,
  })
}


function drawTree({x, y, length, radians, thickness}) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = 'white';
  ctx.fillStyle = 'red';
  ctx.lineWidth = thickness;
  ctx.translate(x, y);
  ctx.rotate(radians);
  ctx.moveTo(0,0);
  ctx.lineTo(0, -length);
  ctx.stroke();

  if (length < 10) {
    ctx.restore();
    return;
  }

  drawTree({x: 0, y: -length, length: length * 0.75, radians, thickness});
}

const {width, height} = ctx.canvas;

const startValues  = {
  x: width/2,
  y: height,
  length: 80,
  thickness: 2,
  radians: 30 * (Math.PI / 180),
}

drawTree(startValues);
