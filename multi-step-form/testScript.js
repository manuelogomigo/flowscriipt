import { MultiStepForm } from "./MultiStepForm.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('[ct-form-mode="multi-step"]');
  const steps = Array.from(form.querySelectorAll('[ct-form-item="step"]'));
  const progressWrapper = document.querySelector(
    '[ct-form-progress="wrapper"]',
  );
  const progressLine = document.querySelector('[ct-form-progress="line"]');
  const percentDisplay = document.querySelector('[ct-form-percent="current"]');
  const totalNumberDisplay = document.querySelector('[ct-form-number="total"]');
  const currentNumberDisplay = document.querySelector(
    '[ct-form-number="current"]',
  );

  const multiStepForm = new MultiStepForm(form, {
    steps,
    progressWrapper,
    progressLine,
    percentDisplay,
    totalNumberDisplay,
    currentNumberDisplay,
  });

  multiStepForm.init();
});
