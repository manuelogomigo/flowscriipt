const sections = document.querySelectorAll("[ct-scroll-section]");

sections.forEach(function (section) {
  section.style.scrollSnapAlign = "start";
});
const root = document.documentElement;
root.style.scrollSnapType = "y mandatory";
root.style.overflowY = "scroll";
root.style.scrollSnapPointsY = "repeat(100vh)";
