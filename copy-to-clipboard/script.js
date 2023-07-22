function getCurrentDateTime(element) {
    const timeZone = element.getAttribute('ct-time-date') || Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateOptions = {
        timeZone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    function updateDateTime() {
        const currentDate = new Date().toLocaleDateString([], dateOptions);

        element.textContent = currentDate;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
}

const timeElements = document.querySelectorAll('[ct-time-date]');
timeElements.forEach((element) => getCurrentDateTime(element));

function getCurrentTime(element) {
    const timeZone = element.getAttribute('ct-time-zone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const mode = element.getAttribute('ct-time-mode') || '12hr';
    const showSeconds = element.getAttribute('ct-time-seconds') !== 'false';
    const options = {
        timeZone,
        hour12: (mode === '12hr'),
        hour: 'numeric',
        minute: 'numeric',
        second: showSeconds ? 'numeric' : undefined, // Only include 'second' if showSeconds is true
    };

    function updateTime() {
        const currentTime = new Date().toLocaleTimeString([], options);
        element.textContent = currentTime;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

const zoneElements = document.querySelectorAll('[ct-time-zone]');
zoneElements.forEach((element) => getCurrentTime(element));


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
      }
    });
  });
});

