const sections = document.querySelectorAll("[ct-scroll-section]");
let currentSectionIndex = 0;

const options = {
  threshold: 0.4,
};

let scrolling = false;
const scrollSnap = (entries, observer)=> {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.6 && !scrolling) {
      const index = [...sections].findIndex(
        (section) => section.id === entry.target.id,
      );
      currentSectionIndex = index;
      scrolling = true;
      VerticalScrollToSection(currentSectionIndex);
      setTimeout(() => {
        scrolling = false;
      }, 1000);
    }
  });
};

const observer = new IntersectionObserver(scrollSnap, options);

sections.forEach((section) => {
  observer.observe(section);
});

function VerticalScrollToSection(index) {
  const targetSection = sections[index];
  targetSection.scrollIntoView({ behavior: "auto", block: "center" });
}
