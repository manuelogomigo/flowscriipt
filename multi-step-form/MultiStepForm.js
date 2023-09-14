/**
 * Class representing a MultiStepForm.
 * @class
 *
 * This class represents a multi-step form. It provides functionality for handling form validation,
 * step navigation, progress tracking, and more.
 *
 * @constructor
 * Creates an instance of the MultiStepForm class.
 *
 * @method initialize
 * Initializes the multi-step form by hiding error messages, hiding all steps except the first one,
 * setting the initial step number, updating the progress line, and adding event listeners.
 *
 * @method hideErrorMessages
 * Hides all error messages in the form.
 *
 * @method hideStepsExceptFirst
 * Hides all steps in the form except the first one.
 *
 * @method setInitialStepNumber
 * Sets the initial step number to 1.
 *
 * @method updateStepNumber
 * Updates the step number display in the form.
 *
 * @method updateProgressLine
 * Updates the progress line in the form based on the current step.
 *
 * @method updatePercentDisplay
 * Updates the percentage display in the form based on the current step.
 *
 * @method addFormEventListeners
 * Adds event listeners to the form for handling form interactions.
 *
 * @method handleFormClick
 * Handles click events on the form, such as clicking on next, previous, or submit buttons.
 *
 * @method handleFormChange
 * Handles change events on the form, such as selecting an option or entering input.
 *
 * @method showNextStep
 * Shows the next step in the form and updates the progress line and step number.
 *
 * @method showPrevStep
 * Shows the previous step in the form and updates the progress line and step number.
 *
 * @method scrollToTopOfForm
 * Scrolls the page to the top of the form.
 *
 * @method validateStep
 * Validates the current step in the form by checking if all required fields are filled out.
 *
 * @method isValidEmail
 * Checks if an email address is valid.
 *
 * @method validateCheckboxes
 * Validates the checkboxes in the current step by checking if the required number of checkboxes are checked.
 *
 * @method handleRadioAutoProgress
 * Handles automatic progression to the next step when a radio input is selected.
 *
 * @method handleFormInput
 * Handles input events on the form, such as updating form field values.
 *
 * @method updateFormFieldText
 * Updates the text content of a form field based on the associated input values.
 *
 * @method handleInputBlur
 * Handles blur events on form inputs, such as updating form field values after a delay.
 *
 * @method handleFormKeyDown
 * Handles keydown events on the form, such as pressing the enter key to navigate to the next step.
 *
 * @method handleFormLoad
 * Handles the form load event, such as initializing form field values and setting up automatic progression.
 *
 * @method handleFormField
 * Handles form field events, such as updating form field values.
 *
 * @method handleFormCheckAndHide
 * Handles form check and hide events, such as showing or hiding elements based on checkbox or radio input selection.
 *
 * @method handleLabelToggleClass
 * Handles label toggle class events, such as adding or removing a class from a label based on input selection.
 *
 * @method getStepNumber
 * Gets the step number of a given step in the form.
 *
 * @method updateNextButtonVisibility
 * Updates the visibility of the next button in the form based on the current step's validation status.
 *
 * @method showError
 * Shows an error message in the form.
 *
 * @method updateNextButtonOpacity
 * Updates the opacity of a button in the form.
 *
 * @method handleSubmitButton
 * Handles the submit button click event, such as submitting the form and resetting it if enabled.
 *
 * @method resetForm
 * Resets the form by clearing all input values and optionally redirecting to a new page.
 *
 * @method setupConditionalDisplayLogic
 * Sets up conditional display logic for the form, such as showing or hiding steps based on checkbox selection.
 *
 * @method getStep
 * Gets a step element in the form based on its ID.
 *
 * @method handleOptionInput
 * Handles option input events, such as passing a selected option value to the next step.
 *
 * @method findNextStep
 * Finds the next step element in the form.
 *
 * @method passValueToNextStep
 * Passes a value to the next step in the form.
 *
 * @method handleFormSubmit
 * Handles the form submit event, such as submitting the form and resetting it if enabled.
 *
 * @method handleDataValues
 * Handles data values in the form, such as passing data to the next step.
 *
 * @property {string} ct-form-mode - Specifies the form mode, likely for multi-step form handling.
 * @property {boolean} ct-form-reset - Indicates whether the form should be reset.
 * @property {boolean} ct-form-error - Indicates whether form errors should be displayed.
 * @property {string} ct-form-redirect - Specifies the URL to redirect to.
 * @property {boolean} ct-form-card - Denotes a form step as a card.
 * @property {boolean} ct-form-item - Marks an element as a form step.
 * @property {string} ct-form-display - Specifies the display property for the step.
 * @property {string} ct-form-number - Used to display the current step number and total steps.
 * @property {string} ct-form-field - Identifies form fields within a step.
 * @property {boolean} ct-form-error-message - Used to display error messages for form fields.
 * @property {string} ct-form-button - Specifies the type of button (e.g., next, previous, submit) within a step.
 * @property {string} ct-form-progress - Defines the progress bar style (e.g., line).
 * @property {string} ct-form-progress-fill - Represents the progress bar fill.
 * @property {string} ct-form-options-input - Provides options for radio inputs.
 * @property {string} ct-form-option-label - Labels for radio input options.
 * @property {boolean} ct-form-checkbox - Specifies a checkbox.
 * @property {boolean} ct-form-checkbox-display - Indicates whether checkboxes should change the step displayed.
 * @property {string} ct-form-checkbox-step - Specifies the step to display when a checkbox is selected.
 * @property {string} ct-form-checkbox-hide - Specifies the element to hide when a checkbox is selected.
 * @property {string} ct-form-data - Specifies the data to pass to the next step.
 * @property {string} ct-form-data-option - attribute is used to define conditional actions for form elements within a multi-step form
 */

export class MultiStepForm {
  constructor(form) {
    this.form = form;

    if (!this.form) {
      // eslint-disable-next-line no-console
      console.error(
        "No form found with attribute 'ct-form-mode' set to 'multi-step'.",
      );
      return;
    }

    this.steps = Array.from(
      this.form.querySelectorAll('[ct-form-item="step"]'),
    );

    if (this.steps.length === 0) {
      // eslint-disable-next-line no-console
      console.error(
        "No form steps found with attribute 'ct-form-item' set to 'step'.",
      );
      return;
    }

    this.buttons = Array.from(
      this.form.querySelectorAll(
        '[ct-form-button="next"], [ct-form-button="prev"], [ct-form-button="submit"]',
      ),
    );

    if (this.buttons.length === 0) {
      // eslint-disable-next-line no-console
      console.error(
        "No form buttons found with attribute 'ct-form-button' set to 'next' or 'prev' or 'submit'.",
      );
      return;
    }

    this.totalSteps = this.steps.filter(
      (step) => !step.hasAttribute("ct-form-card"),
    ).length;
    this.progressWrapper = this.form.querySelector(
      '[ct-form-progress="wrapper"]',
    );
    this.progressLines = this.form.querySelectorAll(
      '[ct-form-progress="line"]',
    );
    this.percentDisplays = this.form.querySelectorAll(
      '[ct-form-percent="current"]',
    );
    this.currentNumberDisplays = this.form.querySelectorAll(
      '[ct-form-number="current"]',
    );
    this.totalNumberDisplays = this.form.querySelectorAll(
      '[ct-form-number="total"]',
    );
    this.dataValues = Array.from(this.form.querySelectorAll("[ct-form-data]"));
    this.resetEnabled =
      this.form.getAttribute("ct-form-reset") === "true" ? true : false;
    this.submitRedirect = this.form.getAttribute("ct-form-redirect");
    this.optionInputs = this.form.querySelectorAll("[ct-form-options-input]");

    this.radioAutoEnabled = false;
    this.radioDelay = 1000; // Default delay in

    this.initialize();
  }

  initialize() {
    this.hideStepsExceptFirst();
    this.setInitialStepNumber();
    this.updateProgressLine(0);
    this.updatePercentDisplay(0);
    this.addFormEventListeners();
    this.addStepsEventListeners();
  }

  addStepsEventListeners() {
    this.steps.forEach((step) => {
      step.addEventListener("change", () => {
        this.handleSelectFormField(step);
        this.handleFormField(step);
        this.handleDataValues(step);
      });

      step.addEventListener("click", () => {
        this.handleSelectFormField(step);
      });

      step.addEventListener("input", () => {
        this.handleFormInput(step);
      });

      step.addEventListener("DOMContentLoaded", () => {
        this.handleSelectFormField(step);
        this.handleFormChange(step);
      });
    });
  }

  hideStepsExceptFirst() {
    this.steps.forEach((step, index) => {
      if (index !== 0) {
        step.style.display = "none";
      } else {
        const displayAttr = step.getAttribute("ct-form-display");
        if (displayAttr) {
          step.style.display = displayAttr;
        }
      }
    });
  }

  setInitialStepNumber() {
    this.updateStepNumber(1);
  }

  updateStepNumber(stepNumber) {
    if (this.currentNumberDisplays.length > 0) {
      this.currentNumberDisplays.forEach((display) => {
        display.textContent = `${stepNumber}`;
      });
    }
    if (this.totalNumberDisplays.length > 0) {
      this.totalNumberDisplays.forEach((display) => {
        display.textContent = `${this.totalSteps}`;
      });
    }
  }

  updateProgressLine(progress) {
    for (let i = 0; i < this.progressLines.length; i++) {
      this.progressLines[i].style.transition = "width 1.2s ease";
      this.progressLines[i].style.width = `${progress * 100}%`;
      setTimeout(() => {
        this.progressLines[i].style.transition = "";
      }, 300);
    }
  }

  updatePercentDisplay(percentage) {
    if (this.percentDisplays) {
      for (let i = 0; i < this.percentDisplays.length; i++) {
        this.percentDisplays[i].textContent = `${Math.round(percentage)}%`;
      }
    }
  }

  addFormEventListeners() {
    this.form.addEventListener("click", (event) => this.handleFormClick(event));
    this.form.addEventListener("keydown", (event) =>
      this.handleFormKeyDown(event),
    );
    this.form.addEventListener("change", (event) => {
      this.handleFormChange(event);
      this.steps.forEach((step) => {
        this.handleDataValues(step);
      });

      this.handleConditionalVisibility();
    });
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleFormSubmit(event);
    });

    window.addEventListener("DOMContentLoaded", () => this.handleFormLoad());
  }

  handleFormClick(event) {
    const { target } = event;
    if (target.tagName === "BUTTON" || target.tagName === "A") {
      const buttonType = target.getAttribute("ct-form-button");
      if (buttonType === "next") {
        event.preventDefault();
        const currentStep = target.closest('[ct-form-item="step"]');
        const nextStep = currentStep.nextElementSibling;
        if (!currentStep.hasAttribute("ct-form-checkbox-display")) {
          this.showNextStep(currentStep, nextStep);
        }
        // this.handleRadioAutoProgress(nextStep);
        this.scrollToTopOfForm();
      } else if (buttonType === "prev") {
        event.preventDefault();
        const currentStep = target.closest('[ct-form-item="step"]');
        const prevStep = currentStep.previousElementSibling;
        this.showPrevStep(currentStep, prevStep);
        this.scrollToTopOfForm();
      } else if (buttonType === "submit") {
        event.preventDefault();
        this.handleFormSubmit();
      }
    }
  }

  handleFormChange(event) {
    const { target } = event;
    if (target.tagName === "SELECT") {
      const currentStep = target.closest('[ct-form-item="step"]');
      this.updateNextButtonVisibility(currentStep);
    } else if (target.tagName === "INPUT") {
      const currentStep = target.closest('[ct-form-item="step"]');
      this.updateNextButtonVisibility(currentStep);
    } else if (target.tagName === "TEXTAREA") {
      const currentStep = target.closest('[ct-form-item="step"]');
      this.updateNextButtonVisibility(currentStep);
    }
  }

  showNextStep(currentStep, nextStep) {
    currentStep.style.transition = "opacity 0.3s ease";
    currentStep.style.opacity = 0;

    setTimeout(() => {
      currentStep.style.display = "none";
      nextStep.style.display = "inherit";
      nextStep.style.opacity = 0;

      this.updateStepNumber(this.getStepNumber(nextStep));
      // this.updateNextButtonOpacity(nextStep);
      this.updateNextButtonVisibility(nextStep);

      const progress = this.getStepNumber(nextStep) / this.totalSteps;
      this.updateProgressLine(progress);
      this.updatePercentDisplay(progress * 100);

      nextStep.offsetHeight; // Trigger a reflow

      nextStep.style.transition = "opacity 0.3s ease";
      nextStep.style.opacity = 1;

      const displayAttr = nextStep.getAttribute("ct-form-display");
      if (displayAttr) {
        nextStep.style.display = displayAttr;
      }
    }, 300);
  }

  showPrevStep(currentStep, prevStep) {
    currentStep.style.transition = "opacity 0.3s ease";
    currentStep.style.opacity = 0;

    setTimeout(() => {
      currentStep.style.display = "none";
      prevStep.style.display = "inherit";
      prevStep.style.opacity = 0;

      this.scrollToTopOfForm();

      this.updateStepNumber(this.getStepNumber(prevStep));
      this.updateNextButtonOpacity(prevStep);
      this.updateNextButtonVisibility(prevStep);

      const progress = this.getStepNumber(prevStep) / this.totalSteps;
      this.updateProgressLine(progress);
      this.updatePercentDisplay(progress * 100);

      prevStep.offsetHeight; // Trigger a reflow

      prevStep.style.transition = "opacity 0.3s ease";
      prevStep.style.opacity = 1;

      const displayAttr = prevStep.getAttribute("ct-form-display");
      if (displayAttr) {
        prevStep.style.display = displayAttr;
      }
    }, 300);
  }

  scrollToTopOfForm() {
    window.scrollTo({
      top: this.form.getBoundingClientRect().top + window.scrollY,
      behavior: "smooth",
    });
  }

  validateStep(step) {
    const inputs = Array.from(step.querySelectorAll("input"));
    const textareas = Array.from(step.querySelectorAll("textarea"));
    const selects = Array.from(step.querySelectorAll("select"));

    const allInputs = inputs.concat(textareas).concat(selects);
    let valid = true;

    allInputs.forEach((input) => {
      const inputValue = input.value.trim();

      if (
        input.style.display !== null ||
        input.style.display !== "none" ||
        input.style.display !== ""
      ) {
        if (input.required && inputValue.length === 0) {
          valid = false;
        } else {
          valid = true;
        }
      }
    });

    // valid = this.validateInputs(step) && valid;
    // valid = this.validateCheckboxes(step) && valid;

    return valid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

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

  // Function to handle automatic progression to the next step when radio inputs are clicked
  handleRadioAutoProgress(step) {
    const radioInputs = Array.from(
      step.querySelectorAll('input[type="radio"]'),
    );

    // Check if the step has ct-form-radio="auto" attribute
    const radioAutoAttr = step.getAttribute("ct-form-radio");
    if (radioAutoAttr && radioAutoAttr.toLowerCase() === "auto") {
      // Check if the step has ct-form-delay attribute, and set the delay time accordingly
      const delayAttr = step.getAttribute("ct-form-delay");
      if (delayAttr && !isNaN(parseInt(delayAttr))) {
        this.radioDelay = parseInt(delayAttr);
      } else {
        this.radioDelay = 1000; // Default delay time in milliseconds
      }

      // Add click event listeners to all radio inputs in the step
      radioInputs.forEach((radioInput) => {
        radioInput.addEventListener("click", function () {
          setTimeout(() => {
            const nextButton = step.querySelector('[ct-form-button="next"]');
            if (nextButton) {
              nextButton.click();
            }
          }, this.radioDelay);
        });
      });
    }
  }

  handleFormInput(step) {
    const formFields = Array.from(step.querySelectorAll("[ct-form-field]"));

    formFields.forEach((formField) => {
      const inputName = formField.getAttribute("ct-form-field");

      if (inputName) {
        const associatedInputs = Array.from(
          this.form.querySelectorAll(`[name="${inputName}"]`),
        );

        if (associatedInputs.length > 0) {
          if (associatedInputs[0].type === "radio") {
            associatedInputs.forEach((radioInput) => {
              radioInput.addEventListener("change", () => {
                formField.textContent = radioInput.value;
              });
            });
          } else if (associatedInputs[0].type === "checkbox") {
            associatedInputs.forEach((checkboxInput) => {
              checkboxInput.addEventListener("change", () => {
                formField.style.display = checkboxInput.checked
                  ? "block"
                  : "none";
              });
            });

            const anyChecked = associatedInputs.some(
              (checkboxInput) => checkboxInput.checked,
            );
            formField.style.display = anyChecked ? "block" : "none";
          } else {
            associatedInputs.forEach((associatedInput) => {
              associatedInput.addEventListener("input", () => {
                this.updateFormFieldText(formField, associatedInputs);
              });

              associatedInput.addEventListener("change", () => {
                this.updateFormFieldText(formField, associatedInputs);
                this.validateInputs(step);
                this.validateCheckboxes(step);
              });

              associatedInput.addEventListener("focus", () => {
                clearInterval(this.changeCheckTimer);
              });

              associatedInput.addEventListener("blur", () => {
                clearInterval(this.changeCheckTimer);
                this.changeCheckTimer = setInterval(
                  () => this.updateFormFieldText(formField, associatedInputs),
                  this.changeCheckInterval,
                );
              });
            });

            this.updateFormFieldText(formField, associatedInputs);
            window.addEventListener("DOMContentLoaded", () => {
              this.handleInputBlur(formField, associatedInputs);
            });
          }
        }
      }
    });
  }

  updateFormFieldText(formField, associatedInputs) {
    const combinedValue = associatedInputs
      .map((input) => input.value)
      .join(", ");
    formField.textContent = combinedValue;
  }

  handleInputBlur(formField, associatedInputs) {
    clearInterval(this.changeCheckTimer);
    this.changeCheckTimer = setInterval(
      () => this.updateFormFieldText(formField, associatedInputs),
      this.changeCheckInterval,
    );
  }

  handleFormKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const currentStep = this.getCurrentStep();
      const nextButton = currentStep.querySelector('[ct-form-button="next"]');

      if (nextButton && nextButton.style.opacity !== "0.5") {
        nextButton.click();
      }
    }
  }

  getCurrentStep() {
    return this.steps.find((step) => step.style.opacity === "1");
  }

  handleFormLoad() {
    // Validate the initial step on page load
    const initialStep = this.steps[0];
    this.updateNextButtonVisibility(initialStep);

    // Set initial progress line width on page load
    const firstStep = this.steps[0];
    this.updateProgressLine(this.getStepNumber(firstStep) / this.totalSteps);
    this.updatePercentDisplay(0); // Set the initial current percentage

    // Set up a timer for updating field values
    this.changeCheckInterval = 1000; // Adjust interval as needed (in milliseconds)
    this.changeCheckTimer = null;

    this.optionInputs.forEach((optionInput) => {
      optionInput.addEventListener("change", () => {
        this.handleOptionInput(optionInput);
      });

      // if (optionInput.type === "radio" && optionInput.checked) {
      //   this.handleOptionInput(optionInput);
      // }
    });

    // Loop through each step and handle ct-form-field
    this.steps.forEach((step) => {
      this.handleFormField(step);
    });

    // Loop through each step and handle ct-form-edit-step
    this.steps.forEach((step) => {
      this.handleEditStepAttribute(step);
    });

    // Loop through each step and handle ct-form-check and ct-form-hide
    this.steps.forEach((step) => {
      this.handleFormCheckAndHide(step);
    });

    // Loop through each step and handle ct-form-toggleClass for labels
    this.steps.forEach((step) => {
      this.handleLabelToggleClass(step);
    });

    // Loop through each step and handle ct-form-field
    // this.steps.forEach((step) => {
    //   // this.updateNextButtonOpacityOnInterval(step);
    // });

    // Set up automatic radio progression if enabled
    this.radioAutoEnabled = false;
    this.steps.forEach((step) => {
      const radioAutoAttr = step.getAttribute("ct-form-radio");
      if (radioAutoAttr && radioAutoAttr.toLowerCase() === "auto") {
        this.radioAutoEnabled = true;
      }
    });

    if (this.radioAutoEnabled) {
      const currentStep = this.getCurrentStep();
      this.handleRadioAutoProgress(currentStep);
    }

    // Handle automatic progression from the initial step to the next step
    if (this.autoProgressEnabled) {
      const initialStep = this.steps[0];
      const nextButton = initialStep.querySelector('[ct-form-button="next"]');
      if (nextButton) {
        setTimeout(() => {
          nextButton.click();
        }, this.autoProgressDelay);
      }
    }
  }

  handleFormField(step) {
    const formFields = Array.from(step.querySelectorAll("[ct-form-field]"));

    // Add input event listeners to all elements with the ct-form-field attribute
    formFields.forEach((formField) => {
      const inputName = formField.getAttribute("ct-form-field");

      if (inputName) {
        const associatedInputs = Array.from(
          this.form.querySelectorAll(`[name="${inputName}"]`),
        );
        if (associatedInputs.length > 0) {
          // For radio inputs, handle change event to update text on selection
          if (associatedInputs[0].type === "radio") {
            // Function to set initial value for radio inputs
            const setInitialRadioValue = () => {
              const selectedRadioInput = associatedInputs.find(
                (input) => input.checked,
              );
              if (selectedRadioInput) {
                formField.textContent = selectedRadioInput.value;
              }
            };

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
            const handleInputFocus = () => {
              clearInterval(changeCheckTimer); // Clear the timer when input gains focus
            };

            // Function to handle input blur
            const handleInputBlur = () => {
              clearInterval(changeCheckTimer); // Clear the timer when input loses focus
              changeCheckTimer = setInterval(
                updateFormFieldText,
                changeCheckInterval,
              );
            };

            // Function to update the text content of the formField
            const updateFormFieldText = () => {
              const combinedValue = associatedInputs
                .map((input) => input.value)
                .join(", "); // Adjust this separator as needed
              formField.textContent = combinedValue;
            };

            // Initialize the timer when the page loads
            window.addEventListener("DOMContentLoaded", () => {
              handleInputBlur();
            });
          }
        }
      }
    });
  }

  handleEditStepAttribute(step) {
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
          const currentStepNumber = this.getStepNumber(step);

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
            this.showNextStep(editStepElement, step, targetStepElement);
          }
        }
      });
    });
  }

  handleFormCheckAndHide(step) {
    const labels = Array.from(step.querySelectorAll("label[ct-form-check]"));
    const hideElements = Array.from(step.querySelectorAll("[ct-form-hide]"));

    hideElements.forEach((hideElement) => {
      hideElement.style.display = "none";
    });

    labels.forEach((label) => {
      const input = label.querySelector(
        'input[type="radio"], input[type="checkbox"]',
      );
      const uniqueValue = label.getAttribute("ct-form-check");

      let prevUniqueValue = null;

      if (input && uniqueValue) {
        input.addEventListener("change", () => {
          if (input.type === "radio" || input.type === "checkbox") {
            if (input.checked) {
              this.showHideElement(uniqueValue);

              // Check if there was a previously checked input
              if (prevUniqueValue) {
                this.hideElement(prevUniqueValue);
              }

              // Update the previously checked input
              prevUniqueValue = uniqueValue;
            } else {
              this.hideElement(uniqueValue);
            }
          }
        });
      }
    });
  }

  showHideElement(uniqueValue) {
    this.steps.forEach((step) => {
      const stepElement = step.querySelector(`[ct-form-hide="${uniqueValue}"]`);

      if (stepElement) {
        stepElement.style.display = "block";

        const childElements = stepElement.querySelectorAll("*");

        childElements.forEach((childElement) => {
          childElement.style.display = "";
        });
      }
    });
  }

  hideElement(uniqueValue) {
    this.steps.forEach((step) => {
      const stepElement = step.querySelector(`[ct-form-hide="${uniqueValue}"]`);

      if (stepElement) {
        stepElement.style.display = "none";

        const childElements = stepElement.querySelectorAll("*");

        childElements.forEach((childElement) => {
          childElement.style.display = "none";
          childElement.hidden = true;
        });
      }
    });
  }

  getStepNumber(step) {
    const nonCardSteps = this.steps.filter(
      (step) => !step.hasAttribute("ct-form-card"),
    );
    return nonCardSteps.indexOf(step) + 1;
  }

  updateNextButtonVisibility(step) {
    const prevButton = step.querySelector('[ct-form-button="prev"]');
    const nextButton = step.querySelector('[ct-form-button="next"]');
    const submitButton = step.querySelector('[ct-form-button="submit"]');

    if (prevButton) {
      if (this.getStepNumber(step) === 1) {
        prevButton.style.display = "none";
      } else {
        prevButton.style.display = "inline-block";
      }
    }

    if (nextButton) {
      if (this.getStepNumber(step) === this.steps.length) {
        nextButton.style.display = "none";
      } else {
        nextButton.style.display = "inline-block";
      }

      if (this.validateStep(step)) {
        this.handleRadioAutoProgress(step);
        this.updateNextButtonOpacity(nextButton, true);
      } else {
        this.updateNextButtonOpacity(nextButton, false);
      }
    }

    if (submitButton) {
      if (this.validateStep(step)) {
        this.updateNextButtonOpacity(submitButton, true);
      } else {
        this.updateNextButtonOpacity(submitButton, false);
      }
    }
  }

  updateNextButtonOpacity(button, visibility) {
    if (button) {
      if (visibility) {
        button.style.opacity = 1;
        button.style.cursor = "pointer";
        button.disabled = false;
      } else {
        button.style.opacity = 0.5;
        button.style.cursor = "default";
        button.disabled = true;
      }

      return;
    }
  }

  resetForm() {
    const lastStep = this.steps[this.steps.length - 1];

    this.steps.forEach((step) => {
      // Reset input fields
      const inputs = Array.from(step.querySelectorAll("input"));
      inputs.forEach((input) => {
        switch (input.type) {
          case "text":
          case "password":
          case "file":
          case "hidden":
          case "email":
          case "search":
          case "tel":
          case "url":
            input.value = "";
            break;
          case "checkbox":
          case "radio":
            input.checked = false;
            break;
          case "range":
          case "number":
            input.value = input.defaultValue || "0"; // or any other default value you prefer
            break;
        }
      });

      // Reset textareas
      const textareas = Array.from(step.querySelectorAll("textarea"));
      textareas.forEach((textarea) => {
        textarea.value = "";
      });

      // Reset select elements
      const selects = Array.from(step.querySelectorAll("select"));
      selects.forEach((select) => {
        select.selectedIndex = 0; // setting to the first option
      });

      // Clear any validation states or messages
      const errorMessages = Array.from(step.querySelectorAll(".error-message"));
      errorMessages.forEach((msg) => {
        msg.textContent = ""; // clear error messages
        msg.style.display = "none"; // hide error messages
      });

      const errorFields = Array.from(step.querySelectorAll(".error-field"));
      errorFields.forEach((field) => {
        field.classList.remove("error-field"); // remove error class from fields
      });
    });

    if (this.submitRedirect) {
      window.location = this.submitRedirect;
    }

    this.showNextStep(lastStep, this.steps[0]);
    this.initialize();
  }

  getStep(stepName) {
    const step = this.steps.find((step) => {
      return step.id === stepName ? step : null;
    });
    return step;
  }

  handleOptionInput(input) {
    const optionInput = input.getAttribute("ct-form-options-input");
    const optionLabel = input.getAttribute("ct-form-options-tag");
    const optionName = this.form.querySelectorAll(
      `[ct-form-options-name="${optionLabel}"]`,
    );

    if (optionInput && input.checked && optionName) {
      optionName.forEach((name) => {
        name.textContent = optionInput;
      });
    } else if (optionInput && !input.checked && optionName) {
      optionName.forEach((name) => {
        name.textContent = null;
      });
    } else {
      return;
    }
  }

  findNextStep(step) {
    const nextStep = step.nextElementSibling;

    if (nextStep) {
      return nextStep;
    } else {
      return null;
    }
  }

  passValueToNextStep(nextStep, optionInput) {
    const optionLabel = nextStep.querySelector("[ct-form-option-label]");

    if (optionLabel) {
      optionLabel.textContent = optionInput;
    }
  }

  setError(element, message) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector("[ct-form-error]");

    if (errorDisplay) {
      errorDisplay.innerText = message;
    }

    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  }

  setSuccess(element) {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector("[ct-form-error]");

    if (errorDisplay) {
      errorDisplay.innerText = "";
    }

    inputControl.classList.remove("error");
    inputControl.classList.add("success");
  }

  validateInputs(step) {
    const inputs = Array.from(step.querySelectorAll("input"));
    const textareas = Array.from(step.querySelectorAll("textarea"));
    const selects = Array.from(step.querySelectorAll("select"));

    const allInputs = inputs.concat(textareas).concat(selects);
    let valid = true;

    allInputs.forEach((input) => {
      const inputValue = input.value.trim();

      if (input.style.display !== null && input.style.display !== "none") {
        if (input.required && inputValue.length === 0) {
          const message = input.getAttribute("ct-form-requiredMessage")
            ? input.getAttribute("ct-form-requiredMessage")
            : "This field is required";

          this.setError(input, message);

          valid = false;
        } else {
          this.setSuccess(input);

          valid = true;
        }

        if (
          input.getAttribute("ct-form-type") === "email" &&
          inputValue.length > 0
        ) {
          if (!this.isValidEmail(inputValue)) {
            const message = input.getAttribute("ct-form-emailMessage");

            this.setError(input, message);

            valid = false;
          } else {
            this.setSuccess(input);

            valid = true;
          }
        }

        if (
          input.getAttribute("ct-form-type") === "number" &&
          inputValue.length > 0 &&
          input.type === "number" &&
          input.style.display !== "none"
        ) {
          if (!this.validateNumber(inputValue)) {
            const message = input.getAttribute("ct-form-numberMessage");

            this.setError(input, message);

            valid = false;
          } else {
            this.setSuccess(input);
          }
        }
      }
    });

    return valid;
  }

  validateNumber(number) {
    const regex = /^\d+$/;

    return regex.test(number);
  }

  handleFormSubmit() {
    if (this.resetEnabled) {
      setTimeout(() => {
        this.resetForm();
      }, 1000);
    } else {
      return;
    }
  }

  handleDataValues(step) {
    const dataOptions = Array.from(
      step.querySelectorAll("[ct-form-data-option]"),
    );

    dataOptions.forEach((option) => {
      const optionString = option.getAttribute("ct-form-data-option");

      this.processFormDataOption(optionString, option);
    });
  }

  processFormDataOption(attributeValue, optionElement) {
    const condition = this.evaluateConditionalDisplayLogic(
      attributeValue,
      this.dataValues,
    );

    if (condition) {
      const showString = optionElement.getAttribute("ct-form-hide");

      this.showHideElement(showString);
    }
  }

  evaluateConditionalDisplayLogic(condition, dataValues) {
    const orConditions = condition.split("||");
    let result = false;

    orConditions.forEach((orCondition) => {
      const andConditions = orCondition.split("&&");
      let subConditionResult = true;

      andConditions.forEach((component) => {
        // Use a regular expression to match individual variable names
        const variableNames = component.match(/\S+/g);

        if (variableNames) {
          variableNames.forEach((variable) => {
            const isChecked = this.checkVariable(dataValues, variable);

            subConditionResult = subConditionResult && isChecked;
          });
        }
      });

      if (subConditionResult) {
        result = result || true;
      }
    });

    return result;
  }

  checkVariable(dataValues, variable) {
    const dataValueList = [...dataValues].filter((data) => {
      return data.getAttribute("ct-form-data") === variable ? data : null;
    });

    if (dataValueList.length === 0) {
      return false;
    }

    const dataValue = dataValueList[0];

    return dataValue.checked ? true : false;
  }

  handleLabelToggleClass(step) {
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
              this.form.querySelectorAll(
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

  handleSelectFormField(step) {
    const selectFields = Array.from(
      step.querySelectorAll("select[ct-form-field]"),
    );

    // Add change event listeners to all select fields with ct-form-field attribute
    selectFields.forEach((selectField) => {
      const targetElementId = selectField.getAttribute("ct-form-field");

      if (targetElementId) {
        const targetElement = document.getElementById(targetElementId);

        if (targetElement) {
          // Add event listener for 'change' event on select input
          selectField.addEventListener("change", function () {
            // Update the target element's content with the selected option value
            const selectedOption =
              selectField.options[selectField.selectedIndex];
            targetElement.textContent = selectedOption.value;
          });
        }
      }
    });
  }

  handleConditionalVisibility() {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const labels = Array.from(
      document.querySelectorAll("label[ct-form-conditional]"),
    );
    const dependentElements = Array.from(
      document.querySelectorAll("[ct-form-dependent]"),
    );
    const selectFields = Array.from(
      document.querySelectorAll("select[ct-form-conditional]"),
    );

    // Function to show the associated dependentElements
    function showDependentElement(uniqueValue) {
      const elementsToDisplay = document.querySelectorAll(
        `[ct-form-dependent="${uniqueValue}"]`,
      );
      elementsToDisplay.forEach((element) => {
        element.style.display = "inherit";
      });
    }

    // Function to hide the associated dependentElements
    function hideDependentElement(uniqueValue) {
      const dependentElementsToHide = document.querySelectorAll(
        `[ct-form-dependent="${uniqueValue}"]`,
      );
      dependentElementsToHide.forEach((element) => {
        element.style.display = "none";
      });
    }

    // Hide all elements with ct-form-dependent attribute onload
    dependentElements.forEach((dependentElement) => {
      dependentElement.style.display = "none";
    });

    // Add input event listeners to all radio inputs and checkboxes globally
    const radioInputs = Array.from(
      document.querySelectorAll('input[type="radio"]'),
    );
    const checkboxInputs = Array.from(
      document.querySelectorAll('input[type="checkbox"]'),
    );

    radioInputs.forEach((radioInput) => {
      const uniqueValue = radioInput.parentElement.getAttribute(
        "ct-form-conditional",
      );
      radioInput.addEventListener("change", function () {
        if (radioInput.checked) {
          showDependentElement(uniqueValue);
          // Hide other ct-form-dependent elements associated with unchecked radio buttons
          radioInputs.forEach((input) => {
            const otherUniqueValue = input.parentElement.getAttribute(
              "ct-form-conditional",
            );
            if (otherUniqueValue !== uniqueValue) {
              hideDependentElement(otherUniqueValue);
            }
          });
        } else {
          hideDependentElement(uniqueValue);
        }
      });
    });

    checkboxInputs.forEach((checkboxInput) => {
      const uniqueValue = checkboxInput.parentElement.getAttribute(
        "ct-form-conditional",
      );
      checkboxInput.addEventListener("change", function () {
        if (checkboxInput.checked) {
          showDependentElement(uniqueValue);
        } else {
          hideDependentElement(uniqueValue);
        }
      });
    });

    // Add change event listeners to all select fields with ct-form-conditional attribute
    selectFields.forEach((selectField) => {
      const selectedValue = selectField.value;
      const uniqueValue = selectField.getAttribute("ct-form-conditional");

      selectField.addEventListener("change", function () {
        if (selectedValue === uniqueValue) {
          showDependentElement(uniqueValue);
        } else {
          hideDependentElement(uniqueValue);
        }
      });
    });
  }

  // updateNextButtonOpacityOnInterval(step) {
  //   // Set an interval to periodically update the button opacity
  //   const updateInterval = 1000; // 1 second interval, you can adjust this as needed
  //   let updateTimer;

  //   function updateOpacity() {
  //     clearInterval(updateTimer); // Clear any existing interval
  //     updateTimer = setInterval(() => {
  //       this.updateNextButtonOpacity(step);
  //     }, updateInterval);
  //   }

  //   // Add input event listeners to all inputs in the step
  //   const inputs = Array.from(step.querySelectorAll("input, textarea"));
  //   inputs.forEach((input) => {
  //     input.addEventListener("input", updateOpacity);
  //   });

  //   // Start the interval when the step loads
  //   updateOpacity();
  // }
}
