function validateName() {
    let nameInput = document.querySelector("[data-name]");
    let nameError = document.querySelector("[data-name-error]")
    let nameValue = nameInput.value.trim();
    let namePattern = /^[a-zA-Z]+$/;
    if (nameValue === "") {
        nameError.style.display = "block";
        nameError.textContent = "Name cannot be blank";
        nameError.style.color = "red";
        nameError.style.fontSize = "14px"
        return false
    } else if (!namePattern.test(nameValue)) {
        nameError.style.display = "block";
        nameError.textContent = "Name must only have alphabetic characters";
        nameError.style.color = "red";
        nameError.style.fontSize = "14px"
        return false;
    } else {
        return true;
    }
}

function validateEmail() {
    let emailInput = document.querySelector("[data-email]");
    let emailError = document.querySelector("[data-email-error");
    let emailValue = emailInput.value.trim();
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailValue === "") {
        emailError.style.display = "block";
        emailError.textContent = "Email cannot be blank";
        emailError.style.color = "red";
        emailError.style.fontSize = "14px"
        return false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.style.display = "block";
        emailError.textContent="Please enter a valid email, e.g flowscript@gmail.com";
        emailError.style.color = "red";
        emailError.style.fontSize = "14px"
        return false;
    } else {
        emailError.textContent = "";
        return true;
    }
}

function validatePassword() {
    let passwordInput = document.querySelector("[data-password]");
    let passwordError = document.querySelector("[data-password-error]");
    let passwordValue = passwordInput.value.trim();
    // let passwordPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    if (passwordValue === "") {
        passwordError.style.display = "block";
        passwordError.textContent = "Password cannot be blank";
        passwordError.style.color = "red";
        passwordError.style.fontSize = "14px";
        return false;
    } else if (!passwordPattern.test(passwordValue)) {
        passwordError.style.display = "block";
        passwordError.textContent = "Password must have at least 6 characters, including a number and a capital letter";
        passwordError.style.color = "red";
        passwordError.style.fontSize = "14px";
        return false;
    } else {
        return true;
    }
}

function validateURL() {
    let urlInput = document.querySelector("[data-url]");
    let urlError = document.querySelector("[data-url-error]");
    let urlValue = urlInput.value.trim();
    let urlPattern = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

    if (urlValue === "") {
        urlError.style.display = "block";
        urlError.textContent = "URL cannot be empty";
        urlError.style.color = "red";
        urlError.style.fontSize = "14px";
        return false;
    } else if (!urlPattern.test(urlValue)) {
        urlError.style.display = "block";
        urlError.textContent = "Please enter a valid URL, e.g flowscriipt.com";
        urlError.style.color = "red";
        urlError.style.fontSize = "14px";
        return false;
    } else {
        return true;
    }
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