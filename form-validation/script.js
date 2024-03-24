function validateName() {
    let nameInput = document.querySelector("[data-name]");
    let nameError = document.querySelector("[data-name-error]");
    let nameValue = nameInput.value.trim();
    let namePattern = /^[a-zA-Z0-9]+$/;
    if (nameValue === "") {
      nameError.style.display = "block";
      nameError.textContent = "Name cannot be blank";
      nameError.style.color = "red";
      nameError.style.fontSize = "14px";
      return false;
    } else if (!namePattern.test(nameValue)) {
      nameError.style.display = "block";
      nameError.textContent = "Name must only have alphanumeric characters";
      nameError.style.color = "red";
      nameError.style.fontSize = "14px";
      return false;
    } else {
      nameError.textContent = "";
      return true;
    }
  }
  
  function validateEmail() {
    let emailInput = document.querySelector("[data-email]");
    let emailError = document.querySelector("[data-email-error");
    let blacklistedDomains = JSON.parse(
      emailInput.getAttribute("data-blacklist-domains")
    );
    let blacklistedEmails;
  
    let emailValue = emailInput.value.trim();
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailValue === "") {
      emailError.style.display = "block";
      emailError.textContent = "Email cannot be blank";
      emailError.style.color = "red";
      emailError.style.fontSize = "14px";
      return false;
    } else if (!emailPattern.test(emailValue)) {
      emailError.style.display = "block";
      emailError.textContent =
        "Please enter a valid email, e.g flowscript@gmail.com";
      emailError.style.color = "red";
      emailError.style.fontSize = "14px";
      return false;
    } else {
      let isAnyDomainBlacklisted = false;
      let emailBLacklists = undefined;
  
      blacklistedDomains.forEach((domain) => {
        let domainRegex = new RegExp(`@${domain}\\.com$`);
        if (domainRegex.test(emailValue)) {
          emailError.style.display = "block";
          emailError.textContent = `Email domain ${domain} is not allowed!!!`;
          emailError.style.color = "red";
          emailError.style.fontSize = "14px";
          isAnyDomainBlacklisted = true;
          return false;
        }
      });
  
      if( emailBLacklists !== undefined && emailBLacklists.includes(emailValue)) {
        emailError.style.display = "block";
        emailError.textContent = `${emailValue} is blacklisted!!!`;
        emailError.style.color = "red";
        emailError.style.fontSize = "14px";
        return false;
      }
  
      if( !isAnyDomainBlacklisted ) {
        emailError.textContent = "";
        return true;
      }
    }
  }
  
  function validatePassword() {
    let passwordInput = document.querySelector("[data-password]");
    let passwordError = document.querySelector("[data-password-error]");
    let passwordValue = passwordInput.value.trim();
    // let passwordPattern = "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}";
    let passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (passwordValue === "") {
      passwordError.style.display = "block";
      passwordError.textContent = "Password cannot be blank";
      passwordError.style.color = "red";
      passwordError.style.fontSize = "14px";
      return false;
    } else if (!passwordPattern.test(passwordValue)) {
      passwordError.style.display = "block";
      passwordError.textContent =
        "Password must have at least 6 characters, including a number and a capital letter";
      passwordError.style.color = "red";
      passwordError.style.fontSize = "14px";
      return false;
    } else {
      passwordError.textContent = "";
      return true;
    }
  }
  
  function validateURL() {
    let urlInput = document.querySelector("[data-url]");
    let urlError = document.querySelector("[data-url-error]");
    let urlValue = urlInput.value.trim();
    let urlPattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  
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
      urlError.textContent = "";
      return true;
    }
  }
  
  function validateForm() {
    let form = document.querySelector("data-form");
    let nameValid = validateName();
    let emailValid = validateEmail();
    let passwordValid = validatePassword();
    let urlValid = validateURL();
    console.log(passwordValid , nameValid , emailValid , urlValid );
    if (nameValid && emailValid && passwordValid && urlValid) {
      alert("Form filled");
      return false;
    } else {
      return false;
    }
  }
  