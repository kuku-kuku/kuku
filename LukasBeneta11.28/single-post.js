// Logout functionality
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
}

// Fetch the post ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

// Fetch and display the single post
async function fetchPost() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (!response.ok) throw new Error('Failed to fetch post');

        const post = await response.json();

        // Display post content
        document.getElementById('postTitle').textContent = post.title;
        document.getElementById('postBody').textContent = post.body;
    } catch (error) {
        console.error('Error fetching the post:', error);
        document.getElementById('postTitle').textContent = 'Error';
        document.getElementById('postBody').textContent = 'Unable to load post. Please try again later.';
    }
}

// Initialize page
window.onload = function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = "login.html";
    } else {
        document.getElementById('loggedInUser').textContent = loggedInUser;
    }
    fetchPost(); // Fetch the post data on page load
};
