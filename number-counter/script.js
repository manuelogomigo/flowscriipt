document.addEventListener("DOMContentLoaded", function () {
    animateCounter(2, 200, 2);
})

function animateCounter(start, end, speed) {
    const elements = document.querySelectorAll("[data-counter]");
    elements.forEach((element) => {
      let increment = (end - start) / (speed * 60);
      let current = start;
      let startTime = performance.now();
      function update() {
        let elapsedTime = performance.now() - startTime;
        let progress = elapsedTime / (speed * 1000);
        current = start + (increment * progress * 60);
        current = Math.round(current);
        element.textContent = current;
        if  (current < end) {
          requestAnimationFrame(update);
        } else {
          element.textContent = end;
        }
      }
      requestAnimationFrame(update);
    })
}
  