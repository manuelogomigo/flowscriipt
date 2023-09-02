/**
 * Shows or hides an element based on a unique value.
 *
 * @param {string} uniqueValue - The unique value used to identify the element to be shown or hidden.
 * @returns {void} - None. The function only modifies the display of an element.
 */
export class MultiStepForm {
  constructor() {
    this.form = document.querySelector('[ct-form-mode="multi-step"]');

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
    this.resetEnabled =
      this.form.getAttribute("ct-form-reset") === "true" ? true : false;
    this.errorEnabled =
      this.form.getAttribute("ct-form-error") === "true" ? true : false;
    this.errorMessages = this.form.querySelectorAll("[ct-form-error-message]");
    this.submitRedirect = this.form.getAttribute("ct-form-redirect");
    // this.checkboxDisplay = this.steps.querySelectorAll

    this.radioAutoEnabled = false;
    this.radioDelay = 1000; // Default delay in
    this.validationErrorMessage = "Please fill out all required fields.";
    this.errorColor = "#ff0000";

    this.initialize();
  }

  initialize() {
    this.hideErrorMessages();
    this.hideStepsExceptFirst();
    this.setInitialStepNumber();
    this.updateProgressLine(0);
    this.updatePercentDisplay(0);
    this.addFormEventListeners();
  }

  hideErrorMessages() {
    if (this.errorMessages) {
      this.errorMessages.forEach((message) => {
        message.style.display = "none";
      });
    }
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
    this.form.addEventListener("input", (event) => {
      this.steps.forEach((step) => {
        if (step.contains(event.target)) {
          this.handleFormInput(step);
          this.handleInvalidInput(step, event.target);
        }
      });
    });
    this.form.addEventListener("keydown", (event) =>
      this.handleFormKeyDown(event),
    );
    this.form.addEventListener("change", (event) => {
      this.handleFormChange(event);
    });
    this.form.addEventListener("invalid", (event) =>
      this.handleFormInvalid(event),
    );
    this.form.addEventListener("submit", (event) =>
      this.handleFormSubmit(event),
    );

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
        if (this.validateStep(currentStep)) {
          if (!currentStep.hasAttribute("ct-form-checkbox-display")) {
            this.showNextStep(currentStep, nextStep);
          }
          this.handleRadioAutoProgress(nextStep);
          this.scrollToTopOfForm();
        }
      } else if (buttonType === "prev") {
        event.preventDefault();
        const currentStep = target.closest('[ct-form-item="step"]');
        const prevStep = currentStep.previousElementSibling;
        this.showPrevStep(currentStep, prevStep);
        this.scrollToTopOfForm();
      } else if (buttonType === "submit") {
        this.handleSubmitButton(target);
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

      if (this.errorEnabled) {
        this.showError(currentStep, "error", this.validationErrorMessage);
      }
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
      // this.updateNextButtonOpacity(prevStep);
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
    const inputs = Array.from(
      step.querySelectorAll("input[required],  textarea[required]"),
    );

    let valid = true;

    inputs.forEach((input) => {
      if (input.type === "email") {
        if (!this.isValidEmail(input.value.trim())) {
          valid = false;
        }
      } else if (input.type === "number") {
        if (isNaN(input.value.trim())) {
          valid = false;
        }
      } else {
        if (input.value.trim() === "") {
          valid = false;
        }
      }
    });

    valid = this.validateCheckboxes(step) && valid;

    if (!valid) {
      step.classList.add("ct-form-invalid");
      setTimeout(() => {
        step.classList.remove("ct-form-invalid");
      }, 300);
    }

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

  handleRadioAutoProgress(step) {
    const radioInputs = Array.from(
      step.querySelectorAll('input[type="radio"]'),
    );

    const radioAutoAttr = step.getAttribute("ct-form-radio");
    if (radioAutoAttr && radioAutoAttr.toLowerCase() === "auto") {
      const delayAttr = step.getAttribute("ct-form-delay");
      const radioDelay = !isNaN(parseInt(delayAttr))
        ? parseInt(delayAttr)
        : 1000;

      radioInputs.forEach((radioInput) => {
        radioInput.addEventListener("click", () => {
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

    // Loop through each step and handle ct-form-field
    this.steps.forEach((step) => {
      this.handleFormField(step);
    });

    // Loop through each step and handle ct-form-edit-step
    // this.steps.forEach((step) => {
    //   this.handleEditStepAttribute(step);
    // });

    // Loop through each step and handle ct-form-check and ct-form-hide
    this.steps.forEach((step) => {
      this.handleFormCheckAndHide(step);
    });

    // Loop through each step and handle ct-form-toggleClass for labels
    this.steps.forEach((step) => {
      this.handleLabelToggleClass(step);
    });

    this.steps.forEach((step) => {
      this.setupConditionalDisplayLogic(step);
    });

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

    formFields.forEach((formField) => {
      const inputName = formField.getAttribute("ct-form-field");

      if (inputName) {
        const associatedInputs = Array.from(
          this.form.querySelectorAll(`[name="${inputName}"]`),
        );

        associatedInputs.forEach((associatedInput) => {
          associatedInput.addEventListener("input", () => {
            this.updateFormFieldText(formField, associatedInputs);
          });
        });

        // Update the field text initially
        this.updateFormFieldText(formField, associatedInputs);
      }
    });
  }

  // handleEditStepAttribute(step) {
  //   const editStepElements = Array.from(
  //     step.querySelectorAll("[ct-form-edit-step]"),
  //   );

  //   editStepElements.forEach((editStepElement) => {
  //     const targetStepNumber = parseInt(
  //       editStepElement.getAttribute("ct-form-edit-step"),
  //     );

  //     editStepElement.addEventListener("click", () => {
  //       if (!isNaN(targetStepNumber) && targetStepNumber > 0) {
  //         const currentStepNumber = this.getStepNumber(step);
  //         const stepsToMove = targetStepNumber - currentStepNumber;
  //         let targetStepElement = step;

  //         if (stepsToMove !== 0) {
  //           if (stepsToMove > 0) {
  //             for (let i = 0; i < stepsToMove; i++) {
  //               targetStepElement = targetStepElement.nextElementSibling;
  //             }
  //           } else {
  //             for (let i = 0; i > stepsToMove; i--) {
  //               targetStepElement = targetStepElement.previousElementSibling;
  //             }
  //           }
  //         }

  //         if (targetStepElement) {
  //           const nextButton = step.querySelector('[ct-form-button="next"]');
  //           if (nextButton) {
  //             this.showNextStep(nextButton, step, targetStepElement);
  //           }
  //         }
  //       }
  //     });
  //   });
  // }

  handleFormCheckAndHide(step) {
    const labels = Array.from(step.querySelectorAll("label[ct-form-check]"));
    const hideElements = Array.from(step.querySelectorAll("[ct-form-hide]"));

    function showHideElement(uniqueValue) {
      const hideElement = step.querySelector(`[ct-form-hide="${uniqueValue}"]`);
      if (hideElement) {
        hideElement.style.display = "block";
      }
    }

    function hideHideElement(uniqueValue) {
      const hideElement = step.querySelector(`[ct-form-hide="${uniqueValue}"]`);
      if (hideElement) {
        hideElement.style.display = "none";
      }
    }

    hideElements.forEach((hideElement) => {
      hideElement.style.display = "none";
    });

    labels.forEach((label) => {
      const input = label.querySelector(
        'input[type="radio"], input[type="checkbox"]',
      );
      const uniqueValue = label.getAttribute("ct-form-check");

      if (input && uniqueValue) {
        input.addEventListener("change", () => {
          if (input.type === "radio") {
            labels.forEach((otherLabel) => {
              if (otherLabel !== label) {
                const otherInput = otherLabel.querySelector(
                  'input[type="radio"]',
                );
                const otherUniqueValue =
                  otherLabel.getAttribute("ct-form-check");
                hideHideElement(otherUniqueValue);
                if (otherInput.checked) {
                  showHideElement(otherUniqueValue);
                }
              }
            });
          } else if (input.type === "checkbox") {
            if (input.checked) {
              showHideElement(uniqueValue);
            } else {
              hideHideElement(uniqueValue);
            }
          }
        });
      }
    });
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
        input.addEventListener("input", () => {
          if (input.type === "radio") {
            labels.forEach((otherLabel) => {
              if (otherLabel !== label) {
                otherLabel.classList.remove(toggleClassAttr);
              }
            });
          }
          label.classList.add(toggleClassAttr);
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
    const nextButton = step.querySelector('[ct-form-button="next"]');
    const submitButton = step.querySelector('[ct-form-button="submit"]');

    if (nextButton) {
      if (this.validateStep(step)) {
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

  showError(step, errorType, message) {
    if (this.errorMessages.length === 0) {
      return;
    }

    this.errorMessages.forEach((errorMessage) => {
      errorMessage.style.color = this.errorColor;
      errorMessage.style.fontWeight = "bold";
      errorMessage.style.transition = "color 0.3s ease";
      errorMessage.style.display = "block";

      if (errorType === "error") {
        errorMessage.innerHTML = message;
      } else if (errorType === "custom") {
        errorMessage.innerHTML = errorMessage.getAttribute(
          "ct-form-customErrorMessage",
        );
      }

      setTimeout(() => {
        errorMessage.style.color = "transparent";
        errorMessage.style.transition = "color 0.3s ease";
        errorMessage.style.display = "none";
      }, 1000);
    });
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

  handleInvalidInput(step, input) {
    const invalid = input.getAttribute("ct-form-invalid");

    if (invalid) {
      this.updateNextButtonOpacity(step, false);

      invalid.style.border = `1px solid ${this.errorColor}`;
    }
  }

  handleSubmitButton(submitButton) {
    if (submitButton) {
      // this.submitForm();

      if (this.resetEnabled) {
        setTimeout(() => {
          this.resetForm();
        }, 1000);
      } else {
        return;
      }
    }
  }

  resetForm() {
    const lastStep = this.steps[this.steps.length - 1];

    this.steps.forEach((step) => {
      const inputs = Array.from(step.querySelectorAll("input"));
      const textareas = Array.from(step.querySelectorAll("textarea"));
      const selects = Array.from(step.querySelectorAll("select"));

      inputs.forEach((input) => {
        input.value = "";
      });

      textareas.forEach((textarea) => {
        textarea.value = "";
      });

      selects.forEach((select) => {
        select.value = "";
      });
    });

    if (this.submitRedirect) {
      window.location = this.submitRedirect;
    }

    this.showNextStep(lastStep, this.steps[0]);
  }

  setupConditionalDisplayLogic(step) {
    const checkboxesSteps = Array.from(
      step.querySelectorAll("[ct-form-checkbox-step]"),
    );

    checkboxesSteps.forEach((checkbox) => {
      const checkboxValue = checkbox.getAttribute("ct-form-checkbox-step");
      const nextButton = step.querySelector('[ct-form-button="next"]');

      if (checkboxValue && nextButton) {
        nextButton.addEventListener("click", () => {
          if (checkbox.checked) {
            const nextStep = this.getStep(checkboxValue);

            this.showNextStep(step, nextStep);
          } else {
            return;
          }
        });
      }
    });
  }

  getStep(stepName) {
    const step = this.steps.find((step) => {
      return step.id === stepName ? step : null;
    });
    return step;
  }
}
