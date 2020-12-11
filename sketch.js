const Bodies = Bodies;
const World = World;
const Engine = Engine;

var dogi, dog, happyDog, happyDogi;
var database;
var foodS, foodStock;

var addFood, feedFood;
var fedTime, lastFed;

var foodObj;

function preload()
{
  dogi = loadImage("dogImg.png");
  happyDogi = loadImage("dogImg1.png");
  happyDog = addImage(happyDogi);
  
}

function setup() {
  createCanvas(500, 500);
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = Bodies.rectangle(250,250,10,10);
  dog = addImage(dogi);

  foodObj = new Food;

  feed = createButton("Feed the dog");
  feed.positio(250,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(350,95);
  addFood.mousePressed(addFoods);

}


function draw() { 
  background(46,139,87);

fedTime=database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed=data.val();
});

  fill(225,225,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: " + lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30);
  }else{
    text("Last Feed: " + lastFed + "AM",350,30);
  }
  

  dog.display();

  happyDog.display();

  foodStock.display();

  foodObj.display();

  foodS.display();

  addFood.display();

  feedFood.display();

  fedTime.display();
  
  lastFed.display();

  textSize(20);
  fill("white");
  text("Food Stock:")
  //add styles here

}

function readStock(data){
  foodS=data.val();
} 

function writeStock(x){
if(x<=0){
  x = 0;
}
else{
   x=x-1;
}
database.red("/").update({
  Food:x
});
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
 }

