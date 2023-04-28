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
// this generates a random word in the string above
function randomWord() {
  answer = countries[Math.floor(Math.random() * countries.length)];
 
}
// this allowed me to be able to create and house the letters within a button
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
};
// this function is used to remove the letter chosen
// from being selected again
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  // this fades out the color of the letter once it
  // has been clicked
  document.getElementById(chosenLetter).style.opacity = "0.2"; 
  // disables the letter once it has been clicked
  document.getElementById(chosenLetter).setAttribute('disabled', true);

// this if statement checks to see the chosen letter
// and if the game has been won
// if game has not been won this will update the
// updateMistakes function
// this is also supposed to update the game picture 
// of the spaceman

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
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
function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "_")).join('');
  document.getElementById('dashSpot').innerHTML = wordStatus;
}
// this function tracks and updates the mistakes a user 
// makes and will display
function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
// resets the game whenever clicked. 
function reset() {
  mistakes = 0;
  guessed = [];
  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

reset();
randomWord();
generateButtons();
guessedWord();
updateMistakes();
updateSpacePic();

