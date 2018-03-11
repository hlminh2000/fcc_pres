


var canvas = document.getElementById('pixiCanvas')
var CANVAS_WIDTH = canvas.clientWidth
var CANVAS_HEIGHT = canvas.clientHeight
var world = {
  ground: CANVAS_HEIGHT,
  ceiling: 0,
  leftWall: 0,
  rightWall: CANVAS_WIDTH,
  gravity: 1.3,
}
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
  radius: 40,
  color: 0x000000,
  vX: 0,
  vY: 0,
  accX: 0,
  accY: 0,
  isDragging: false,
  lastMouseDownLocalPosition: {x: 0, y: 0}
}

var ballDisplay = new PIXI.Graphics()
  .lineStyle(1, ballModel.color, 1)
  .beginFill(0x000000, 0.3)
  .drawCircle(0, 0, ballModel.radius)
app.stage.addChild(ballDisplay)
ballDisplay.interactive = true

ballDisplay.on('mousedown', onBallMouseDown)
function onBallMouseDown(e){
  var lastBallPosition = {
    x: ballModel.x,
    y: ballModel.y,
  }
  ballModel.isDragging = true
  ballModel.lastMouseDownLocalPosition.x = e.data.global.x - ballDisplay.x
  ballModel.lastMouseDownLocalPosition.y = e.data.global.y - ballDisplay.y
  app.stage.on('mouseup', onBallMouseUp)
  app.stage.on('mousemove', onStageMouseMove)
  function onStageMouseMove(_e){
    ballModel.x = _e.data.global.x - ballModel.lastMouseDownLocalPosition.x
    ballModel.y = _e.data.global.y - ballModel.lastMouseDownLocalPosition.y
    ballModel.vX = ballModel.x - lastBallPosition.x
    ballModel.vY = ballModel.y - lastBallPosition.y
    lastBallPosition = {
      x: ballModel.x,
      y: ballModel.y,
    }
  }
  function onBallMouseUp(_e){
    ballModel.isDragging = false
    app.stage.off('mousemove', onStageMouseMove)
    app.stage.off('mouseup', onBallMouseUp)
  }
}

app.ticker.add(function(){
  updateState()
  render()
})

function updateState(){
  if(!ballModel.isDragging){
    if(ballModel.y - ballModel.radius <= world.ceiling){
      ballModel.vY = - ( ballModel.vY * 0.9 - 2 )
    } else if(ballModel.y + ballModel.radius >= world.ground){
      ballModel.vY = - ( ballModel.vY * 0.9 - 2 )
    } else {
      ballModel.vY += ballModel.accY
    }
    if(ballModel.x - ballModel.radius <= world.leftWall){
      ballModel.vX = - ( ballModel.vX * 0.9 + 2 )
    } else if(ballModel.x + ballModel.radius >= world.rightWall){
      ballModel.vX = - ( ballModel.vX * 0.9 - 2 )
    } else {
      ballModel.vX += ballModel.accX
    }
    ballModel.accY = world.gravity
    ballModel.y = Math.min(
      Math.max(
        ballModel.y + ballModel.vY,
        world.ceiling + ballModel.radius
      ),
      world.ground - ballModel.radius
    )
    ballModel.x = Math.min(
      Math.max(
        ballModel.x + ballModel.vX,
        world.leftWall + ballModel.radius
      ),
      world.rightWall - ballModel.radius
    )
  }
}

function render(){
  ballDisplay.x = ballModel.x
  ballDisplay.y = ballModel.y
}
