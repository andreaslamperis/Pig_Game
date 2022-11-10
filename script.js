"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

// Switch player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Rolling dice functionality
btnRoll.addEventListener("click", () => {
  if (isPlaying) {
    // Generate a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;
    // Display dice
    diceEl.classList.remove("hidden");
    diceEl.setAttribute("src", `dice-${dice}.png`);
    // Check for roll 1. if true=switch to new player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (isPlaying) {
    // Add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check if score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", () => {
  // if there is player that won remove player--winner class
  if (isPlaying === false) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--winner");
  }

  // set player back to 0
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");

  // set scores to 0
  document.querySelectorAll(".score")[0].textContent = 0;
  document.querySelectorAll(".score")[1].textContent = 0;

  // set current to 0
  document.querySelectorAll(".current-score")[0].textContent = 0;
  document.querySelectorAll(".current-score")[1].textContent = 0;

  // set all the values to 0
  isPlaying = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];

  // hide the dice
  diceEl.classList.add("hidden");
});
