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
  
          // Create a temporary textarea element
        var tempTextarea = document.createElement('textarea');

        // Set the value of the textarea to the text content of the target element
        tempTextarea.value = copyText.textContent;

        // Append the textarea to the document body
        document.body.appendChild(tempTextarea);

        // Select the contents of the textarea
        tempTextarea.select();

        // Copy the selected text to the clipboard
        document.execCommand('copy');

        // Remove the temporary textarea
        document.body.removeChild(tempTextarea);

  
          // Remove the combo class from the trigger element after 1 second
          setTimeout(function () {
            clickedElement.classList.remove(copyClass);
          }, 1000);
        }
      });
    });
  });
  