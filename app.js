

// Get the phrase element and save it to a variable
const phrase = document.querySelector('#phrase ul');

// Get the reset button element and save it to a variable
const resetButton = document.querySelector('.btn__reset');

// Create a missed variable and initialize it to 0
let missed = 0;

// Create an array of phrases
const phrases = [
    'hello world',
    'happy birthday',
    'good morning',
    'have a nice day',
    'life is beautiful'
  ];

  // Add event listener to reset button
resetButton.addEventListener('click', () => {
    // Hide the overlay by changing its display property
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
  });

  // Function to get a random phrase as an array
function getRandomPhraseAsArray(arr) {
    // Get a random number based on the length of the array
    const randomIndex = Math.floor(Math.random() * arr.length);
    // Use the random number to select an index inside of the array
    const randomPhrase = arr[randomIndex];
    // Split the phrase into an array of characters
    const phraseArray = randomPhrase.split('');
    // Return the array of characters
    return phraseArray;
  }
  
  // Call the function with the phrases array and log the result to the console
  let phraseArray = getRandomPhraseAsArray(phrases);
  console.log(phraseArray);

  function addPhraseToDisplay(arr) {
    const ul = document.querySelector('#phrase ul');
    ul.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement('li');
      li.textContent = arr[i];
      if (arr[i] !== ' ') {
        li.classList.add('letter');
      } else {
        li.classList.add('space');
      }
      ul.appendChild(li);
    }
  }
   phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
  function checkLetter(button) {
    const listItems = document.querySelectorAll('#phrase li');
    let match = null;
  
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
  
      if (listItem.textContent === button.textContent.toLowerCase()) {
        listItem.classList.add('show');
        match = button.textContent;
      }
    }
  
    return match;
  }
// Select the keyboard element
 const keyboard = document.querySelector('#qwerty');


// Add event listener to keyboard element
keyboard.addEventListener('click', (event) => {
  // Only execute the code if a button is clicked
  if (event.target.tagName === 'BUTTON') {
    // Only execute the code if the button is not already chosen
    if (!event.target.classList.contains('chosen')) {
      // Add the 'chosen' class to the clicked button
      event.target.classList.add('chosen');
      // Call the checkLetter function and store the results in a variable
      const letterFound = checkLetter(event.target);
      // If the letter is not found, increment the missed counter and remove one of the heart images
      if (!letterFound) {
        missed++;
        const heart = document.querySelector('.tries img[src="images/liveheart.png"]');
        heart.src = 'images/' + 'lostheart.png';
    }
      // Check if the game is over
      checkWin();
    }
  }
});

function checkWin() {
    const letters = document.querySelectorAll('.letter');
    const shownLetters = document.querySelectorAll('.show');
  
    if (letters.length === shownLetters.length) {
      const overlay = document.querySelector('#overlay');
      overlay.classList.add('win');
      overlay.querySelector('.title').textContent = 'Congratulations, you won!';
      overlay.style.display = 'flex';
    }
  
    if (missed >= 5) {
      const overlay = document.querySelector('#overlay');
      overlay.classList.add('lose');
      overlay.querySelector('.title').textContent = 'Sorry, you lost!';
      overlay.style.display = 'flex';

    // Restart the game if the player loses
    resetButton.addEventListener('click', () => {
        // Remove the current phrase from the display
        const phrase = document.querySelector('#phrase ul');
        phrase.innerHTML = '';
  
        // Reset the missed counter, the heart images, and the chosen letters
        missed = 0;
        const hearts = document.querySelectorAll('.tries img');
        for (let i = 0; i < hearts.length; i++) {
          hearts[i].src = 'images/liveheart.png';
        }
        const chosenLetters = document.querySelectorAll('.chosen');
        for (let i = 0; i < chosenLetters.length; i++) {
          chosenLetters[i].classList.remove('chosen');
        }
  
        // Get a new phrase and add it to the display
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
  
        // Reset the overlay class and display property
        overlay.classList.remove('win', 'lose');
        overlay.style.display = 'none';
      });

      // Add event listener to reset game button on "success" and "failure" screens
const resetGameButton = document.querySelector('.btn__reset-game');
resetGameButton.addEventListener('click', () => {
  // Call the existing resetButton event listener code to reset the game
  resetButton.click();
});
    }
  }
