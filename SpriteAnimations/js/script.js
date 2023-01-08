let playerState = "idle"
// 拿到选择框里的值
const dropdown = document.querySelector("#animations")
dropdown.addEventListener("change", function(e){
  playerState = e.target.value;
})

const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");
// console.log(ctx);

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
// console.log(CANVAS_WIDTH, CANVAS_HEIGHT);

const playerImage = new Image();

/* playerImage.onload = ()=>{
  console.log("onload image");
  animate()
} */
// 这个最终会插入到index.html文件中，所以文件路径应该是相对于index.html
playerImage.src = "./img/shadow_dog.png";
// console.log(playerImage.complete)

const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
// 创建坐标数组
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }

  spriteAnimations[state.name] = frames;
});
console.log(animationStates);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  // frameY = spriteHeight * position;
  // ctx.fillRect(100, 50, 100, 100);
  // ctx.drawImage(image, startX, startY, startWidth, startHeight, directionX, directionY, dw,dh)
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  /* // 让动画慢下来
  if (gameFrame % staggerFrames === 0) {
    if (frameX < 6) {
      frameX++;
    } else {
      frameX = 0;
    }
  } */

  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
