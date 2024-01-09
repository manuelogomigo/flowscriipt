document.addEventListener("DOMContentLoaded", function () {
    const tooltips = document.querySelectorAll("[data-tooltip]");

    const defaultOptions = {
        position: "bottom"
    }
  
    tooltips.forEach((tooltip) => {
      tooltip.addEventListener("mouseenter", function () {
        const tooltipText = this.getAttribute("data-tooltip");
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
    }
  
    function hideTooltip(element) {
        const tooltipElement = document.querySelector(".tooltip");
        if (tooltipElement) {
            document.body.removeChild(tooltipElement);
        }
    }
  });
  