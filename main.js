"use strict";
const button_new = document.querySelector("#btn-new");
const button_dice = document.querySelector("#btn-dice");
const button_hold = document.querySelector("#btn-hold");

const dice_score = document.querySelector(".dice");

const player1 = {
  number: 1,
  nameDOM: document.querySelector(".name1"),
  playerDOM: document.querySelector("#p1"),
  curr_scoreDOM: document.querySelector("#cs1"),
  scoreDOM: document.querySelector("#sc1"),
};

const player2 = {
  number: 2,
  nameDOM: document.querySelector(".name2"),
  playerDOM: document.querySelector("#p2"),
  curr_scoreDOM: document.querySelector("#cs2"),
  scoreDOM: document.querySelector("#sc2"),
};

const players = [player1, player2];

const start_button = document.querySelector(".btn-start");

start_button.addEventListener("click", function () {
  const overlay = document.querySelector(".overlay");
  const start_msg = document.querySelector(".start-msg");
  overlay.classList.add("invisible");
  start_msg.classList.add("invisible");
  setTimeout(() => {
    overlay.classList.add("hidden");
    start_msg.classList.add("hidden");
  }, 250);
  const inputs = document.querySelectorAll(".inp-name");

  players.forEach((player) => {
    player.nameDOM.textContent =
      inputs[player.number - 1].value == ""
        ? "Player " + player.number
        : inputs[player.number - 1].value;
  });
});

let dicescore;

let currentPlayer = player1;

const num_words = ["", "one", "two", "three", "four", "five", "six"];
const player_flag = document.createElement("i");
player_flag.className = "fas fa-angle-double-down fa-4x";
const changePlayer = function () {
  currentPlayer.playerDOM.children[0].remove();
  currentPlayer.playerDOM.classList.remove("active");
  currentPlayer = currentPlayer == player1 ? player2 : player1;
  currentPlayer.playerDOM.classList.add("active");
  currentPlayer.playerDOM.insertBefore(
    player_flag,
    currentPlayer.playerDOM.firstChild
  );
};

button_hold.addEventListener("click", () => {
  const new_score =
    Number(currentPlayer.scoreDOM.textContent) +
    Number(currentPlayer.curr_scoreDOM.textContent);
  currentPlayer.scoreDOM.textContent = new_score;

  if (new_score >= 100) {
    button_hold.disabled = true;
    button_dice.disabled = true;
    currentPlayer.playerDOM.querySelector(".winner").classList.toggle("hidden");
  }
  currentPlayer.curr_scoreDOM.textContent = 0;
  changePlayer();
});

button_dice.addEventListener("click", () => {
  const randomno = Math.floor(Math.random() * 6) + 1;
  const dice_icon = `<i class="fas fa-dice-${num_words[randomno]} fa-2x"></i>`;
  setTimeout(() => {
    dice_score.innerHTML = dice_icon;
    dice_score.classList.toggle("rolling");
    if (randomno == 1) {
      currentPlayer.curr_scoreDOM.textContent = 0;
      changePlayer();
    } else {
      currentPlayer.curr_scoreDOM.textContent =
        Number(currentPlayer.curr_scoreDOM.textContent) + randomno;
    }
  }, 1000);
  dice_score.innerHTML = '<i class="fas fa-stop fa-2x"></i>';
  dice_score.classList.toggle("rolling");
});

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    start_button.click();
  }
});

button_new.addEventListener("click", () => {
  players.forEach((player) => {
    player.curr_scoreDOM.textContent = 0;
    player.scoreDOM.textContent = 0;
    player.playerDOM.querySelector(".winner").classList.add("hidden");
  });
  if (player1.playerDOM.firstChild != player_flag) {
    console.log("yes");
    console.log(player2.playerDOM.children[0]);
    player1.playerDOM.insertBefore(player_flag, player1.playerDOM.firstChild);
    console.log(player2.playerDOM.children[0]);
  }
  button_dice.disabled = false;
  button_hold.disabled = false;
  player1.playerDOM.classList.add("active");
  player2.playerDOM.classList.remove("active");
  dice_score.textContent = "Dice";
  currentPlayer = player1;
});
