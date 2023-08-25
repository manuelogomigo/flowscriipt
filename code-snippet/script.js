(function () {
  document.addEventListener("DOMContentLoaded", function (event) {
    var list = document.querySelectorAll("[ct-make-snippet]"); // Select elements with ct-make-snippet attribute

    [].forEach.call(list, function (el) {
      var snippet = el.innerHTML.replace(/<br>/g, "\n"); // Replace <br> tags with line breaks
      var code =
        '<pre class="language-markup"><code class="language-markup">' +
        snippet +
        "</code></pre>";
      el.innerHTML = code;
    });

    // if your page has prism.js you get syntax highlighting
    if (window.Prism) {
      Prism.highlightAll();
    }
  });
})();
