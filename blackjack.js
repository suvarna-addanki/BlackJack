let dealerTotal = 0;
let yourTotal = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hiddenCard;
let deckOfCards;

let btnHit = true; //allows you to hit/draw from deck as long as yourTotal <= 21

window.onload = function() {
buildDeck();
shuffleDeck();
startGame();
}

function buildDeck(){       //building our deck

    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deckOfCards =[];

    for(let i = 0; i < types.length; i++) {   //looping thru the array of types which has clubs(C), Diamons(D), Hearts(H) and Spades(S)
        for(j= 0; j <values.length; j++) {    //looping thru the array of values which has face value of all the cards
            deckOfCards.push(values[j] + "-" + types[i])   // pushing all clubs(from Ace to Kings), all Diamonds(from Ace to Kings) and etc....
        }     
    }  
    console.log(deckOfCards)         //checking in the console whether we got all the cards  output is:52 withan array['A-C', '2-C', '3-C' to all the way until 'K-S']   
}

function shuffleDeck(){
    for( i =0; i <deckOfCards.length; i++){
        let j = Math.floor(Math.random() * deckOfCards.length);   //math.random generates number btw 0 and 1 * we are mutiplying that no. with deck length(which is 52) but output will be in decimal but we want whole number so use math.floor
        let temp = deckOfCards[i];
        deckOfCards[i] = deckOfCards[j];
        deckOfCards[j] = temp;  
    }    
    console.log(deckOfCards)    //checking in the console whether deck is shuffled or not

}

function drawCardForDealer() {
    let cardImg = document.createElement("img");   //creating an img tag for the second card to be displayed if the dealerTotal is lessthan 17(it is nothing but adding image tag in Html but instead of adding in there we are doing thru DOM dynamically)
    let card = deckOfCards.pop();                    //popping that second card out of the deck    
    cardImg.src = "./cards/" + card + ".png";
    dealerTotal += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg)
    document.getElementById("dealer-Total").innerText = getValue(card)    //displaying the value of dealer card   
    
    
}

function drawCardForPlayer() {
    let cardImg = document.createElement("img");   //creating an img tag for the second card to be displayed if the dealerTotal is lessthan 17(it is nothing but adding image tag in Html but instead of adding in there we are doing thru DOM dynamically)
    let card = deckOfCards.pop();                    //popping that second card out of the deck    
    cardImg.src = "./cards/" + card + ".png";    
    yourTotal += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg)
    document.getElementById("your-Total").innerText = getValue(card)    //displaying the value of dealer card 
     
}

function disablebtns() {
    document.getElementById("hit").hidden = true;
    document.getElementById("stay").hidden = true;
}




function startGame() {   //when we start the game first we want to deal the cards to dealer 2 cards one is always hidden
    
    
    hiddenCard = deckOfCards.pop();   //we are removing/popping that hidden card from deckOfCards
    dealerTotal += getValue(hiddenCard);   //adding that hiddencard value to dealerTotal(getValue function is defined on line 50)
    dealerAceCount += checkAce(hiddenCard);   //updating dealerAceCount whenever he gets Ace thru checkAce function which is defined on line 65

    drawCardForDealer() 
   
    //drawing 2 cards to the player when game starts
    for(i = 0; i < 2; i++) {                           //player always get 2 cards when the game starts

        drawCardForPlayer()       

    }

    let message = "";
        if(yourTotal == 21) {
            disablebtns();
            document.getElementById("hide").src = "./cards/" + hiddenCard + ".png"; 
            document.getElementById("dealer-Total").innerText = dealerTotal;
            if(dealerTotal == 21)
            {
                message = "Tie! Both has BlackJack!"
                
            }
            document.getElementById("results").innerText = message;            

        }
        document.getElementById("your-Total").innerText = yourTotal //displaying the sum of player cards when the game loads

        if(yourTotal > 21) {
            if (yourAceCount > 0)
            {
                let obj = {
                    a: yourTotal,
                    b: yourAceCount
                  
                }
                obj = reduceAceForPlayer(obj)    //callingreduce ace for player function 
                yourTotal = obj.a;
                yourAceCount = obj.b;
               
            } 
            document.getElementById("your-Total").innerText = yourTotal
        }
        if(yourTotal == 21 && dealerTotal < 21)
        {
            message = "You won with a BlackJack!"
            
        }
        document.getElementById("results").innerText = message;

        
    //eventlisteners for hit and stay and reset buttons
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("reset").addEventListener("click", reset);
   
    }

    function reset() {
        window.location.reload()
    }

    //to show the rules when clicked on the how to play button(used modal concept)

    const toggleModal = () => {
        document.querySelector(".modal").classList.toggle("modal--hidden")        
    };

    document.querySelector("#rules").addEventListener("click",toggleModal);
    

    document.querySelector(".close-modal").addEventListener("click",toggleModal)

    

    function hit() {              //if you (the player) does not hit the hit button we dont do anything

        if(!btnHit) {
            return;
        } 

        drawCardForPlayer()

        if (yourAceCount > 0)
        {
            let obj = {
                a: yourTotal,
                b: yourAceCount
              
            }
            obj = reduceAceForPlayer(obj)
            yourTotal = obj.a;
            yourAceCount = obj.b;
            //window.alert("Your Ace value changed from 11 to 1:  ")
           
        }       
        
        if(yourTotal == 21) {    
            disablebtns()
            rundealer();
        } 
        if(yourTotal > 21) { 
            disablebtns()
            let message = "You Busted !!!";              
            document.getElementById("results").innerText = message     
        }
            
        document.getElementById("your-Total").innerText = yourTotal       //displaying your total on 

    }

    //when we hit stay button we are going to total up the no. of cards which we already have been doing but we are going to call reduceace to take into consideration again over here where ace could be 1 or 11 so we want both player and dealer to try to stay in the game if possible
    function stay() {
        document.getElementById("hide").src = "./cards/" + hiddenCard + ".png"; 
        if(dealerAceCount > 0 )
            
        {
            let obj = {
                a: dealerTotal,
                b: dealerAceCount
              
            }
            obj = reduceAceForDealer(obj)
            dealerTotal = obj.a;
            dealerAceCount = obj.b;
        }  
        document.getElementById("dealer-Total").innerText = dealerTotal;     

        let message = "";
        if(dealerTotal == 21) {
            message = "OOPS! BLACKJACK.DEALER WON!"
            document.getElementById("results-1").innerText = message;
            
        }
        //once the player's turn is done(meaning he is staying) now comes dealer's turn
        //dealer must hit 17 as per the game rules so added a while loop
        while(dealerTotal < 17) {
            drawCardForDealer()
            if(dealerAceCount > 0 )
            
        {
            let obj = {
                a: dealerTotal,
                b: dealerAceCount
              
            }
            obj = reduceAceForDealer(obj)
            dealerTotal = obj.a;
            dealerAceCount = obj.b;
        }       

        btnHit = false; 
            document.getElementById("dealer-Total").innerText = dealerTotal;
            
        }

        //going thru multiple winning conditions
           
        if(yourTotal > 21) {    //if ur total is greater than 21 you automatically lose so it doen't matter what dealer has
            message = "You Bust!"
            document.getElementById("hit").hidden = true;
        }
        else if(dealerTotal > 21) {      //checking else condition (meaning yourTotal is not greater than 21) we are checking one more if condition if dealerTotal is greater than 21
            message = "You Won!"
        }
        else if(yourTotal == dealerTotal) {
            message = "Tie!"
        }
        else if(yourTotal > dealerTotal) {
            message = "You Won!"
            disablebtns()
        }
        else if(dealerTotal > yourTotal) {
            message = "Dealer Won!"
        }
        
        document.getElementById("dealer-Total").innerText = dealerTotal;
        document.getElementById("results").innerText = message;

    }


    function getValue(cardParam) {   //function to get the value of card
        let data = cardParam.split("-");   //splitting the card ex: if we get 2-D card we are splitting into ["2", "D"]
       let value = data[0];               //storing the output of the line 51 into a variable called value
   
       if(isNaN(value)) {         //checking A J Q K
           if(value == "A") {
               return 11;         //if it i A(Ace) then return 11
           }
           return 10;             //if it is J, Q, K then return 10
       }    
       return parseInt(value);     //if it is neither A,J,Q,K then return just that value which is 2 to 10 in our example in line 51 it returns 2
   }
   
   function checkAce(cardParam){   //if the card is Ace return 1 or else return 0
       if(cardParam[0] == "A"){
           return 1;
       }
       return 0;
   }

   function rundealer() {
    if(dealerAceCount > 0 )
        
    {
        let obj = {
            a: dealerTotal,
            b: dealerAceCount
          
        }
        obj = reduceAceForDealer(obj)
        dealerTotal = obj.a;
        dealerAceCount = obj.b;       
    } 
        btnHit = false;    //once player hits stay button we are setting HIT button false(disabling HIT button) meaning won't be able to draw cards anymore
        document.getElementById("hide").src = "./cards/" + hiddenCard + ".png"; 
        document.getElementById("dealer-Total").innerText = dealerTotal;    //revealing the hidden card(dealer side)
    while(dealerTotal < 17) {

        drawCardForDealer()
        document.getElementById("dealer-Total").innerText = dealerTotal; 
        
    }
        let message
        if(dealerTotal == 21)
        {
             message = " It's a tie!"
        }

        if(dealerTotal < 21)
        {
            message = "You won!"
        }
        if(dealerTotal > 21)
        {
            message = "You Won!"
        }
        
        document.getElementById("results-1").innerText = message;
    
    }


function reduceAceForPlayer(obj) {     
    let yourTotalParam = obj.a;
    let yourAceCountParam = obj.b;
    while(obj.a > 21 && obj.b > 0){    //if yourtotal is > 21 and if you have morethan one ace then we can set ace to 1(instead of 11) by reducing 10 in the line below 
        
        obj.a -= 10                    //reducing total by 10
                    
        obj.b -= 1;                      //reducing ace by 1       
    }
    return obj;
}
 

function reduceAceForDealer(obj) {     
    let dealerTotalParam = obj.a;
    let dealerAceCountParam = obj.b;
    while(obj.a > 21 && obj.b > 0){    //if dealer total is > 21 and if you have morethan one ace then we can set ace to 1(instead of 11) by reducing 10 in the line below 
        
        obj.a -= 10                    //reducing total by 10
                    
        obj.b -= 1;                      //reducing ace by 1       
    }
    return obj;
}
