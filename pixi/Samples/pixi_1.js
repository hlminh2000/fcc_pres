


var canvas = document.getElementById('pixiCanvas')
var CANVAS_WIDTH = canvas.clientWidth
var CANVAS_HEIGHT = canvas.clientHeight
var app = new PIXI.Application({
  view: canvas,
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  antialias: true,
  resolution: 1,
  transparent: true,
})

var ballModel = {
  x: 100,
  y: 100,
  radius: 40,
  color: 0x000000,
  vX: 1,
  vY: 1
}

var ballDisplay = new PIXI.Graphics()
  .lineStyle(1, ballModel.color, 1)
  .drawCircle(0, 0, ballModel.radius)
app.stage.addChild(ballDisplay)

app.ticker.add(function(){
  updateState()
  render()
})

function updateState(){
  ballModel.x += ballModel.vX
  ballModel.y += ballModel.vY
  if(ballModel.x - ballModel.radius <= 0){
    ballModel.vX = 1
  } else if(ballModel.x + ballModel.radius >= CANVAS_WIDTH){
    ballModel.vX = -1
  }
  if(ballModel.y - ballModel.radius <= 0){
    ballModel.vY = 1
  } else if(ballModel.y + ballModel.radius >= CANVAS_HEIGHT){
    ballModel.vY = -1
  }
}

function render(){
  ballDisplay.x = ballModel.x
  ballDisplay.y = ballModel.y
}
