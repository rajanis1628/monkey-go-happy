
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var SurvivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(500,500);
  monkey=createSprite(50,400,20,20);
  monkey.addAnimation("monkey_running",monkey_running);
  monkey.scale=0.2;
  
  ground=createSprite(100,400,600,20);
  ground.x=ground.width/2;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  score=0;
  
}


function draw() {
background("green")
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  spawnobstacles();
 spawnbananas();
  
  
  if(keyDown("space")&& monkey.y>=100){
    monkey.velocityY=-12 ;
  }
  if(bananaGroup.isTouching(monkey)){
       bananaGroup.destroyEach();
    score=score+1;
  }
 monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground);

  drawSprites();
  fill("white");
  text("score:"+score,400,50);
  fill("black");
  textSize(20);
  SurvivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime:"+SurvivalTime,100,50);
  
}
function spawnobstacles(){
  if(World.frameCount%150===0){
    var obstacle=createSprite(100,350,20,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX=-5;
    obstacle.x=Math.round(random(150,300));

    obstacle.scale=0.25;
    obstacle.setLifetime=400;
    obstacleGroup.add(obstacle);
    
  }
}
function spawnbananas(){
  if(World.frameCount%160===0){
    banana=createSprite(600,500,20,10);
    banana.y=Math.round(random(150,300));
    banana.addImage("banana",bananaImage);
    banana.scale=0.2;
    banana.velocityX=-5;
    
    banana.lifetime=400;
    
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    
    bananaGroup.add(banana);
  }
    
}


