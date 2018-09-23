var pizzaUI = function(){
    var self = this;
    this.game = undefined;
    window.flag = 0; 
    this.initialize=function(){
        game = new pizzaGame();
        console.log(game);
    };
    this.refreshView=function(){
        $('#pizza')
    }
    
    this.update = function(){
        if ($(window).width() + ($(window).width() * .1) < game.options.currentPizzaPosition) {
            game.options.currentPizzaPosition=-($(window).width() * .1);
        }
        else {
            game.options.currentPizzaPosition+=1;
        }
        var x = $('#topping').position();
        //console.log(x, game.options.currentPizzaPosition);
        var right = game.options.currentPizzaPosition+70;
        $('#pizza').css("left",game.options.currentPizzaPosition+'px');
        if(window.flag == 1) $('#topping').css("left",game.options.currentPizzaPosition+'px');

        
        if(x.left > game.options.currentPizzaPosition && x.left<right && (x.top > $('#pizza').position().top)){
            console.log("kjf");
            window.flag = 1;
           
        }
    }
    setInterval(update, 10);
    this.initialize();
    
}