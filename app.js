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
  maxVelocityX: 3,
  maxVelocityY: 5,
  accX: 0.1,
  accY: 0.1,
  currAccX: 0,
  currAccY: 0,
  width: spriteSheetData.elfM.idle.w,
  height: spriteSheetData.elfM.idle.h,
  isCollide: function (sprite) {
    if (sprite.x + sprite.width < this.x || this.x + this.width < sprite.x) {
      return false;
    }
    if (sprite.y + sprite.height < this.y || this.y + this.height < sprite.y) {
      return false;
    }
    return true;
  },
};

const testPlatform = {
  x: 10,
  y: 380,
  width: 1000,
  height: 10,
  draw: function () {
    dg.drawRect(this.x, this.y, this.width, this.height);
  },
};
const testPlatform2 = {
  x: 50,
  y: 333,
  width: 1000,
  height: 10,
  draw: function () {
    dg.drawRect(this.x, this.y, this.width, this.height);
  },
};

const platforms = [];
platforms.push(testPlatform2);
platforms.push(testPlatform);
console.log(platforms);

function update(deltaTime) {
  // Player movement velocity
  if (dg.keys.key[65]) {
    player.currAccX = player.accX;
    if (player.velocityX > -player.maxVelocityX)
      player.velocityX = +(player.velocityX - player.currAccX).toFixed(2);
  } else if (dg.keys.key[68]) {
    player.currAccX = player.accX;
    if (player.velocityX < player.maxVelocityX)
      player.velocityX = +(player.velocityX + player.currAccX).toFixed(2);
  } else {
    if (player.velocityX > 0) {
      player.velocityX = +(player.velocityX - player.accX).toFixed(2);
    } else if (player.velocityX < 0) {
      player.velocityX = +(player.velocityX + player.accX).toFixed(2);
    } else player.velocityX = 0;
  }

  // gravitation velocity
  let collide = false;
  platforms.forEach((el) => {
    if (player.isCollide(el)) collide = true;
  });

  if (collide) {
    player.currAccY = 0;
    player.velocityY = 0;
    // jump
    if (dg.keys.key[32]) {
      player.velocityY = -4;
    }
  } else player.currAccY = player.accY;

  // apply acc to velocity
  if (player.velocityY < player.maxVelocityY)
    player.velocityY = +(player.velocityY + player.currAccY).toFixed(2);
  console.log(player.velocityX);

  // apply velocity to position
  player.x += +(player.velocityX * (deltaTime / 10)).toFixed(2);
  player.y += +(player.velocityY * (deltaTime / 10)).toFixed(2);
}

function draw(deltaTime) {
  dg.clearRect();

  platforms.forEach((el) => el.draw());

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

  dg.drawText(
    player.x + 50,
    player.y,
    `vX:${player.velocityX} vY:${player.velocityY} accX:${player.accX} accY:${player.accY}`
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
