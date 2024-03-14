import { DGame } from "./DGame.js";
import { spriteSheetData } from "./bigSpritev7data.js";

// const canvas = document.querySelector("#canvas");
// canvas.setAttribute("tabindex", 0);
// canvas.addEventListener("keydown", (ev) => {
//   console.log(ev);
// });

const dg = new DGame();
dg.init("canvas");
dg.controlls();

const image = new Image(); // Using optional size for image
// image.onload = drawImageActualSize; // Draw when image has loaded

image.src = "BigSpritev7.png";

const player = {
  x: 0,
  y: 0,
  width: spriteSheetData.elfM.idle.w,
  height: spriteSheetData.elfM.idle.h,
};

function update(deltaTime) {}

function draw(deltaTime) {
  dg.clearRect();

  dg.drawImage(
    image,
    spriteSheetData.elfM.idle.x,
    spriteSheetData.elfM.idle.y,
    spriteSheetData.elfM.idle.w,
    spriteSheetData.elfM.idle.h,
    player.x,
    player.y,
    player.width,
    player.height
  );

  dg.drawText(
    10,
    10,
    `mouse x:${dg.keys.mouse.x} y:${dg.keys.mouse.y} click:${dg.keys.mouse.click} key:${dg.keys.key}`
  );
}

requestAnimationFrame(gameLoop);

let lastTime = 0;
function gameLoop(timestamp) {
  const deltaTime = +(timestamp - lastTime).toFixed(2);
  lastTime = timestamp;

  update(deltaTime);

  draw(deltaTime);

  requestAnimationFrame(gameLoop);
}
