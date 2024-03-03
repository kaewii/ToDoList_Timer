const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")

function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li")
        li.innerHTML= inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }
    inputBox.value = ""
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();













































let intervalId;
let remainingSeconds;
let isTimerRunning = false;

function updateTime() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}


let tickSound = document.getElementById('tick-sound'); // Ensure this is the correct ID of your audio element

function startTimer() {
    if (!isTimerRunning) {
        remainingSeconds = parseInt(document.getElementById('set-minutes').value || 0) * 60;
        isTimerRunning = true;

        // Reset the tick sound to ensure it starts from the beginning
        tickSound.currentTime = 0;
    }
    
    if (!intervalId) {
        intervalId = setInterval(() => {
            if (remainingSeconds > 0) {
                remainingSeconds--;
                updateTime();
                
                // Play the tick sound at the start of each interval
                if(tickSound.paused) {
                    tickSound.play();
                } else {
                    tickSound.currentTime = 0; // Resets the audio to start if it's already playing
                }
                
            } else {
                clearInterval(intervalId);
                intervalId = null;
                isTimerRunning = false;
                
                // Stop the tick sound when the timer ends
                tickSound.pause();
                tickSound.currentTime = 0;
            }
        }, 1000); // Assuming your timer updates every second
    }
}



    

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById('tick-sound').pause();
    document.getElementById('tick-sound').currentTime = 0; // Reset sound to start
}

function resetTimer() {
    stopTimer();
    remainingSeconds = parseInt(document.getElementById('set-minutes').value || 0) * 60;
    isTimerRunning = false;
    updateTime();
}

function renewTimer() {
    resetTimer();
    startTimer();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('renew').addEventListener('click', renewTimer);


updateTime();
