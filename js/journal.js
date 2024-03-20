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

// journal entry event
const dateSelector = document.getElementById("date-selector");
const journalEntry = document.getElementById("journal-entry");
const saveBtn = document.getElementById("save-entry");
const displayJournal = document.getElementById("journal-container");
const deleteEntry = document.getElementById("delete-entry");

/* window.addEventListener('load', function() {
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
    savedEntries.forEach(entry => {
        const paragraph = document.createElement('p');
        paragraph.textContent = entry;
        displayJournal.appendChild(paragraph);
    });
}); */

saveBtn.addEventListener('click', function() {
    const inputText = journalEntry.value;
    const selectedDate = dateSelector.value;

       if (!inputText || !selectedDate) {
        alert("Please enter both the journal entry and select a date.");
        return;
    }

const paragraph = document.createElement('p');
paragraph.textContent = `${selectedDate}, ${inputText}`;

displayJournal.appendChild(paragraph);

const savedEntries = JSON.parse(localStorage.getItem('journalEntries'));
savedEntries.push(inputText);
localStorage.setItem('journalEntries', JSON.stringify(savedEntries));

dateSelector.value = '';
journalEntry.value = '';
});

deleteEntry.addEventListener("click", function(){
    localStorage.removeItem("journalEntries");
    displayJournal.innerHTML = "";
});