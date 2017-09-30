

var canvas = document.getElementById('pixiCanvas')
var CANVAS_WIDTH = canvas.clientWidth
var CANVAS_HEIGHT = canvas.clientHeight

var ctx = canvas.getContext("2d");

var world = {
  ground: CANVAS_HEIGHT,
  gravity: 1.3,
}

var ball = {
  x: 100,
  y: 100,
  radius: 40,
  color: 0x000000,
  vX: 0,
  vY: 0,
  accX: 0,
  accY: 0,
}

var nextFrame = function(e){
  updateState()
  render()
  window.requestAnimationFrame(nextFrame)
}
window.requestAnimationFrame(nextFrame)

function updateState(){
  ball.accY = world.gravity
  if(ball.y - ball.radius <= 0){
    ball.vY = - ( ball.vY * 0.9 - 2 )
  } else if(ball.y + ball.radius >= world.ground){
    ball.vY = - ( ball.vY * 0.9 - 2 )
  } else {
    ball.vY += ball.accY
  }
  ball.y = Math.min(ball.y + ball.vY, world.ground - ball.radius)
}

function render(){
  ctx.clearRect(0, 0, CANVAS_WIDTH,CANVAS_HEIGHT)
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius,0 ,2*Math.PI)
  ctx.stroke()
}
