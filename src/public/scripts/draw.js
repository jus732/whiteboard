let socket;
let strokeColor = '#000000';
let strokeWidth = 5;

// p5 - setup canvas
function setup()
{
  const cv = createCanvas(900, 600);
  // define parent element of canvas
  cv.parent('canvas-container');
  cv.class('border border-primary');
  cv.background(255);

  // creates stroke color/width picker and adds to DOM
  const colorPicker = createColorPicker(strokeColor);
  colorPicker.parent('stroke-color-picker');
  colorPicker.class('mt-2 ml-2');
  colorPicker.input(() => {
    strokeColor = colorPicker.value();
  });

  const widthSlider = createSlider(1, 10, strokeWidth, 1);
  widthSlider.parent('stroke-width-picker');
  widthSlider.class('mt-1 ml-2');
  widthSlider.input(() => {
    strokeWidth = widthSlider.value();
  });

  // clear canvas button
  const clearBtn = createButton('Clear');
  clearBtn.parent('canvas-controls');
  clearBtn.class('btn btn-primary mt-1 ml-5');
  clearBtn.mousePressed(clearCanvas);

  // client side socket implementation
  socket = io.connect();

  // take incoming location data sent from server and send to each socket
  socket.on('mouse', (data) => {
    stroke(data.strokeColor);
    strokeWeight(data.strokeWidth);
    line(data.x, data.y, data.pX, data.pY);
    // noStroke();
    // fill(data.strokeColor);
    // ellipse(data.x, data.y, 50, 50);
  });

  socket.on('clearBtnClick', () => {
    clear();
  });
}

function clearCanvas()
{
  socket.emit('clearBtnClick');
  clear();
}

// constantly redrawn every frame
function draw()
{}

// while mouse is held down
function mouseDragged()
{
  // console.log(mouseX + ',' + mouseY)

  // location data sent through socket
  let data = {
    x: mouseX,
    y: mouseY,
    pX: pmouseX,
    pY: pmouseY,
    strokeColor: strokeColor,
    strokeWidth: strokeWidth
  };

  socket.emit('mouse', data);

  stroke(strokeColor);
  strokeWeight(strokeWidth);
  line(mouseX, mouseY, pmouseX, pmouseY);
  // ellipse(mouseX, mouseY, 50, 50);
}
