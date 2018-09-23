var pizzaGame = function () {
    var self = this;
    this.options = {
        currentPizzaPosition: -$('#maingame').width()*.03, //This is where the pizza is
        currentScoreIncrement: 100,
        pizzaState: 0,
        pizzaSpeed: 1,
        totalScore: 0
    }
    this.initialize = function(){
        self.reset;
    }
    this.reset = function(){
        self.currentPizzaPosition = 0;
        self.totalScore=0;
        self.currentScoreIncrement=100;
    }
    this.incrementPizza = function () {
        var self = this;
    }
    this.completedPizza = function(pizzaGame){
        pizzaGame.totalScore =pizzaGame.totalScore+self.currentScoreIncrement;
        pizzaGame.currentScoreIncrement=pizzaGame.currentScoreIncrement+10;
    }
}