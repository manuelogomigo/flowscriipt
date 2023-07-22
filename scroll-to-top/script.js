      // Flowscriipt JavaScript code to scroll to the top
      //Add Attributes [ct-scroll-to-top] to the the div or link block you want to trigger scroll to top
      //optional Add Attributes [ct-scroll-to-top="flex”] to change the display on the div. Use styles like block, flex, inline-block, inline

      //How it works
      //the div will be hidden on default, and on scroll it will be visible, display block, but you can change it to flex or inline-block etc

      
      function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Use smooth scrolling behavior
        });
      }

      // Find the scroll-to-top button by attribute
      const scrollToTopButton = document.querySelector('[ct-scroll-to-top]');

      // Show or hide the scroll-to-top button based on the scroll position
      function toggleScrollToTopButton() {
        if (window.pageYOffset > 100) {
          scrollToTopButton.style.display = scrollToTopButton.getAttribute('ct-scroll-to-top');
        } else {
          scrollToTopButton.style.display = 'none';
        }
      }

      // Attach the click event to scroll to top
      scrollToTopButton.addEventListener('click', scrollToTop);

      // Attach the scroll event to toggle visibility of the button
      window.addEventListener('scroll', toggleScrollToTopButton);

      // Hide the button on page load
      window.addEventListener('load', function() {
        toggleScrollToTopButton();
      });

      // Set the default display value to 'block'
      if (!scrollToTopButton.hasAttribute('ct-scroll-to-top')) {
        scrollToTopButton.style.display = 'inherit';
      }