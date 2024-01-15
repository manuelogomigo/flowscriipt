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
        
            let top, left
            
            switch (options.position) {
                case "top":
                    top = rect.top - tooltipRect.height;
                    left = rect.left;
                    break;
                case "bottom":
                    top = rect.bottom;
                    left = rect.left;
                    break;
                case "right":
                    top = rect.top + rect.height / 2 - tooltipRect.height / 2;
                    left = rect.right
                    break;
                case "left":
                    top = rect.top + rect.height / 2 - tooltipRect.height / 2;
                    left = rect.left
                    break;
                default:
                    top = rect.bottom
                    left = rect.left
                    break;
            }
        
            tooltipElement.style.top = `${top}px`;
            tooltipElement.style.left = `${left}px`;
            tooltipElement.style.position = `absolute`;
            tooltipElement.style.backgroundColor = `#333`;
            tooltipElement.style.color = `#fff`;
            tooltipElement.style.padding = `8px`;
            tooltipElement.style.borderRadius = `2px`;
            tooltipElement.style.zIndex = `1`;
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
