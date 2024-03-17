export class DGame {
  constructor() {
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  // setCamera(x, y) {
  //   this.camera = {
  //     x: x - this.canvas.width / 4,
  //     y: y - this.canvas.height / 4,
  //   };
  //   // console.log(this.camera.y);
  // }

  init(width, height, cameraInstance) {
    this.camera = cameraInstance;
    this.scaleFactor = 2;
    this.canvas.width = width;
    this.canvas.height = height;
    // this.canvas.width = width * this.scaleFactor;
    // this.canvas.height = height * this.scaleFactor;
    // this.canvas.style.width = width + "px";
    // this.canvas.style.height = height + "px";
    this.canvas.style.border = "1px solid black";
    this.canvas.parentElement.style = "margin: 0";
    this.ctx.scale(this.scaleFactor, this.scaleFactor);
    this.ctx.imageSmoothingEnabled = false;
  }

  controlls() {
    this.lastTime = 0;

    this.keys = {
      key: [],
      mouse: {
        click: false,
        x: false,
        y: false,
      },
    };
    this.canvas.setAttribute("tabindex", 0);

    this.canvas.addEventListener("keydown", (ev) => {
      if (!this.keys.key[ev.keyCode]) this.keys.key[ev.keyCode] = true;
      console.log(ev.keyCode);
    });
    this.canvas.addEventListener("keyup", (ev) => {
      if (this.keys.key[ev.keyCode]) this.keys.key[ev.keyCode] = false;
    });
    this.canvas.addEventListener("mousedown", (ev) => {
      this.keys.mouse.click = true;
    });
    this.canvas.addEventListener("mouseup", (ev) => {
      this.keys.mouse.click = false;
    });
    this.canvas.addEventListener("mousemove", (ev) => {
      this.keys.mouse.x = Math.round(ev.offsetX / this.scaleFactor);
      this.keys.mouse.y = Math.round(ev.offsetY / this.scaleFactor);
    });
  }

  drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
    // console.log(dx, dy, this.camera.x, this.camera.y);
    this.ctx.drawImage(
      image,
      sx,
      sy,
      sWidth,
      sHeight,
      dx - this.camera?.camera.x,
      dy - this.camera?.camera.y,
      dWidth,
      dHeight
    );
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} r
   */
  drawCircle(x, y, r) {
    this.ctx.beginPath();
    this.ctx.arc(
      x - this.camera?.camera.x,
      y - this.camera?.camera.y,
      r,
      0,
      Math.PI * 2
    );
    this.ctx.stroke();
  }

  clearRect() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   */
  drawRect(x, y, w, h) {
    this.ctx.beginPath();
    this.ctx.rect(x - this.camera?.camera.x, y - this.camera?.camera.y, w, h);
    this.ctx.stroke();
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {string} text
   */
  drawText(x, y, text) {
    this.ctx.fillText(
      text,
      x - this.camera?.camera.x,
      y - this.camera?.camera.y
    );
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} tox
   * @param {number} toy
   */
  drawLine(x, y, tox, toy) {
    this.ctx.beginPath();
    this.ctx.moveTo(x - this.camera?.camera.x, y - this.camera?.camera.y);
    this.ctx.lineTo(tox - this.camera?.camera.x, toy - this.camera?.camera.y);
    this.ctx.stroke();
  }

  /**
   *
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   *
   * @param {number} circleX
   * @param {number} circleY
   * @param {number} circleRadius
   * @param {number} rectX
   * @param {number} rectY
   * @param {number} rectWidth
   * @param {number} rectHeight
   * @returns {boolean}
   */
  isCircleRectangleCollision(
    circleX,
    circleY,
    circleRadius,
    rectX,
    rectY,
    rectWidth,
    rectHeight
  ) {
    // Find the closest point on the rectangle
    let closestX = Math.max(rectX, Math.min(circleX, rectX + rectWidth));
    let closestY = Math.max(rectY, Math.min(circleY, rectY + rectHeight));

    // drawLine(circleX, circleY, closestX, closestY);

    // Calculate the distance between the center of the circle and the closest point on the rectangle
    let distanceX = circleX - closestX;
    let distanceY = circleY - closestY;

    // Check if the distance is less than the circle's radius (collision occurs)
    return (
      distanceX * distanceX + distanceY * distanceY <
      circleRadius * circleRadius
    );
  }

  helloWorld() {
    console.log("Hello World");
  }
}

export class Camera {
  constructor() {
    this.camera = {
      x: 0,
      y: 0,
    };
  }

  setCamera(x, y, canvasWidth, canvasHeight) {
    this.camera = {
      x: x - canvasWidth / 4,
      y: y - canvasHeight / 4,
    };
  }
}

export class Platform {
  constructor(
    x,
    y,
    tilesWidth,
    tilesHeight,
    image,
    leftTileData,
    middleTileData,
    rightTileData,
    dgInstance
  ) {
    this.dg = dgInstance;

    this.x = x;
    this.y = y;
    this.tilesWidth = tilesWidth;
    this.tilesHeight = tilesHeight;
    this.image = image;
    this.leftTileData = leftTileData;
    this.middleTileData = middleTileData;
    this.rightTileData = rightTileData;
  }

  draw() {
    for (let i = 0; i < this.tilesWidth; i++) {
      if (i === 0) {
        // first tile

        // PROBLEM JEST TAKI ŻE DRAWIMAGE OD PLATFORMS NIE WIDZI ZMIENNYCH CAMERA ;/
        this.dg.drawImage(
          this.image,
          this.leftTileData.x,
          this.leftTileData.y,
          this.leftTileData.width,
          this.leftTileData.height,
          this.x,
          this.y,
          this.leftTileData.width,
          this.leftTileData.height
        );
      } else if (i === this.tilesWidth - 1) {
        // last tile
        this.dg.drawImage(
          this.image,
          this.rightTileData.x,
          this.rightTileData.y,
          this.rightTileData.width,
          this.rightTileData.height,
          this.x + i * 16,
          this.y,
          this.rightTileData.width,
          this.rightTileData.height
        );
      } else {
        this.dg.drawImage(
          this.image,
          this.middleTileData.x,
          this.middleTileData.y,
          this.middleTileData.width,
          this.middleTileData.height,
          this.x + i * 16,
          this.y,
          this.middleTileData.width,
          this.middleTileData.height
        );
      }

      // middle Tiles
    }

    // hitbox
    this.dg.drawRect(
      this.x,
      this.y,
      this.tilesWidth * 16,
      this.tilesHeight * 16
    );
  }
}

//

// --- this is my current game loop ---
//
// requestAnimationFrame(gameLoop);
//
// let lastTime = 0;
// function gameLoop(timestamp) {
//   const deltaTime = +(timestamp - lastTime).toFixed(2);
//   lastTime = timestamp;
//
//   update(deltaTime);
//
//   draw(deltaTime);
//
//   requestAnimationFrame(gameLoop);
// }
//
// --- ||| ---
