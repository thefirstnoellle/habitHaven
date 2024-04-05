// navigation JS
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
const newHabit = document.getElementById("newHabit");
const habitName = document.getElementById("habitName");
const habitGoal = document.getElementById("habitGoal");
const unit = document.getElementById("selectUnit");
const habitContainer = document.getElementById("habitContainer");

// When the user clicks the button, open the modal 
btn.addEventListener("click", function() {
  modal.style.display = "block";
  habitName.focus();
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

// on page load, load habits from local storage on
window.addEventListener('load', function() {
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  habits.forEach(habit => {
    createNewHabitElement(habit);
  });

// on page load check if goal is true and if lastGoalSet is yesterday
  const goal = this.localStorage.getItem('goal');
  const lastGoalDate = this.localStorage.getItem('lastGoalDate');
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterday1 = yesterday.toDateString();
  if (goal === "true" && lastGoalDate === yesterday1){
    const streak = document.getElementById("streak");
    const count = localStorage.getItem('streakCount');
    streak.textContent = count;
  }

// if true increment and display new streak and then set goal to false
// else check if streak is 0 and if not set it to 0 and set goal to false
});

// Create New Habit
newHabit.addEventListener("click", function() {
  if (!habitName.value || !habitGoal.value) {
    alert("Please complete all fields.");
    return;
  }
  modal.style.display = "none";

  const habit = {
    name: habitName.value,
    goal: habitGoal.value,
    unit: unit.value,
    color: habitColor.value,
  };

  // Save habit to local storage
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  habits.push(habit);
  localStorage.setItem('habits', JSON.stringify(habits));

  createNewHabitElement(habit);

  habitName.value = "";
  habitGoal.value = "";
  unit.value = "";
});

function createNewHabitElement(habit) {
  const habitElement = document.createElement("div");
  const habitNameValue = document.createElement("p");
  const habitGoalValue = document.createElement("p");
  const progressImg = document.createElement("img");
  const progressSelector = document.createElement("select");
  
// Set habit name and goal
  habitNameValue.textContent = habit.name;
  habitGoalValue.textContent = "Goal: " + habit.goal + " " + habit.unit;
  progressImg.src = "images/progress-0.png";

// Create progress options
  const progressOptions = [0, 0.25, 0.5, 0.75, 1];
  progressOptions.forEach(option => {
    const progressOption = document.createElement("option");
    progressOption.text = Math.round(habit.goal * option) + " " + habit.unit;
    progressSelector.add(progressOption);
  });

  habitElement.classList.add("habitElement");
  progressImg.classList.add("progress");
  progressSelector.classList.add("progressSelector");
  habitNameValue.classList.add("habitName");
  habitGoalValue.classList.add("habitGoal");

  // Set background color
  habitElement.style.backgroundColor= habit.color;

  habitContainer.appendChild(habitElement);
  habitElement.appendChild(habitNameValue);
  habitElement.appendChild(habitGoalValue);
  habitElement.appendChild(progressSelector);
  habitElement.appendChild(progressImg);
  
// Change progress image when user selects option and rename progress once complete
  progressSelector.addEventListener("change", function() {
    const selectedIndex = progressSelector.selectedIndex;
    const imgSrc = selectedIndex === 0 ? "images/progress-0.png" : `images/progress-${selectedIndex * 25}.png`;
    progressImg.src = imgSrc;
    
// Save selectedIndex to local storage
    localStorage.setItem("selectedIndex", selectedIndex);
// Initialize streak count
let streakCount = parseInt(localStorage.getItem('streakCount')) || 0;

// Function to update streak count
function updateStreak() {
    streakCount++;
    localStorage.setItem('streakCount', streakCount.toString());
    const streak = document.getElementById("streak");
    console.log("streakcountis" +streakCount);
    streak.textContent = streakCount;
}

// Function to reset streak count
function resetStreak() {
    streakCount = 0;
    localStorage.setItem('streakCount', streakCount);
}

// Check if goal is achieved
if (selectedIndex === 4) {
    const goal = localStorage.getItem("goal");
    if (goal === "true") {
        localStorage.setItem("goal", "true");
        const today = new Date();
        localStorage.setItem("lastGoalDate", today.toDateString());
        updateStreak();
    }
} else {
    // Check if goal was set yesterday, if not, reset streak
    const lastGoalDate = localStorage.getItem('lastGoalDate');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterday1 = yesterday.toDateString();
    if (lastGoalDate !== yesterday1) {
        resetStreak();
    }
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
// Delete habit on button click
deleteBtn.addEventListener("click", function () {
  habitElement.style.display = "none";

// Remove habit from local storage
  const habits = JSON.parse(localStorage.getItem('habits')) || [];
  const updatedHabits = habits.filter(h => h.name !== habit.name);
  localStorage.setItem('habits', JSON.stringify(updatedHabits));
});

cancelBtn.addEventListener("click", function() {
deleteModal.style.display = "none";
});
}

