// Flowscriipt JavaScript code to scroll snap to the next page
// Add class [ct-scroll-container] to the the parent div
//Add class [ct-vertical-scroll] to each of sections you want to scroll to



// Vertical scrolling
const scrollContainer = document.querySelector(".ct-scroll-container");
const scrollSections = document.querySelectorAll(".ct-vertical-scroll");

document.addEventListener("DOMContentLoaded", function () {
    // Smooth scroll to the target element
    function scrollToSection(target) {
        scrollContainer.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
        });
    }

    // Scroll snapping behavior
    let isScrolling = false;
    scrollContainer.addEventListener("scroll", function () {
        if (!isScrolling) {
            for (const section of scrollSections) {
                if (section.offsetTop <= scrollContainer.scrollTop + scrollContainer.clientHeight / 2 && section.offsetTop + section.offsetHeight > scrollContainer.scrollTop + scrollContainer.clientHeight / 2) {
                    scrollToSection(section);
                    break;
                }
            }

            isScrolling = true;
            setTimeout(function () {
                isScrolling = false;
            }, 100);
        }
    });
});