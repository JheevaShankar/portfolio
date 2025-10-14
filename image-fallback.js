// JavaScript to handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const projectImages = document.querySelectorAll('.project-img img');
    
    // Fallback images if the online images fail to load
    const fallbackImages = [
        'https://via.placeholder.com/800x500?text=E-commerce+Flower+Shop',
        'https://via.placeholder.com/800x500?text=IoT+Bus+Ticketing+System',
        'https://via.placeholder.com/800x500?text=Parkinsons+Disease+Detection'
    ];
    
    // Add event listeners for error handling
    projectImages.forEach((img, index) => {
        img.addEventListener('error', function() {
            // If the image fails to load, use a fallback
            if (index < fallbackImages.length) {
                this.src = fallbackImages[index];
            }
        });
    });
});