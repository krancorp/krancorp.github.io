'use strict'

$(document).ready(() => {

  const canvas = $('#header-background')

  const two = new Two({
    height: canvas.height(),
    width: canvas.width()
  }).appendTo(canvas[0])

  const kSize = 34
  const stripPadding = kSize
  const stripLength = 7

  const stripMinSpeed = 30
  const stripSpeed = 50

  const stripCount = Math.ceil(canvas.width() / kSize)

  var kPath = createKPath()
  kPath.translation.set(-100, 0)

  var strips = []
  var stripPaths = []
  // Populate strips
  for (var i = 0; i < stripCount; i++) {
    strips.push({x: (i * kSize + kSize/2), y: -Math.floor(Math.random()*canvas.height()/kSize/2) * kSize + kSize/2, v: randomVelocity()})

    // Create K Paths
    var ks = []
    for (var j = 0; j < stripLength; j++) {
      var k = kPath.clone()
      k.fill = 'rgba(255,255,255,'+0.15/j+')'
      ks.push(k)
    }
    ks[0].fill = 'rgba(255,255,255,0.25)'

    stripPaths.push(ks)
  }

  kPath.remove()

  two.bind('update', frameCount => {
    for (var i = 0; i < stripCount; i++) {
      //console.log(i)
      var strip = strips[i];
      if (frameCount % strip.v === 0) {
        var paths = stripPaths[i];

        for (var j = stripLength-1; j >= 0; j--) {
          paths[j].translation.set(strip.x, strip.y - j*stripPadding)
        }
        //console.log(strip)
        //console.log(path)
        //path.translation.set(strip.x, strip.y)

        strip.y += stripPadding
        if (strip.y > canvas.height() + stripLength*kSize) {
          strip.y = kSize/2
          strip.v = randomVelocity()
        }
      }
    }
  }).play()

  function createKPath() {
    var path = two.makePath(0, 105, 30, 76, 70, 117, 71, 34, 105, 1, 104, 108, 223, 107, 186, 144, 98, 144, 142, 188, 113, 217)
    path.scale = 0.15
    return path
  }

  function randomVelocity() {
    return Math.floor(Math.random()*stripSpeed)+stripMinSpeed
  }
})
