(function(){
    // CSS styles
    var css = "\
      code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:0 0;text-shadow:0 1px rgba(0,0,0,.3);font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:1em;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto;border-radius:.3em}:not(pre)>code[class*=language-],pre[class*=language-]{background:#272822}:not(pre)>code[class*=language-]{padding:.1em;border-radius:.3em;white-space:normal}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#8292a2}.token.punctuation{color:#f8f8f2}.token.namespace{opacity:.7}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#f92672}.token.boolean,.token.number{color:#ae81ff}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#a6e22e}.language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url,.token.variable{color:#f8f8f2}.token.atrule,.token.attr-value,.token.class-name,.token.function{color:#e6db74}.token.keyword{color:#66d9ef}.token.important,.token.regex{color:#fd971f}.token.bold,.token.important{font-weight:700}.token.italic{font-style:italic}.token.entity{cursor:help}\
    ";
    
    // JavaScript code
    var code = "\
      (function(){\
        document.addEventListener('DOMContentLoaded', function(event) {\
          var list = document.querySelectorAll('[ct-make-snippet]');\
          [].forEach.call(list, function(el) {\
            var snippet = el.innerHTML.replace(/<br>/g, '\\n');\
            var code = '<pre class=\"language-markup\"><code class=\"language-markup\">' + snippet + '</code></pre>';\
            el.innerHTML = code;\
          });\
          if(window.Prism){\
            Prism.highlightAll();\
          }\
        });\
      })();\
    ";
    
    // Create a <style> element and append the CSS styles
    var styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);
    
    // Create a <script> element and append the JavaScript code
    var scriptElement = document.createElement('script');
    scriptElement.innerHTML = code;
    document.head.appendChild(scriptElement);
  })();
  