document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-hide]");

    elements.forEach((element) => {
        if (element.innerHTML.trim() == "") {
            element.style.display = "none";
        }
    })
});