var start=true;
var minute=25;
var second=00;
var shortBreakTime=5;
var longBreakTime=30;
var resterCalc=0;
var longBreak=0;
createTimeLabelMin=document.createElement("h1");
createTimeLabelSec=document.createElement("h1");
$(".minSec").append(createTimeLabelMin);
$(".minSec").append(createTimeLabelSec);
firstLabel=$("h1:first-child").addClass("minuteText time");
secondLabel=$("h1:last-child").addClass("secondText time");
firstLabel.html(minute);
secondLabel.html(second);
var pamodoroBtnSelector=$(".pomodoroButton");
var secondChanger=$(".secondText");
var minuteChanger=$(".minuteText");
var workTimeSet=$("#workMinSet");
var shortBreakSet=$("#shortBreakSet");
var longBreakSet=$("#longBreakSet");
var workTimeAudio=new Audio("audio/your-working-time.mp3");

$(document).ready( ()=> {
minuteChanger.html(minute);
secondChanger.html(second);
workTimeSet.attr("value",minute);
shortBreakSet.attr("value",shortBreakTime);
longBreakSet.attr("value",longBreakTime);
});

var plusWorkTime= $(".plusWorkMin").on("click", ()=> {
    minute++;
    minuteChanger.html(minute);
    workTimeSet.val(minute);
});

var keyMin=workTimeSet.on("keyup", ()=> {
    minute=workTimeSet.val();
    minuteChanger.html(minute);
});

var minusWorkTime =$(".minusWorkMin").on("click", ()=> {
    minute--;
    minuteChanger.html(minute);
    workTimeSet.val(minute);
});

var resMin=shortBreakSet.on("keyup", () => {
    shortBreakTime=shortBreakSet.val();
});
var plusShortBreak=$(".plusRes").on("click",()=> {
    shortBreakTime++;
    shortBreakSet.val(shortBreakTime);
});

var minusShortBreak=$(".minusRes").on("click", () => {
    shortBreakTime--;
    shortBreakSet.val(shortBreakTime);
});

var longResMin=longBreakSet.on("keyup", () => {
    longBreakTime=longBreakSet.val();
})
var plusLongBreak=$(".plusLongRes").on("click", () => {
    longBreakTime++;
    longBreakSet.val(longBreakTime);
});
var minusLongBreak=$(".minusLongRes").on("click", () => {
    longBreakTime--;
    longBreakSet.val(longBreakTime);
});

var startPomodoro = $(".pomodoroButton").on("click", ()=> {
start=false;
workTimeAudio.play();
checkStart();
$(".settingsContainer").css("visibility","hidden");
});

// CONTROL THE WORKING TIME 

function checkWork (restCounter) {
    workTimeAudio.play();
    clearInterval(restCounter);
    second=00;
    minute=workTimeSet.val();
    longBreak++;

    var firstCounter=setInterval( () => {
        secondChanger.html(second);
        minuteChanger.html(minute);
        second--;
        if(second<0) {
            second=59;
            minute--;
            if(minute<0) {
                checkRest(firstCounter); // IF MINUTE AND SECOND LESS THAN OTHER INTERVAL
            }
        }
    },10)
       
}
function checkRest(z) {
        clearInterval(z);
        second=00;
        $(".totalText").html("You have been working for "+(longBreak*25)+" minutes (breaks don't include)"); //SHOW THE WORK TIME
        if(longBreak%3==0) 
        {
        minute=longBreakSet.val();  // IF YOU WORKED FOR 3 TIMES, YOUR TIMER WILL REST YOU FOR 30 MINS.
        restTimeAudio=new Audio("audio/your-long-rest-time.mp3"); 
        }
        else {
        restTimeAudio=new Audio("audio/your-rest-time.mp3"); //OTHER BREAKS JUST 5 MINS.
        minute=shortBreakSet.val();
        }
        restTimeAudio.play();
                var restCounter= setInterval( () => {
                secondChanger.html(second);
                minuteChanger.html(minute);
                second--;
                if(second<0) {
                    second=59;
                    minute--;    
                    if(minute<0) {
                        checkWork(restCounter);
                    }
                }
                 },10)
}

function checkStart() {
    if(start==true) {
        pamodoroBtnSelector.css("backgroundColor","#43c705");
    }
    else{
        pamodoroBtnSelector.css("display","none");
        var pomodoroLabel=document.createElement("h2");
        $(".pomodoroContainer").append(pomodoroLabel);
        $("h2").attr("class","showStarted");
        $(".showStarted").html("Pomodoro Started Click For Reset");
        checkWork();       

        $(".showStarted").on("click", ()=> {
            location.reload();
        })
    }
}