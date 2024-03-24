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
        hideTooltip(this)
      });
    });
  
    function showTooltip(element, text, options = {}) {
        const tooltipElement = document.createElement("div");
        
        tooltipElement.className = "tooltip";
        tooltipElement.textContent = text;
        
        document.body.appendChild(tooltipElement);
        
        element.tooltipElement = tooltipElement;
        
        element.style.display = "inline-block";
        
        let tooltipArrowElement;
        if( element.hasAttribute("data-tooltip-arrow") ) {
            tooltipArrowElement = document.createElement("span");
            tooltipElement.appendChild(tooltipArrowElement)

            tooltipArrowElement.style.position = "absolute";
            tooltipArrowElement.style.borderStyle = "solid"
            tooltipArrowElement.style.borderColor = "#333 transparent transparent transparent"
        }
    
        updateTooltipPosition(element, options, tooltipArrowElement);
    }
  
    function hideTooltip(element) {
        const tooltipElement = element.tooltipElement;
        if (tooltipElement) {
            document.body.removeChild(tooltipElement);
            delete element.tooltipElement;
        }
    }

    function updateTooltipPosition(element, options = {}, tooltipArrowElement = undefined) {
        const tooltipElement = element.tooltipElement;
        if (tooltipElement) {
            const rect = element.getBoundingClientRect();
            tooltipElement.style.position = `absolute`;
            tooltipElement.style.backgroundColor = `#333`;
            tooltipElement.style.color = `#fff`;
            tooltipElement.style.padding = `8px`;
            tooltipElement.style.borderRadius = `2px`;
            tooltipElement.style.zIndex = `1`;

            const tooltipArrowWidth = parseInt( tooltipElement.getBoundingClientRect().height * 0.25 )

            if( tooltipArrowElement ) {
                tooltipArrowElement.style.borderWidth = tooltipArrowWidth + "px";
            }

            let top, left
            switch (options.position) {
                case "top":
                    left = rect.left;
                    if( tooltipArrowElement !== undefined ) {
                        tooltipArrowElement.style.left = "50%";
                        tooltipArrowElement.style.bottom = "0%";
                        tooltipArrowElement.style.transform = "translate(-50%, 100%)";
                        top = rect.top - (element.clientHeight * 2) - tooltipArrowWidth;
                    } else {
                        top = rect.top - (element.clientHeight * 2);
                    }
                    break;

                case "bottom":
                    left = rect.left;
                    if( tooltipArrowElement !== undefined ) {
                        top = rect.bottom + 2 + tooltipArrowWidth;
                        tooltipArrowElement.style.left = "50%";
                        tooltipArrowElement.style.top = "0%";
                        tooltipArrowElement.style.transform = "translate(-50%, -100%) rotate(180deg)";
                    } else {
                        top = rect.bottom + 2
                    }
                    break;

                case "left":
                    top = rect.top - (element.clientHeight / 2);
                    if(  tooltipArrowElement !== undefined ) {
                        left = rect.left - (element.clientWidth * 1.25) - tooltipArrowWidth;
                        tooltipArrowElement.style.top = "50%";
                        tooltipArrowElement.style.right = "0%"
                        tooltipArrowElement.style.marginRight = - tooltipArrowWidth   + "px"
                        tooltipArrowElement.style.transform = "translate(50%, -50%) rotate(-90deg)";
                    } else {
                        left = rect.left - (element.clientWidth * 1.25);
                    }
                    break;

                case "right":
                    top = rect.top - (element.clientHeight / 2);
                    if(  tooltipArrowElement !== undefined ) {
                        left = rect.left + (element.clientWidth + 2) + tooltipArrowWidth;
                        tooltipArrowElement.style.top = "50%";
                        tooltipArrowElement.style.left = "0%";
                        tooltipArrowElement.style.marginLeft =  - tooltipArrowWidth  + "px"
                        tooltipArrowElement.style.transform = "translate(-50%, -50%) rotate(90deg)";
                    } else {
                        left = rect.left + (element.clientWidth + 2);
                    }
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

