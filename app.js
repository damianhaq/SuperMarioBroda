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
  speed: 0,
  maxSpeed: 2,
  width: spriteSheetData.elfM.idle.w,
  height: spriteSheetData.elfM.idle.h,
};

function update(deltaTime) {
  if (dg.keys.key[68]) player.x += 1;
  if (dg.keys.key[65]) player.x -= 1;

  // Gravitation
  const acc = 0.05;

  // apply acc to speed
  if (player.speed < player.maxSpeed)
    player.speed = +(player.speed + acc * deltaTime).toFixed(2);

  // moving y-axis
  // player.y = player.y + player.speed;
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
