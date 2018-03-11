


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
app.stage.interactive = true

var ballModel = {
  x: 100,
  y: 100,
  radius: 100,
  color: 0x000000,
  lastMouseDownLocalPosition: {x: 0, y: 0},
  isDragging: false,
}

var ballDisplay = new PIXI.Graphics()
  .lineStyle(1, ballModel.color, 1)
  .beginFill(0x000000, 0.3)
  .drawCircle(0, 0, ballModel.radius)
app.stage.addChild(ballDisplay)

ballDisplay.interactive = true
ballDisplay.on('mousedown', onBallMouseDown)
function onBallMouseDown(e){
  ballModel.isDragging = true
  ballModel.lastMouseDownLocalPosition.x = e.data.global.x - ballDisplay.x
  ballModel.lastMouseDownLocalPosition.y = e.data.global.y - ballDisplay.y
  app.stage.on('mouseup', onBallMouseUp)
  app.stage.on('mousemove', onStageMouseMove)
  function onStageMouseMove(mouseMoveEvent){
    ballModel.x = mouseMoveEvent.data.global.x - ballModel.lastMouseDownLocalPosition.x
    ballModel.y = mouseMoveEvent.data.global.y - ballModel.lastMouseDownLocalPosition.y
  }
  function onBallMouseUp(_e){
    ballModel.isDragging = false
    app.stage.off('mousemove', onStageMouseMove)
    app.stage.off('mouseup', onBallMouseUp)
  }
}

app.ticker.add(function(){
  render()
})

function render(){
  ballDisplay.x = ballModel.x
  ballDisplay.y = ballModel.y
}
