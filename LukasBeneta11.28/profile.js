// On page load, check if the user is logged in and load profile data
window.onload = function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const savedPhotoUrl = localStorage.getItem('profilePhotoUrl');

    if (!loggedInUser) {
        window.location.href = "login.html"; // Redirect to login page if not logged in
    } else {
        document.getElementById('logged-in-user').textContent = loggedInUser;
        document.getElementById('profile-email').textContent = loggedInUser;

        // Load saved profile photo or default
        if (savedPhotoUrl) {
            document.getElementById('profile-picture').src = savedPhotoUrl;
        }
    }

    // Add event listener for the "Update Photo" button
    document.getElementById('updatePhotoButton').addEventListener('click', updatePhoto);
};

// Logout function
function logout() {
    localStorage.removeItem('loggedInUser'); // Remove logged-in user data
    window.location.href = "login.html"; // Redirect to login page
}

// Update profile photo via URL
function updatePhoto() {
    const photoUrl = document.getElementById('photoUrl').value.trim();
    const profilePicture = document.getElementById('profile-picture');

    // Validate URL
    if (!photoUrl || !photoUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp)$/i)) {
        alert("Please enter a valid image URL ending in .jpg, .jpeg, .png, .gif, or .bmp.");
        return;
    }

    // Update profile picture
    profilePicture.src = photoUrl;

    // Save to localStorage
    localStorage.setItem('profilePhotoUrl', photoUrl);

    // Clear the input field
    document.getElementById('photoUrl').value = '';
    alert("Profile photo updated successfully!");
}

// Password update functionality remains the same
function saveProfile() {
    const newPassword = document.getElementById('edit-password').value;
    const repeatNewPassword = document.getElementById('edit-repeat-password').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Reset messages
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
    successMessage.classList.add('hidden');
    successMessage.textContent = '';

    // Validation
    if (!newPassword || newPassword.length < 4 || newPassword.length > 20) {
        errorMessage.textContent = 'Password must be between 4 and 20 characters.';
        errorMessage.classList.remove('hidden');
        return;
    }

    if (newPassword !== repeatNewPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        errorMessage.classList.remove('hidden');
        return;
    }

    // Retrieve user data
    const loggedInEmail = localStorage.getItem('loggedInUser');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (!loggedInEmail) {
        errorMessage.textContent = 'No logged-in user found.';
        errorMessage.classList.remove('hidden');
        return;
    }

    // Find the user in the users array
    const userIndex = users.findIndex(user => user.email === loggedInEmail);

    if (userIndex === -1) {
        errorMessage.textContent = 'User data not found. Please log in again.';
        errorMessage.classList.remove('hidden');
        return;
    }

    // Update the password
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    // Feedback to the user
    successMessage.textContent = 'Password updated successfully!';
    successMessage.classList.remove('hidden');

    // Clear input fields
    document.getElementById('edit-password').value = '';
    document.getElementById('edit-repeat-password').value = '';
}
