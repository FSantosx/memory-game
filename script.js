const stage = document.querySelector(".memory-game");
const images = ["v", "kratos", "crash", "spyro", "soul", "coen"]; // nome das imagens para preencher dinamicamente na função "buildGame"
const bagde = "js-badge";
const display = document.getElementById("counter");
const resetButton = document.getElementById("reset");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let sec = 0;
let matchedPairs = 0;
let timerId = null;
let unflipTimeout = null;

function buildGame() {
  const duplicatedImgs = [...images, ...images];
  duplicatedImgs.forEach((image) => {
    const newDiv = document.createElement("div");
    const frontImage = document.createElement("img");
    const backImage = document.createElement("img");
    newDiv.className = "memory-card";
    newDiv.dataset.framework = `${image}`;
    frontImage.className = "front-face";
    frontImage.src = `img/${image}.jpg`;
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

  matchedPairs += 1;
  if (matchedPairs === images.length) {
    clearInterval(timerId); // board completo: para o contador
    display.innerText = `Você venceu em ${sec} secondos!`;
  }
}

function unflipCards() {
  lockBoard = true;

  unflipTimeout = setTimeout(() => {
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

function startGame() {
  clearInterval(timerId);
  clearTimeout(unflipTimeout);
  document.querySelectorAll(".memory-card").forEach((card) => card.remove());
  resetBoard();
  sec = 0;
  matchedPairs = 0;
  display.innerText = `${sec} secondos`;
  buildGame();
  timerId = setInterval(timer, 1000);
}

resetButton.addEventListener("click", startGame);

startGame();
