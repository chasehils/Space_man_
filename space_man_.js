// the variable that doesn't change per round of the game
const countries = [
  'montserrat',
  'morocco',
  'denmark',
  'cuba',
  'finland',
  'switzerland',
  'malawi',
  'nauru'
]

let answer = '';
let maxWrong = 4;
let mistakes = 0;
let guessed = [];
let wordStatus = null;
// this function uses Math.floor to pick a random word 
// in the string above 
function randomWord() {
  answer = countries[Math.floor(Math.random() * countries.length)];
 
}
// this allowed me to be able to create and house the 
// letters within a button without having to make 26 divs
// with letters inside
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join(''); // join with blank '' to remove commas 
    // between letters

  document.getElementById('keyboard').innerHTML = buttonsHTML;
};
// this function is used to remove the letter chosen
// from being selected again
// Letter ID is set to letter above ^
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  // this fades out the color of the letter once it
  // has been clicked
  document.getElementById(chosenLetter).style.opacity = "0.2"; 
  // disables the letter once it has been clicked
  document.getElementById(chosenLetter).setAttribute('disabled', true);




// checks to see the chosen letter and if the game has been won
// if chosenLetter >= 0, does exist, run the function 
// so the game updates

  if (answer.indexOf(chosenLetter) >= 0) {
    // if checks to see if the right answer is 
    // selected and calls the gamewon and guessed word
    // functions
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    // else if checks to see if the wrong answer has
    // been selected and also calls the other functions
    updateMistakes();
    checkifGameLost();
    updateSpacePic();
  }
}
//supposed to update the picture every time a wrong answer has been chosen
function updateSpacePic() {
  document.getElementById('spaceman').src = './images' + letter + '.jpg';
}
// this function checks to see if the user has won the 
// game and will display a message on the screen if user
// has won

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!';
  }
}
// this function, checks to see if the user lost and will
// display a message saying what the answer was the
// user got wrong and also a message telling them they 
// lost
function checkifGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('dashSpot').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You lost!';
  }
}
// this function ties in with the if/else statement above
// determining which way the console should run.


// guessed checks to see if the letter exists in the 
// array that has already been guessed
// if it exists, it will be > 0, if it doesnt exist it 
// will be -1
// if it does exist it will be a number 
// greater than the postion it's in, greater than 0 to 
// get the true or false value
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_")).join('');
  document.getElementById('dashSpot').innerHTML = wordStatus;
}
// this function tracks and updates the mistakes a user 
// makes and will display
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
// resets the functions back to their original state
// whenever clicked. 
function reset() {
  mistakes = 0;
  guessed = [];
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}
// calls the function to check and see if the user
// has guessed incorrectly 
document.getElementById('maxWrong').innerHTML = maxWrong;
// runs the functions above to allow the game to operate
reset();
randomWord();
generateButtons();
guessedWord();
updateMistakes();
updateSpacePic();

