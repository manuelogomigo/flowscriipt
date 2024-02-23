function verifyAge() {
    const dob = document.getElementById("dob").value;

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

    const minAge = 18;
    if (age >= minAge) {
        window.location.href = "https://google.com";
    } else {
        alert("You are not old enough to access this service");
    }
}
