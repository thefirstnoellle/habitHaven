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

// Navigation

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

