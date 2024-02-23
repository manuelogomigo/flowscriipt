document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-counter]");

    elements.forEach((element) => {
        const start = Number(element.dataset.start);
        const end = Number(element.dataset.end);
        const speed = Number(element.dataset.speed);

        animateCounter(start, end, speed, element);
    })

    function animateCounter(start, end, speed, element) {

        const increment = (end - start) / (speed * 60);
        let current = start;
        const startTime = performance.now();
        function update() {
            const elapsedTime = performance.now() - startTime;
            const progress = elapsedTime / (speed * 1000);
            current = start + (increment * progress * 60);
            current = Math.round(current);
            element.textContent = `${current}`;
            if  (current < end) {
                requestAnimationFrame(update);
            } else {
                element.textContent = `${end}`;
            }
        }
        requestAnimationFrame(update);
    }
})

// The script requires the intended target to possess the "[data-counter]" attribute, it also requires 3 values representing the start, end and speed respectively, here is a sample of how it should be used; "<h1 data-counter data-start="0" data-end="100" data-speed="1">0</h1>""