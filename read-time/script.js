// Function to calculate the read time
function calculateReadTime() {
    // Get the target rich text element
    const targetElement = document.querySelector('[ct-readtime-element="target"]');
  
    // Get the text content of the rich text element
    const textContent = targetElement.textContent.trim();
  
    // Calculate the word count
    const wordCount = textContent.split(/\s+/).length;
  
    // Average words per minute for reading
    const wordsPerMinute = 200;
  
    // Calculate the read time in minutes
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
    // Update the read time element
    const timeElement = document.querySelector('[ct-readtime-element="time"]');
    if (readTimeMinutes < 1) {
      timeElement.textContent = "<1 min read";
    } else {
      timeElement.textContent = readTimeMinutes + " min read";
    }
  }
  
  // Call the calculateReadTime function when the page is loaded
  window.addEventListener('DOMContentLoaded', calculateReadTime);