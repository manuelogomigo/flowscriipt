// Function to calculate the read time
function calculateReadTime(wrapperElement) {
  // Get the target rich text element within the specified wrapper
  const targetElement = wrapperElement.querySelector('[ct-readtime-element="target"]');

  // Get the text content of the rich text element
  const textContent = targetElement.textContent.trim();

  // Calculate the word count
  const wordCount = textContent.split(/\s+/).length;

  // Average words per minute for reading
  const wordsPerMinute = 200;

  // Calculate the read time in minutes
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  // Update the read time element within the specified wrapper
  const timeElement = wrapperElement.querySelector('[ct-readtime-element="time"]');
  if (readTimeMinutes < 1) {
    timeElement.textContent = "<1 min read";
  } else {
    timeElement.textContent = readTimeMinutes + " min read";
  }
}

// Call the calculateReadTime function for each wrapper when the page is loaded
window.addEventListener('DOMContentLoaded', () => {
  const wrapperElements = document.querySelectorAll('[ct-readtime-element="wrapper"]');
  wrapperElements.forEach((wrapperElement) => {
    calculateReadTime(wrapperElement);
  });
});
