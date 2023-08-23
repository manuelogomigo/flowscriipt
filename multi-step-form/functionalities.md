# Flowscriipt Multi-step form Functionalities

| Attributes                       | Functionalities                                                                                                                                                             | Type     |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| ct-form-mode=”multi-step”        | Add to the form element to enable the multi-step form functionality                                                                                                         | Required |
| ct-form-item=”step”              | Added to every div to identify them as a step                                                                                                                               | Required |
| ct-form-button=”next”            | Added to a link block, or button to proceed to the next step when clicked, it should be added to every step. it’s hidden on the last step                                   | Required |
| ct-form-button=”prev”            | Added to a link block or button to proceed to the prev step when clicked.                                                                                                   | Optional |
|                                  |
| ct-form-display=”flex”           | Change the display for each step as they show                                                                                                                               | Optional |
| ct-form-card                     | Added to a step to identify the step as an intro/info card. this won’t count as a step in the progress bar, number or percentage.                                           | Optional |
| ct-form-progress=”line”          | This will be used to add a progress bar which progresses with the step                                                                                                      | Optional |
| ct-form-number=”total”           | Counts the total step minus the ct-form-card.                                                                                                                               | Optional |
| ct-form-number=”current”         | show the current step number a user                                                                                                                                         | Optional |
| ct-form-percent=”current”        | Show the current percentage of step minus ct-form-card                                                                                                                      | Optional |
| ct-form-checkbox=”n”             | Add this attribute to your “step” to set the number of checkboxes that must be checked for the step to be considered valid. The Value “n” represent number e.g. 1, 2, 6 etc | Optional |
| ct-form-toggleclass=”your class” | Added to radio and checkbox labels to toggle a class if it’s checked                                                                                                        | Optional |
| ct-form-radio=”auto”             | Add this attribute to the step to progress automatically when a radio input is checked                                                                                      | Optional |
| ct-form-delay=”n”                | Add this attribute to your “step” to add duration before moving to the next step. The Value “n” represent millseconds eg 1000, 2000, 3000 etc                               | Optional |
| ct-form-check=”unique value”     | Add this attribute to your “radio or checkbox". Make sure the unique value is the same with the element you want to hide.                                                   | Optional |
| ct-form-hide=”unique value”      | Add this attribute to your element to hide it, and would only show when the corresponding checkbox or radio inputs with the same unique value is selected.                  | Optional |
| ct-form-field=”field name”       | Add this to a text or text span, to show the value of an input field or radio button. The field name is the input name.                                                     |

NOTE: To show a preview of checkboxes inputs, you need to add div of each checkboxes element, and add the attribute to each of them with the corresponding input checkbox.
It will hide the checkboxes and only show them if they are selected. | Optional |
| ct-form-edit-step=”n” | Add this attribute to your “div, text, or link block” to navigate to a specific step in the form.
The Value “n” represent the step number you want it to navigate when clicked. e.g. 1, 3 etc | Optional |
