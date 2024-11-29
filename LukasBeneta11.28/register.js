document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form inputs
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const passwordRepeat = document.getElementById("passwordRepeat").value;
    const errorMessage = document.getElementById("errorMessage");
    const loginButton = document.getElementById("loginButton");

    // Reset error message visibility
    errorMessage.textContent = "";
    errorMessage.style.display = "none";

    // Validation: Check if email is already registered
    const existingUser = localStorage.getItem(email); // Check localStorage for the email
    if (existingUser) {
        errorMessage.textContent = "This email is already registered.";
        errorMessage.style.display = "block"; // Make the error message visible
        return; // Exit the function
    }

    // Validation: Check password length
    if (password.length < 4 || password.length > 20) {
        errorMessage.textContent = "Password must be between 4 and 20 characters.";
        errorMessage.style.display = "block";
        return;
    }

    // Validation: Check if passwords match
    if (password !== passwordRepeat) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.style.display = "block";
        return;
    }

    // Save new user to localStorage
    localStorage.setItem(email, password);

    // Hide the registration form and show the login button
    document.getElementById("registerForm").style.display = "none";
    loginButton.style.display = "block";

    alert("Registration successful! Please log in.");
});
