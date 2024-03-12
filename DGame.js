export class DGame {
  constructor() {
    /**
     * @type {CanvasRenderingContext2D}
     * @type {HTMLCanvasElement}
     */
    this.ctx;
    this.canvas;
  }

  /**
   *
   * @param {string} canvasID string
   * @returns {CanvasRenderingContext2D}
   */
  init(canvasID) {
    this.canvas = document.querySelector(`#${canvasID}`);
    this.ctx = this.canvas.getContext("2d");

    this.canvas.style = "border: 1px solid black";
    this.canvas.parentElement.style = "margin: 0";
    this.canvas.width = 1600;
    this.canvas.height = 800;
    return this.ctx;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} r
   */
  drawCircle(x, y, r) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, Math.PI * 2);
    this.ctx.stroke();
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
    this.ctx.rect(x, y, w, h);
    this.ctx.stroke();
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {string} text
   */
  drawText(x, y, text) {
    this.ctx.fillText(text, x, y);
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
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(tox, toy);
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
