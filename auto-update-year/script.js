// Flowscriipt Javascript code to Update Copyright year
//Use attribute [ct-copyright-year] to a text span or text to display current year automatically

function updateCopywriteYear() {
  const copywriteElements = document.querySelectorAll("[ct-copyright-year]");
  const currentYear = new Date().getFullYear();
  copywriteElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

// Update the copywrite year on page load
window.addEventListener("load", updateCopywriteYear);

// Check if a new year has arrived and update the copywrite year
setInterval(function () {
  const currentYear = new Date().getFullYear();
  const copywriteElements = document.querySelectorAll("[ct-copyright-year]");
  copywriteElements.forEach((element) => {
    if (element.textContent != currentYear) {
      element.textContent = currentYear;
    }
  });
}, 1000); // Check every second for a new year
