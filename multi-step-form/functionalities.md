# Flowscriipt Multi-step form Functionalities

This document describes the attributes and classes used in the Flowscriipt Multi-step Form.

## Class: MultiStepForm

### Description

The `MultiStepForm` class represents a multi-step form and provides various functionalities for handling form validation, step navigation, progress tracking, and more.

### Constructor

#### `initialize()`

- Initializes the multi-step form.
- Hides error messages.
- Hides all steps except the first one.
- Sets the initial step number to 1.
- Updates the progress line.
- Adds event listeners.

#### `hideErrorMessages()`

- Hides all error messages in the form.

#### `hideStepsExceptFirst()`

- Hides all steps in the form except the first one.

#### `setInitialStepNumber()`

- Sets the initial step number to 1.

#### `updateStepNumber()`

- Updates the step number display in the form.

#### `updateProgressLine()`

- Updates the progress line in the form based on the current step.

#### `updatePercentDisplay()`

- Updates the percentage display in the form based on the current step.

#### `addFormEventListeners()`

- Adds event listeners to the form for handling form interactions.

#### `handleFormClick()`

- Handles click events on the form, such as clicking on next, previous, or submit buttons.

#### `handleFormChange()`

- Handles change events on the form, such as selecting an option or entering input.

#### `showNextStep()`

- Shows the next step in the form.
- Updates the progress line and step number.

#### `showPrevStep()`

- Shows the previous step in the form.
- Updates the progress line and step number.

#### `scrollToTopOfForm()`

- Scrolls the page to the top of the form.

#### `validateStep()`

- Validates the current step in the form by checking if all required fields are filled out.

#### `isValidEmail()`

- Checks if an email address is valid.

#### `validateCheckboxes()`

- Validates the checkboxes in the current step by checking if the required number of checkboxes are checked.

#### `handleRadioAutoProgress()`

- Handles automatic progression to the next step when a radio input is selected.

#### `handleFormInput()`

- Handles input events on the form, such as updating form field values.

#### `updateFormFieldText()`

- Updates the text content of a form field based on the associated input values.

#### `handleInputBlur()`

- Handles blur events on form inputs, such as updating form field values after a delay.

#### `handleFormKeyDown()`

- Handles keydown events on the form, such as pressing the enter key to navigate to the next step.

#### `handleFormLoad()`

- Handles the form load event, such as initializing form field values and setting up automatic progression.

#### `handleFormField()`

- Handles form field events, such as updating form field values.

#### `handleFormCheckAndHide()`

- Handles form check and hide events, such as showing or hiding elements based on checkbox or radio input selection.

#### `handleLabelToggleClass()`

- Handles label toggle class events, such as adding or removing a class from a label based on input selection.

#### `getStepNumber()`

- Gets the step number of a given step in the form.

#### `updateNextButtonVisibility()`

- Updates the visibility of the next button in the form based on the current step's validation status.

#### `showError()`

- Shows an error message in the form.

#### `updateNextButtonOpacity()`

- Updates the opacity of a button in the form.

#### `handleSubmitButton()`

- Handles the submit button click event, such as submitting the form and resetting it if enabled.

#### `resetForm()`

- Resets the form by clearing all input values and optionally redirecting to a new page.

#### `setupConditionalDisplayLogic()`

- Sets up conditional display logic for the form, such as showing or hiding steps based on checkbox selection.

#### `getStep()`

- Gets a step element in the form based on its ID.

#### `handleOptionInput()`

- Handles option input events, such as passing a selected option value to the next step.

#### `findNextStep()`

- Finds the next step element in the form.

#### `passValueToNextStep()`

- Passes a value to the next step in the form.

### Properties

| Attribute                | Functionality                                                              | Required/Optional |
| ------------------------ | -------------------------------------------------------------------------- | ----------------- |
| ct-form-mode             | Specifies the form mode, likely for multi-step form handling.              | Required          |
| ct-form-reset            | Indicates whether the form should be reset.                                | Required          |
| ct-form-error            | Indicates whether form errors should be displayed.                         | Required          |
| ct-form-redirect         | Specifies the URL to redirect to.                                          | Required          |
| ct-form-card             | Denotes a form step as a card.                                             | Optional          |
| ct-form-item             | Marks an element as a form step.                                           | Required          |
| ct-form-display          | Specifies the display property for the step.                               | Optional          |
| ct-form-number           | Used to display the current step number and total steps.                   | Optional          |
| ct-form-field            | Identifies form fields within a step.                                      | Optional          |
| ct-form-error-message    | Used to display error messages for form fields.                            | Optional          |
| ct-form-button           | Specifies the type of button (e.g., next, previous, submit) within a step. | Optional          |
| ct-form-progress         | Defines the progress bar style (e.g., line).                               | Optional          |
| ct-form-progress-fill    | Represents the progress bar fill.                                          | Optional          |
| ct-form-options-input    | Provides options for radio inputs.                                         | Optional          |
| ct-form-option-label     | Labels for radio input options.                                            | Optional          |
| ct-form-checkbox         | Specifies a checkbox.                                                      | Optional          |
| ct-form-checkbox-display | Indicates whether checkboxes should change the step displayed.             | Optional          |
| ct-form-checkbox-step    | Specifies the step to display when a checkbox is selected.                 | Optional          |

**NOTE**: Optional attributes may be used to enhance the form's functionality but are not strictly required for basic operation.
