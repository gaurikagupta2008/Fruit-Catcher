class Game{
    constructor(){}
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data) {
        gameState = data.val();
        })
    }
    update(state) {
        database.ref('/').update({
        gameState: state
        })
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(300,500);
    player1.addImage("player1",player_img);
    player2 = createSprite(700,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];
    }
    play(){
        form.hide();
        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x=900;
        var y=200;
        var index=0;
        drawSprites();
        for(var plr in allPlayers){
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            players[index-1].x = x;
            players[index-1].y = y;
            strokeWeight(40);
            textSize(20);
            fill("black");
            if(index===player.index){
              text(allPlayers[plr].name,x-25,y+25)
            }
        }
        if(keyIsDown(RIGHT_ARROW)&&player.index!==null){
        player.distance -=10
        player.update();
        }
        if(keyIsDown(LEFT_ARROW)&&player.index!==null){
        player.distance +=10
        player.update(); 
        }

    //Creating the fruits randomly
    if(frameCount%20===0){
       fruits=createSprite((random(0,1000)),100,100,100);
       fruits.velocityY=5;
       var rand=Math.round(random(1,5));
           //Displaying the texts
           fill("white");
           text("SCORE for PLAYER 1"+(" : ") + player1score,100,100);
           text("SCORE for PLAYER 2"+(" : ") + player2score,700,100);
       switch(rand){
       case 1:fruits.addImage("fruit1",fruit1_img);
       break;
       case 2:fruits.addImage("fruit1",fruit2_img);
       break;
       case 3:fruits.addImage("fruit1",fruit3_img);
       break;
       case 4:fruits.addImage("fruit1",fruit4_img);
       break;    
       case 5:fruits.addImage("fruit1",fruit5_img);
       break;  
       }
       fruits.lifetime=600;
       fruitGroup.add(fruits);
    }

    //Making the fruits dissapear when touching the baskets and incrementing the score  
    if(player.index!==null){
        for(var i=0; i<fruitGroup.length; i++){
            if(fruitGroup[i].isTouching(players)){
               fruitGroup[i].destroy();
               //player.score=player.score+5;
               player1score=player1score+5;
               player.update();
                player2score=player2score+5;
                player.update();
             }
            
        }
      }
    
}

    end(){
       console.log("Game Ended");
    }
}
