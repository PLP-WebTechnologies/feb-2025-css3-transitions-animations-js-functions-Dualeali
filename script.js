document.addEventListener('DOMContentLoaded', function() {
    // Theme switching functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeDisplay = document.getElementById('theme-display');
    const body = document.body;
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
        body.setAttribute('data-theme', 'dark');
        themeDisplay.textContent = 'Dark';
    }
    
    // Theme toggle event
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeDisplay.textContent = 'Dark';
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeDisplay.textContent = 'Light';
        }
    });
    
    // Favorites functionality
    const favButtons = document.querySelectorAll('.fav-btn');
    const favoritesDisplay = document.getElementById('favorites-display');
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Load saved favorites
    function updateFavoritesDisplay() {
        if (favorites.length === 0) {
            favoritesDisplay.textContent = 'None';
        } else {
            favoritesDisplay.textContent = favorites.join(', ');
        }
    }
    
    // Initialize buttons with saved state
    favButtons.forEach(button => {
        const card = button.closest('.card');
        const itemId = card.getAttribute('data-item');
        
        if (favorites.includes(itemId)) {
            button.classList.add('active');
            button.innerHTML = '<i class="fas fa-star"></i>';
        }
        
        button.addEventListener('click', function() {
            const itemId = this.closest('.card').getAttribute('data-item');
            const starIcon = this.querySelector('i');
            
            if (favorites.includes(itemId)) {
                // Remove from favorites
                favorites = favorites.filter(id => id !== itemId);
                this.classList.remove('active');
                starIcon.classList.replace('fas', 'far');
            } else {
                // Add to favorites
                favorites.push(itemId);
                this.classList.add('active');
                starIcon.classList.replace('far', 'fas');
                this.classList.add('animate__animated', 'animate__heartBeat');
                
                // Remove animation classes after animation completes
                setTimeout(() => {
                    this.classList.remove('animate__animated', 'animate__heartBeat');
                }, 1000);
            }
            
            // Save to localStorage and update display
            localStorage.setItem('favorites', JSON.stringify(favorites));
            updateFavoritesDisplay();
        });
    });
    
    // Initialize display
    updateFavoritesDisplay();
    
    // Button animations
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Get click position
            const rect = this.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            // Position ripple
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
    
    // Add ripple effect styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});