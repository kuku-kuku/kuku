function login() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Reset any previous error message
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    // Retrieve the users array from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Debugging: Log the retrieved users
    console.log('Users from localStorage:', users);

    // Check if the email exists in the users array
    const user = users.find(user => user.email === email);

    if (!user) {
        // Email not found
        console.log('Error: This email is not registered.');
        errorMessage.textContent = 'This email is not registered.';
        errorMessage.classList.remove('hidden');
        errorMessage.style.display = 'block';
        return;
    }

    // Check if the password matches
    if (user.password !== password) {
        // Password incorrect
        console.log('Error: Incorrect password.');
        errorMessage.textContent = 'Incorrect password. Please try again.';
        errorMessage.classList.remove('hidden');
        errorMessage.style.display = 'block';
        return;
    }

    // Successful login
    console.log('Login successful for:', email);
    localStorage.setItem('loggedInUser', email);
    window.location.href = "index.html";
}
