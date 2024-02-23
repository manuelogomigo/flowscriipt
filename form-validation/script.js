function validateName() {
    let nameInput = document.querySelector("[name]");
    let nameValue = nameInput.value.trim();
    let namePattern = /^[a-zA-Z]+$/;
    if (nameValue === "") {
        nameInput.setCustomValidity("Name cannot be blank");
    } else if (!namePattern.test(nameValue)) {
        nameInput.setCustomValidity("Name must have only alphabetic characters");
    } else {
        nameInput.setCustomValidity("");
    }
    nameInput.reportValidity();
    return nameInput.checkValidity();
}

function validateEmail() {
    let emailInput = document.querySelector("[email]");
    let emailValue = emailInput.value.trim();
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailValue === "") {
        emailInput.setCustomValidity("Email cannot be blank");
    } else if (!emailPattern.test(emailValue)) {
        emailInput.setCustomValidity("Please enter a valid email address");
    } else {
        emailInput.setCustomValidity("");
    }
    emailInput.reportValidity();
    return emailInput.checkValidity();
}

function validatePassword() {
    let passwordInput = document.querySelector("[name='password]");
    let passwordValue = passwordInput.value.trim();
    console.log("hi: ", passwordValue);
    let passwordPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
    if (passwordValue === "") {
        passwordInput.setCustomValidity("Password cannot be blank");
    } else if (!passwordPattern.test(passwordValue)) {
        passwordInput.setCustomValidity("Password must have at least 6 characters, including a number and a capital letter");
    } else {
        passwordInput.setCustomValidity("");
    }
    passwordInput.reportValidity();
    return passwordInput.checkValidity();
}

function validateURL() {
    let urlInput = document.querySelector("[url]");
    let urlValue = urlInput.value.trim();
    let urlPattern = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}(\/\S*)?$/;
    if (urlValue === "") {
        urlInput.setCustomValidity("URL cannot be blank");
    } else if (!urlPattern.test(urlValue)) {
        urlInput.setCustomValidity("Please enter a valid URL");
    } else {
        urlInput.setCustomValidity("");
    }
    urlInput.reportValidity();
    return urlInput.checkValidity();
}

function validateForm() {
    let form = document.querySelector("form");
    let nameValid = validateName();
    let emailValid = validateEmail();
    let passwordValid = validatePassword();
    let urlValid = validateURL();
    if (nameValid && emailValid && passwordValid && urlValid) {
      form.setCustomValidity("");
      return true;
    } else {
      form.setCustomValidity("Please fix the errors in the form");
      form.reportValidity();
      return false;
    }
  }