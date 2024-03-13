let textarea = document.getElementById("journal-entry");
let saveButton = document.getElementById("save-entry");
let journalContainer = document.getElementById=("journal-container");

    saveButton.addEventListener("click", function() {
        let inputData = textarea.value;
        journalContainer.textContent = inputData;
        console.log("I clicked the save button");
    });

// addEventListener is working to acknowledge it was clicked but not working to move journal to container