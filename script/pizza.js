var pizzaGame = function () {
    var self = this;
    this.options = {
        currentPizzaPosition: -$('#maingame').width()*.28, //This is where the pizza is
        currentScoreIncrement: 100,
        pizzaState: 0,
        pizzaSpeed: 1,
        totalScore: 0,
        toppingQuantity: 3,
        chosenQuantity: 0,
        lives: 3
    }
    this.initialize = function(){
        self.reset;
    }
    this.reset = function(){
        self.currentPizzaPosition = 0;
        self.totalScore=0;
        self.currentScoreIncrement=100;
        self.toppingQuantity = 2;
        self.lives = 3;
        self.toppingList = ["Pepperoni", "Basil"];
        self.currentToppings = []; //This is the current toppings we want to be put on the list.
        self.currentToppingsList = [];
        self.toppingAmount = [];
        self.chosenQuantity=0; //This is the total amount of toppings we want.
    }
    this.incrementPizza = function () {
        var self = this;
    }
    this.failedPizza = function(pizzaGame){
        pizzaGame.lives = pizzaGame.lives-1;
        pizzaGame.currentScoreIncrement=100;
    }
    this.completedPizza = function(pizzaGame){
        pizzaGame.totalScore =pizzaGame.totalScore+self.currentScoreIncrement;
        pizzaGame.currentScoreIncrement=pizzaGame.currentScoreIncrement+10;
    }
    this.randomizeDesiredElements = function(pizzaGame){
        var flag = false;
        var amountOfToppings = Math.floor(Math.random() * 4)+1 //randomizes some amount of toppings
        pizzaGame.currentToppings=[];
        pizzaGame.currentToppings.length=amountOfToppings+2;
        var toppingNumber = 0;
        let i = 2;
        let counter = 2;
        let counter2 = 2;
        let counter3=2;
        let selectedToppings = [0,0]
        pizzaGame.currentToppings.length = amountOfToppings+2;
        pizzaGame.currentToppings[0]="Sauce";
        pizzaGame.currentToppings[1]="Cheese";
        pizzaGame.toppingAmount = [];
        pizzaGame.toppingAmount[0]=1;
        pizzaGame.toppingAmount[1]=1;
        while (toppingNumber<amountOfToppings){
            //This selects the next round of toppings and the breakdown for said toppings.
            var chosenToppings = Math.floor(Math.random() * pizzaGame.toppingQuantity)
            selectedToppings[counter3]=0;
            if (!pizzaGame.currentToppings.includes(pizzaGame.toppingList[chosenToppings])){
                if (selectedToppings.length == pizzaGame.toppingList.length+2){
                    let quantityOfTopping =  amountOfToppings - toppingNumber;
                    pizzaGame.toppingAmount[counter2] =quantityOfTopping;
                    for (var j = 0;j<quantityOfTopping; j++){
                        //This adds the topping selected to the current topping list
                        //It adds the quantity of said topping to currentToppings.
                        pizzaGame.currentToppings[i] = pizzaGame.toppingList[chosenToppings];
                        i++;
                    }
                    toppingNumber = amountOfToppings
                }
                else{
                    selectedToppings[counter3]=0;
                    counter3+=1;
                    //This sees if the topping randomly selected is already on the list. If it is, the 
                    //game will skip the process of adding it in.
                    let quantityOfTopping = 100;
                    while (quantityOfTopping+toppingNumber>amountOfToppings)
                        //This will select a random amount of toppings that will eventually get the quantity
                        //of toppings to the amount needed to fill out the list
                        quantityOfTopping = Math.floor(Math.random() * amountOfToppings)+1;//picks an amount of said topping
                    pizzaGame.toppingAmount[counter2] = quantityOfTopping;
                    counter2=counter2+1;
                    for (var j = 0;j<quantityOfTopping; j++){
                        //This adds the topping selected to the current topping list
                        //It adds the quantity of said topping to currentToppings.
                        pizzaGame.currentToppings[i] = pizzaGame.toppingList[chosenToppings];
                        i++;
                    }
                    toppingNumber +=quantityOfTopping;
                }
            }
            counter +=1;
            if (counter>10){
                toppingNumber = amountOfToppings;
            }
        }
        console.log(pizzaGame.currentToppings)
    }
}