 /*
 * Create a list that holds all of your cards
 */
 const deck = document.querySelector('.deck');
 let clockId;
 let cardSwitched = [];
 let offClock = true;
 let moves = 0;
 let time = 0;
 let matched = 0; 
 time = 0;
 moves = 0;
 const totalCardsPairs = 8;
 
 
 
 const cardList = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Below function count the number of moves */
function moveCount() {
	moves++;
	const movesNum = document.querySelector('.moves');
	movesNum.innerHTML = moves;
}
 

 
 /* The function below shuffle the deck of cards*/
 
 function shuffleDeck () {
	 const randomCards = Array.from(document.querySelectorAll('.deck li'));
	 const shuffledCards = shuffle(randomCards);
	 for (card of shuffledCards) {
		 deck.appendChild(card);
	 }
	 
 }
 shuffleDeck();
 
 
 /*
  This set up the event listener for a card. If a card is clicked: 
  */
 deck.addEventListener('click', evt => {
	 const clickTarget = evt.target;
	 if (userGuessValid(clickTarget)){ 
	 	if (offClock) {
			startClock();
			offClock = false;
		}
	 switchedCard(clickTarget);
	 addswitchedCard(clickTarget);
	 if(cardSwitched.length === 2) {
		 checkIfSame(clickTarget);
		 moveCount();
		 scoreCard();
	 }
	 }
 });
 
 function switchedCard(clickTarget) {
	 clickTarget.classList.toggle('open');
	 clickTarget.classList.toggle('show');
 }
 
 function addswitchedCard(clickTarget) {
	 cardSwitched.push(clickTarget);
	 console.log(cardSwitched);
 }
 
 /* This check if user's click is valid */
 
 function userGuessValid(clickTarget) {
	 return (clickTarget.classList.contains('card')&& !clickTarget.classList.contains('match') && cardSwitched.length < 2 && 
	 !cardSwitched.includes(clickTarget)
	 );
 }
 
 /* Below function check if the opened cards are same */
 
 function checkIfSame () {
	 if( cardSwitched[0].firstElementChild.className === cardSwitched[1].firstElementChild.className) {
		 cardSwitched[0].classList.toggle('match');
		 cardSwitched[1].classList.toggle('match');
		 cardSwitched = [];
		 matched++;
		 
	 } else{
		 setTimeout(() => {
		 switchedCard(cardSwitched[0]);
		 switchedCard(cardSwitched[1]);
		 cardSwitched = [];
		 }, 1000);
	 }
	 if(matched === totalCardsPairs) {
		 gameOver()
	 }
 }
 
 
 function switchedCard(card) {
	 card.classList.toggle('open');
	 card.classList.toggle('show');
 }
 
 
 function scoreCard() {
	 if (moves === 16 || moves === 24) {
		 hideStar(); }
 }
 
 
 function hideStar() {
	 const starList = document.querySelectorAll('.stars li');
	 for(let i = 0; i < 4; i++) {
		 if(star.style.display !== 'none') {
			 star.style.display = 'none';
			 break;
		 }
	 }
 }
 hideStar();
 hideStar();
 
 
 /* Below code starts time count from the very first click */
 
 function startClock() {
	 clockId = setInterval(() => {
		 time++;
		 displayTime();
		 console.log(time);
	 }, 1000);
 }
 
 /* This displays the time the player spent */
 function displayTime() {
	 const clock = document.querySelector('.clock');
	 console.log(clock);
	 clock.innerHTML = time;
 
 const seconds = time % 60;
 const minutes = Math.floor(time / 60);
 if(seconds < 10) {
	 clock.innerHTML = `${minutes}:0${seconds}`;
 }else{
	 clock.innerHTML =  `${minutes}:${seconds}`;
 }
 
 }
 
 // code to stop time.
 function stopClock() {
	 clearInterval(clockId);
 }
 
 //This is the Gameover function.
 
 function gameOver() {
	 stopClock(); 	//calls the stopClock function to stop the time.
 	 toSwitchModal();  // This is called to switch on Modal window and....
	 noteWindowData();  //writes out the stats.
	 resetCards();
 }
 
 /* The code below will switch the modal window on/off */
 
 function toSwitchModal() {
	 const modal = document.querySelector('.modal');
	 modal.classList.toggle('conceal');
 }
 
 toSwitchModal() // Open
 toSwitchModal() // Close
 
 
 //The function below write to the Modal window after game over
 function noteWindowData() {
	 const timeData = document.querySelector('.window_time');
	 const timeSpent =  document.querySelector('.clock').innerHTML;
	 const movesData = document.querySelector('.window_moves');
	 const starsData = document.querySelector('.window_stars');
	 const stars = starsToken();
	 
	 timeData.innerHTML = `Time = ${timeSpent}`;
	 movesData.innerHTML = `Moves = ${moves}`;
	 starsData.innerHTML = `Stars = ${stars}`;
 }
 
 function starsToken() {
	 stars = document.querySelectorAll('.stars li');
	 starCount = 0;
	 for(star of stars) {
		 if (star.style.display !== 'none') {
			 starCount++;
		 }
	 }
	 console.log(starCount);
	 return starCount;
 }
 
 // This toggle off the modal window
 document.querySelector('.window_cancel').addEventListener('click', () => {
	 toSwitchModal();
 });
 
 //This controls the reset button
  document.querySelector('.window_replay').addEventListener('click', replayGame);
 
 document.querySelector('.restart').addEventListener('click', resetGame);
 
  //  This will reset the moves.
 function resetMoves() {
	 moves = 0;
	 document.querySelector('.moves').innerHTML = moves;
 }
 
 // this reset the stars.
 function resetStars() {
	 stars = 0;
	 const starList = document.querySelectorAll('.stars li');
	 for(star of starList) {
		 star.style.display = 'inline';
	 }
 }
	
	// The function below will reset the game. 
 function resetGame() {
	 stopClock();
	 clockOff =  true;
	 time = 0;
	 displayTime();
	 resetMoves();
	 resetStars();
	 shuffleDeck();
	 resetCards();
 }
 
 function replayGame() {
	 resetGame();
	 toSwitchModal(); 
 }
 
 function resetCards() {
	 const cards = document.querySelectorAll('.deck li');
	 for(let card of cards) {
		 card.className = 'card';
	 }
 }


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
