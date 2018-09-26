var pizzaUI = function(){

    console.log("here");

    var self = this;
    this.game = undefined;
    this.initialize=function(){
        game = new pizzaGame();
        game.reset();

    };
    this.refreshView=function(){
        $('#pizza')
    }
    
    this.update = function(){
        /*
        This handles incrementing the pizza across the conveyor belt.
        */
        if ($('#maingame').width()  < game.options.currentPizzaPosition*1.25) {
            game.options.currentPizzaPosition=-($('#maingame').width()* .28);
            game.completedPizza(game);
            console.log(game.totalScore);
            document.getElementById('Score').innerHTML = "Score: "+game.totalScore;

        }
        else {
            game.options.currentPizzaPosition+=1;
        }
        var x = $('#topping').position();
        console.log(x, game.options.currentPizzaPosition);
        var right = game.options.currentPizzaPosition+70;
        $('#pizza').css("left",game.options.currentPizzaPosition+'px');
        if(window.flag == 1){
            $('#topping').css("left",game.options.currentPizzaPosition+'px');
        } 
        
        if(x.left > game.options.currentPizzaPosition && x.left<right && (x.top > $('#pizza').position().top)){
            console.log("kjf");
            window.flag = 1;
        }
    }
    setInterval(update, 10);
    this.initialize();
}