class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
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
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x = 100;
        var y = 200;
        var index = 0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y = 500;
            
            players[index -1].x = x;
            players[index - 1].y = y;

            // Differentiate the main player by printing
           /* if(index === player.index){
                fill("white");
                rectMode(CENTER);
                rect(x,y,130,60);
                
            }*/
           
            // the name of the player on the basket.
            if(index === player.index){
                fill("red");
                textSize(20);
                text(player.name,x-25,y+25);
            }
        }
        

        // Give movements for the players using arrow keys
        if(keyIsDown(LEFT_ARROW)){
            player.distance += 10;
            player.update();
          }
          if(keyIsDown(RIGHT_ARROW)){
            player.distance -= 10;
            player.update();
          }


        // Create and spawn fruits randomly
        if(frameCount%40 === 0){
            fruit = createSprite(random(100,1000),0,20,20);
            fruit.velocityY = 5;
            var rand = Math.round(random(1,5))
            switch(rand){ 
               case 1 : fruit.addImage(fruit1_img);
               break;
               case 2 : fruit.addImage(fruit2_img);
               break;
               case 3 : fruit.addImage(fruit3_img);
               break;
               case 4 : fruit.addImage(fruit4_img);
               break;
               case 5 : fruit.addImage(fruit5_img);
               break;
            }
            fruitGroup.add(fruit);
        }

        
    }

    end(){
       console.log("Game Ended");
    }
}