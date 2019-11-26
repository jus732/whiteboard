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
  colorPicker.class('ml-2');
  colorPicker.input(() => {
    strokeColor = colorPicker.value();
  });

  const widthSlider = createSlider(1, 10, strokeWidth, 1);
  widthSlider.parent('stroke-width-picker');
  widthSlider.class('ml-2');
  widthSlider.input(() => {
    strokeWidth = widthSlider.value();
  });

  // clear canvas button
  const clearBtn = createButton('Clear');
  clearBtn.parent('canvas-controls');
  clearBtn.class('btn btn-primary mt-1 ml-5');
  clearBtn.mouseClicked(clearCanvas);

  // save canvas to session
  const saveBtn = createButton('Save');
  saveBtn.parent('canvas-controls');
  saveBtn.class('btn btn-success mt-1 ml-5');
  saveBtn.attribute('data-toggle', 'modal');
  saveBtn.attribute('data-target', '#modal-save-canvas');

  // download/export canvas button
  const exportBtn = createButton('Export');
  exportBtn.parent('canvas-controls');
  exportBtn.class('btn btn-info mt-1 ml-5');
  exportBtn.mouseClicked(() => {
    downloadCanvas(cv);
  });

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

// resets canvas
function clearCanvas()
{
  socket.emit('clearBtnClick');
  clear();
}

// exports and downloads canvas locally as png
function downloadCanvas(canvas)
{
  saveCanvas(canvas, 'myCanvas', 'png');
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

// converts canvas to base64 png and creates Board document using form input
// buggy - does save canvas and title/notes to database, but does not save modified canvas
async function createBoard()
{
  const convertedBoard = document.querySelector('canvas').toDataURL('image/png');
  const boardTitle = document.getElementById('board-title').value;
  const boardNotes = document.getElementById('board-notes').value;
  const data = 'board=' + convertedBoard + '&title=' + boardTitle + '&notes=' + boardNotes;
  const url = '/draw';

  document.getElementById('board-title').value = '';
  document.getElementById('board-notes').value = '';

  try
  {
    const res = await fetch(url, {method: 'POST', body: data, headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    const resJ = await res.json();
    if(resJ.hasOwnProperty('err') || resJ.hasOwnProperty('key') )
    {
      const errAlert = document.getElementById('err-alert');
      errAlert.style.display = 'block';
    }
    else {
      const errAlert = document.getElementById('err-alert');
      errAlert.style.display = 'none';
    }
    // console.log(res);
  }
  catch(err)
  {
    console.log(err);
  }
}

function main()
{
  // add listener for board creation
  const saveBtn = document.getElementById('save-btn');
  saveBtn.addEventListener('click', (evt) => {
    createBoard();
  });
}

document.addEventListener('DOMContentLoaded', main);
