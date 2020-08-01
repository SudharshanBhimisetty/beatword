var currentWord = document.querySelector("#current-word");
var inputWord = document.querySelector("#input-word");
var message = document.querySelector("#message");
var timeDisplayed = document.querySelector("#time-left");
var scoreDisplayed = document.querySelector("#score");
var startGame = document.querySelector("#start-game");
var endGame = document.querySelector("#end-game");
var hard = document.querySelector("#hard-game");
var easy = document.querySelector("#easy-game");
var previousScoreDisplayed= document.querySelector("#previous-score");
var highScoreDisplayed = document.querySelector("#high-score");

var hardButton = false;
var easyButton = true;


const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
  ];

var isplaying;
var time = 5;
var score = 0;
var m;
var highScore=0;

startGame.addEventListener("click",function(){
    inputWord.value = "";
    clearInterval(m);
    time=6;
       init();
       isplaying = true;
       document.querySelector('input').focus()
});

endGame.addEventListener("click",function(){
    clearInterval(m);
    time = 5;
    timeDisplayed.innerHTML = time;
    message.innerHTML="";
    inputWord.value = "";
    if(isplaying){
        gameended();
    }
})


hard.addEventListener("click",function(){   
    easy.classList.remove("selected");
    hard.classList.add("selected");
    hardButton = true;
    easyButton = false;
    if(!isplaying){
    hardWordGenerator();
    }
 })
 
 easy.addEventListener("click",function(){
    easy.classList.add("selected");
    hard.classList.remove("selected");
     easyButton = true;
     hardButton = false;
     if(!isplaying){
     showWord();
     }
 })

function gameended(){
    isplaying = false;
    Swal.fire({
    
        title: "Your Score: " + score,
        
        text : "Don't worry!!,Try again",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok",
    
      })
    // alert("your score: " + score);
    previousScoreDisplayed.innerHTML = score;
    score = 0;
    scoreDisplayed.innerHTML = score;
    highScoreDisplayed.innerHTML = highScore;
}


function countdown(){
    if(time>0){
        time--;
    }else if(time === 0){
        clearInterval(m);
        time=5;
        message.innerHTML = "Game Over";
        gameended();
        message.innerHTML="";
     }
    timeDisplayed.innerHTML = time;
  }

function init(){
      if(easyButton){
       showWord();
      }
      if(hardButton){
         hardWordGenerator();
      }
       inputWord.addEventListener("input",startMatch);
       m = setInterval(countdown,1000);
    }

function showWord(){
        var indexnum = Math.floor(Math.random() * words.length)
        currentWord.innerHTML = words[indexnum];
    }


function startMatch(){
        if(isplaying && matchWords()){
              time = 6;
              if(easyButton){
                showWord();
               }
               if(hardButton){
                  hardWordGenerator();
               }
              inputWord.value = "";
              score++;
              if(score > highScore){
                highScore = score;
            }
              scoreDisplayed.innerHTML = score;
            }
}

function matchWords(){        
        if(inputWord.value===currentWord.innerHTML){
            message.innerHTML = "Correct";
            return true;
        }else{
          message.innerHTML = "";
          return false;
        }
      }

function hardWordGenerator(){
    var letters=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var wordlength = randomIntFromInterval(5,10);
    var finalword = "";
    
    for(var i =0;i<wordlength;i++){
         finalword = finalword + randomletter();
    }
    
    function randomletter(){
        var index = Math.floor(Math.random() * letters.length);
         return letters[index];    
    }
    
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      currentWord.innerHTML = finalword;
    }
