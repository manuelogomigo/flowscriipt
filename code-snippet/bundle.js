(function() {
    document.addEventListener('DOMContentLoaded', function(event) {
      var list = document.querySelectorAll('.make-snippet');
  
      [].forEach.call(list, function(el) {
        var snippet = el.innerHTML.replace(/<br>/g, '\n'); // Replace <br> tags with line breaks
        var code = '<pre class="language-markup"><code class="language-markup">' + snippet + '</code></pre>';
        el.innerHTML = code;
      });
  
      // if your page has prism.js you get syntax highlighting
      if (window.Prism) {
        Prism.highlightAll();
      }
    });
  })();
  
  // Load the CSS file dynamically
  (function() {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/theme/prism-okaidia.min.css';
    document.head.appendChild(link);
  })();
  