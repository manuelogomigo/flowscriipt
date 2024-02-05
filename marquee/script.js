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
    let clones = element.getAttribute("data-clones");

    speed = Number(speed);
    clones = Number(clones);

    if (isNaN(speed) || speed < 1 || speed > 100) {
      speed = 20;
    }

    if (isNaN(clones) || clones < 1) {
      clones = 1;
    }

    const marquee = document.createElement("div");
    marquee.style.display = "flex";
    marquee.style.alignItems = "center";
    marquee.style.flex = "1";
    
    const marqueeP = document.createElement("p");
    marqueeP.innerHTML = text;
    marqueeP.style.flex = "1";
    marqueeP.style.marginRight = "-4px";
    if (direction === "right") {
      marqueeP.style.animation = "scroll-right " + speed + "s linear infinite";
    } else {
      marqueeP.style.animation = "scroll-left " + speed + "s linear infinite";
    }
    marquee.appendChild(marqueeP);

    for (let i = 0; i < clones; i++) {
      const marqueeClone = marqueeP.cloneNode(true);
      marquee.appendChild(marqueeClone);
    }
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
