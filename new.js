const inputs = document.querySelector(".inputs"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongNumber = document.querySelector(".wrong-left span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let number, maxGuesses, corrects = [],incorrects = [];

function randomNumber(){
    //getting random object from wordlist
    let ranObj = numberList[Math.floor(Math.random() * numberList.length)]
    number = ranObj.number;//getting word of random object
    //console.log(ranObj);
    maxGuesses = 8; 
    corrects = []; incorrects = [];
    console.log(number);

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongNumber.innerText = incorrects;

    let html = "";
    for(let i = 0; i < number.length; i++){
        html +=`<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
    
}
randomNumber();

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[0-9]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes(key)) {
      //console.log(key);  
      if(number.includes(key)) {// if user letter found in the word
          for(let i = 0; i < number.length; i++) {
          //showing matched letter in the input value
              if(number[i] === key) {
                  corrects.push(key);
                  inputs.querySelectorAll("input")[i].value = key;
              }
          }
           //console.log("letter found");
      } else {
        //console.log("letter not found");
        maxGuesses--;         //decrement by 1
        incorrects.push(` ${key}`);
      }
      guessLeft.innerText = maxGuesses;
      wrongNumber.innerText = incorrects;
    }
    //console.log(key);
    
    typingInput.value = "";

    setTimeout(() => {
        if(corrects.length === number.length) { //if user found all letters
        alert(`Congrats! You found the word ${number.toUpperCase()}`);
        return randomNumber();//calling randomWord function so the game reset
  
        } else if(maxGuesses < 1) {    //if user couldn't found all letters
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < number.length; i++) {
          //showing matched letter in the input 
          
                inputs.querySelectorAll("input")[i].value = number[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click",randomNumber);
typingInput.addEventListener("input",initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());