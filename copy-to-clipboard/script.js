document.addEventListener("DOMContentLoaded", function () {
    var copyTriggers = document.querySelectorAll('[ct-copy-element^="trigger"]');
    var copyTexts = document.querySelectorAll('[ct-copy-text^="target"]');
  
    copyTriggers.forEach(function (copyTrigger) {
      var triggerIndex = copyTrigger.getAttribute("ct-copy-element").replace("trigger", "");
      var copyText;
  
      if (copyTrigger.children.length > 0) {
        // For the case with a parent container and target element inside
        copyText = copyTrigger.querySelector('[ct-copy-text="target' + triggerIndex + '"]');
      } else {
        // For the case with separate trigger and target elements
        copyText = document.querySelector('[ct-copy-text="target' + triggerIndex + '"]');
      }
  
      if (!copyText) {
        console.error("Target element not found for trigger: " + copyTrigger);
        return;
      }
  
      var copyClass = copyTrigger.getAttribute("ct-copy-class");
  
      copyTrigger.addEventListener("click", function (event) {
        // Use the trigger element itself as the target
        var clickedElement = copyTrigger;
  
        clickedElement.classList.add(copyClass);
  
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
  
        // Remove the combo class from the trigger element after 1 second
        setTimeout(function () {
          clickedElement.classList.remove(copyClass);
        }, 1000);
      });
    });
  });
  