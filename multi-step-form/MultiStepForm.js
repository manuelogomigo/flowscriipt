// @ts-check

class MultiStepForm {
  constructor(form = null, options = {}) {
    let radioAutoEnabled = false;
    let radioDelay = 1000; // Default delay in milliseconds

    this.form = form;
    const {
      steps,
      progressWrapper,
      progressLine,
      percentDisplay,
      totalNumberDisplay,
      currentNumberDisplay,
    } = options;

    this.steps = steps;
    this.progressWrapper = progressWrapper;
    this.progressLine = progressLine;
    this.percentDisplay = percentDisplay;
    this.totalNumberDisplay = totalNumberDisplay;
    this.currentNumberDisplay = currentNumberDisplay;

    this.totalSteps = this.steps.filter(
      (step) => !step.hasAttribute("ct-form-card"),
    ).length;
    this.radioAutoEnabled = radioAutoEnabled;
    this.radioDelay = radioDelay;

    this.init();
  }

  init() {
    const form = this.form.bind(this);
    const hideSteps = this.hideSteps.bind(this);
    const updateStepNumber = this.updateStepNumber.bind(this);
    const updateProgressLine = this.updateProgressLine.bind(this);
    const updatePercentDisplay = this.updatePercentDisplay.bind(this);
    const formEventListen = this.formEventListen.bind(this);
    const validateStep = this.validateStep.bind(this);
    const showNextStep = this.showNextStep.bind(this);
    const showPrevStep = this.showPrevStep.bind(this);
    const handleRadioAutoProgress = this.handleRadioAutoProgress.bind(this);

    // Update the current step number display
    updateStepNumber(
      1,
      this.totalSteps,
      this.currentNumberDisplay,
      this.totalNumberDisplay,
    );

    // Update the progress line width to 0
    updateProgressLine(0, this.progressLine);

    // Update the current percentage display
    updatePercentDisplay(0, this.percentDisplay);

    // Hide all steps except the first one
    this.steps.forEach((step, index) => hideSteps(step, index));

    // Add click event listener to the form
    form.addEventListener("click", (event) => {
      formEventListen(
        event,
        validateStep,
        showNextStep,
        showPrevStep,
        handleRadioAutoProgress,
      );
    });
  }

  hideSteps(step, index) {
    if (index !== 0) {
      step.style.display = "none";
    } else {
      // If ct-form-display attribute is present, set the initial display style
      const displayAttr = step.getAttribute("ct-form-display");
      if (displayAttr) {
        step.style.display = displayAttr;
      }
    }
  }

  // Update the current step number display
  updateStepNumber(
    stepNumber,
    totalSteps,
    currentNumberDisplay,
    totalNumberDisplay,
  ) {
    if (currentNumberDisplay) {
      currentNumberDisplay.textContent = `${stepNumber}`;
    }
    if (totalNumberDisplay) {
      totalNumberDisplay.textContent = `${totalSteps}`;
    }
  }

  // Function to update the progress line width smoothly
  updateProgressLine(progress, progressLine) {
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
  updatePercentDisplay(percentage, percentDisplay) {
    if (percentDisplay) {
      percentDisplay.textContent = `${Math.round(percentage)}%`;
    }
  }

  formEventListen(
    event,
    validateStep,
    showNextStep,
    showPrevStep,
    handleRadioAutoProgress,
  ) {
    let { target } = event;

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
  }

  // Validate the inputs in a step
  validateStep(step, isValidEmail, validateCheckboxes) {
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
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate checkboxes in a step based on the required number
  validateCheckboxes(step) {
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
  updateNextButtonOpacity(step, validateStep) {
    const nextButton = step.querySelector('[ct-form-button="next"]');
    if (validateStep(step)) {
      nextButton.style.opacity = 1;
    } else {
      nextButton.style.opacity = 0.5;
    }
  }

  // Update the visibility of the "Next" button on the last step
  updateNextButtonVisibility(step, totalSteps, getStepNumber) {
    const nextButton = step.querySelector('[ct-form-button="next"]');
    if (getStepNumber(step) === totalSteps) {
      nextButton.style.display = "none";
    } else {
      nextButton.style.display = "inherit";
    }
  }

  // Function to show the next step with smooth transition
  showNextStep(
    button,
    currentStep,
    nextStep,
    totalSteps,
    getStepNumber,
    updateStepNumber,
    updateNextButtonOpacity,
    updateNextButtonVisibility,
    updateProgressLine,
    updatePercentDisplay,
  ) {
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
  showPrevStep(
    button,
    getStepNumber,
    totalSteps,
    updateStepNumber,
    updateNextButtonOpacity,
    updateNextButtonVisibility,
    updateProgressLine,
    updatePercentDisplay,
  ) {
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
  getStepNumber(step, steps) {
    const nonCardSteps = steps.filter(
      (step) => !step.hasAttribute("ct-form-card"),
    );
    return nonCardSteps.indexOf(step) + 1;
  }

  // Check if it's the first step
  isFirstStep(getCurrentStep, getStepNumber) {
    const currentStep = getCurrentStep();
    return getStepNumber(currentStep) === 1;
  }

  // Get the currently displayed step
  getCurrentStep(form) {
    return form.querySelector(
      '[ct-form-item="step"]:not([style="display: none;"])',
    );
  }

  // Helper function to update the opacity of the "Next" button
  updateNextButtonOpacityOnInterval(step, updateNextButtonOpacity) {
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

  // Function to handle automatic progression to the next step when radio inputs are clicked
  handleRadioAutoProgress(step, radioDelay) {
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
  handleFormCheckAndHide(step, showHideElement, hideElement) {
    // const labels = Array.from(step.querySelectorAll("label[ct-form-check]"));
    const hideElements = Array.from(step.querySelectorAll("[ct-form-hide]"));

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
              hideElement(otherUniqueValue);
            }
          });
        } else {
          hideElement(uniqueValue);
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
          hideElement(uniqueValue);
        }
      });
    });
  }

  // Function to show the associated hideElement
  showHideElement(step, uniqueValue) {
    const hideElement = step.querySelector(`[ct-form-hide="${uniqueValue}"]`);
    if (hideElement) {
      hideElement.style.display = "block";
    }
  }

  // Function to hide the associated hideElement
  hideElement(step, uniqueValue) {
    const hideElement = step.querySelector(`[ct-form-hide="${uniqueValue}"]`);
    if (hideElement) {
      hideElement.style.display = "none";
    }
  }

  // Function to handle ct-form-toggleClass for labels
  handleLabelToggleClass(step, form) {
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

  // Function to handle the ct-form-field attribute
  handleFormField(step, form, setInitialRadioValue) {
    const formFields = Array.from(step.querySelectorAll("[ct-form-field]"));

    // Add input event listeners to all elements with the ct-form-field attribute
    formFields.forEach((formField) => {
      const inputName = formField.getAttribute("ct-form-field");
      const associatedInputs = Array.from(
        form.querySelectorAll(`[name="${inputName}"]`),
      );

      if (inputName) {
        if (associatedInputs.length > 0) {
          // For radio inputs, handle change event to update text on selection
          if (associatedInputs[0].type === "radio") {
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
              associatedInput.addEventListener(
                "input",
                updateFormFieldText(associatedInputs, formField),
              );
              associatedInput.addEventListener(
                "change",
                updateFormFieldText(associatedInputs, formField),
              );
              associatedInput.addEventListener("focus", () => {
                clearInterval(changeCheckTimer); // Clear the timer when input gains focus
              });
              associatedInput.addEventListener(
                "blur",
                handleInputBlur(changeCheckInterval, changeCheckTimer),
              );
            });

            // Initial update to display the current input value
            updateFormFieldText(associatedInputs, formField);

            // Set up a timer to periodically check for changes
            const changeCheckInterval = 1000; // Adjust interval as needed (in milliseconds)
            let changeCheckTimer;

            // Initialize the timer when the page loads
            window.addEventListener("DOMContentLoaded", () => {
              handleInputBlur();
            });
          }
        }
      }
    });

    // Function to update the text content of the formField
    const updateFormFieldText = (associatedInputs, formField) => {
      const combinedValue = associatedInputs
        .map((input) => input.value)
        .join(", "); // Adjust this separator as needed
      formField.textContent = combinedValue;
    };

    // Function to handle the input blur event
    const handleInputBlur = (changeCheckTimer, changeCheckInterval) => {
      clearInterval(changeCheckTimer); // Clear the timer when input loses focus
      changeCheckTimer = setInterval(updateFormFieldText, changeCheckInterval);
    };
  }

  // Function to set initial value for radio inputs
  setInitialRadioValue(associatedInputs, formField) {
    const selectedRadioInput = associatedInputs.find((input) => input.checked);
    if (selectedRadioInput) {
      formField.textContent = selectedRadioInput.value;
    }
  }

  // Function to handle the ct-form-edit-step attribute
  handleEditStepAttribute(step, form, getStepNumber, showNextStep) {
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
}

export default MultiStepForm;
