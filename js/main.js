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

// Create Calendar
const calendarContainer = document.getElementById('calendar');
const prevWeekBtn = document.getElementById('prevWeek');
const nextWeekBtn = document.getElementById('nextWeek');

  let currentDate = new Date();
  renderCalendar(currentDate);
// Clicking left arrow brings user to previous week
  prevWeekBtn.addEventListener('click', function() {
    currentDate.setDate(currentDate.getDate() - 7);
    renderCalendar(currentDate);
  });
// Clicking right arrow brings user to next week
  nextWeekBtn.addEventListener('click', function() {
    currentDate.setDate(currentDate.getDate() + 7);
    renderCalendar(currentDate);
  });
// Display days of week
  function renderCalendar(date) {
    calendarContainer.innerHTML = '';
    const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
// Create day    
    for (let i = 0; i < 7; i++) {
      const day = new Date(date);
      day.setDate(date.getDate() + i - date.getDay());

      const dayElement = document.createElement('div');
      dayElement.classList.add('day');
      dayElement.textContent = daysOfWeek[i] + ' ' + day.getDate();
// Highlight today's date
     if (SameDay(day, new Date())) {
        dayElement.style.backgroundColor = "#feead4a0";
        dayElement.style.borderRadius = "30px";
      } 
// Function that occurs when clicking on date
      dayElement.addEventListener('click', function() {
        // add function
      });

      calendarContainer.appendChild(dayElement);
    }
  }

  function SameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
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

const newHabit = document.getElementById("newHabit");
const habitName = document.getElementById("habitName");
const habitGoal = document.getElementById("habitGoal");
const unit = document.getElementById("selectUnit");
const habitContainer = document.getElementById("habitContainer");

// Save New Habit
newHabit.addEventListener("click", function() {
// alert if fields are empty
  if (!habitName.value || !habitGoal.value) {
    alert("Please complete all fields.");
    return;
  }
// close modal after saving
  modal.style.display = "none";

  createNewHabit();

// clear entered values after saving
  habitName.value = "";
  habitGoal.value = "";
  unit.value = "";
});

const habitElement = document.createElement("div");
const habitNameValue = document.createElement("p");
const habitGoalValue = document.createElement("p");
const habitColor = document.getElementById("habitColor");

// Create elements for new habit
function createNewHabit () {

// Set habit name and goal
habitNameValue.textContent = habitName.value
habitGoalValue.textContent = "Goal: " + habitGoal.value + " " + unit.value;

// add progress image
  const progressImg = document.createElement("img");
  progressImg.src = "images/progress-0.png";
// create progress select element
  const progressSelector = document.createElement("select");
// add options to secect element    
  const option0 = document.createElement("option");
  progressSelector.add(option0);

  const option25 = document.createElement("option");
  option25.text = Math.round(habitGoal.value * 0.25) + " " + unit.value;
  progressSelector.add(option25);

  const option50 = document.createElement("option");
  option50.text = Math.round(habitGoal.value * 0.5) + " " + unit.value;
  progressSelector.add(option50);

  const option75 = document.createElement("option");
  option75.text = Math.round(habitGoal.value * 0.75) + " " + unit.value;
  progressSelector.add(option75);

  const optionComplete = document.createElement("option");
  optionComplete.text = Math.round(habitGoal.value * 1) + " " + unit.value;
  progressSelector.add(optionComplete);

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

  // change background color of habitElement to selected value
  habitElement.style.backgroundColor= habitColor.value;

// Display new habit after saving
  habitContainer.appendChild(habitElement);
  habitElement.appendChild(habitNameValue);
  habitElement.appendChild(habitGoalValue);
  habitElement.appendChild(progressSelector);
  habitElement.appendChild(progressImg);

//assign class names to variables
  habitElement.classList.add("habitElement");
  progressImg.classList.add("progress");
  progressSelector.classList.add("progressSelector");
  habitNameValue.classList.add("habitName");
  habitGoalValue.classList.add("habitGoal");

}

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
// Delete habit on button click
deleteBtn.addEventListener("click", function () {
  habitElement.style.display = "none";
});
// Close modal on button click
cancelBtn.addEventListener("click", function() {
deleteModal.style.display = "none";
});

// function to update Placeholder Progress
const progressSelector = document.getElementById("progressSelector");
progressImg = document.getElementById("progress");
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


// function to delete Placeholder
function deletePlaceholder() {
  const placeholder = document.getElementById("placeholderHabit");
  placeholder.appendChild(deleteModal);
  deleteModal.appendChild(deleteModalContent);
  deleteModalContent.appendChild(cancelBtn);
  deleteModalContent.appendChild(deleteBtn);
// display delete modal
  deleteModal.style.display = "block";
// Delete habit on button click
deleteBtn.addEventListener("click", function () {
  placeholder.style.display = "none";
});
// Close modal on button click
cancelBtn.addEventListener("click", function() {
deleteModal.style.display = "none";
});
}