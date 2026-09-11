const stage = document.querySelector(".memory-game");
const images = ["angular", "aurelia", "backbone", "ember", "react", "vue"];
const bagde = "js-badge";
const display = document.getElementById("counter");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let sec = 0;

function buildGame() {
  const duplicatedImgs = [...images, ...images];
  duplicatedImgs.forEach((image) => {
    const newDiv = document.createElement("div");
    const frontImage = document.createElement("img");
    const backImage = document.createElement("img");
    newDiv.className = "memory-card";
    newDiv.dataset.framework = `${image}`;
    frontImage.className = "front-face";
    frontImage.src = `img/${image}.svg`;
    frontImage.alt = "Face da Carta";
    backImage.className = "back-face";
    backImage.src = `img/${bagde}.svg`;
    backImage.alt = "Verso da Carta";
    newDiv.append(frontImage);
    newDiv.append(backImage);
    stage.append(newDiv);
  });

  const cards = document.querySelectorAll(".memory-card");

  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });

  cards.forEach((card) => card.addEventListener("click", flipCard));
}

function flipCard() {
  if (lockBoard) return;
  if (this == firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function timer() {
  sec += 1;
  display.innerText = `${sec} seconds`;
}

buildGame();

setInterval(() => {
  timer();
}, 1000);
