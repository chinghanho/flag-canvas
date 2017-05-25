class Flag {

  constructor() {
    this.windowWidth = window.innerWidth
    this.windowHeight = window.innerHeight

    this.manifest = [
      'images/FLAG1.png',
      'images/FLAG2.png',
      'images/FLAG3.png',
      'images/FLAG4.png',
      'images/FLAG5.png',
      'images/FLAG6.png',
      'images/FLAG7.png',
      'images/FLAG8.png',
      'images/FLAG9.png',
      'images/FLAG10.png',
      'images/FLAG11.png',
      'images/FLAG12.png',
      'images/FLAG13.png',
      'images/FLAG14.png',
      'images/FLAG15.png',
      'images/FLAG16.png',
      'images/FLAG17.png',
      'images/FLAG18.png',
      'images/FLAG19.png',
      'images/FLAG20.png',
      'images/FLAG21.png',
      'images/FLAG22.png',
      'images/FLAG23.png',
      'images/FLAG24.png',
      'images/FLAG25.png',
    ]
    this.loadedImagesCounter = 0
    this.images = null
    this.frameIndex = 0

    this.intervalSpeed = 30
    this.interval = 1000 / this.intervalSpeed
    this.elapsed = null
    this.then = Date.now()

    this.$app = document.querySelector('#app')
    this.$canvas = document.createElement('canvas')
    this.ctx = this.$canvas.getContext('2d')
  }

  init() {
    this.$canvas.width = this.windowWidth
    this.$canvas.height = this.windowHeight
    this.$app.appendChild(this.$canvas)
    this.loadImages(images => {
      this.images = images
      this.update()
    })
  }

  loadImages(callback) {
    let images = []
    this.manifest.forEach((filename, index) => {
      let img = new Image()
      img.onload = () => {
        this.loadedImagesCounter++
        images[index] = img
        if (this.manifest.length === this.loadedImagesCounter) {
          callback(images)
        }
      }
      img.src = `./${filename}`
    })
  }

  drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
    if (arguments.length === 2) {
      x = y = 0
      w = ctx.canvas.width
      h = ctx.canvas.height
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5
    offsetY = typeof offsetY === "number" ? offsetY : 0.5

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0
    if (offsetY < 0) offsetY = 0
    if (offsetX > 1) offsetX = 1
    if (offsetY > 1) offsetY = 1

    var iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1

    // decide which gap to fill
    if (nw < w) ar = w / nw
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh  // updated
    nw *= ar
    nh *= ar

    // calc source rectangle
    cw = iw / (nw / w)
    ch = ih / (nh / h)

    cx = (iw - cw) * offsetX
    cy = (ih - ch) * offsetY

    // make sure source rectangle is valid
    if (cx < 0) cx = 0
    if (cy < 0) cy = 0
    if (cw > iw) cw = iw
    if (ch > ih) ch = ih

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h)
  }

  update() {
    window.requestAnimationFrame(this.update.bind(this))

    this.now = Date.now()
    this.elapsed = this.now - this.then

    if (!(this.elapsed > this.interval)) {
      return
    }

    this.then = this.now - (this.elapsed % this.interval)

    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height)
    this.drawImageProp(this.ctx, this.images[this.frameIndex], 0, 0, this.windowWidth, this.windowHeight)
    this.frameIndex++
    if (this.frameIndex === this.manifest.length) {
      this.frameIndex = 0
    }
  }

}

var flag = new Flag()
flag.init()

