// JavaScript code
document.addEventListener("DOMContentLoaded", function () {
    var copyTriggers = document.querySelectorAll('[ct-copy-element^="trigger"]');
    var copyTexts = document.querySelectorAll('[ct-copy-text^="target"]');
  
    copyTriggers.forEach(function (copyTrigger) {
      var triggerIndex = copyTrigger.getAttribute("ct-copy-element").replace("trigger", "");
      var copyText = document.querySelector('[ct-copy-text="target' + triggerIndex + '"]');
  
      if (!copyText) {
        console.error("Target element not found for trigger: " + copyTrigger);
        return;
      }
  
      copyTrigger.addEventListener("click", function (event) {
        // Copy the text content of the target element to the clipboard
        var textToCopy = copyText.textContent;
        var tempElement = document.createElement("textarea");
        tempElement.style.position = "absolute";
        tempElement.style.left = "-9999px";
        tempElement.value = textToCopy;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand("copy");
        document.body.removeChild(tempElement);
  
        // Optional: Add the ct-copy-class to the trigger element if provided
        var copyClass = copyTrigger.getAttribute("ct-copy-class");
        if (copyClass) {
          copyTrigger.classList.add(copyClass);
  
          // Remove the combo class from the trigger element after 1 second
          setTimeout(function () {
            copyTrigger.classList.remove(copyClass);
          }, 1000);
        }
      });
    });
  });
  