import { DGame } from "./DGame.js";
asdas;
asdasd;

const dg = new DGame();
dg.init("canvas");

dg.drawCircle(50, 50, 30);
dg.drawRect(100, 100, 30, 40);
dg.drawText(100, 90, "test");
dg.drawLine(50, 50, 100, 100);
dg.randomNumber(10, 40);
const result = dg.isCircleRectangleCollision(50, 50, 30, 100, 100, 30, 40);

function gameLoop(timestamp) {
  // Update the logic
  update();

  // Draw everything
  draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();
