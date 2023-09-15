import { MultiStepForm } from "./MultiStepForm.js";

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll('[ct-form-mode="multi-step"]');

  forms.forEach((form) => {
    const multiStepForm = new MultiStepForm(form);

    multiStepForm.initialize();
  });
});
