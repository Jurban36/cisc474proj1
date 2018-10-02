
var pizzaUI = function(){
    var self = this;
    var toppingOffset = 0;
    this.game = undefined;
    window.dragflag = 0;
    
    window.addedToppings = [];
    var speed = 10;
    var toppingIDs = 0;
    let myVar ;
    let flag = false;
    this.initialize=function(){
        game = new pizzaGame();
        game.reset();
        this.setScoreBoard();
        this.speed = 10;
        this.flag = false;
    };
    this.refreshView=function(){
        $('#pizza')
    }

    //this function generates the topping divs then a toppingdiv gets clicked
    $('.toppingdiv').mousedown(x => {
        window.dragflag = 1;
        window.newtop = new topping(x.currentTarget.getAttribute('value'));
        
        
        dragtop(window.newtop.html);
        $(x.currentTarget).append(window.newtop.html);
        $("#"+window.newtop.id).offset({left: event.pageX, top: event.pageY});
    });

    //this function makes the topping follow the mouse when holding the topping
    //contain is just a div thats wrapped around the conveyor belt & topping divs
    $( "#contain" ).mousemove(function( event ) {
        if(window.dragflag==1){
            dragtop(window.newtop.html);
            $("#"+window.newtop.id).offset({left: event.pageX, top: event.pageY});
        }
    });

    //this checks if user has stopped holding the topping
    $( "#contain" ).mouseup(function( event ) {
        var x = event.pageX;
        var y = event.pageY;
        toppingOffset = x - game.options.currentPizzaPosition;
        window.newtop.toppingOff = toppingOffset;
        var right = game.options.currentPizzaPosition+$('#background').width()*.22-10;
        if(x > game.options.currentPizzaPosition && x<right && (y > $('#pizza').position().top)){
            window.addedToppings.push(window.newtop);
            window.flag = 1;
        }
        else{
            window.newtop.html.parentNode.removeChild(window.newtop.html);
        }
        if(window.dragflag==1){
            window.dragflag=0;
            var t = "#"+window.newtop.id;
            // console.log("dropped");
            var toppingLoc = $(t).position().left;
            toppingOffset = toppingLoc - game.options.currentPizzaPosition;
            topping.toppingOff = toppingOffset;
        }
    });

    //constructor for toppings, takes string id parameter 
    //toppingOff is the toppings offset from the pizza
    function topping(id) {
        // this.id = toppingIDs;
        // this.currentTopping = id;
        console.log(id);
        this.id = toppingIDs;
        this.currentTopping = id;
        toppingIDs+=1;
        this.toppingOff = 0;
        this.dragflag = 1;
        this.html = document.createElement('div');
        this.html.setAttribute('class', 'topping');
        this.html.setAttribute('id', this.id );
        var elem = document.createElement("img");
        var str = "images/"+id.toLowerCase()+".png";
        elem.setAttribute("src", str);
        elem.setAttribute("height", "30");
        elem.setAttribute("width", "30");
        if(id=="sauce"){
            elem.setAttribute("height", "110");
            elem.setAttribute("width", "260");
            elem.setAttribute("z-index", "1");  
            this.html.setAttribute('z-index', '1');    
        }
        if(id=="cheese"){
            elem.setAttribute("height", "100");
            elem.setAttribute("width", "250"); 
            elem.setAttribute("z-index", "5");  
            this.html.setAttribute('z-index', '5');    
        }
        this.html.appendChild(elem);
        //this.html.setAttribute('background-image', url("../images/mushroom.png"));
      }
    
    // enables toppings to be draggable, supposed to calculate topping offset,
    // but the stop condition isn't firing for some reason
    function dragtop(topping) {
        var t = "#"+topping.id;
        $( t ).draggable({
            stop: function(event, ui) {
                var toppingLoc = $(t).position().left;
                toppingOffset = toppingLoc - game.options.currentPizzaPosition;
                self.testingTopping = toppingLoc - game.options.currentPizzaPosition;
                topping.toppingOff = toppingOffset;
            }
        });
        $( "#pizza" ).droppable();
      }

    this.updateConveyor = function(){
        let s1 = 'url("images/conveyorspeed';
        let s2 = this.speed;
        let s3 = '.gif")';
        let finalstring = s1.concat(s2, s3);
        // console.log(finalstring);
        $(maingame).css("background-image", finalstring);
    }

    this.setSpeed = function(){
        myVar= clearInterval(myVar);
        myVar = setInterval(update, this.speed);
        updateConveyor();
    }

    this.checkForComplete = function(){
        let flag = true;
        let toppingsList = game.currentToppings;
        let addedToppings = window.addedToppings;
        let toppingAmount = game.toppingAmount;
        if (toppingsList.length!==addedToppings.length){
            this.speed = 10;
            setSpeed();
            flag = false;
            console.log("u missed one");
            game.failedPizza(game);
            return;
        }
        if (addedToppings.length == 0){
            this.speed = 10;
            setSpeed();
            flag = false;
            game.failedPizza(game);
            console.log("u didnt even try");
            return;
        }
        let currentTopping = "";
        let toppings = [];
        let currentQuantities = []
        counter = 0;
        for (i in addedToppings){
            currentTopping = addedToppings[i].currentTopping;
            if (!toppingsList.includes(currentTopping)){
                console.log("u suck")
                this.speed = 10;
                setSpeed();
                flag = false;
                game.failedPizza(game);
                return;
            }
            else if (toppings.includes(currentTopping)){
                let integer = toppings.indexOf(currentTopping);
                currentQuantities[integer] = currentQuantities[integer]+1;
            }
            else{
                currentQuantities[counter]=1;
                toppings[counter]=currentTopping;
                counter+=1;
            }
        }
        for (var j = 0; j<toppings.length;j++){
            currentTopping = toppings[i];
            let integer = toppingsList.indexOf(currentTopping);
            if (toppingAmount[integer]!=currentQuantities[i]){
                game.failedPizza(game);
                console.log("u suck but like two");
                this.speed =10;
                setSpeed();
                flag = false;
                return;
            }
        }
        if (flag==true){
            console.log("ur doing great sweetie");
            game.completedPizza(game);
             if (this.speed>5){
                this.speed -= 1;
                setSpeed();
             }
        }
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
    this.waiting = function(){
        for( i in window.addedToppings){
            if (window.addedToppings[i].html.parentNode!==null)
                window.addedToppings[i].html.parentNode.removeChild(window.addedToppings[i].html);
        }
        window.addedToppings.length = 0;
        game.options.currentPizzaPosition=-($('#maingame').width()* .35);
        flag = false;
    }
    
    this.update = function(){
        /*
        This handles incrementing the pizza across the conveyor belt.
        */
        if (game.lives == 0){
            console.log("you lose");
            game.lives -=1;
        }
        else if (($('#maingame').width()  < game.options.currentPizzaPosition)&&(flag == false)) {
            flag = true;
            this.checkForComplete();
            this.waiting();
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
            var right = game.options.currentPizzaPosition+$('#background').width()*.22-10;
            if(window.flag == 1){
                $('#'+window.addedToppings[i].id).css("left",game.options.currentPizzaPosition+window.addedToppings[i].toppingOff+'px');
            }
            
            //checks if topping is on pizza, logic might be a little off
        } 
    }
        
}
    this.initialize();

    myVar = setInterval(update, this.speed);
}