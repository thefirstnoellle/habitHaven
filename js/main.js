// Hamburger menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", function() {
hamburger.classList.toggle("active");
navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", ()=> {
hamburger.classList.remove("active");
navMenu.classList.remove("active");
}))

// Navigation 
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


// Global Variables

const calendarContainer = document.getElementById('calendar');
const modal = document.getElementById("modal");
// Get button that opens the modal
const btn = document.getElementById("add-habit");
// Get element that closes the modal
const closeModal = document.getElementById("close");
// button that saves new habit
const newHabit = document.getElementById("newHabit");
// habit name input by user
const habitName = document.getElementById("habitName");
// habit goal input by user
const habitGoal = document.getElementById("habitGoal");
// habit unit input by user
const unit = document.getElementById("selectUnit");
const editModal = document.getElementById("editModal");
// button that saves habit edits
const editHabit = document.getElementById("editHabit");
// container where habits are saved
const habitContainer = document.getElementById("habitContainer");
// Button to save Progress for day
const completeDay = document.createElement("button");
completeDay.classList.add("completeDay");
completeDay.textContent = "Complete All Habits";
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
// append delete Modal
habitContainer.appendChild(deleteModal);
deleteModal.appendChild(deleteModalContent);
deleteModalContent.appendChild(cancelBtn);
deleteModalContent.appendChild(deleteBtn);

// Placeholder Habits
const placeholder = document.getElementById("placeholderHabit");
const placeholder1 = document.getElementById("placeholderHabit1");
const placeholder2 = document.getElementById("placeholderHabit2");


// On Page Load 
window.addEventListener('load', function() {
    // load habits from local storage
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    habits.forEach(habit => {
        createNewHabitElement(habit);
    });

    const goal = localStorage.getItem('goal');
    const lastGoalDate = localStorage.getItem('lastGoalDate');
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterday1 = yesterday.toDateString();
    const completeDay = localStorage.getItem("completeDay");
    const updatedProgressValue = localStorage.getItem('updatedProgress');

// if day was already completed, display habits as complete
    if (completeDay === today.toDateString()) {
        const progressSelectors = document.querySelectorAll(".progressSelector");
        const progressImgs = document.querySelectorAll(".progress");
 // hide progress selector       
        progressSelectors.forEach(progressSelector => {
            progressSelector.style.display = "none";
        });
// change progress image to display 100%
        progressImgs.forEach(progressImg => {
            progressImg.src = "images/progress-100.png";
        });
    } else if (updatedProgressValue !== today.toDateString()) {
        const progressImgs = document.querySelectorAll(".progress");
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        progressImgs.forEach(progressImg => {
            progressImg.src = "images/progress-0.png";
        });
    
        // Remove "progressImg" property from habits
        habits.forEach(habit => {
            delete habit.progressImg;
        });
        
        // Update local storage with modified habits
        localStorage.setItem('habits', JSON.stringify(habits));
    }

// display current streak, if streak is null - show 0
    const streak = document.getElementById("streak");
    const count = localStorage.getItem('streakCount');
    if (count === null) {
        streak.textContent = 0;
        localStorage.setItem('count', '0');
    } else {
        streak.textContent = count;
    }

// check if reminder has been saved, if reminder is saved and date is today, display reminder
// if reminder is saved but date is not today, display placeholder text
const reminder = document.getElementById("reminder");
savedReminder = localStorage.getItem("reminder");
const lastReminderSaved = localStorage.getItem('lastReminderSaved');
if (savedReminder && lastReminderSaved === today.toDateString()) {
    const saveReminderBtn = this.document.getElementById("saveReminder");
    reminder.value = savedReminder;
    reminder.disabled = true;
    saveReminderBtn.style.display = "none";
} else {
    reminder.value = "";
}

// if goal is true and if lastGoalSet is yesterday, set goal to false
    if (goal === "true" && lastGoalDate === yesterday1){
        localStorage.setItem('goal', "false");
    } else if (goal === "true" && lastGoalDate === today.toDateString()) {
        return;
    } else {
        if (goal === "true" && lastGoalDate !== yesterday1){
        localStorage.setItem('goal', "false");
        streakCount = 0;
        localStorage.setItem('streakCount', streakCount);
        }
    }

});

// Create Calendar
let currentDate = new Date();
renderCalendar(currentDate);
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

        calendarContainer.appendChild(dayElement);
    }
}
function SameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
}


// When the user clicks the Add Habit button, modal opens
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


// When user clicks "Save" to add a new habit, display alert if required fields are blank
newHabit.addEventListener("click", function() {
    if (!habitName.value || !habitGoal.value) {
      alert("Please complete all fields.");
      return;
    }
    modal.style.display = "none";
// Habit values are stored in object habit  
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
// Clear values from modal after habit is created  
    habitName.value = "";
    habitGoal.value = "";
    unit.value = "";
  });

  function createNewHabitElement(habit) {
    const habitElement = document.createElement("div");
    habitElement.classList.add("habitElement");

    const habitNameValue = document.createElement("p");
    habitNameValue.classList.add("habitName");
    habitNameValue.textContent = habit.name;

    const habitGoalValue = document.createElement("p");
    habitGoalValue.classList.add("habitGoal");
    habitGoalValue.textContent = "Goal: " + habit.goal + " " + habit.unit;

    const progressImg = document.createElement("img");
    progressImg.classList.add("progress");
    progressImg.setAttribute("id", "progressImg");
    // Initialize src from the habit object if it exists in local storage
    progressImg.src = habit.progressImg || "images/progress-0.png";

    const progressSelector = document.createElement("select");
    progressSelector.classList.add("progressSelector");
    progressSelector.setAttribute("id", "progressSelector");

    const progressOptions = [0, 0.25, 0.5, 0.75, 1];
    progressOptions.forEach(option => {
        const progressOption = document.createElement("option");
        progressOption.text = (Math.round((habit.goal * option) * 10) / 10) + " " + habit.unit;
        progressSelector.add(progressOption);
    });

    // Create edit button
    const editBtn = document.createElement("img");
    editBtn.setAttribute("src", "images/edit.png");
    editBtn.classList.add("edit-button");

    // Set background color
    habitElement.style.backgroundColor= habit.color;
    
    habitContainer.appendChild(habitElement);
    habitElement.appendChild(habitNameValue);
    habitElement.appendChild(habitGoalValue);
    habitElement.appendChild(progressSelector);
    habitElement.appendChild(progressImg);
    habitElement.appendChild(editBtn);
    habitContainer.appendChild(completeDay);


    // Call the progressChangeEvent function and pass progressSelector and progressImg
    progressChangeEvent(progressSelector, progressImg, habit);
    // Call the editHabitElement function and pass habitElement, habit, editBtn
    editHabitElement(habitElement, habit, editBtn);
    // Call function  to complete all today's habits, pass progessSelector and progressImg
    completeDayEvent(progressSelector, progressImg);
    // Call Delete Habit function, pass habitElement, habit
    deleteHabitElement(habitElement, habit);
}

// Change progress image when user selects option. If user hasn't recorded a streak yet today, streak updates
function progressChangeEvent(progressSelector, progressImg, habit) {
    // Add event listener to progressSelector
    progressSelector.addEventListener("change", function() {
    // Get the selectedIndex
    const selectedIndex = progressSelector.selectedIndex;
    // Determine the image source based on selected index
    const imgSrc = selectedIndex === 0 ? "images/progress-0.png" : `images/progress-${selectedIndex * 25}.png`;
    // update src attribute
    progressImg.src = imgSrc;
// Save selectedIndex to local storage
    localStorage.setItem("selectedIndex", selectedIndex);
    // Update the habit object with progressImg value
    habit.progressImg = imgSrc;
     // Update habit object in local storage
     const habits = JSON.parse(localStorage.getItem('habits')) || [];
     const updatedHabits = habits.map(item => {
         if (item.name === habit.name && item.goal === habit.goal) {
             return habit;
         }
         return item;
     });
     localStorage.setItem('habits', JSON.stringify(updatedHabits));
     localStorage.setItem("updatedProgress", new Date().toDateString());
    
    // Check if streak is achieved for today
    if (selectedIndex === 4) {
        const goal = localStorage.getItem("goal");
        if (goal !== "true") {
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
}
// when save reminder is clicked, text from reminder is saved with today's date
function saveReminder() {
    const saveReminderBtn = document.getElementById("saveReminder");
    
        const reminder = document.getElementById("reminder").value;
        const textarea = document.getElementById("reminder");
        if (reminder !== "") {
        localStorage.setItem("reminder", reminder);
        const today = new Date();
        localStorage.setItem("lastReminderSaved", today.toDateString());
        textarea.disabled = true;
        saveReminderBtn.style.display = "none";
    } 
}

// when complete day button is clicked, progress img update and progress selector hidden
function completeDayEvent(progressSelector, progressImg){
    completeDay.addEventListener("click", function() {
        const progressSelectors = document.querySelectorAll(".progressSelector");
        const progressImgs = document.querySelectorAll(".progress");
 // hide progress selector       
        progressSelectors.forEach(progressSelector => {
            progressSelector.style.display = "none";
        });
// change progress image to display 100%
        progressImgs.forEach(progressImg => {
            progressImg.src = "images/progress-100.png";
        });
        today = new Date();
        localStorage.setItem("completeDay", today.toDateString());

        const goal = localStorage.getItem("goal");
        if (goal !== "true") {
            localStorage.setItem("goal", "true");
            const today = new Date();
            localStorage.setItem("lastGoalDate", today.toDateString());
            updateStreak();
        }  else {
        const lastGoalDate = localStorage.getItem('lastGoalDate');
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterday1 = yesterday.toDateString();
        if (lastGoalDate !== yesterday1) {
            resetStreak();
        }
        }
    });
}

// Function to update streak count
function updateStreak() {
    // Initialize streak count
    let streakCount = parseInt(localStorage.getItem('streakCount')) || 0;
    streakCount++;
    localStorage.setItem('streakCount', streakCount.toString());
    const streak = document.getElementById("streak");
    streak.textContent = streakCount;
}

// Function to reset streak count
function resetStreak() {
    streakCount = 0;
    localStorage.setItem('streakCount', streakCount.toString());
}

function editHabitElement(habitElement, habit, editBtn) {
    // edit button appears on hover
    habitElement.addEventListener("mouseover", function() {
        editBtn.style.display = "block";
        editBtn.classList.add("active");
    // Add event listener to the edit button
    editBtn.addEventListener("click", function() {
        // Open the modal
        modal.style.display = "block";
        const editHabitTitle = document.getElementById("modal-title");
        const saveEdits = document.getElementById("newHabit");
        editHabitTitle.textContent = "Edit Habit"
        // Populate modal inputs with current habit values
        habitName.value = habit.name;
        habitGoal.value = habit.goal;
        unit.value = habit.unit;

        // Add event listener to save button in modal
        saveEdits.addEventListener("click", function() {
            // Update habit object with new values
            habit.name = habitName.value;
            habit.goal = habitGoal.value;
            habit.unit = unit.value;

            // Update habit element with new values
            habitElement.querySelector(".habitName").textContent = habit.name;
            habitElement.querySelector(".habitGoal").textContent = "Goal: " + habit.goal + " " + habit.unit;

            // Update habit object in local storage
            const habits = JSON.parse(localStorage.getItem('habits')) || [];
            
            let updatedHabits = habits.map(item => {
                if (item.name !== habit.name && item.goal !== habit.goal) {
                habitElement.style.display = "none";
                removeItem(habit);
                localStorage.setItem('habits', JSON.stringify(updatedHabits));
                return item;
                } else {
                    return habit;
                }
                
            });

            // Clear values from modal after habit is edited
            habitName.value = "";
            habitGoal.value = "";
            unit.value = "";

            // Close the modal
            modal.style.display = "none";
        });
    });
    habitElement.addEventListener("mouseout", function() {
        editBtn.style.display = "none";
        editBtn.classList.remove("active");
    });
});
}


function deleteHabitElement(habitElement, habit) {
	habitElement.addEventListener("dblclick", function() {
    // display delete modal
	deleteModal.style.display = "block";
        // When delete button is clicked, remove only this habit
        deleteBtn.onclick = function () {
            habitElement.style.display = "none";
            // Remove habit from local storage
            const habits = JSON.parse(localStorage.getItem('habits')) || [];
            const updatedHabits = habits.filter(h => h.name !== habit.name);
            localStorage.setItem('habits', JSON.stringify(updatedHabits));
            deleteModal.style.display = "none"; // Close delete modal after deletion
        };
});

  cancelBtn.addEventListener("click", function() {
        deleteModal.style.display = "none";
    });
}

// Function to adjust progress for Placeholder habits
document.getElementById('progressSelector').addEventListener('change', function() {
    let selectedIndex = this.value;
    const progress = document.getElementById('progress');
    const imgSrc = selectedIndex === "0" ? "images/progress-0.png" : `images/progress-${selectedIndex * 100}.png`;
    progress.src = imgSrc;
    if (selectedIndex === "1") { // Check if selectedIndex is "1" (value of option4)
        const goal = localStorage.getItem("goal");
        if (goal !== "true") {
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

document.getElementById('progressSelector1').addEventListener('change', function() {
    let selectedIndex = this.value;
    const progress = document.getElementById('progress1');
    const imgSrc = selectedIndex === "0" ? "images/progress-0.png" : `images/progress-${selectedIndex * 100}.png`;
    progress.src = imgSrc;
    if (selectedIndex === "1") { // Check if selectedIndex is "1" (value of option4)
        const goal = localStorage.getItem("goal");
        if (goal !== "true") {
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

document.getElementById('progressSelector2').addEventListener('change', function() {
    let selectedIndex = this.value;
    const progress = document.getElementById('progress2');
    const imgSrc = selectedIndex === "0" ? "images/progress-0.png" : `images/progress-${selectedIndex * 100}.png`;
    progress.src = imgSrc;
    if (selectedIndex === "1") { // Check if selectedIndex is "1" (value of option4)
        const goal = localStorage.getItem("goal");
        if (goal !== "true") {
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


// Check if the placeholder should be displayed
if (localStorage.getItem('removePlaceholder') === 'true') {
    placeholder.remove();
  }
  if (localStorage.getItem('removePlaceholder1') === 'true') {
    placeholder1.remove();
  }
  if (localStorage.getItem('removePlaceholder2') === 'true') {
    placeholder2.remove();
  }
// Function to delete first placeholder
placeholder.ondblclick = function() {
// display delete modal
    deleteModal.style.display = "block";
// Delete habit on button click
    deleteBtn.addEventListener("click", function () {
    placeholder.remove();
    localStorage.setItem('removePlaceholder', 'true');
    deleteModal.style.display = "none";
    });
// Close modal on button click
    cancelBtn.addEventListener("click", function() {
    deleteModal.style.display = "none";
    });
    }
  
// Function to delete second placeholder
placeholder1.ondblclick = function() {
// display delete modal
    deleteModal.style.display = "block";
// Delete habit on button click
    deleteBtn.addEventListener("click", function () {
    placeholder1.remove();
    localStorage.setItem('removePlaceholder1', 'true');
    deleteModal.style.display = "none";
    });
// Close modal on button click
    cancelBtn.addEventListener("click", function() {
    deleteModal.style.display = "none";
    });
    }
  
// Function to delete third placeholder
placeholder2.ondblclick = function() {
    // display delete modal
    deleteModal.style.display = "block";
    // Delete habit on button click
    deleteBtn.addEventListener("click", function () {
    placeholder2.remove();
    localStorage.setItem('removePlaceholder2', 'true');
    deleteModal.style.display = "none";
    });
    // Close modal on button click
    cancelBtn.addEventListener("click", function() {
    deleteModal.style.display = "none";
    });
    }
;