console.log("running popup.js");

// Pure JS:
// Add listener after whole HTML document has been loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOMcontentedLoaded");
  document.getElementById("countdown_btn").addEventListener("click", validateInputs);
  
});

// Add listenter after entire page (HTML, CSS stylesheets, etc.) has been loaded
// window.addEventListener("load", function() {
//   console.log("loaded");
//   document.getElementById("countdown_btn").addEventListener("click", startTimer);
// });

function validateInputs() {
  console.log("validating inputs");
  if (document.getElementById("event_countdown_mode").style.display === "block") { // if in countdown mode
    if (document.getElementById("datetime").value) { // if value exists
      startTimer("event countdown");
    } else { 
      alert("Please enter a valid date and time!");
    }
  } else { // otherwise, we are in timer mode
    console.log("time measure: ", document.getElementById("time_value").value == null);
    if (document.getElementById("time_value").value.length != 0) { // if value exists
      startTimer("timer");
    } else { 
      alert("Please enter a valid time duration!");
    }
  }
}

// The showTimer function also must go in a .js file
function startTimer(mode) {
  console.log("start timer");

  var deadline;
  if (mode === "event countdown") {
    var input_datetime = document.getElementById("datetime").value;
    deadline = new Date(input_datetime);

    console.log("deadline: ", deadline);
    console.log("input datetime: ", input_datetime);
  
    chrome.storage.local.set({datetime: deadline});
    console.log("storage local set");

  } else { // mode === "timer"
    if (document.getElementById("time_measure").value === 'minutes') {
      deadline = new Date();
      var time_in_ms = (document.getElementById("time_value").value) * 60 * 1000;
      deadline.setTime(deadline.getTime() + time_in_ms);

    } else { // else, time_measure === 'hours'
      deadline = new Date();
      console.log("hours before: ", deadline.getTime());
      var time_in_ms = (document.getElementById("time_value").value) * 60 * 60 * 1000;
      deadline.setTime(deadline.getTime() + time_in_ms);
      console.log("hours after: ", deadline.getTime());
      console.log("time in hours: ", deadline.getHours() - (new Date()).getHours());
    }    
  }
  chrome.storage.local.set({datetime: deadline.toString()});
  

  var x = setInterval(function() {
    var now = new Date().getTime();
    var t = deadline - now;

    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((t % (1000 * 60)) / 1000);
    // document.body.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    // document.getElementById("datetime").innerHTML ="";

    document.getElementById("countdown_display").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    document.getElementById("countdown_confirmation").innerHTML = "Countdown started";

    document.getElementById("countdown_btn").disabled = true;
    document.getElementById("datetime").disabled = true;
    document.getElementById("time_value").disabled = true;
    document.getElementById("time_measure").disabled = true;
    document.getElementById("switch_mode").disabled = true;

    if (t < 0) {
        clearInterval(x);
        document.getElementById("countdown_display").innerHTML = "EXPIRED";
    }
  }, 1000);

}


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("reset").addEventListener("click", resetTimer);
});

function resetTimer() {
  chrome.storage.local.clear();
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("switch_mode").addEventListener("click", switchMode);
});

function switchMode() {
  var event_countdown_mode = document.getElementById("event_countdown_mode");
  var timer_mode = document.getElementById("timer_mode"); 

  event_countdown_mode.style.display = (
       event_countdown_mode.style.display == "none" ? "block" : "none"); 
   timer_mode.style.display = (
       timer_mode.style.display == "none" ? "block" : "none"); 
}
