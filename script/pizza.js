var pizzaGame = function () {
    var self = this;
    this.options = {
        currentPizzaPosition: $('#maingame').width(), //This is where the pizza is
        pizzaState: 0,
        pizzaSpeed: 1
    }
    this.initialize = function(){
        self.reset;
    }
    this.reset = function(){
        self.currentPizzaPosition = 0;

    }
    this.incrementPizza = function () {
        var self = this;
    }
    this.initialize();
}