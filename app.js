import { DGame } from "./DGame.js";
import { spriteSheetData } from "./bigSpritev7data.js";

const dg = new DGame("canvas", 1600, 800);
dg.controlls();

const image = new Image(); // Using optional size for image
// image.onload = drawImageActualSize; // Draw when image has loaded

image.src = "BigSpritev7.png";

const player = {
  x: 0,
  y: 0,
  // prędkość
  velocityX: 0,
  velocityY: 0,
  width: spriteSheetData.elfM.idle.w,
  height: spriteSheetData.elfM.idle.h,
};

function update(deltaTime) {
  // Player movement velocity
  if (dg.keys.key[65]) {
    player.velocityX = -0.1;
  } else if (dg.keys.key[68]) {
    player.velocityX = 0.1;
  } else player.velocityX = 0;

  // gravitation velocity
  player.velocityY = 0.1;

  // apply velocity
  player.x += +(player.velocityX * deltaTime).toFixed(2);
  player.y += +(player.velocityY * deltaTime).toFixed(2);
}

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
