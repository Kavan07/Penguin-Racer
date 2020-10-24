// names of game elements:~
var penguin;
var bear;
var obstacle;
var meter;
var metered;
var meter2;
var meter3;
var meter4;
var pointer;
var state = "serve";
var pointerSpeed = 2;
var obstacleSpeed = -5;
var obstacleGroup;
var penguinVY = 14;

// to load Images :~
function preload() {
  bgIMG = loadImage("bg.png");
  bgIMG2 = loadImage("bg2.png");
  penguinIMG = loadImage("penguin.png");
  bearIMG = loadImage("polar bear.png");
  endIMG = loadImage("finishline.png");
  bear2IMG = loadImage("bear2.png");
  bear3IMG = loadImage("bear3.png");
  obstacleIMG = loadImage("rock.png");
}

// to draw game objects :~
function setup() {
// to create canvas or stage :~
  createCanvas(800, 400);
  
// to create background 1 as a part of moving backgrounds :~  
  bg = createSprite(400, 200, 800, 400);
  bg.addImage(bgIMG)
  bg.scale = 1;
  
// to create background 2 as a part of moving backgrounds :~  
  bg2 = createSprite(1200, 200, 800, 400);
  bg2.addImage(bgIMG2)
  bg2.scale = 1;
  
// to create a group for obstacles :~
  obstacleGroup = createGroup();
  
// to create an object for player to control :~
  penguin = createSprite(355, 350, 20, 20);
  penguin.addImage(penguinIMG);
  
// to create a ground for the penguin to slide on :~
  ground = createSprite(400, 400, 800, 5);
  ground.shapeColor = color(235);

// to create an object for chasing the player :~  
  bear = createSprite(5, 320, 30, 30);
  bear.addImage(bearIMG);
  bear.scale = 0.4;
  
// to create finishline :~  
  endline = createSprite(9000, 300, 40, 40);
  endline.scale = 1.3;
  endline.addImage(endIMG);
// to create a meter with a pointer that will point three zonesgreen, yellow, and red (from line 55 to 71) :~
  meter = createSprite(455, 80, 10, 35);
  meter.shapeColor = color("brown")

  metered = createSprite(455, 180, 10, 35);
  metered.shapeColor = color("brown")

  meter2 = createSprite(455, 130, 10, 25);
  meter2.shapeColor = color("green")

  meter3 = createSprite(455, 105, 10, 22);
  meter3.shapeColor = color("yellow")

  meter4 = createSprite(455, 155, 10, 22);
  meter4.shapeColor = color("yellow")

  pointer = createSprite(455, 80, 30, 10);
  pointer.shapeColor = color("blue");
  
  bgsprite = createSprite(400, 300, 800, 600);
  bgsprite.shapeColor = color("black");
  
  // condition to invisible the other objects in serve state :~  
  if (state === "serve") {
    meter.visible = false;
    metered.visible = false;
    meter4.visible = false;
    meter3.visible = false;
    meter2.visible = false;
    pointer.visible = false;
    penguin.visible = false;
    bear.visible = false;
  }
}

function draw() {

// to draw background :~
  background("black")
  
// fill statement :~
  fill("yellow");
  
// to check the colliders :~  
  bear.debug = false;
  penguin.debug = false;
  ground.debug = false;
  obstacleGroup.debug = false;
  penguin.setCollider("circle", 10, -35);

// to start the game  
  if (keyWentDown(SHIFT)) {
     state = "play"
  }
  
// condition to invisible the background in serve state :~  
  if (state === "serve") {
    bgsprite.visible = true;
  }

// conditions if the game is started  
  if (state === "play") {
    
    // to give gravity to the penguin :~
    penguin.y = penguin.y + 7;
    
    // firstly to make the game objects visible when the game is started :~
    penguin.visible = true;
    bear.visible = true;
    meter.visible = true;
    metered.visible = true;
    meter4.visible = true;
    meter3.visible = true;
    meter2.visible = true;
    pointer.visible = true;
    bgsprite.visible = false;
    
    // then to give velocity or speed to the objects and the background when the game is started :~
    endline.velocityX = -5;
    pointer.velocityX = 0;
    pointer.velocityY = pointerSpeed;
    bear.velocityX = 0.2;
    bg.velocityX = -3;
    bg2.velocityX = -3;
    
    // to make the penguin jump when the obstacles come :~
    if(keyIsDown(UP_ARROW)) {
       penguin.y = penguin.y - penguinVY;
       }
    
    if(penguin.y <= 100) {
       penguinVY = 0;
       }
    
    if(penguin.y > 354) {
       penguinVY = 14;
       }

    // to make a continuous movement of the background 1 and the background 2 to make the user see penguin moving but actually background is moving 😎 (from line 133 to line 140) :~
    if (bg.x <= -400) {
      bg.x = 1200;
    }

    if (bg2.x <= -400) {
      bg2.x = 1200;
    }

    // condition to make the pointer moving up and down through the meter (from line 142 to line 151) :~
    if (pointer.y >= 197.5) {
      pointerSpeed = pointerSpeed * -1;
      pointer.velocityY = pointerSpeed;
    }

    if (pointer.y <= 62.5) {
      pointerSpeed = pointerSpeed * -1;
      pointer.velocityY = pointerSpeed;
    }

    // condition for when we press space and the pointer is on the green zone or the red zone or the yellow zone and then reset the pointer (from line 153 to line 177) :~
    if (keyWentDown(32) && (pointer.y >= 118.5 && pointer.y <= 142.5)) {
      bear.x -= 10;
      pointerReset();
    }

    if (keyWentDown(32) && (pointer.y >= 95 && pointer.y <= 115)) {
      bear.x -= 6;
      pointerReset();
    }

    if (keyWentDown(32) && (pointer.y >= 62.5 && pointer.y <= 97.5)) {
      bear.x += 4;
      pointerReset();
    }

    if (keyWentDown(32) && (pointer.y >= 145 && pointer.y <= 165)) {
      bear.x -= 6;
      pointerReset();
    }

    if (keyWentDown(32) && (pointer.y >= 162.5 && pointer.y <= 194.5)) {
      bear.x += 4;
      pointerReset();
    }

    // condition to end the game when bear touches the penguin and to show that bear ate the penguin :~
    if(bear.isTouching(penguin)) {
       state = "end";
       bear.addImage(bear2IMG);
       bear.scale = 0.9;
       end();
       }
    
    // function to spawn the obstacles :~
    spawnObstacles();
  }
  
  // condition to end the game when the penguin escapes from the bear to the finish line or its igloo :~
  if(penguin.isTouching(endline)) {
       state = "end";
       bear.addImage(bear3IMG);
       bear.x = 105;
       bear.scale = 1;
       end();
       }
        
  // to reset the game when the game is ended :~
  if(keyWentDown(ENTER) && state === "end") {
     reset();
     }
  
  // function to make the penguin to collide with the ground :~
  penguin.collide(ground);
  
  if(penguin.collide(obstacleGroup)) {
     end();
     state = "end";
     bear.x = 300
     bear.addImage(bear2IMG);
     bear.scale = 0.9;
     }
  
  // function to draw the game objects :~
  drawSprites();

  // condition to write the instructions for the player that will tell him how the game works and about its game story (from line 208 to line 215):~
  if (state === "serve") {
    textSize(16);
    text("kindly read the following instructions to play the game :~", 70, 50);
    text("   1. if you click space when the pointer comes to brown, it will be counted as a mistake \n       and the bear will be faster for a second.", 70, 110);
    text("   2. if you click space when the pointer comes to green, you will be fastest for a second.", 70, 160);
    text("   3. if you click space when the pointer comes to yellow, you will be a little faster for a second.", 70, 200);
    text("   4. help the penguin escape from the polar bear and reach to its igloo by the above notes.", 70, 240);
    text("   5. beware of rocks, the game will end if you collide to them. To jump above them, press up arrow", 70, 280);
    text("   6. press shift key to start the game", 70, 320);
  }
  
  // condition to write the instructions for the player to play again when the game ends :~
  if(state === "end") {
     text("press Enter to play again", 400, 300);
     }
  
  // conditions to let the player know that he won or lost (from line 222 to line 229):~
   if(bear.isTouching(penguin) && state === "end") {
       text("you lost", 400, 200);
       }
  
   if(penguin.isTouching(endline) && state === "end") {
       text("you win", 400, 200);
       }
}

// function to reset the pointer when we press space and increase its speed in very little quantity :~
function pointerReset() {
  pointer.x = 455;
  pointer.y = 63;
  pointerSpeed += 0.1;
  pointer.velocityY = pointerSpeed;
}

// function to use when the game ends :~
function end() {
  bear.velocityX = 0;
  bg.velocityX = 0;
  bg2.velocityX = 0;
  endline.velocityX = 0;
  penguin.x = 10000;
  pointer.velocityY = 0;
  obstacleGroup.setVelocityEach(0, 0);
}

// function to reset the game :~
function reset() {
  state = "serve";
  bear.x = 3;
  penguin.x = 355;
  endline.x = 9000;
  bear.scale = 0.4;
  pointer.y = 80;
  bear.addImage(bearIMG);
  pointerSpeed = 2;
  obstacleSpeed = -5;
  bear.x = 5;
}

// function to spawn the obstacles at random position :~
function spawnObstacles() {
  if((frameCount % 350 === 0) && (state === "play")) {
     obstacle = createSprite(random(1050, 3200), 355, 30, 30);
     obstacle.addImage(obstacleIMG);
     obstacle.scale = 0.2;
     obstacle.velocityX = obstacleSpeed;
     obstacleGroup.add(obstacle);
     obstacle.setCollider("circle", 20, 80);
     }
}
