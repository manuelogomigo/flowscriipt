document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-hide]");

    elements.forEach((element) => {
        if (element.innerHTML.trim() == "") {
            element.style.display = "none";
        }
    })
});

// HOW TO USE
// After importing, the attribute "data-hide" is added to the element that user chooses to hide if empty. If the said element contains a value, nothing happens, if it doesn't, the entire element gets hidden