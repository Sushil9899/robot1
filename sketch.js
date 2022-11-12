const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;

var boy,boy_run,boy_jump,boy_collide,boy_stand,boy_slide,boy_fall
var ground,backgroundImg,road,road2
var logG,log,bombG,bomb,spikeG,spike

var PLAY = 1;
var END = 0;
var gameState = SERVE;
var SERVE = 2
var startB

var jumpb
var bg,jumps,wins,overs
var obstacle_1G,bullet,bulletImg, blastImg

var score = 0
var form,formImg,wins
var bulletGroup,peopleGroup,peopleGroup1,peopleGroup2,p1,p2,p3,shootb,blastImg1,blastImg2,blastImg3,blast,scream

function preload(){

  boy_stand = loadAnimation('stand.png')
 boy_run = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png",)
boy_slide = loadImage("car.png")
 boy_fall = loadAnimation(
 "fall.png")
 
 formImg = loadImage("lives.png")


 blastImg = loadImage("blast.png")
 bulletImg = loadImage("bullet.png")

 blastImg1 = loadImage("dead.png")
 blastImg2 = loadImage("dead.png")
 blastImg3 = loadImage("dead.png")

backgroundImg = loadImage("bg.jpeg")

bg = loadSound("da.mp3")
jumps = loadSound("jump.wav")
wins = loadSound("win.mp3")
overs = loadSound("over.wav")
blast = loadSound("blast (1).wav")
scream = loadSound("start.wav")

logImg = loadImage("enemy.png")
p1 = loadImage("man.png")
p2 = loadImage("man2.png")
p3 = loadImage("man3.png")


boy_run.playing = true

boy_fall.looping = false

  


}

function setup(){
  var isMobile = /iPhone | iPad | iPod | Android /i.test(navigator.userAgent) 
  if(isMobile){
 
   canW = displayWidth
   canH = displayHeight
   createCanvas(displayWidth+80,displayHeight)
  }
 
  else{
 
   canW = windowWidth
   canH = windowHeight
 
   createCanvas(windowWidth,windowHeight)
  }
  frameRate(50);
  bg.loop()
  engine = Engine.create();
  world = engine.world;
  scream.loop()


  ground = createSprite(670,300)
  ground.addImage(backgroundImg)
 ground.scale = 2

 form = createSprite(1000,620)
 form.addImage(formImg)
 form.scale = 0.6
 //ground.velocityX = -6

  boy = createSprite(160,530)
   boy.addAnimation("stand",boy_stand)
  boy.frameDelay = 49
  boy.scale = 0.5
 
  boy.addAnimation("run",boy_run)
  
  boy.addAnimation("fall",boy_fall)
  boy.addAnimation("slide",boy_slide)
  

  startB = createImg('start.png')
  startB.position(100,200)
  startB.size(200,100)
  startB.mouseClicked(start)

  jumpb = createImg('jb.png')
  jumpb.position(10,500)
  jumpb.size(50,50)
  jumpb.mouseClicked(jump)

  shootb = createImg('shoot1.png')
  shootb.position(60,500)
  shootb.size(50,50)
  shootb.mouseClicked(shoot)

  rb = createImg('robot.png')
  rb.position(30,420)
  rb.size(50,50)
  rb.mouseClicked(change)
  

  obstacle_1G = createGroup ()
  bulletGroup = createGroup()
  peopleGroup = createGroup() 
  peopleGroup1 = createGroup() 
  peopleGroup2 = createGroup() 


road = createSprite(100,650,10000,2)
road.visible = false
console.log(boy.y)

boy.setCollider("rectangle",-800,0,0,200);

}

function draw(){

  background("black")
  
  Engine.update(engine);
  drawSprites()
  jumpb.size(0,0)
  shootb.size(0,0)
  //camera.position.x = boy.x
  //camera.position.y = boy.y
  if(gameState === PLAY){
   if (ground.x < -280){
    ground.x = ground.width/0.9;
  }


  boy.velocityY = boy.velocityY + 0.6
  jumpb.size(50,50)
  shootb.size(50,50)
 startB.size(0,0)

 if(obstacle_1G.isTouching(boy)){
  gameState = END
  overs.play()
  
}

fill("black")
textSize(60)
text("Score: "+score,20,330)
score = score+Math.round(frameCount / 60 )


spawnClouds()
  }
  mans()
  man1()
  man2()
 boy.collide(road)
 if(score>10000){
 win()
 score = 10000
 wins.play()
 gameState = SERVE
 boy.changeAnimation("stand")
 ground.velocityX = 0
 peopleGroup.destroyEach()
 peopleGroup1.destroyEach()
 peopleGroup2.destroyEach()
 
 
}
 //}
 
   if(gameState === END){

    boy.changeAnimation('fall')
    ground.velocityX = 0
    bg.stop()
      bulletGroup.destroyEach()
  obstacle_1G.destroyEach()
  peopleGroup.destroyEach()
  peopleGroup1.destroyEach()
  peopleGroup2.destroyEach()
  reset()
  blast.play()

    }
   
  
 
    if(obstacle_1G.collide(bulletGroup)){
      handleBubbleCollision(obstacle_1G);
      blast.play()
    }

    if(peopleGroup.collide(bulletGroup)){
      handleBubbleCollision1(peopleGroup);
      blast.play()
    }

    if(peopleGroup1.collide(bulletGroup)){
      handleBubbleCollision2(peopleGroup1);
      blast.play()
    }

    if(peopleGroup2.collide(bulletGroup)){
      handleBubbleCollision3(peopleGroup2);
      blast.play()
    }
   
}


function start(){
  gameState = PLAY
  ground.velocityX  = -10
  boy.changeAnimation('run')
  form.scale = 0
  
}

function over(){

  boy.changeAnimation()
  ground.velocityX = 0 

}
 function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount %200 === 0) {
    var cloud = createSprite(1200,500,40,10);
    cloud.addImage(logImg)
    cloud.y = Math.round(random(560,660))
    cloud.scale = 0.4;
    cloud.velocityX = -10;
    cloud.depth = boy.depth
    boy.depth = boy.depth + 1;
    cloud.lifetime = 200
    obstacle_1G.add(cloud)
  }}

function jump(){

 boy.changeAnimation("slide")
  
  
  
  jumps.play()
}
function change(){
  boy.changeAnimation("run")
}

function shoot(){

  shootBullet()
 }

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= boy.y-20
  bullet.addImage(bulletImg)
  bullet.scale=1
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function reset() {
  swal(
    {
      title: `GAME OVER`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://i.pinimg.com/474x/4a/9a/fb/4a9afb3439c72786a8000181d99d0e22.jpg",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
  bg.stop()
} 
function win() {
  swal(
    {
      title: `YOU WIN`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://cdn3.iconfinder.com/data/icons/kids-flat-colorful/2048/5546_-_Winning_Award-512.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

bg.stop()
scream.stop()
  
} 
function handleBubbleCollision(obstacle_1G){
 

   blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg) 

  /* blast= sprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg) */

  /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.add(blastImg) */

  /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
  image(blastImg) */
  
  blast.scale=0.3
  blast.life=20
  bulletGroup.destroyEach()
  obstacle_1G.destroyEach()
}
function handleBubbleCollision1(peopleGroup){
 

  blast= createSprite(bullet.x+60, bullet.y, 50,50);
 blast.addImage(blastImg1) 

 /* blast= sprite(bullet.x+60, bullet.y, 50,50);
 blast.addImage(blastImg) */

 /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
 blast.add(blastImg) */

 /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
 image(blastImg) */
 
 blast.scale=0.3
 blast.life=20
 bulletGroup.destroyEach()
 peopleGroup.destroyEach()
}
function handleBubbleCollision2(peopleGroup1){
 

  blast= createSprite(bullet.x+60, bullet.y, 50,50);
 blast.addImage(blastImg1) 

 /* blast= sprite(bullet.x+60, bullet.y, 50,50);
 blast.addImage(blastImg) */

 /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
 blast.add(blastImg) */

 /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
 image(blastImg) */
 
 blast.scale=0.3
 blast.life=20
 bulletGroup.destroyEach()
 peopleGroup1.destroyEach()
}
function handleBubbleCollision3(peopleGroup2){
 

  blast= createSprite(bullet.x+60, bullet.y, 50,50);
 blast.addImage(blastImg1) 

 /* blast= sprite(bullet.x+60, bullet.y, 50,50);
 blast.addImage(blastImg) */

 /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
 blast.add(blastImg) */

 /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
 image(blastImg) */
 
 blast.scale=0.3
 blast.life=20
 bulletGroup.destroyEach()
 peopleGroup2.destroyEach()
}

function mans() {
  //write code here to spawn the clouds
  if (frameCount % 360 === 0) {
    var man = createSprite(1200,500,40,10);
    man.addImage(p1)
    man.y = Math.round(random(460,560))
    man.scale = 0.4;
    man.velocityX = -15;
    man.depth = boy.depth
    boy.depth = boy.depth + 1;
    man.lifetime = 200
   peopleGroup.add(man)
  }}

  function man1() {
    //write code here to spawn the clouds
    if (frameCount % 180 === 0) {
      var man1 = createSprite(1200,500,40,10);
      man1.addImage(p2)
      man1.y = Math.round(random(560,660))
      man1.scale = 0.4;
      man1.velocityX = -15;
      man1.depth = boy.depth
      boy.depth = boy.depth + 1;
      man1.lifetime = 200
     peopleGroup1.add(man1)
    }}

    function man2() {
      //write code here to spawn the clouds
      if (frameCount % 260 === 0) {
        var man2 = createSprite(1200,500,40,10);
        man2.addImage(p3)
        man2.y = Math.round(random(560,620))
        man2.scale = 0.4;
        man2.velocityX = -15;
        man2.depth = boy.depth
        boy.depth = boy.depth + 1;
        man2.lifetime = 200
       peopleGroup2.add(man2)
      }}