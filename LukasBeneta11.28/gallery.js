// Logout functionality
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = "login.html";
}

// Fetch and display 6 photos in the gallery
async function fetchGallery() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();

        // Select the first 6 photos
        const selectedPhotos = data.slice(0, 6);

        // Generate gallery items
        const galleryContainer = document.getElementById('galleryContainer');
        selectedPhotos.forEach(photo => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';

            galleryItem.innerHTML = `
                <img src="${photo.thumbnailUrl}" alt="${photo.title}" class="gallery-img">
                <p>${photo.title}</p>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    } catch (error) {
        console.error('Error fetching gallery:', error);
        document.getElementById('galleryContainer').innerHTML = '<p>Failed to load gallery. Please try again later.</p>';
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
    fetchGallery(); // Fetch gallery on page load
};
