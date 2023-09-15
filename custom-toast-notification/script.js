document.addEventListener("DOMContentLoaded", function () {
    const triggers = document.querySelectorAll("[ct-toast-trigger]");
    const toastContainer = document.querySelector("[ct-toast-container]");
    const toasts = document.querySelectorAll("[ct-toast-mode]");
    const closeButtons = document.querySelectorAll("[ct-toast-close]");
  
    // Store the initial toast position as a variable
    let toastPosition =
      toastContainer.getAttribute("ct-toast-position") || "top-right";
  
    toastContainer.style.position = "fixed";
    toastContainer.style.display = "flex";
    toastContainer.style.flexDirection = "column";
    toastContainer.style.alignItems = "flex-end";
  
    // Set the positioning based on the attribute value
    if (toastPosition.includes("top")) {
      toastContainer.style.top = "20px";
    } else if (toastPosition.includes("bottom")) {
      toastContainer.style.bottom = "20px";
    }
  
    if (toastPosition.includes("left")) {
      toastContainer.style.left = "20px";
    } else if (toastPosition.includes("right")) {
      toastContainer.style.right = "20px";
    }
  
    if (toastPosition.includes("center")) {
      toastContainer.style.left = "50%";
      toastContainer.style.transform = "translateX(-50%)"; // Center horizontally
      toastContainer.style.alignItems = "center";
    }
  
    toasts.forEach((toast) => {
      toast.style.display = "none";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(100%)";
      toast.style.transition = "opacity 0.3s, transform 0.3s";
      toast.style.marginTop = "12px";
  
      const progress = toast.querySelector("[ct-toast-progress]");
      if (progress) {
        progress.style.width = "0";
        const toastDuration =
          parseInt(toast.getAttribute("ct-toast-duration")) || 3000;
        progress.style.transition = `width ${toastDuration}ms`;
      }
    });
  
    toastContainer.addEventListener("click", function (event) {
      if (event.target && event.target.getAttribute("ct-toast-close")) {
        const toast = event.target.closest("[ct-toast-mode]");
        if (toast) {
          // Handle close button click for the corresponding toast
          toast.style.opacity = "0";
          toast.style.transform = "translateY(100%)";
          setTimeout(function () {
            toastContainer.removeChild(toast);
          }, 300);
        }
      }
    });
  
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", function () {
        const triggerValue = this.getAttribute("ct-toast-trigger");
        const customText = this.getAttribute("ct-toast-text"); // Read custom text from trigger
  
        // Update toastPosition when the trigger is clicked
        const newToastPosition =
          toastContainer.getAttribute("ct-toast-position") || "top-right";
        if (newToastPosition !== toastPosition) {
          toastPosition = newToastPosition;
  
          // Remove the existing positioning styles
          toastContainer.style.top = "";
          toastContainer.style.bottom = "";
          toastContainer.style.left = "";
          toastContainer.style.right = "";
          toastContainer.style.transform = "";
          toastContainer.style.alignItems = "";
  
          // Set the positioning based on the attribute value
          if (toastPosition.includes("top")) {
            toastContainer.style.top = "20px";
          } else if (toastPosition.includes("bottom")) {
            toastContainer.style.bottom = "20px";
          }
  
          if (toastPosition.includes("left")) {
            toastContainer.style.left = "20px";
          } else if (toastPosition.includes("right")) {
            toastContainer.style.right = "20px";
          }
  
          if (toastPosition.includes("center")) {
            toastContainer.style.left = "50%";
            toastContainer.style.transform = "translateX(-50%)"; // Center horizontally
            toastContainer.style.alignItems = "center";
          }
        }
  
        toasts.forEach((toast) => {
          const toastMode = toast.getAttribute("ct-toast-mode");
          const toastDuration =
            parseInt(toast.getAttribute("ct-toast-duration")) || 3000;
  
          if (triggerValue === toastMode) {
            const newToast = toast.cloneNode(true);
            newToast.style.opacity = "0";
            newToast.style.transform = "translateY(100%)";
            newToast.style.display = "inherit";
  
            const progress = newToast.querySelector("[ct-toast-progress]");
            if (progress) {
              progress.style.width = "0"; // Reset progress bar width
              progress.style.transition = `width ${toastDuration}ms`;
            }
  
            // Update the content of the toast with custom text
            // Update the content of the toast with custom text if provided
            const toastText = newToast.querySelector("[ct-toast-text]");
            if (toastText) {
              if (customText) {
                toastText.textContent = customText; // Use custom text
              }
            }
  
            // Adjust the toast container's position based on the updated toastPosition
            // You can add code similar to what you have for position adjustment here
  
            toastContainer.appendChild(newToast); // Append the toast
  
            setTimeout(function () {
              newToast.style.opacity = "1";
              newToast.style.transform = "translateY(0)";
  
              if (progress) {
                // Animate progress bar from 0% to 100%
                progress.style.width = "100%";
              }
  
              setTimeout(function () {
                newToast.style.opacity = "0";
                newToast.style.transform = "translateY(100%)";
                setTimeout(function () {
                  toastContainer.removeChild(newToast);
                }, 300); // Allow time for transition to complete
              }, toastDuration); // Hide the toast after the specified duration
            }, 10); // Add a small delay before showing
          }
        });
      });
    });
  });
  