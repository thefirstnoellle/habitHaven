// Clicking logo brings user to homepage
function goToHome() {
    window.location.href = "index.html";
}
// Clicking About brings user to About page
function goToAbout() {
    window.location.href = "about.html";
}
// Clicking Inspiration brings user to Inspiration page
function goToInspiration() {
    window.location.href = "inspiration.html";
}
// Clicking Journal brings user to Journal page
function goToJournal() {
    window.location.href = "journal.html";
}
// Clicking Login brings user to Login page
function goToLogin() {
  window.location.href = "login.html";
}

// Get modal
const modal = document.getElementById("myModal");
// Get button that opens the modal
const btn = document.getElementById("add-habit");
// Get element that closes the modal
const closeModal = document.getElementById("close");

// When the user clicks the button, open the modal 
btn.addEventListener("click", function() {
  modal.style.display = "block";
});

// When the user clicks on x, modal closes
closeModal.addEventListener("click", function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, modal closes
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

const saveHabit = document.getElementById("saveHabit");
const habitName = document.getElementById("habitName");
const habitGoal = document.getElementById("habitGoal");
const unit = document.getElementById("selectUnit");

// Save Habit
const habitElement = document.createElement("div");
const habitContainer = document.getElementById("habitContainer");

saveHabit.addEventListener("click", function() {
    habitElement.textContent = habitName.value + " - Goal: " + habitGoal.value + " " + unit.value + " " + unit;
    habitContainer.appendChild(habitElement);

    modal.style.display = "none";
});

// Create functions to change with progress using radio buttons
const radioButtons = document.querySelectorAll('input[type="radio"][name="habit"]');
  
function functionFor25() {
  const progress25 = document.getElementById("progress");
  progress.src="images/progress-25.png";
};

function functionFor50() {
  const progress50 = document.getElementById("progress");
  progress.src="images/progress-50.png";
};

function functionFor100() {
  const progress100 = document.getElementById("progress");
  progress.src="images/progress-100.png";
};

  // Add event listener to each radio button
  radioButtons.forEach(function(radioButton) {
      radioButton.addEventListener("change", function() {
          // Check which radio button is selected
          if (this.value === "25") {
              // Perform function for value="25"
              functionFor25();
          } else if (this.value === "50") {
              // Perform function for value="50"
              functionFor50();
          } else if (this.value === "100") {
              // Perform function for value="100"
              functionFor100();
          }
      });
  });

