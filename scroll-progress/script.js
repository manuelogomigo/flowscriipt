document.addEventListener("DOMContentLoaded", function() {
    var wrappers = document.querySelectorAll('[ct-scroll-progress^="wrapper"]');
  
    wrappers.forEach(function(wrapper) {
      var instanceNumber = wrapper.getAttribute('ct-scroll-progress').replace('wrapper', '');
      var wrapperSelector = document.querySelector('[ct-scroll-progress="wrapper' + instanceNumber + '"]');
      var timeDivSelector = document.querySelector('[ct-scroll-progress="line' + instanceNumber + '"]');
      var numberSelector = document.querySelector('[ct-scroll-progress="number' + instanceNumber + '"]');
  
      if (wrapperSelector && timeDivSelector) {
        var wrapperOffset = wrapperSelector.offsetTop;
        var wrapperHeight = wrapperSelector.offsetHeight;
        var windowHeight = window.innerHeight;
        var maxScrollPosition = wrapperHeight - windowHeight;
  
        // Set the initial width to 0%
        timeDivSelector.style.width = "0%";
  
        // Add ARIA role and label for the progress bar
        timeDivSelector.setAttribute("role", "progressbar");
        timeDivSelector.setAttribute("aria-valuemin", "0");
        timeDivSelector.setAttribute("aria-valuemax", "100");
  
        window.addEventListener("scroll", function() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          var scrollPosition = scrollTop - wrapperOffset;
          var progress = (scrollPosition / maxScrollPosition) * 100;
          var count = Math.max(0, Math.min(Math.round(progress), 100)); // Keep the count within 0-100 range
  
          if (scrollPosition >= 0 && scrollPosition <= maxScrollPosition) {
            timeDivSelector.style.width = progress + "%";
            timeDivSelector.style.transform = "translateY(0%)"; // Reset the transform
          } else if (scrollPosition > maxScrollPosition) {
            timeDivSelector.style.width = "100%";
            timeDivSelector.style.transform = "translateY(-100%)";
          } else {
            timeDivSelector.style.width = "0%";
            timeDivSelector.style.transform = "translateY(-100%)";
          }
  
          // Update ARIA value attribute for the progress bar
          timeDivSelector.setAttribute("aria-valuenow", count);
  
          // Update the number if it exists
          if (numberSelector) {
            numberSelector.textContent = count;
            // Add ARIA role and label for the numerical progress count
            numberSelector.setAttribute("role", "status");
            numberSelector.setAttribute("aria-live", "polite");
          }
        });
      }
    });
  });