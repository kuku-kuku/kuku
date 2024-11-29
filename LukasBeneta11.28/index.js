// Logout functionality
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
}

// Fetch random posts and create cards
async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();

        // Select 5 random posts
        const randomPosts = data.sort(() => 0.5 - Math.random()).slice(0, 5);

        // Generate cards
        const postContainer = document.getElementById('postContainer');
        randomPosts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-id', post.id);

            card.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
            `;

            // Add click event to redirect to single post page
            card.addEventListener('click', () => {
                window.location.href = `single-post.html?postId=${post.id}`;
            });

            postContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
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
    fetchPosts(); // Fetch posts on page load
};
