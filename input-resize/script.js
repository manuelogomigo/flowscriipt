let dataTextAreaAttr = "data-min-height";

const textAreas = document.querySelectorAll("textarea");

const textAreasWithDataAttr = Array.from(textAreas).filter((textarea) => {
  return textarea.hasAttribute(dataTextAreaAttr);
});

const temporaryClonedElement = document.createElement("textarea");
function adjustHeight(
  element,
  elementHeight,
  elementMaxHeight,
  isMaxHeightPresent,
  width
) {
  let computedStyle = window.getComputedStyle(element);

  function getHeight(element) {

    temporaryClonedElement.style.overflowY = "hidden";
    temporaryClonedElement.style.resize = "none";
    temporaryClonedElement.style.height = "auto";
    temporaryClonedElement.style.boxSizing = "border-box";
    temporaryClonedElement.style.whiteSpace = 'pre-wrap'
    temporaryClonedElement.style.fontSize = computedStyle.getPropertyValue("fontSize");
    temporaryClonedElement.style.fontFamily = computedStyle.getPropertyValue("font-family");
    temporaryClonedElement.style.width = width;
    temporaryClonedElement.textContent = element.value;
    temporaryClonedElement.style.visibility = "hidden";
    temporaryClonedElement.style.zIndex = "-9999px";
    
    document.body.appendChild(temporaryClonedElement);
    
    let temporaryElementHeight = temporaryClonedElement.scrollHeight;
    temporaryClonedElement.style.height = temporaryElementHeight + "px";
    
    return temporaryElementHeight;
  }

  let textContentHeight = getHeight(element);

  if (isMaxHeightPresent) {
    if ( textContentHeight > elementHeight && textContentHeight < elementMaxHeight ) {
      element.style.height = textContentHeight + `px`;
      element.style.overflowY = "hidden";
    } else if (textContentHeight >= elementMaxHeight) {
      element.style.height = elementMaxHeight + `px`;
      element.style.overflowY = "scroll";
    }
  } else {
    if (textContentHeight > elementHeight) {
      element.style.height = textContentHeight + `px`;
      element.style.overflowY = "hidden";
    }
  }
}

for (const textarea of textAreasWithDataAttr) {
  let dataAttrValue = parseInt(textarea.dataset.minHeight);
  let dataAttrMaxValue = parseInt(textarea.dataset.maxHeight);
  let isMaxHeightPresent = textarea.hasAttribute("data-max-height");

  textarea.style.boxSizing = "border-box";
  textarea.style.height = dataAttrValue + "px";
  textarea.style.overflowY = "hidden";
  textarea.style.resize = "none";
  let initialWidth = window.getComputedStyle(textarea).getPropertyValue("width");
  console.log(initialWidth)
  textarea.addEventListener("input", () => {
    if (dataAttrValue > dataAttrMaxValue) {
      alert(
        "data-textareamax should be greater than data-textarea value. Please check the data attributes."
      );
    } else {
      adjustHeight(
        textarea,
        dataAttrValue,
        dataAttrMaxValue,
        isMaxHeightPresent,
        initialWidth
      );
    }
  });
}