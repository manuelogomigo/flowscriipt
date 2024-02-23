function verifyAge() {
    const elements = document.querySelectorAll("[data-dob]");
    elements.forEach((element) => {
        const dob = element.value;

        const minAge = element.getAttribute("data-age");
        const url = element.getAttribute("data-url");

        const dobDate = new Date(dob);

        if (isNaN(dobDate.getTime())) {
            alert("Please enter a valid date of birth");
            return;
        }

        const today = new Date();
        const age = today.getFullYear() - dobDate.getFullYear();

        if (today.getMonth() < dobDate.getMonth() || (today.getMonth() == dobDate.getMonth() && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age >= minAge) {
            window.location.href = `https://${url}`;
        } else {
            alert("You are not old enough to access this service");
        }   
    })
}

