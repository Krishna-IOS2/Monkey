
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score
var survivaltime;
var PLAY;
var END;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(500, 420);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 100000000, 10);
  ground.velocityX = -4;
 
 survivaltime = 0;
  
  //monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
    //monkey.debug = true
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}

function draw() {
 background("white")

   
  monkey.collide(ground);
  
   textSize(20);
   fill("black");
   survivaltime=Math.ceil(frameCount/frameRate())
   text("Survival Time"+ survivaltime, 150, 50);

 if (gameState === PLAY) {
     
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -12;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.80;
  
   
     obstacles();
     bananas();
  
   if (obstacleGroup.isTouching(monkey)) {
     gameState = END;
     obstacleGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setVelocityXEach(0);
     FoodGroup.setLifetimeEach(-1);
     
   }
  
 }
    if (gameState === END) {
     monkey.velocityX = 0;
     FoodGroup.velocityX = 0;
     ground.velocityX = 0;
     
   }
 
  
  
  drawSprites();
  
}
        

function bananas() {
 if (frameCount % 60 === 0) {
    var banana1 = createSprite(600,120,40,10);
    banana1.y = Math.round(random(80,120));
    banana1.addImage(bananaImage);
   FoodGroup.add(banana1);
    banana1.scale = 0.1;
    banana1.velocityX = -3;
   banana1.lifetime = 150;
 }
}

function obstacles() {
  if (frameCount % 180 === 0) {
   var  obstacle1 = createSprite(600,330,10,40);
   obstacle1.velocityX = -6;
    obstacle1.addImage(obstaceImage);
    obstacleGroup.add(obstacle1);
    obstacle1.scale = 0.1;
  obstacle1.lifetime = 150;
  }
}
  
