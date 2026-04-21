document.addEventListener('DOMContentLoaded', () => {
    // Generate Stars Background
    const generateStars = (elementId, count) => {
        const starsContainer = document.getElementById(elementId);
        if (!starsContainer) return;
        
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 2 + 1;
            
            // Random opacity and animation delay
            const opacity = Math.random() * 0.8 + 0.2;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;
            
            star.style.left = `${x}%`;
            star.style.top = `${y}%`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = opacity;
            star.style.animation = `twinkle ${duration}s infinite ${delay}s alternate`;
            
            starsContainer.appendChild(star);
        }
    };

    generateStars('stars', 100);
    generateStars('stars2', 50);
    generateStars('stars3', 25);

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: stop observing once shown
                // observer.unobserve(entry.target);
            } else {
                // If you want them to fade out when scrolling away
                // entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    // Observe all hidden elements
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Observe closing section
    const closingSection = document.querySelector('.closing-section');
    if (closingSection) {
        observer.observe(closingSection);
    }

    // Music Control
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                bgMusic.pause();
                musicToggle.innerHTML = '🎵 Play Music';
                musicToggle.classList.remove('playing');
            } else {
                bgMusic.play();
                musicToggle.innerHTML = '⏸️ Pause Music';
                musicToggle.classList.add('playing');
            }
            isPlaying = !isPlaying;
        });
    }
});

// Add CSS for the stars dynamically
const style = document.createElement('style');
style.innerHTML = `
    .star {
        position: absolute;
        background-color: #ffffff;
        border-radius: 50%;
        box-shadow: 0 0 4px #fff;
    }
    
    @keyframes twinkle {
        0% { opacity: 0.2; transform: scale(0.8); }
        100% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 8px #fff; }
    }
`;
document.head.appendChild(style);
