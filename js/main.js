function goToHome() {
    window.location.href = "index.html";
}

function goToAbout() {
    window.location.href = "about.html";
}

function goToInspiration() {
    window.location.href = "inspiration.html";
}

function goToJournal() {
    window.location.href = "journal.html";
}

// Get the modal
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.getElementById("add-habit");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// save habit when clicked
const saveHabit = document.getElementById("saveHabit");
const newHabit = document.getElementsByClassName("habit-container");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

saveHabit.addEventListener("click", function(){
    console.log("new habit added");
});



// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}