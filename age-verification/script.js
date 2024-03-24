function verifyAge() {
    const elements = document.querySelectorAll("[data-dob]");
    elements.forEach((element) => {
        let age = element.value;
        age = Number(age);

        const minAge = element.getAttribute("data-age");
        const url = element.getAttribute("data-url");

        if (isNaN(age) || age < 1) {
            alert("Please enter a valid age");
        }

        if (age >= minAge) {
            window.location.href = `https://${url}`;
        } else {
            alert("You are not old enough to access this service");
        }   
    })
}

