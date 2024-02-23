document.addEventListener("DOMContentLoaded", function () {
  createKeyframes();
  applyMarquee();
});
  
function applyMarquee() {
  const elements = document.querySelectorAll("[data-marquee]");
  elements.forEach((element) => {
    const direction = element.getAttribute("data-marquee");
    const text = element.textContent;
    let speed = element.getAttribute("data-speed");
    speed = Number(speed);

    if (isNaN(speed) || speed < 1 || speed > 100) {
      speed = 20;
    }

    const marquee = document.createElement("div");

    const marqueeP = document.createElement("p");
    marqueeP.innerHTML = text;
    if (direction === "right") {
      marqueeP.style.animation = "scroll-right " + speed + "s linear infinite";
    } else {
      marqueeP.style.animation = "scroll-left " + speed + "s linear infinite";
    }
    marquee.appendChild(marqueeP);
    element.parentNode.replaceChild(marquee, element);
  })
}
  
function createKeyframes() {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes scroll-left {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(-100%);
      }
    }
    @keyframes scroll-right {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(100%);
      }
    }
  `;
  document.head.appendChild(style);
}
