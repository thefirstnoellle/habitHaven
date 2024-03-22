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
const habitElement = document.createElement("div");
const unit = document.getElementById("selectUnit");
const progressSelector = document.createElement("select");
const progressImg = document.createElement("img")

// Save New Habit
saveHabit.addEventListener("click", function() {
const habitContainer = document.getElementById("habitContainer");
const habitNameValue = document.createElement("p");
const habitGoalValue = document.createElement("p");
const habitColor = document.getElementById("habitColor");
habitNameValue.textContent = habitName.value
habitGoalValue.textContent = "Goal: " + habitGoal.value + " " + unit.value;
// add progress image
  progressImg.src = "images/progress-0.png";

// add options to secect element    
  const option0 = document.createElement("option");
  progressSelector.add(option0);

  const option25 = document.createElement("option");
  option25.text = (habitGoal.value * 0.25) + " " + unit.value;
  progressSelector.add(option25);

  const option50 = document.createElement("option");
  option50.text = (habitGoal.value * 0.5) + " " + unit.value;
  progressSelector.add(option50);

  const option75 = document.createElement("option");
  option75.text = (habitGoal.value * 0.75) + " " + unit.value;
  progressSelector.add(option75);

  const optionComplete = document.createElement("option");
  optionComplete.text = (habitGoal.value * 1) + " " + unit.value;
  progressSelector.add(optionComplete);

// display new habit after saving
  habitContainer.appendChild(habitElement);
  habitElement.appendChild(habitNameValue);
  habitElement.appendChild(habitGoalValue);
  habitElement.appendChild(progressSelector);
  habitElement.appendChild(progressImg);
// change background color of habitElement to selected value
habitElement.style.backgroundColor= habitColor.value;

// alert if fields are empty
if (!habitName.value || !habitGoal.value) {
  alert("Please complete all fields.");
  return;
}

// close modal after saving
  modal.style.display = "none";
//assign class names to variables
  habitElement.classList.add("habitElement");
  progressImg.classList.add("progress");
  progressSelector.classList.add("progressSelector");
  habitNameValue.classList.add("habitName");
  habitGoalValue.classList.add("habitGoal");
  
// clear entered values after saving
  habitName.value = "";
  habitGoal.value = "";
  unit.value = "";
});

// change progress img when user selects option
progressSelector.addEventListener("change", function() {
  if (progressSelector.selectedIndex === 1) {
    progressImg.src = "images/progress-25.png";
  } else if (progressSelector.selectedIndex === 2) {
    progressImg.src = "images/progress-50.png";
  } else if (progressSelector.selectedIndex === 3) {
    progressImg.src = "images/progress-75.png";
  } else if (progressSelector.selectedIndex === 4) {
    progressImg.src = "images/progress-100.png"
  } else {
    progressImg.src = "images/progress-0.png"
  }
});

// create delete modal
const deleteModal = document.createElement("div");
deleteModal.classList.add("deleteModal");
// create delete modal content
const deleteModalContent = document.createElement("div");
deleteModalContent.classList.add("deleteModal-content");
deleteModalContent.textContent = "Are you sure you want to delete this habit?";

// create cancel button
const cancelBtn = document.createElement("button");
cancelBtn.classList.add("cancelBtn");
cancelBtn.textContent = "Cancel";

// create delete button
const deleteBtn = document.createElement("button");
deleteBtn.classList.add("deleteBtn");
deleteBtn.textContent = "Delete Forever";

habitElement.appendChild(deleteModal);
deleteModal.appendChild(deleteModalContent);
deleteModalContent.appendChild(cancelBtn);
deleteModalContent.appendChild(deleteBtn);

// delete modal opens on double click
habitElement.addEventListener("dblclick", function() {
deleteModal.style.display = "block";
});

deleteBtn.addEventListener("click", function () {
habitElement.style.display = "none";
});

cancelBtn.addEventListener("click", function() {
deleteModal.style.display = "none";
});

