

var canvas = document.getElementById('pixiCanvas')
var CANVAS_WIDTH = canvas.clientWidth
var CANVAS_HEIGHT = canvas.clientHeight
var ctx = canvas.getContext("2d");

var ball = {
  x: 100,
  y: 100,
  radius: 40,
  color: 0x000000,
  vX: 1,
  vY: 1
}

var nextFrame = function(e){
  updateState()
  render()
  window.requestAnimationFrame(nextFrame)
}
window.requestAnimationFrame(nextFrame)

function render(){
  ctx.clearRect(0, 0, CANVAS_WIDTH,CANVAS_HEIGHT)
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius,0 ,2*Math.PI)
  ctx.stroke()
}

function updateState(){
  ball.x += ball.vX
  ball.y += ball.vY
  if(ball.x - ball.radius <= 0){
    ball.vX = 1
  } else if(ball.x + ball.radius >= CANVAS_WIDTH){
    ball.vX = -1
  }
  if(ball.y - ball.radius <= 0){
    ball.vY = 1
  } else if(ball.y + ball.radius >= CANVAS_HEIGHT){
    ball.vY = -1
  }
}
