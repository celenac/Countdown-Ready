console.log("running popup.js");

// Pure JS:
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("countdown_btn").addEventListener("click", showTimer);
});

// The showTimer function also must go in a .js file
function showTimer() {
  console.log("start timer");

  var input_datetime = document.getElementById("datetime").value;
  var deadline = new Date(input_datetime);
  
  chrome.storage.local.set({datetime: input_datetime});
  console.log("storage local set");

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
