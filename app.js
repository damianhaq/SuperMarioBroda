import { Camera, DGame, Platform } from "./DGame.js";
import { spriteSheetData } from "./bigSpritev7data.js";
import { terrainData } from "./terrainData.js";

// dg.init and camera need canvas size
const canvasWidth = 1600;
const canvasHeight = 800;

const camera = new Camera();
const dg = new DGame();
dg.init(canvasWidth, canvasHeight, camera);
dg.controlls();

const image = new Image();
const imageTerrain = new Image();

imageTerrain.src = "Terrain(16x16).png";
image.src = "BigSpritev7.png";

const player = {
  x: 100,
  y: 10,
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
    if (
      sprite.x + sprite.tilesWidth * 16 < this.x ||
      this.x + this.width < sprite.x
    ) {
      return false;
    }
    if (
      sprite.y + sprite.tilesHeight * 16 < this.y ||
      this.y + this.height < sprite.y
    ) {
      return false;
    }
    return true;
  },
  movement: function () {
    // Player movement velocity
    if (dg.keys.key[65]) {
      this.currAccX = this.accX;
      if (this.velocityX > -this.maxVelocityX)
        this.velocityX = +(this.velocityX - this.currAccX).toFixed(2);
    } else if (dg.keys.key[68]) {
      this.currAccX = this.accX;
      if (this.velocityX < this.maxVelocityX)
        this.velocityX = +(this.velocityX + this.currAccX).toFixed(2);
    } else {
      if (this.velocityX > 0) {
        this.velocityX = +(this.velocityX - this.accX).toFixed(2);
      } else if (this.velocityX < 0) {
        this.velocityX = +(this.velocityX + this.accX).toFixed(2);
      } else this.velocityX = 0;
    }
  },
  draw: function () {
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
    // hitbox
    dg.drawRect(this.x, this.y, this.width, this.height);
  },
};

const platform = new Platform(
  10,
  333,
  15,
  1,
  imageTerrain,
  terrainData.greenPlatform.left,
  terrainData.greenPlatform.middle,
  terrainData.greenPlatform.right,
  dg
);

const platforms = [];
platforms.push(platform);

function update(deltaTime) {
  player.movement();

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

  // apply velocity to position
  player.x += +(player.velocityX * (deltaTime / 10)).toFixed(2);
  player.y += +(player.velocityY * (deltaTime / 10)).toFixed(2);

  camera.setCamera(player.x, player.y, canvasWidth, canvasHeight);
}

function draw(deltaTime) {
  dg.clearRect();

  dg.drawCircle(100, 100, 50);
  dg.drawImage(imageTerrain, 0, 0, 16, 16, 100, 100, 16, 16);

  platforms.forEach((el) => el.draw());
  player.draw();

  dg.drawText(
    10,
    10,
    `mouse x:${dg.keys.mouse.x} y:${dg.keys.mouse.y} click:${dg.keys.mouse.click} key:${dg.keys.key} cam: ${dg.camera.y}`
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
