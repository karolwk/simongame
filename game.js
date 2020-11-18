let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let gameStared = false;
let gameEnded = false;
let level = 0;
let currentLevel = 0;


function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let color = buttonColours[randomNumber]
    gamePattern.push(color);    
    level++;
    $('#level-title').text(`Level ${level}`);   
    $("#" + color).fadeOut(100).fadeIn(100);
    playSound(color);
}

function showMoves() {
    let i = 0
    let interval = setInterval(() => {
        let color = buttonColours[gamePattern[i]]
        $("#" + color).fadeOut(100).fadeIn(100);
        playSound(color);
        i++;
        if (i === gamePattern.length) clearInterval(interval);
        
    }, 500);

}

function playSound(name) {
    let audio = new Audio(`sounds\\${name}.mp3`);
    audio.play();

}

function animatePress(currentColour) {
    $('#' + currentColour).addClass("pressed");
    setTimeout(() => {
        $('#' + currentColour).removeClass("pressed");
    }, 100);

    
}

function checkAnswer(current){
    if (gamePattern[current] === userClickedPattern[current]){
        if(currentLevel == level){            
            userClickedPattern = []
            setTimeout(() => {
                nextSequence();
                currentLevel = 0;
                gameStared = true;
            }, 1000);           
            
            console.log("success");
            return true
        }      
        gameStared = true;  
        return true;
    }
    else {
        console.log("fail");        
        gameOver();
        return false;
    }

}


function gameOver() {
    $("body").addClass("game-over");
    gameStared = false;
    gameEnded = true;
    $('#level-title').text("Game Over, Press Any Key to Restart");   
    playSound("wrong");
    setTimeout(() => {
        $("body").removeClass("game-over");
        
    }, 200);
}

function restartGame() {
    currentLevel = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameEnded = false;    
    gameStared = true;
    nextSequence();   


}


$(document).keydown(function (e) { 
    if (e.key === "a" && !gameStared && !gameEnded ) {
        gameStared = true;        
        nextSequence();
    }
    if (gameEnded){
        restartGame();
    }
    
});



$('div[type="button"]').click(function () { 
        if ((currentLevel < level) && gameStared == true ){
            currentLevel++; 
            let userChosenColour = $(this).attr("id");
            playSound(userChosenColour);
            userClickedPattern.push(userChosenColour);  
            animatePress(userChosenColour);
            console.log(userClickedPattern);    
            console.log(gamePattern);
            gameStared = false;         
            checkAnswer(currentLevel - 1);                    
        
    }

}) 


