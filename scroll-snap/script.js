class ScrollManager {
  constructor(containerSelector, scrollDirection = "vertical") {
    this.container = document.querySelector(containerSelector);
    this.sections = document.querySelectorAll("[ct-vertical-scroll]");
    this.currentSection = 0;
    this.scrolling = false;
    this.scrollDirection = scrollDirection;

    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener("wheel", (event) => this.handleWheel(event), {
      passive: false,
    });
    window.addEventListener("keydown", (event) => this.handleKeyDown(event));
  }

  handleWheel(event) {
    if (this.scrolling) return;

    if (this.scrollDirection === "vertical") {
      if (event.deltaY > 0) {
        // Scrolling down
        this.scrollToNextSection("easeInOutCubic");
      } else {
        // Scrolling up
        this.scrollToPreviousSection("easeInOutQuad");
      }
    } else if (this.scrollDirection === "horizontal") {
      if (event.deltaX > 0) {
        // Scrolling right
        this.scrollToNextSection("easeInOutCubic");
      } else {
        // Scrolling left
        this.scrollToPreviousSection("easeInOutQuad");
      }
    }

    event.preventDefault();
  }

  handleKeyDown(event) {
    if (this.scrolling) return;

    if (this.scrollDirection === "vertical") {
      if (event.key === "ArrowDown") {
        // Arrow Down key
        this.scrollToNextSection("easeInOutCubic");
      } else if (event.key === "ArrowUp") {
        // Arrow Up key
        this.scrollToPreviousSection("easeInOutQuad");
      }
    } else if (this.scrollDirection === "horizontal") {
      if (event.key === "ArrowRight") {
        // Arrow Right key
        this.scrollToNextSection("easeInOutCubic");
      } else if (event.key === "ArrowLeft") {
        // Arrow Left key
        this.scrollToPreviousSection("easeInOutQuad");
      }
    }
  }

  scrollToNextSection(easing) {
    if (this.currentSection < this.sections.length - 1) {
      this.scrolling = true;
      this.currentSection++;
      const nextSection = this.sections[this.currentSection];
      const targetOffset =
        this.scrollDirection === "vertical"
          ? nextSection.offsetTop
          : nextSection.offsetLeft;
      this.animateScroll(targetOffset, easing);
    }
  }

  scrollToPreviousSection(easing) {
    if (this.currentSection > 0) {
      this.scrolling = true;
      this.currentSection--;
      const previousSection = this.sections[this.currentSection];
      const targetOffset =
        this.scrollDirection === "vertical"
          ? previousSection.offsetTop
          : previousSection.offsetLeft;
      this.animateScroll(targetOffset, easing);
    }
  }

  animateScroll(targetOffset, easing) {
    const duration = 1000; // Adjust the duration as needed
    const startTime = performance.now();
    const startOffset =
      this.scrollDirection === "vertical"
        ? window.pageYOffset
        : window.pageXOffset;

    const scrollStep = (timestamp) => {
      const progress = Math.min(1, (timestamp - startTime) / duration);
      const easedProgress = this[easing](progress); // Use custom easing function
      const newOffset =
        startOffset + (targetOffset - startOffset) * easedProgress;

      if (this.scrollDirection === "vertical") {
        window.scrollTo(0, newOffset);
      } else if (this.scrollDirection === "horizontal") {
        window.scrollTo(newOffset, 0);
      }

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      } else {
        this.scrolling = false;
      }
    };

    requestAnimationFrame(scrollStep);
  }

  // Custom easing functions
  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}

// Initialize ScrollManager
const verticalScrollManager = new ScrollManager(
  ".vertical-scroll-container",
  "vertical",
);
const horizontalScrollManager = new ScrollManager(
  ".horizontal-scroll-container",
  "horizontal",
);
