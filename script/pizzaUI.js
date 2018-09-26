var pizzaUI = function(){

    console.log("here");

    var self = this;
    var toppingOffset = 0;
    this.game = undefined;
    this.initialize=function(){
        game = new pizzaGame();
        game.reset();

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
    // $(function() {
    //     $( "#topping" ).draggable({
    //         stop: function(event, ui) {
    //             console.log("dropped");
    //             var toppingLoc = $("#topping").position().left;
    //             toppingOffset = toppingLoc - game.options.currentPizzaPosition;
    //         }
    //     });
    //     $( "#pizza" ).droppable();
    //   });
    
    this.update = function(){
        /*
        This handles incrementing the pizza across the conveyor belt.
        */
        if ($('#maingame').width()  < game.options.currentPizzaPosition*1.25) {
            game.options.currentPizzaPosition=-($('#maingame').width()* .03);
            game.completedPizza(game);
            console.log(game.totalScore);
            $('#Score').text("Score: "+game.totalScore);

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
    setInterval(update, 10);
    this.initialize();
    
}