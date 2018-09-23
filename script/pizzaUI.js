var pizzaUI = function(){
    console.log("here"
)
    var self = this;
    this.game = undefined;
    let width = $('#background').width;
    console.log($('#maingame').width()  );
    // var clientHeight = document.getElementById('myDiv').clientHeight;
    // console.log(clientHeight)
    this.initialize=function(){
        game = new pizzaGame();
        game.reset();
    };
    this.refreshView=function(){
    }
    this.update = function(){
        /*
        This handles incrementing the pizza across the conveyor belt.
        */
        if ($('#maingame').width()  < game.options.currentPizzaPosition*11) {
            game.options.currentPizzaPosition=-($('#maingame').width()* .01);
            game.completedPizza(game);
            console.log(game.totalScore);
            document.getElementById('Score').innerHTML = "Score: "+game.totalScore;
        }
        else {
            game.options.currentPizzaPosition+=1;
        }
        $('#pizza').css("left",game.options.currentPizzaPosition+'%');
    }
    setInterval(update, 70);
    this.initialize();
}