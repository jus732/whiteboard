let socket;

// p5 - setup canvas
function setup()
{
  const cv = createCanvas(900, 600);
  // define parent element of canvas
  cv.parent('canvas-container');
  cv.background(0);

  // client side socket implementation
  socket = io.connect('http://localhost:3000');

  // take incoming location data sent from server and send to each socket
  socket.on('mouse', (data) => {
    noStroke();
    fill(0, 100, 0);
    ellipse(data.x, data.y, 50, 50);
  });
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
    y: mouseY
  };

  socket.emit('mouse', data);

  noStroke();
  fill(255);
  ellipse(mouseX, mouseY, 50, 50);
}
