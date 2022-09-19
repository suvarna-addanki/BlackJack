# BlackJack
https://suvarna-addanki.github.io/BlackJack/

A JavaScript based Blackjack game. Beat the dealer by getting as close to 21 without going over.

 BASIC RULES OF BLACKJACK:

Goal: Beat the dealer by getting a hand as close to 21 as possible, without going over 21. A blackjack occurs when you get one ace and one 10 point card.

Gameplay: The dealer will give 2 cards to themself and 2 cards to you. The dealer's second card will be played face down. You can choose to either hit (receive more cards) or stay (move on to the next hand). You can hit as many times as you choose so long as your deck is under 21.

Card Values: Queens, Kings, and Jacks are worth 10, pip cards are worth their face value, but Aces can be worth either 11 or 1. In this game, Aces have a default value is 11 unless you go over 21 on your hand.



♦️ Technologies Used

HTML,CSS,JAVASCRIPT

♦️ Process

1. Created cards.js file to store full deck of cards including images, value, and name.

2. Generated start game functionality to get the cards on the board.

3. Randomly sort the array to "shuffle" the deck.

4. Loop through the original deck and push/pop cards into both the dealer and player hands.

5. Display these card images on the appropriate sections of the screen.

6. Developed initial player interaction fuctionality ("hit" and "stand").

7. Built out dealer logic.

8. Dealer's actions are based on standard blackjack rules (hit if under 17, stand if 17 or above).

<<<<<<< HEAD
9. Created win logic and detection for aces.

10. Aces can hold values of either 11 or 1.

11. Default value for aces is 11, however, if the user goes over 21 the aces will reduce to 1.

12. Worked through automated turn switching functionality to keep the game moving if the player goes over 21 on their current deck (without player    needing to press "stand").

13. Added ability to toggle in/out rules section using modal.

14. Implemented CSS to give styling and keyframes animation to display the title 
=======
8.Implemented CSS to give styling and keyframes animation to display the title
>>>>>>> b02adc5437164bc5463f65d0881b7a0491144c53

