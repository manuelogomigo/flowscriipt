document.addEventListener("DOMContentLoaded", function () {
    const tooltips = document.querySelectorAll("[data-tooltip]");

    const defaultOptions = {
        position: "bottom"
    }
  
    tooltips.forEach((tooltip) => {
      tooltip.addEventListener("mouseenter", function () {
        const tooltipText = tooltip.textContent;
        const position = this.getAttribute("data-tooltip-position") || defaultOptions.position;
        showTooltip(this, tooltipText, { position });
      });
  
      tooltip.addEventListener("mouseleave", function () {
        hideTooltip(this);
      });
    });
  
    function showTooltip(element, text, options = {}) {
        const tooltipElement = document.createElement("div");
        tooltipElement.className = "tooltip";
        tooltipElement.textContent = text;

        document.body.appendChild(tooltipElement);
    
        element.tooltipElement = tooltipElement;

        element.style.display = "inline-block";
    
        updateTooltipPosition(element, options);
    }
  
    function hideTooltip(element) {
        const tooltipElement = element.tooltipElement;
        if (tooltipElement) {
            document.body.removeChild(tooltipElement);
            delete element.tooltipElement;
        }
    }

    function updateTooltipPosition(element, options = {}) {
        const tooltipElement = element.tooltipElement;
        if (tooltipElement) {
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltipElement.getBoundingClientRect();
        
            tooltipElement.style.position = `absolute`;
            tooltipElement.style.backgroundColor = `#333`;
            tooltipElement.style.color = `#fff`;
            tooltipElement.style.padding = `8px`;
            tooltipElement.style.borderRadius = `2px`;
            tooltipElement.style.zIndex = `1`;

            let top, left
            switch (options.position) {
                case "top":
                    top = rect.top - (element.clientHeight * 2);
                    left = rect.left;
                    break;
                case "bottom":
                    top = rect.bottom + 2  ;
                    left = rect.left;
                    break;
                case "right":
                    top = rect.top - (element.clientHeight / 2);
                    left = rect.left + (element.clientWidth + 2);
                    break;
                case "left":
                    top = rect.top - (element.clientHeight / 2);
                    left = rect.left - (element.clientWidth * 1.25);
                    break;
                default:
                    top = rect.bottom + 2  ;
                    left = rect.left;
                    break;
            }

            const offset = 4;

            if (top < offset) {
                top = rect.bottom + 2;
                options.position = "bottom";
            }
            
            if (left < offset) {
                left = rect.right + 2;
                options.position = "right"
            }

            tooltipElement.style.top = `${top}px`;
            tooltipElement.style.left = `${left}px`;

        }
    }

    window.addEventListener("resize", function () {
        tooltips.forEach((tooltip) => {
            const position = tooltip.getAttribute("data-tooltip-position") || defaultOptions.position;
            updateTooltipPosition(tooltip, { position });
        });
    });

    window.addEventListener("scroll", function () {
        tooltips.forEach((tooltip) => {
            const position = tooltip.getAttribute("data-tooltip-position") || defaultOptions.position;
            updateTooltipPosition(tooltip, { position });
        });
    });
});

