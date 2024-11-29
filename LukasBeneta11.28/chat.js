// Logout functionality
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
}

// Load and display chat messages from localStorage
function loadChatMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = ''; // Clear existing messages

    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        messageDiv.innerHTML = `
            <span class="message-user">${message.user}</span>:
            <span class="message-text">${message.text}</span>
            <span class="message-time">(${message.time})</span>
        `;
        chatMessages.appendChild(messageDiv);
    });

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle sending a new message
function sendMessage(event) {
    event.preventDefault();

    const chatInput = document.getElementById('chatInput');
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    const loggedInUser = localStorage.getItem('loggedInUser');
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];

    // Get the current time
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Add new message to the array
    messages.push({ user: loggedInUser, text: messageText, time: formattedTime });
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    chatInput.value = ''; // Clear the input field
    loadChatMessages(); // Reload the messages
}

// Listen for changes to localStorage (real-time updates)
window.addEventListener('storage', (event) => {
    if (event.key === 'chatMessages') {
        loadChatMessages(); // Reload chat messages if updated
    }
});

// Initialize page
window.onload = function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = "login.html";
    } else {
        document.getElementById('loggedInUser').textContent = loggedInUser;
    }

    // Load chat messages initially
    loadChatMessages();

    // Add event listener to the chat form
    document.getElementById('chatForm').addEventListener('submit', sendMessage);
};
