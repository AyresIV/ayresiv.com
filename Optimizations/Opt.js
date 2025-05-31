let currentTab = 0;

// Custom smooth scroll function with easing
function smoothScrollToTop() {
    const startingY = window.scrollY;
    const duration = 600; // Animation duration in ms
    const startTime = performance.now();
    
    // Easing function for smooth deceleration
    function easeOutCubic(t) {
        return (--t) * t * t + 1;
    }
    
    function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);
        
        window.scrollTo(0, startingY * (1 - easeProgress));
        
        if (progress < 1) {
            window.requestAnimationFrame(scrollStep);
        }
    }
    
    window.requestAnimationFrame(scrollStep);
}

// Function to update the bundle/package details
function updateBundleDetails(title, price, description) {
    const bundleDetails = document.getElementById('bundle-details');
    bundleDetails.innerHTML = `
        <h3 class="selected-title">${title}</h3>
        <p class="selected-price">Price: ${price}</p>
        <p class="selected-description">${description}</p>
        <a href="https://discord.gg/spartagg" target="_blank" class="discord-button">
            <i class="fab fa-discord"></i> Join Discord to Proceed
        </a>
    `;
    
    // Hide the placeholder text
    const placeholderText = document.querySelector('.tabs__tab--active h2');
    if (placeholderText) {
        placeholderText.style.display = 'none';
    }
    
    // Use our custom smooth scroll
    smoothScrollToTop();
}

// Add animations to all packages
function setupPackageAnimations() {
    document.querySelectorAll('.services__item, .bundles__item').forEach(item => {
        // Hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
            item.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });

        // Click animation with enhanced effects
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Dramatic click animation
            item.style.transform = 'translateY(-25px) scale(0.95)';
            item.style.opacity = '0.85';
            item.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25)';
            item.style.zIndex = '10';
            item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.4)';
            
            // Get package details
            const title = item.querySelector('.services__item-title, .bundles__item-title').textContent;
            const price = item.querySelector('.services__item-price, .bundles__item-price').textContent;
            const description = item.querySelector('.services__item-description, .bundles__item-description')?.textContent || "No description available.";
            
            // Reset animation after completion
            setTimeout(() => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.opacity = '1';
                item.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                item.style.zIndex = '';
            }, 500);
            
            updateBundleDetails(title, price, description);
        });
    });
}

// Tab switching functionality
function changeTab(direction) {
    const tabs = document.querySelectorAll('.tabs__tab');
    currentTab += direction;

    if (currentTab < 0) {
        currentTab = tabs.length - 1;
    } else if (currentTab >= tabs.length) {
        currentTab = 0;
    }

    tabs.forEach((tab, index) => {
        tab.classList.toggle('tabs__tab--active', index === currentTab);
    });
}

// Mobile menu toggle
function toggleNav() {
    const navList = document.querySelector('.nav__list');
    navList.classList.toggle('active');
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    menuToggle.innerHTML = navList.classList.contains('active') ? '✕' : '☰';
}

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu setup
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleNav);
        
        // Close menu when clicking links (mobile only)
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleNav();
                }
            });
        });
    }
    
    // Setup package animations
    setupPackageAnimations();
    
    // Backup click handler
    document.querySelectorAll(".services__item, .bundles__item").forEach(item => {
        item.addEventListener("click", function() {
            const title = this.querySelector(".services__item-title, .bundles__item-title").textContent;
            const price = this.querySelector(".services__item-price, .bundles__item-price").textContent;
            const description = this.querySelector('.services__item-description, .bundles__item-description')?.textContent || "No description available.";
            
            updateBundleDetails(title, price, description);
        });
    });
});