var pizzaUI = function(){
    var self = this;
    var toppingOffset = 0;
    this.game = undefined;
    this.initialize=function(){
        game = new pizzaGame();
        game.reset();
        this.setScoreBoard();
    };
    this.refreshView=function(){
        $('#pizza')
    }
    $('.toppingdiv').click(x => {
        console.log(x);
        console.log(x.delegateTarget);

        console.log('topping clicked');
        var newtop = document.createElement('div');
        
        newtop.setAttribute('class', 'topping');
        newtop.setAttribute('id', 'mushroom');
        $('#mushroom').position({
            my: "center",
            at: "center",
            of: x.delegateTarget
        });
         $(x.delegateTarget).append(newtop);
         $( "#mushroom" ).draggable({
            stop: function(event, ui) {
                console.log(event, ui);
                console.log("dropped");
                var toppingLoc = $("#mushroom").position().left;
                toppingOffset = toppingLoc - game.options.currentPizzaPosition;
            }
        });
        $( "#pizza" ).droppable();
    });
    this.setScoreBoard = function(){
        /*
        This handles creating a functional scoreboard that generates random combinations of the available 
        toppings as well as keeps track of the score for the player to see.
        */
        game.randomizeDesiredElements(game);//This randomizes the toppings, see pizza.js
        let toppingNumber = 1; //This references where in the div the topping will be placed (1st one, 2nd one, etc)
        let toppingQuantity = 1; //This tracks the total amount of one topping
        let topping = ""; //This is the topping being tracked rn
        let currTopping = ""; //This is the topping that is at the current address in the currentToppings array.
        for (var changeBack = 1; changeBack<9;changeBack++){
            //Reverts all divs back to empty so that we don't have leftovers from the last round.
            $('#ToppingName'+changeBack.toString()).text("");
        }
        for (var i = 0; i<game.currentToppings.length; i++){
            currTopping = game.currentToppings[i];
            if (currTopping!=topping){
                if (topping !== ""){
                    //This handles putting the topping into the scorebord on the div
                    $('#ToppingName'+toppingNumber.toString()).text(topping+": "+toppingQuantity.toString());
                    toppingNumber+=1;
                }
                topping = currTopping;
                toppingQuantity = 1;
            }
            else{
                toppingQuantity +=1;
            }
        }
        //Next one is the last topping. If there is only one topping, this will be the only one to be filled
        $('#ToppingName'+toppingNumber.toString()).text(topping+": "+toppingQuantity.toString());
        $('#Score').text("Score: "+game.totalScore);
    }

    this.update = function(){
        /*
        This handles incrementing the pizza across the conveyor belt.
        */
        if ($('#maingame').width()  < game.options.currentPizzaPosition) {
            game.options.currentPizzaPosition=-($('#maingame').width()* .28);
            game.completedPizza(game); //Update this for when we have toppings to allow for losing.
            this.setScoreBoard(); //Added everything for setting the score to a single function.
            console.log("here1")
        }
        else {
            game.options.currentPizzaPosition+=1;
        }
        $('#pizza').css("left",game.options.currentPizzaPosition+'px');

        //this if checks if topping has been created
        if($("#mushroom").length){ 
        var x = $('#mushroom').position();
        //console.log(x, game.options.currentPizzaPosition);
        var right = game.options.currentPizzaPosition+70;
        
        if(window.flag == 1){
            $('#mushroom').css("left",game.options.currentPizzaPosition + toppingOffset +'px');
        } 
        
        if(x.left > game.options.currentPizzaPosition && x.left<right && (x.top > $('#pizza').position().top)){
            console.log("kjf");
            window.flag = 1;
        }
    }
}
    setInterval(update, 2);
    this.initialize();
}