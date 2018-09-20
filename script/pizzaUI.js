var pizzaUI = function(){
    var self = this;
    this.game = undefined;
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
        $('#pizza').css("left",game.options.currentPizzaPosition+'px');
    }
    setInterval(update, 10);
    this.initialize();
}