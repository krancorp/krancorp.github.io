'use strict'

$(document).ready(() => {

  const stripCount = 50
  const stripSpeed = 5

  const canvas = $('#header-background')
  /*const context = canvas[0].getContext('2d');

  canvas.attr('height', canvas.parent().height())
  canvas.attr('width', canvas.parent().width())

  const kPath = new Path2D('M 0.6969913,104.86304 29.701197,75.858833 70.761098,116.91876 71.51322,34.046835 105.18852,0.37153475 104.28595,107.80225 l 118.956,-0.52476 -36.31209,36.31209 -89.047256,0.45494 44.296046,44.29611 -29.00421,29.00421 L 0.69853504,104.86888 Z')

  var strips = []

  context.scale(.1, .1)

  for (var i = 0; i < stripCount; i++) {
    strips.push({x: Math.random()*canvas.width(), y: Math.random()*200, v: Math.random()})
  }

  drawFrame()

  function drawStrip(i) {
    var strip = strips[i]
    //console.log(strip)

    context.fillStyle = '#fff'
    kPath.moveTo(strip.x, strip.y)
    context.fill(kPath)
    //context.fillRect(strip.x, strip.y, 10, 10)

    strip.y += strip.v * stripSpeed
  }

  function drawFrame() {
    console.log('Frame!!')
    context.clearRect(0,0,canvas.width(), canvas.height())

    for (var i = 0; i < stripCount; i++) drawStrip(i)

    setTimeout(drawFrame, 100)

    const kPath = new Path2D('M 0.6969913,104.86304 29.701197,75.858833 70.761098,116.91876 71.51322,34.046835 105.18852,0.37153475 104.28595,107.80225 l 118.956,-0.52476 -36.31209,36.31209 -89.047256,0.45494 44.296046,44.29611 -29.00421,29.00421 L 0.69853504,104.86888 Z')
  }*/

  var params = {
    height: canvas.height(),
    width: canvas.width()
  }
  var two = new Two(params).appendTo(canvas[0])

  var kPath = createKPath()

  kPath.fill = '#444'
  kPath.translation = new Two.Vector(0, 0)

  var strips = []
  var stripPaths = []

  for (var i = 0; i < stripCount; i++) {
    strips.push({x: Math.random()*canvas.width(), y: Math.random()*200, v: Math.random()})
    stripPaths.push(kPath.clone())
  }

  kPath.remove()

  console.log(stripPaths)

  function draw() {
    for (var i = 0; i < stripCount; i++) {
      //console.log(i)
      var strip = strips[i];
      var path = stripPaths[i];
      //console.log(strip)
      //console.log(path)
      path.translation = new Two.Vector(strip.x, strip.y)

      strip.y += 30
    }

    two.update()
    setTimeout(draw, 1000)
  }
  //draw()

  two.bind('update', frameCount => {
    for (var i = 0; i < stripCount; i++) {
      //console.log(i)
      var strip = strips[i];
      var path = stripPaths[i];
      //console.log(strip)
      //console.log(path)
      path.translation = new Two.Vector(strip.x, strip.y)

      strip.y += 3
    }
  }).play()

  function createKPath() {
    var path = two.makePath(0, 105, 30, 76, 70, 117, 71, 34, 105, 1, 104, 108, 223, 107, 186, 144, 98, 144, 142, 188, 113, 217)
    path.scale = 0.15
    return path
  }
})
