//Global Variables
  var Monkey,banana,bananaGroup,stoneGroup,ground,backGround,points;
 
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
//background
  Backdrop = loadImage("jungle.jpg");
  
//monkeymations  
  monkey_Walk = loadAnimation               ("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png" ,"Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  //stopped = loadImage("Monkey_01.png")
  
//bananamage
  banana_Float = loadImage("Banana.png");
  
//stonemage
  stone_Block = loadImage("stone.png");  
}


function setup() {
//to make a canvas  
  createCanvas(600,300);
  
  bananaGroup = new Group();
  stoneGroup = new Group();
  
//sprites
 //Background
   backGround = createSprite(300, 20, 1200, 600);
   backGround.addImage("jungle.jpg", Backdrop);
   backGround.scale = 1.2;
   backGround.velocityX = -4;
   backGround.x = backGround.width/2;
  
 //Monkey
   monkey = createSprite(50, 200, 20, 20);
   monkey.addAnimation("monkey_Walk", monkey_Walk);
   monkey.scale = 0.1;
      
 //ground
   ground = createSprite(300, 235, 1200, 10);
   ground.velocityX = -4;
   ground.x = ground.width/2;
   ground.visible = false;
  
 //initial scoring
   points = 2;
}


function draw(){
 background(255);
  
 rand = random(90, 120);
  
  //keeping monkey on ground 
       monkey.collide(ground);
 
  //reseting ground
    if (ground.x < 0) {
        ground.x = 300;
    }
  
//states
  if(gameState === PLAY){
    
      backGround.velocityX = -4;
  
     //reset background
      if(backGround.x < 0){
         backGround.x = 300;
      }
  
     //making monkey jump
       if (keyDown("space") && monkey.y >= 175) {
           monkey.velocityY = -10;
       }      
  
     //adding gravity 
       monkey.velocityY = monkey.velocityY + 0.50;  
    
     //the Functions
       BlockMonkey();
       PutBanana();
  
     //banana's case
       if(bananaGroup.isTouching(monkey)) {
          bananaGroup.destroyEach();
          increaseScore();
       
          switch(points){
              case 10: monkey.scale = 0.12;
                     break;
              case 20: monkey.scale = 0.14;
                     break;
              case 30: monkey.scale = 0.16;
                     break;
              case 40: monkey.scale = 0.18;
                     break;
              default : break;     
          } 
       } 
    
       if(stoneGroup.isTouching(monkey)){
          scaleUp();
          points = points - 2;
       }
    
       if(points === 0){
          gameState = END;
       }
  
    
 }else if(gameState === END){
          backGround.velocityX = 0;
          monkey.velocityX = 0;
   
          }
          if(keyDown("r") && gameState === END){
             gameState = PLAY;
             monkey.y = 195;
             stoneGroup.destroyEach();
             points = points + 2;
        }
  
   drawSprites();
  
  if(gameState === END){
     stroke("black");
     textSize(25);
     fill("white");
     text("Game Over", 200, 50);
     text("Click 'r' to reset", 175, 100);
  }
  
     stroke("black");
     textSize(25);
     fill("white");
     text("Health:" + points , 400, 20);
           
}

function BlockMonkey(){
  if (frameCount % 300 === 0) {
      var stone = createSprite(620, 220);
          stone.addImage(stone_Block);
          stone.scale = 0.1;
          stone.velocityX = -4;
          stone.lifetime = 170;
    
          stoneGroup.add(stone);
  }       
} 

function PutBanana() {
  if (frameCount % 150 === 0) {
      var  banana = createSprite(600, rand);
           banana.addImage(banana_Float);
           banana.scale = 0.1;
           banana.velocityX = -4;
           banana.lifetime = 170;
    
           bananaGroup.add(banana);      
  }   
} 

function increaseScore(){
  points = points + 2; 
}

function scaleUp(){
  monkey.scale = 0.1; 
}