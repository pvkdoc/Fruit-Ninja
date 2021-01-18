PLAY= 1;
END= 0;
gameState= PLAY;

var fruit, monster, sword;
var gameOver, gameOverImage;
var fruit1Image, fruit2Image, fruit3Image, fruit4Image, monsterImage, swordImage;
var fruitGroup, monsterGroup;
var swordSound, gameOverSound; 
var r, position;

function preload(){
  fruit1Image= loadImage("fruit1.png");
  fruit2Image= loadImage("fruit2.png");
  fruit3Image= loadImage("fruit3.png");
  fruit4Image= loadImage("fruit4.png");
  
  monsterImage= loadImage("alien1.png");
  swordImage= loadImage("sword.png");
  
  gameOverImage= loadImage("gameover.png");
  
  swordSound= loadSound("knifeSwooshSound.mp3");
  gameOverSound= loadSound("gameover.mp3");
 
}

function setup(){
  createCanvas(600, 400);
  sword= createSprite(200, 200);
  sword.addImage(swordImage);
  sword.scale= 0.7;
  sword.debug= true;
  
  fruitGroup= new Group();
  monsterGroup= new Group();
  
  gameOver= createSprite(200, 200);
  gameOver.addImage(gameOverImage);
  gameOver.scale= 0.2;

  
  score= 0
}

function draw(){
  background("white");
   
  if(gameState === PLAY){
    fruits();
    monsters();
    sword.x= World.mouseX;
    sword.y= World.mouseY;
    gameOver.visible= false
    

    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score= score+ 1;
      swordSound.play();
    }
    
    if(monsterGroup.isTouching(sword)){
      gameState= END;
      gameOverSound.play();
    }
    
  }
  
  else if(gameState === END){
    fruitGroup.destroyEach();
    monsterGroup.destroyEach();
    fruitGroup.setVelocityYEach(0);
    monsterGroup.setVelocityYEach(0);
    fruitGroup.setLifetimeEach(0);
    monsterGroup.setLifetimeEach(0);
    
    gameOver.visible= true;
    sword.destroy();
  }
  
  drawSprites();
  text("Score: "+score, 180, 50)
  
}

function fruits(){
  if(frameCount%80 === 0){
    fruit= createSprite(400, 200);
    fruit.scale= 0.2;
  
    r= Math.round(random(1,4));
  
    if(r === 1){
      fruit.addImage(fruit1Image);
    }
  
    else if(r === 2){
      fruit.addImage(fruit2Image);
    }
  
    else if(r === 3){
      fruit.addImage(fruit3Image);
    }
  
    else{
      fruit.addImage(fruit4Image);
    }
    
    position= Math.round(random(1,2))
    
    if(position === 1){
       fruit.y= 0;
       fruit.velocityY= (7 + (score/4))
    }
    
    else if(position === 2){
       fruit.y= 400;
       fruit.velocityY= -(7 + (score/4))
    }
  
    fruit.x= Math.round(random(50, 340));
    fruit.lifetime= 100;
  
    fruitGroup.add(fruit);
    fruit.setCollider("circle", 0, 0, 20);
    
    
  }
}

function monsters(){
  if(frameCount%150 === 0){
    monster= createSprite(400, 200);
    monster.addAnimation("monster", monsterImage)
    monster.x= Math.round(random(100, 300));
    monster.velocityY= -(8+ (score/4));
    monster.lifetime= 100;
    
    monsterGroup.add(monster);
    monster.setCollider("circle", 0, 0, 20);
    
  }
}
