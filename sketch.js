//create all the variables 

var scene;
var pc,pcimg;
var co1,co2,co3; 
var bulletimg,bullet,bulletGrp;
var points = 0;
var covidgrp,covid;
var sound1 ; 
var inv; 
var gameState="serve";


function preload(){
  //loading images
  scene = loadImage("city.jpg");
  pcimg=loadImage("alien.png");
  co1=loadImage("corona 1.png");
  co2=loadImage("corona 2.png");
  co3=loadImage("corona 3.png");
  bulletimg=loadImage("red.png");
  sound1=loadSound("sound.mp3");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
 
  //sprite for player 
  pc=createSprite(displayWidth/10,500,10,10);
  pc.addImage(pcimg);
  pc.scale=1.3;
  
  
  //groups for covid and bullet
  covidgrp = createGroup();
  grp3 = createGroup();
  grp2 = createGroup();
  bulletGrp=createGroup();
  //console.log(covidgrp);

  //invisible line at the bottom of the canvas 
  inv = createSprite(displayWidth/2,displayHeight,displayWidth,1);
  inv.visible=false;
  }

function draw() {

  background("white");

    image(scene, 0,0,displayWidth, displayHeight); 
    camera.position.x=displayWidth/2;


    //if the gameState is serve

    if(gameState==="serve"){
     fill("blue");
     textSize(35);
     textFont("Castellar");
     text("SAVE THE WORLD : THE WORLD IS IN YOUR HANDS" , displayWidth/5,displayHeight /2-300);
     textFont("Calibri")
     textSize(25);
     fill("black")
      text("Welcome to SAVE THE WORLD ! You are a corona warrior and now its your responsibitily to save the world from this dangerous disease.",displayWidth/44,displayHeight/2-100) ;
      text("Press the space key to shoot and start the game and up and down arrow keys to move.",displayWidth/5,displayHeight/2-70);
      text("If the virus reaches the city, your points will decrease.",displayWidth/3,displayHeight/2-40)
      text("Our corona warriors are trying their best to protect the world,but 20% of the world is still suffering. ",displayWidth/7,displayHeight/2-10);
      text("Therefore you wont be able to shoot all the virues , but try your best !! ",displayWidth/4,displayHeight/2+20);
      text("This game depicts the exact situation of today.",displayWidth/3,displayHeight/2+50)
      text("As soon as you score 2000 points,the game will end and maximum viruses will be dead. Press the S key to restart .",displayWidth/10,displayHeight/2+80)
      textFont("Castellar");
      textSize(30)
      text("ALL THE BEST!",displayWidth/2.5,displayHeight/2+150);
    }
    
    pc.visible = false ;

//condition for changing the states 
if(keyDown("space")&&gameState==="serve"){
  gameState = "play"
}

//if gameState is play 

if(gameState==="play"){
  
  //display points 
  fill("white");
  textSize(30);
  text("POINTS: "+points ,displayWidth-displayWidth/7,camera.position.y+300);

  //creating bullet

  if(keyDown("space")){
    createBullet();
    sound1.play();
  }

  pc.visible = true ;

  if(keyWentDown(UP_ARROW)){
    pc.velocityY = -15;
  }
  if(keyWentUp(UP_ARROW)){
    pc.velocityY = 0 ;
   
  }
  if(keyWentDown(DOWN_ARROW)){
    pc.velocityY = 15;
   
  }
  if(keyWentUp(DOWN_ARROW)){
    pc.velocityY = 0;
  }
    
  //creating covid 

    if(frameCount%50===0){
      covid = createSprite(random(displayWidth/5,displayWidth),0);
      console.log(covid);
      var rand = Math.round(random(1,3));
      covid.velocityY=random(3,15);
      covidgrp.add(covid);
      switch(rand){
          case 1 : covid.addImage(co1) ;
          covid.scale =0.2;
          break;
          case 2 : covid.addImage(co2);
          covid.scale = 0.3;
          break;
          case 3 : covid.addImage(co3) ;
          covid.scale = 0.2;
          break;
          default:break;
          }
        }


        if(bulletGrp.isTouching(covidgrp)){
          covid.destroy();  
          points+=10;
        }  

        //for avoiding memory leakage 
        if(inv.isTouching(covidgrp)){
          covid.destroy();  
          points = points - 1 ;
          covid.destroy();
        }  

        //adaptivity

        if(points>500){
          covid.velocityY = random(10,20);
          
        }
        if(points>1000){
          covid.velocityY = random(15,30);
        }
        if(points>1500){
          covid.velocityY = random(20,35);
        }
  
        //condition of changing state

        if(points>2000){ 
          gameState = "end";
        }
    
  }

  // If gameState is end 
if(gameState==="end"){
  pc.visible=false;
  points = 0;
  covidgrp.destroyEach();
  fill("blue");
     textSize(30);
     textFont("Castellar");
      text("Yayyyy!! You did it.You tried your best to free the world with COVID-19.",displayWidth/20,displayHeight/2-150) ;
      text("YOUR MISSION IS ACCOMPLISHED!",displayWidth/3,displayHeight/2-110)
      textSize(25);
      fill("red");
      textFont("TimesNewRoman")
      text("'Hope can be a powerful force. Maybe there’s no actual magic in it, but when you know what you hope for most and hold it like a light within you, ",displayWidth/70,displayHeight/2-20);
      text("you can make things happen, almost like magic.'",displayWidth/3,displayHeight/2+10);
      textSize(25);
      fill("blue");
      text("Keep hope ! One day life will be back to normal. Stay Home !Stay Safe",displayWidth/4,displayHeight/2+50);


      //restarting the game 
      if(keyDown("s")){
        gameState="serve";
        pc.visible=true;
      }
}


     drawSprites();
    
    }

    // creating a bullet 
   function createBullet(){
    
    bullet = createSprite(pc.x+90,pc.y+10,10,10);
    bulletGrp.add(bullet);
    bullet.addImage(bulletimg);
      bullet.rotation = 270;
      bullet.scale=0.04;
      bullet.x=pc.x+90;
      bullet.y=pc.y+10;
      bullet.velocityX = 100;
      bullet.lifetime=400;
      return bullet;
    }
