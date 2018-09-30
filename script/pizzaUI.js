
var pizzaUI = function(){
    var self = this;
    var toppingOffset = 0;
    this.game = undefined;
    window.dragflag = 0;
    window.addedToppings = [];
    this.initialize=function(){
        game = new pizzaGame();
        game.reset();
        this.setScoreBoard();
    };
    this.refreshView=function(){
        $('#pizza')
    }

    //this function generates the topping divs then a toppingdiv gets clicked
    $('.toppingdiv').mousedown(x => {
        console.log('mousedown');
        window.dragflag = 1;
        window.newtop = new topping(x.currentTarget.getAttribute('value'));
        window.addedToppings.push(window.newtop);
        console.log(window.newtop);
        dragtop(window.newtop.html);
        $(x.currentTarget).append(window.newtop.html);
        $("#"+window.newtop.id).offset({left: event.pageX, top: event.pageY});
    });

    //this function makes the topping follow the mouse when holding the topping
    //contain is just a div thats wrapped around the conveyor belt & topping divs
    $( "#contain" ).mousemove(function( event ) {
        if(window.dragflag==1){
        //dragtop(window.newtop.html);
        $("#"+window.newtop.id).offset({left: event.pageX, top: event.pageY});
        }
    });

    //this checks if user has stopped holding the topping
    $( "#contain" ).mouseup(function( event ) {
        if(window.dragflag==1){
            window.dragflag=0;
        }
    });

    //constructor for toppings, takes string id parameter 
    //toppingOff is the toppings offset from the pizza
    function topping(id) {
        this.id = id;
        this.toppingOff = 0;
        this.html = document.createElement('div');
        this.html.setAttribute('class', 'topping');
        this.html.setAttribute('id', id);
      }
    
    // enables toppings to be draggable, supposed to calculate topping offset,
    // but the stop condition isn't firing for some reason
    function dragtop(topping) {
        var t = "#"+topping.id;
        $( t ).draggable({
            stop: function(event, ui) {
                console.log("dropped");
                var toppingLoc = $(t).position().left;
                toppingOffset = toppingLoc - game.options.currentPizzaPosition;
                topping.toppingOff = toppingOffset;
            }
        }); 
        $( "#pizza" ).droppable();
        
      }

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
            game.completedPizza(game);
            $('#Score').text("Score: "+game.totalScore);
            this.setScoreBoard();
        }
        else {
            game.options.currentPizzaPosition+=1;
        }

        $('#pizza').css("left",game.options.currentPizzaPosition+'px');
        
        

            //checks if mushroom has been created
            if(window.addedToppings.length){ 

                //this iterates through toppings and adjusts their positions;
                for( i in window.addedToppings){
                var x = $("#"+window.addedToppings[i].id).position();
                var right = game.options.currentPizzaPosition+80;
                if(window.flag == 1){
                    $('#'+window.addedToppings[i].id).css("left",game.options.currentPizzaPosition + window.newtop.toppingOff +'px');
                }
                
                //checks if topping is on pizza, logic might be a little off
                if(x.left > game.options.currentPizzaPosition && x.left<right && (x.top > $('#pizza').position().top)){
                    console.log("kjf");
                    window.flag = 1;
                }
            } 
    }
        
}
    setInterval(update, 10);
    this.initialize();
}