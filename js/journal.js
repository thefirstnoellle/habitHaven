// hamburger menu
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

// Global Variables
const dateSelector = document.getElementById("date-selector");
const journalEntry = document.getElementById("journal-entry");
const saveBtn = document.getElementById("save-entry");
const displayJournal = document.getElementById("journal-container");
const deleteEntry = document.getElementById("delete-entry");

// Load saved journals from local storage on page load
window.addEventListener('load', function () {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    savedEntries.forEach(entry => {
        const paragraph = document.createElement('p');
        paragraph.textContent = entry.date + ": " + entry.text;
        displayJournal.appendChild(paragraph);
    });
});

// Save user entry when button is clicked, alert if required fields are empty
saveBtn.addEventListener('click', function () {
    const inputText = journalEntry.value;
    const selectedDate = dateSelector.value;

    if (!inputText || !selectedDate) {
        alert("Please enter both the journal entry and select a date.");
        return;
    }

    const entry = {
        date: selectedDate,
        text: inputText
    };

    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    savedEntries.push(entry);
    localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

    const paragraph = document.createElement('p');
    paragraph.textContent = entry.date + ": " + entry.text;
    displayJournal.appendChild(paragraph);

    dateSelector.value = '';
    journalEntry.value = '';
});
// Delete all journal entries
deleteEntry.addEventListener("click", function () {
    localStorage.removeItem("journalEntries");
    displayJournal.innerHTML = "";
});