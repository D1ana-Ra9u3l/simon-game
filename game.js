var buttonColors=["green","blue","red","yellow"];
var randomNumber=0;
var fullSequence=[];
var userSequence=[];
var nextColor=0;
var sound=0;
var started=false;
function soundEffect(whichColor){
    sound= new Audio("./sounds/"+whichColor+".mp3");
    sound.play();
}
$(document).keydown(function(){
    if(!started){ //"!started" is equvalent to "started===false"
        nextSequence();
        started=true;
    }
})
function nextSequence(){
    randomNumber=Math.floor(4*Math.random());
    nextColor=buttonColors[randomNumber];
    fullSequence.push(nextColor);
    $("h1").text("Level "+(fullSequence.length));
    $("#"+nextColor).animate({opacity:0},50);
    soundEffect(nextColor);
    setTimeout(function(){$("#"+nextColor).animate({opacity:"100%"})}, 50);
}
$(".btn").click(function(){
    var userSelectedColor=0;
    userSelectedColor=this.id;
    userSequence.push(userSelectedColor);
    $("#"+userSelectedColor).addClass("pressed");
    soundEffect(userSelectedColor);
    setTimeout(function(){$("#"+userSelectedColor).removeClass("pressed");},50);
    checkAnswer(userSequence.length);          
})
function checkAnswer(counter){
    counter--;
    if(userSequence[counter]!==fullSequence[counter]){
        $("body").addClass("game-over");
        $("h1").text("Game Over");
        var wrongSound=new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        setTimeout(function (){$("body").removeClass("game-over");}, 200);
        setTimeout(function(){window.location.reload()}, 800);
    } else if(userSequence.length===fullSequence.length){
        userSequence=[];
        setTimeout(nextSequence, 1000);
    }
}

