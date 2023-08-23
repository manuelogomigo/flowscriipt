document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('[ct-form-mode="multi-step"]');
  const steps = Array.from(form.querySelectorAll('[ct-form-item="step"]'));
  const totalSteps = steps.filter(
    (step) => !step.hasAttribute("ct-form-card"),
  ).length;
  const progressWrapper = document.querySelector(
    '[ct-form-progress="wrapper"]',
  );
  const progressLine = document.querySelector('[ct-form-progress="line"]');
  const percentDisplay = document.querySelector('[ct-form-percent="current"]');
  let radioAutoEnabled = false;
  let radioDelay = 1000; // Default delay in milliseconds

  // Hide all steps except the first one
  steps.forEach(function (step, index) {
    if (index !== 0) {
      step.style.display = "none";
    } else {
      // If ct-form-display attribute is present, set the initial display style
      const displayAttr = step.getAttribute("ct-form-display");
      if (displayAttr) {
        step.style.display = displayAttr;
      }
    }
  });

  const totalNumberDisplay = document.querySelector('[ct-form-number="total"]');
  const currentNumberDisplay = document.querySelector(
    '[ct-form-number="current"]',
  );
  updateStepNumber(1); // Set the initial current step number
  updateProgressLine(0); // Set the initial progress line width
  updatePercentDisplay(0); // Set the initial current percentage

  // Add click event listener to the form
  form.addEventListener("click", function (event) {
    let target = event.target;

    // If the clicked element is inside a link, get the closest link element
    if (
      target.tagName !== "BUTTON" &&
      target.closest('a[ct-form-button="next"]')
    ) {
      target = target.closest('a[ct-form-button="next"]');
    } else if (
      target.tagName !== "BUTTON" &&
      target.closest('a[ct-form-button="prev"]')
    ) {
      target = target.closest('a[ct-form-button="prev"]');
    }

    if (
      target.matches('button[ct-form-button="next"]') ||
      target.matches('a[ct-form-button="next"]')
    ) {
      event.preventDefault();
      const currentStep = target.closest('[ct-form-item="step"]');
      const nextStep = currentStep.nextElementSibling;

      if (validateStep(currentStep)) {
        showNextStep(target, currentStep, nextStep);
        handleRadioAutoProgress(nextStep);
      }
    } else if (
      target.matches('button[ct-form-button="prev"]') ||
      target.matches('a[ct-form-button="prev"]')
    ) {
      event.preventDefault();
      const currentStep = target.closest('[ct-form-item="step"]');
      const prevStep = currentStep.previousElementSibling;

      showPrevStep(target, currentStep, prevStep);
    }
  });

  // Function to show the next step with smooth transition
  function showNextStep(button, currentStep, nextStep) {
    currentStep.style.transition = "opacity 0.3s ease";
    currentStep.style.opacity = 0;

    // Wait for the transition to finish, then hide the current step and show the next one
    setTimeout(() => {
      currentStep.style.display = "none";
      nextStep.style.display = "inherit";
      nextStep.style.opacity = 0; // Set opacity to 0 before showing
      updateStepNumber(getStepNumber(nextStep));
      updateNextButtonOpacity(nextStep);
      updateNextButtonVisibility(nextStep);
      updateProgressLine(getStepNumber(nextStep) / totalSteps);
      updatePercentDisplay((getStepNumber(nextStep) / totalSteps) * 100);

      // Trigger a reflow before applying the opacity transition to avoid animation issues
      nextStep.offsetHeight;

      nextStep.style.transition = "opacity 0.3s ease";
      nextStep.style.opacity = 1; // Show the next step with smooth fade-in effect

      // If ct-form-display attribute is present, set the display style for the next step
      const displayAttr = nextStep.getAttribute("ct-form-display");
      if (displayAttr) {
        nextStep.style.display = displayAttr;
      }
    }, 300);
  }

  // Function to show the previous step with smooth transition
  function showPrevStep(button) {
    const currentStep = button.closest('[ct-form-item="step"]');
    const prevStep = currentStep.previousElementSibling;

    currentStep.style.transition = "opacity 0.3s ease";
    currentStep.style.opacity = 0;

    // Wait for the transition to finish, then hide the current step and show the previous one
    setTimeout(() => {
      currentStep.style.display = "none";
      prevStep.style.display = "inherit";
      prevStep.style.opacity = 0; // Set opacity to 0 before showing
      updateStepNumber(getStepNumber(prevStep));
      updateNextButtonOpacity(prevStep);
      updateNextButtonVisibility(prevStep);
      updateProgressLine(getStepNumber(prevStep) / totalSteps);
      updatePercentDisplay((getStepNumber(prevStep) / totalSteps) * 100);

      // Trigger a reflow before applying the opacity transition to avoid animation issues
      prevStep.offsetHeight;

      prevStep.style.transition = "opacity 0.3s ease";
      prevStep.style.opacity = 1; // Show the previous step with smooth fade-in effect

      // If ct-form-display attribute is present, set the display style for the previous step
      const displayAttr = prevStep.getAttribute("ct-form-display");
      if (displayAttr) {
        prevStep.style.display = displayAttr;
      }
    }, 300);
  }

  // Get the step number of a given step element
  function getStepNumber(step) {
    const nonCardSteps = steps.filter(
      (step) => !step.hasAttribute("ct-form-card"),
    );
    return nonCardSteps.indexOf(step) + 1;
  }

  // Update the current step number display
  function updateStepNumber(stepNumber) {
    if (currentNumberDisplay) {
      currentNumberDisplay.textContent = `${stepNumber}`;
    }
    if (totalNumberDisplay) {
      totalNumberDisplay.textContent = `${totalSteps}`;
    }
  }

  // Function to update the progress line width smoothly
  function updateProgressLine(progress) {
    if (progressLine) {
      // Add a CSS transition for the width property to achieve the smooth effect
      progressLine.style.transition = "width 1.2s ease";
      progressLine.style.width = `${progress * 100}%`;

      // Wait for the transition to finish, then remove the transition for future updates
      setTimeout(() => {
        progressLine.style.transition = "";
      }, 300);
    }
  }

  // Update the current percentage display
  function updatePercentDisplay(percentage) {
    if (percentDisplay) {
      percentDisplay.textContent = `${Math.round(percentage)}%`;
    }
  }

  // Validate the inputs in a step
  function validateStep(step) {
    const inputs = Array.from(
      step.querySelectorAll("input[required], textarea[required]"),
    );

    let valid = true;

    inputs.forEach((input) => {
      if (input.type === "email") {
        if (!isValidEmail(input.value.trim())) {
          valid = false;
        }
      } else {
        if (input.value.trim() === "") {
          valid = false;
        }
      }
    });

    return valid && validateCheckboxes(step);
  }

  // Helper function to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate checkboxes in a step based on the required number
  function validateCheckboxes(step) {
    const checkboxCount = parseInt(step.getAttribute("ct-form-checkbox"), 10);
    if (isNaN(checkboxCount) || checkboxCount < 1) {
      return true; // No checkbox requirement specified, so return true
    }

    const checkboxes = Array.from(
      step.querySelectorAll('input[type="checkbox"]'),
    );
    const checkedCount = checkboxes.filter(
      (checkbox) => checkbox.checked,
    ).length;
    return checkedCount >= checkboxCount;
  }

  // Update the opacity of the "Next" button based on step validation
  function updateNextButtonOpacity(step) {
    const nextButton = step.querySelector('[ct-form-button="next"]');
    if (validateStep(step)) {
      nextButton.style.opacity = 1;
    } else {
      nextButton.style.opacity = 0.5;
    }
  }

  // Update the visibility of the "Next" button on the last step
  function updateNextButtonVisibility(step) {
    const nextButton = step.querySelector('[ct-form-button="next"]');
    if (getStepNumber(step) === totalSteps) {
      nextButton.style.display = "none";
    } else {
      nextButton.style.display = "inherit";
    }
  }

  // Update the opacity of the "Next" button on input change
  form.addEventListener("input", function (event) {
    const currentStep = event.target.closest('[ct-form-item="step"]');
    updateNextButtonOpacity(currentStep);
  });

  // Validate the initial step on page load
  const initialStep = steps[0];
  updateNextButtonOpacity(initialStep);

  // Set initial progress line width on page load
  const firstStep = steps[0];
  updateProgressLine(getStepNumber(firstStep) / totalSteps);
  updatePercentDisplay(0); // Set the initial current percentage

  // Check if it's the first step
  function isFirstStep() {
    const currentStep = getCurrentStep();
    return getStepNumber(currentStep) === 1;
  }

  // Get the currently displayed step
  function getCurrentStep() {
    return form.querySelector(
      '[ct-form-item="step"]:not([style="display: none;"])',
    );
  }

  // Prevent form submission on Enter key press and simulate "Next" button click
  form.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  // Helper function to update the opacity of the "Next" button
  function updateNextButtonOpacityOnInterval(step) {
    // Set an interval to periodically update the button opacity
    const updateInterval = 1000; // 1 second interval, you can adjust this as needed
    let updateTimer;

    function updateOpacity() {
      clearInterval(updateTimer); // Clear any existing interval
      updateTimer = setInterval(() => {
        updateNextButtonOpacity(step);
      }, updateInterval);
    }

    // Add input event listeners to all inputs in the step
    const inputs = Array.from(step.querySelectorAll("input, textarea"));
    inputs.forEach((input) => {
      input.addEventListener("input", updateOpacity);
    });

    // Start the interval when the step loads
    updateOpacity();
  }

  // Loop through each step and handle ct-form-field
  steps.forEach((step) => {
    updateNextButtonOpacityOnInterval(step);
  });

  // Function to handle automatic progression to the next step when radio inputs are clicked
  function handleRadioAutoProgress(step) {
    const radioInputs = Array.from(
      step.querySelectorAll('input[type="radio"]'),
    );

    // Check if the step has ct-form-radio="auto" attribute
    const radioAutoAttr = step.getAttribute("ct-form-radio");
    if (radioAutoAttr && radioAutoAttr.toLowerCase() === "auto") {
      // Check if the step has ct-form-delay attribute, and set the delay time accordingly
      const delayAttr = step.getAttribute("ct-form-delay");
      if (delayAttr && !isNaN(parseInt(delayAttr))) {
        radioDelay = parseInt(delayAttr);
      } else {
        radioDelay = 1000; // Default delay time in milliseconds
      }

      // Add click event listeners to all radio inputs in the step
      radioInputs.forEach((radioInput) => {
        radioInput.addEventListener("click", function () {
          setTimeout(() => {
            const nextButton = step.querySelector('[ct-form-button="next"]');
            if (nextButton) {
              nextButton.click();
            }
          }, radioDelay);
        });
      });
    }
  }

  // Function to handle the ct-form-check and ct-form-hide attributes with toggle
  function handleFormCheckAndHide(step) {
    const labels = Array.from(step.querySelectorAll("label[ct-form-check]"));
    const hideElements = Array.from(step.querySelectorAll("[ct-form-hide]"));

    // Function to show the associated hideElement
    function showHideElement(uniqueValue) {
      const hideElement = step.querySelector(`[ct-form-hide="${uniqueValue}"]`);
      if (hideElement) {
        hideElement.style.display = "block";
      }
    }

    // Function to hide the associated hideElement
    function hideHideElement(uniqueValue) {
      const hideElement = step.querySelector(`[ct-form-hide="${uniqueValue}"]`);
      if (hideElement) {
        hideElement.style.display = "none";
      }
    }

    // Hide all elements with ct-form-hide attribute onload
    hideElements.forEach((hideElement) => {
      hideElement.style.display = "none";
    });

    // Add input event listeners to all radio inputs and checkboxes in the step
    const radioInputs = Array.from(
      step.querySelectorAll('input[type="radio"]'),
    );
    const checkboxInputs = Array.from(
      step.querySelectorAll('input[type="checkbox"]'),
    );

    radioInputs.forEach((radioInput) => {
      const uniqueValue =
        radioInput.parentElement.getAttribute("ct-form-check");
      radioInput.addEventListener("change", function () {
        if (radioInput.checked) {
          showHideElement(uniqueValue);
          // Hide other ct-form-hide elements associated with unchecked radio buttons
          radioInputs.forEach((input) => {
            const otherUniqueValue =
              input.parentElement.getAttribute("ct-form-check");
            if (otherUniqueValue !== uniqueValue) {
              hideHideElement(otherUniqueValue);
            }
          });
        } else {
          hideHideElement(uniqueValue);
        }
      });
    });

    checkboxInputs.forEach((checkboxInput) => {
      const uniqueValue =
        checkboxInput.parentElement.getAttribute("ct-form-check");
      checkboxInput.addEventListener("change", function () {
        if (checkboxInput.checked) {
          showHideElement(uniqueValue);
        } else {
          hideHideElement(uniqueValue);
        }
      });
    });
  }

  // Loop through each step and handle ct-form-check and ct-form-hide
  steps.forEach((step) => {
    handleFormCheckAndHide(step);
  });

  // Function to handle ct-form-toggleClass for labels
  function handleLabelToggleClass(step) {
    const labels = Array.from(
      step.querySelectorAll("label[ct-form-toggleClass]"),
    );

    labels.forEach((label) => {
      const input = label.querySelector(
        'input[type="radio"], input[type="checkbox"]',
      );
      const toggleClassAttr = label.getAttribute("ct-form-toggleClass");

      if (input && toggleClassAttr) {
        // Check if the input is checked on page load
        if (input.checked) {
          label.classList.add(toggleClassAttr); // Add the toggle class
        }

        input.addEventListener("input", function () {
          if (input.type === "radio") {
            const allRadioInputs = Array.from(
              form.querySelectorAll(
                `input[type="radio"][name="${input.name}"]`,
              ),
            );
            allRadioInputs.forEach((radioInput) => {
              const radioLabel = radioInput.parentElement;
              if (radioInput.checked) {
                radioLabel.classList.add(toggleClassAttr); // Add the toggle class
              } else {
                radioLabel.classList.remove(toggleClassAttr); // Remove the toggle class
              }
            });
          } else if (input.type === "checkbox") {
            if (input.checked) {
              label.classList.add(toggleClassAttr); // Add the toggle class
            } else {
              label.classList.remove(toggleClassAttr); // Remove the toggle class
            }
          }
        });
      }
    });
  }

  // Loop through each step and handle ct-form-toggleClass for labels
  steps.forEach((step) => {
    handleLabelToggleClass(step);
  });

  // Function to handle the ct-form-field attribute
  function handleFormField(step) {
    const formFields = Array.from(step.querySelectorAll("[ct-form-field]"));

    // Add input event listeners to all elements with the ct-form-field attribute
    formFields.forEach((formField) => {
      const inputName = formField.getAttribute("ct-form-field");

      if (inputName) {
        const associatedInputs = Array.from(
          form.querySelectorAll(`[name="${inputName}"]`),
        );
        if (associatedInputs.length > 0) {
          // For radio inputs, handle change event to update text on selection
          if (associatedInputs[0].type === "radio") {
            // Function to set initial value for radio inputs
            function setInitialRadioValue() {
              const selectedRadioInput = associatedInputs.find(
                (input) => input.checked,
              );
              if (selectedRadioInput) {
                formField.textContent = selectedRadioInput.value;
              }
            }

            // Call the function to set the initial value
            setInitialRadioValue();

            // Add event listener for 'change' event on radio inputs
            associatedInputs.forEach((radioInput) => {
              radioInput.addEventListener("change", function () {
                formField.textContent = radioInput.value;
              });
            });
          } else if (associatedInputs[0].type === "checkbox") {
            // For checkbox inputs, handle change event to show/hide formField
            associatedInputs.forEach((checkboxInput) => {
              checkboxInput.addEventListener("change", function () {
                if (checkboxInput.checked) {
                  formField.style.display = "block";
                } else {
                  formField.style.display = "none";
                }
              });
            });

            // Initially hide formField if no checkbox is checked
            if (
              !associatedInputs.some((checkboxInput) => checkboxInput.checked)
            ) {
              formField.style.display = "none";
            }
          } else {
            // For other input types, handle input and change events to update text
            associatedInputs.forEach((associatedInput) => {
              associatedInput.addEventListener("input", updateFormFieldText);
              associatedInput.addEventListener("change", updateFormFieldText);
              associatedInput.addEventListener("focus", handleInputFocus);
              associatedInput.addEventListener("blur", handleInputBlur);
            });

            // Initial update to display the current input value
            updateFormFieldText();

            // Set up a timer to periodically check for changes
            const changeCheckInterval = 1000; // Adjust interval as needed (in milliseconds)
            let changeCheckTimer;

            // Function to handle input focus
            function handleInputFocus() {
              clearInterval(changeCheckTimer); // Clear the timer when input gains focus
            }

            // Function to handle input blur
            function handleInputBlur() {
              clearInterval(changeCheckTimer); // Clear the timer when input loses focus
              changeCheckTimer = setInterval(
                updateFormFieldText,
                changeCheckInterval,
              );
            }

            // Function to update the text content of the formField
            function updateFormFieldText() {
              const combinedValue = associatedInputs
                .map((input) => input.value)
                .join(", "); // Adjust this separator as needed
              formField.textContent = combinedValue;
            }

            // Initialize the timer when the page loads
            window.addEventListener("DOMContentLoaded", () => {
              handleInputBlur();
            });
          }
        }
      }
    });
  }

  // Loop through each step and handle ct-form-field
  steps.forEach((step) => {
    handleFormField(step);
  });

  // Function to handle the ct-form-edit-step attribute
  function handleEditStepAttribute(step) {
    const editStepElements = Array.from(
      step.querySelectorAll("[ct-form-edit-step]"),
    );

    // Add click event listeners to all elements with the ct-form-edit-step attribute
    editStepElements.forEach((editStepElement) => {
      const targetStepNumber = parseInt(
        editStepElement.getAttribute("ct-form-edit-step"),
      );

      editStepElement.addEventListener("click", function () {
        if (!isNaN(targetStepNumber) && targetStepNumber > 0) {
          // Get the current step number
          const currentStepNumber = getStepNumber(step);

          // Calculate the number of steps to move (positive/negative)
          const stepsToMove = targetStepNumber - currentStepNumber;

          // Find the target step element
          let targetStepElement = step;
          if (stepsToMove !== 0) {
            if (stepsToMove > 0) {
              for (let i = 0; i < stepsToMove; i++) {
                targetStepElement = targetStepElement.nextElementSibling;
              }
            } else {
              for (let i = 0; i > stepsToMove; i--) {
                targetStepElement = targetStepElement.previousElementSibling;
              }
            }
          }

          if (targetStepElement) {
            // Show the target step and hide the current step
            showNextStep(editStepElement, step, targetStepElement);
          }
        }
      });
    });
  }

  // Loop through each step and handle ct-form-edit-step
  steps.forEach((step) => {
    handleEditStepAttribute(step);
  });

  // Check if automatic radio progression is enabled for any step
  steps.forEach((step) => {
    const radioAutoAttr = step.getAttribute("ct-form-radio");
    if (radioAutoAttr && radioAutoAttr.toLowerCase() === "auto") {
      radioAutoEnabled = true;
    }
  });

  // Handle automatic radio progression if enabled
  if (radioAutoEnabled) {
    const currentStep = getCurrentStep();
    handleRadioAutoProgress(currentStep);
  }
});
