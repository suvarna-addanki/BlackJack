
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

function startGame() {   //when we start the game first we want to deal the cards to dealer 2 cards one is always hidden
    hiddenCard = deckOfCards.pop();   //we are removing/popping that hidden card from deckOfCards
    dealerTotal += getValue(hiddenCard);   //adding that hiddencard value to dealerTotal(getValue function is defined on line 50)
    dealerAceCount += checkAce(hiddenCard);   //updating dealerAceCount whenever he gets Ace thru checkAce function which is defined on line 65

//commenting because wrote both lines 51 and 52 for checking purposes

//     console.log(hiddenCard);                //consoling hiddencard
//     console.log(dealerTotal)                //consoling dealerTotal to check if it is correctly updating like for example if the hidden card is K-C the dealerTotal should be 10 or if the hiden card is 5-D the dealerTotal should be 5 

//the dealer must hit until his cards reach a total value of 17 or more
//or in otherwords we need to deal the cards to the dealer unless they have sum gretater than or equal to 17

    while(dealerTotal < 17) {
        //img
        let cardImg = document.createElement("img");   //creating an img tag for the second card to be displayed if the dealerTotal is lessthan 17
        let card = deckOfCards.pop();                    //popping that second card out of the deck    
        
    }



}

function getValue(cardParam){   //function to get the value of card
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

