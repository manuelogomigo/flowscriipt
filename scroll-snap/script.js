const sections = document.querySelectorAll("[ct-scroll-section]");
let currentSectionIndex = 0;

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

let scrolling = false;
const scrollSnap = (entries, observer)=> {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
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
  targetSection.scrollIntoView({ behavior: "auto", block: "start" });
}
