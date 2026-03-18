document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Remove default active class just in case, logic handles it better
    faqItems.forEach(item => item.classList.remove('toggle-active'));
    // Set first item active functionally if needed, or leave closed
    faqItems[0].classList.add('active');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it has a real target
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust scroll position for fixed navbar
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Mobile Menu Toggle (Basic implementation)
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Simple inline style toggle for demo purposes
    menuToggle.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '1rem';
            navLinks.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        }
    });
    // 5. Map Modal / Lightbox logic
    const mapModal = document.getElementById("map-modal");
    const openMapBtn = document.getElementById("open-map-btn");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-modal");

    if (openMapBtn && mapModal && closeBtn) {
        openMapBtn.addEventListener("click", () => {
            mapModal.style.display = "block";
            modalImg.src = document.querySelector(".coverage-map").src;
            modalImg.classList.remove("zoomed"); // Reset state on open
        });

        // Toggle Zoom on Image Click (Centering exactly where clicked)
        modalImg.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing if event bubbles to mapModal
            
            const isZoomingIn = !modalImg.classList.contains("zoomed");
            
            if (isZoomingIn) {
                // Get click relative to image before it resizes
                const rect = modalImg.getBoundingClientRect();
                const relX = (e.clientX - rect.left) / rect.width;
                const relY = (e.clientY - rect.top) / rect.height;
                
                modalImg.classList.add("zoomed");
                
                // Instantly scroll after browser applies class
                requestAnimationFrame(() => {
                    const newWidth = modalImg.clientWidth;
                    const newHeight = modalImg.clientHeight;
                    
                    // Center the clicked point in the viewport
                    mapModal.scrollLeft = (relX * newWidth) - (window.innerWidth / 2);
                    mapModal.scrollTop = (relY * newHeight) - (window.innerHeight / 2) + 60; // 60 for padding-top
                });
            } else {
                modalImg.classList.remove("zoomed");
            }
        });

        // Close on X click
        closeBtn.addEventListener("click", () => {
            mapModal.style.display = "none";
        });

        // Close on clicking outside the image
        mapModal.addEventListener("click", (e) => {
            if (e.target === mapModal) {
                mapModal.style.display = "none";
            }
        });
    }
});
