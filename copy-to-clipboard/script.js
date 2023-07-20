document.addEventListener("DOMContentLoaded", function () {
    var copyTriggers = document.querySelectorAll('[ct-copy-element^="trigger"]');
    var copyTexts = document.querySelectorAll('[ct-copy-text^="target"]');
  
    copyTriggers.forEach(function (copyTrigger) {
      var triggerIndex = copyTrigger
        .getAttribute("ct-copy-element")
        .replace("trigger", "");
      var copyText = document.querySelector(
        '[ct-copy-text="target' + triggerIndex + '"]'
      );
      var copyClass = copyTrigger.getAttribute("ct-copy-class");
  
      copyTrigger.addEventListener("click", function (event) {
        // Use the trigger element itself as the target
        var clickedElement = copyTrigger;
  
        clickedElement.classList.add(copyClass);
  
        // Check if the clicked element is the trigger element or its child
        var isChildElement = false;
        var currentElement = clickedElement;
        while (currentElement !== copyTrigger) {
          if (currentElement === document.body) {
            isChildElement = false;
            break;
          }
          currentElement = currentElement.parentElement;
          if (currentElement === copyTrigger) {
            isChildElement = true;
            break;
          }
        }
  
        if (!isChildElement) {
          clickedElement.classList.add(copyClass);
  
          // Rest of the copy to clipboard logic...
  
          // Remove the combo class from the trigger element after 1 second
          setTimeout(function () {
            clickedElement.classList.remove(copyClass);
          }, 1000);
        }
      });
    });
  });
  