
const journalEntry = document.getElementById("journal-entry");
const saveBtn = document.getElementById("save-entry");
const displayJournal = document.getElementById("journal-container");


saveBtn.addEventListener('click', function() {

    const inputText = journalEntry.value;
    const paragraph = document.createElement('p');
    paragraph.textContent = inputText;
    
    displayJournal.appendChild(paragraph);

});

