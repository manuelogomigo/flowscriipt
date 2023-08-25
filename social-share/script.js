document.addEventListener("DOMContentLoaded", function () {
  var shareButtons = document.querySelectorAll("[ct-social-share]");
  Array.from(shareButtons).forEach(function (button) {
    button.addEventListener("click", function () {
      var url = encodeURIComponent(window.location.href);
      var text =
        button.getAttribute("ct-social-text") ||
        "Check out this awesome content!";
      text = encodeURIComponent(text);

      var socialPlatform = button.getAttribute("ct-social-share");

      var socialUrl;

      if (socialPlatform === "") {
        // If ct-social-share is empty, trigger share functionality based on the user's device
        if (navigator.share) {
          // If the navigator.share API is available, use it to trigger native sharing
          navigator
            .share({
              title: document.title,
              text: text,
              url: window.location.href,
            })
            .then(() => console.log("Shared successfully"))
            .catch((error) => console.error("Error sharing:", error));
        } else {
          // Fallback for devices that don't support the navigator.share API
          // You can add more share options here if needed
          alert("Sharing is not supported on this device.");
        }
      } else if (socialPlatform === "twitter") {
        socialUrl =
          "https://twitter.com/intent/tweet?url=" + url + "&text=" + text;
      } else if (socialPlatform === "linkedin") {
        socialUrl =
          "https://www.linkedin.com/sharing/share-offsite/?url=" +
          url +
          "&title=" +
          text;
      } else if (socialPlatform === "facebook") {
        socialUrl =
          "https://www.facebook.com/sharer/sharer.php?u=" +
          url +
          "&quote=" +
          text;
      } else if (socialPlatform === "whatsapp") {
        socialUrl = "https://api.whatsapp.com/send?text=" + text + " " + url;
      }

      if (socialUrl) {
        window.open(socialUrl, "_blank");
      }
    });
  });

  // Function to handle copying the current page link
  var copyButtons = document.querySelectorAll("[ct-share-copy]");
  Array.from(copyButtons).forEach(function (copyButton) {
    copyButton.addEventListener("click", function () {
      var url = window.location.href;

      // Create a temporary element to copy the link to the clipboard
      var dummyElement = document.createElement("input");
      dummyElement.value = url;
      document.body.appendChild(dummyElement);
      dummyElement.select();
      document.execCommand("copy");
      document.body.removeChild(dummyElement);

      // Change the button text to "Copied!" temporarily
      var originalText = copyButton.textContent;
      copyButton.textContent = "Copied!";

      // Restore the original button text after 400ms
      setTimeout(function () {
        copyButton.textContent = originalText;
      }, 1000);
    });
  });
});
