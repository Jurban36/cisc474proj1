var pizzaGame = function () {
    console.log("here")
    var self = this;
    this.options = {
        currentPizzaPosition: -($(window).width() * .1),
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

    this.update = function (time) {

    }
    this.initialize();
}