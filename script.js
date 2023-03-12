const gameContainer = document.getElementById("game");
//check localStorage for best score
if(localStorage.length > 0){
  document.querySelector("#bestScore").innerText = localStorage.bestScore;
}

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
let store = null;
let scoreCounter = 0;
let clickAllow = true;
document.querySelector("#newGame").addEventListener("click", reset)

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);
  console.log(e);
  //select some useful groups of cards 
  let cardClass = document.querySelectorAll(`.${store}`);
  const allCards = document.querySelectorAll(`#game div`);
  //if card is already selected or matched, do nothing
  if(e.target.classList.contains("match") || e.target.classList.contains("selected") || clickAllow === false){
    console.log("do nothing");
  }
  else{
    //select card
    //check if a card is stored
    //if not, store card
    e.target.classList.add("selected");
    if(store === null){
      store = e.target.classList[0];
      e.target.classList.toggle(`${e.target.classList[0]}On`);
    }
    //if selected card matches store, match and keep up
    else if(store === e.target.classList[0]){
      e.target.classList.toggle(`${e.target.classList[0]}On`);
      for(let card of cardClass){
        card.classList.add("match");
        card.style.border = "8px solid gold";
      }
      //if al cards are a match, win and restart
      let checkCards = Array.from(allCards);
      let checkWin = checkCards.every(card => card.classList.contains("match"));
      if(checkWin){
        document.querySelector("#congrats").style.display = "flex";
        document.querySelector(".main").style.opacity = 0.3;
      }
      store = null;
    }
    //if card does not match
    //toggle class that displays color and toggle off after 1 sec
    else if(store != e.target.classList[0] && store != null){
      e.target.classList.toggle(`${e.target.classList[0]}On`);
      clickAllow = false;
      setTimeout(flip, 500);
      function flip(){
        for(let card of cardClass){
          if(card.classList.contains(`${store}On`)){
            card.classList.toggle(`${store}On`);
            e.target.classList.toggle(`${e.target.classList[0]}On`);
          }
        }
        for(let card of allCards){
          card.classList.remove("selected");
        }
        scoreCounter += 1;
        document.querySelector("#score").textContent = scoreCounter;
        store = null;
        clickAllow = true;
      }
    }
  }
}
//reset game and check/store high score
function reset(){
  document.querySelector("#congrats").style.display = "none";
  const allCards = document.querySelectorAll(`#game div`);
  for(let card of allCards){
    card.classList.remove("match", "selected", `${card.classList[0]}On`);
    card.style.border = "1px solid black";
  }
  document.querySelector("#score").textContent = scoreCounter;
  document.querySelector(".main").style.opacity = 1;
  if(localStorage.length > 0){
    if(parseInt(localStorage.bestScore) > scoreCounter){
      localStorage.setItem("bestScore", scoreCounter);
    }
  }
  if(localStorage.length === 0){
    localStorage.setItem("bestScore", scoreCounter);
  }
  document.querySelector("#bestScore").innerText =  localStorage.bestScore;  
  scoreCounter = 0;
  document.querySelector("#score").innerText = scoreCounter;
}

// when the DOM loads
createDivsForColors(shuffledColors);
