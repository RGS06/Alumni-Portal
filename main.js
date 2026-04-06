document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Sticky Navbar Glassmorphism Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.25rem 0';
        }
    });

    // 3. Smooth Scroll for Nav Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if(targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Interactive Fade-In on Scroll (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    // Observer options focusing on slight visibility trigger
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once it's visible to keep it shown
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // 5. Button Interactions Demo
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            // Replace with actual modal/redirect in production
            alert('Portal Login system will be integrated with the main college database soon.');
        });
    }

    // 6. Alumni Slider Controls
    const alumniSlider = document.getElementById('alumniSlider');
    const prevAlumni = document.getElementById('prevAlumni');
    const nextAlumni = document.getElementById('nextAlumni');
    
    if (alumniSlider && prevAlumni && nextAlumni) {
        // card width (~300px) + gap
        const scrollAmount = 330; 
        
        prevAlumni.addEventListener('click', () => {
            alumniSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        nextAlumni.addEventListener('click', () => {
            alumniSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // 7. Policy PDF Modal
    const viewPolicyBtn = document.getElementById('viewPolicyBtn');
    const pdfModal = document.getElementById('pdfModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (viewPolicyBtn && pdfModal && closeModalBtn) {
        // Open Modal
        viewPolicyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            pdfModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        // Close Modal via button
        closeModalBtn.addEventListener('click', () => {
            pdfModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close Modal via clicking outside content
        pdfModal.addEventListener('click', (e) => {
            if (e.target === pdfModal) {
                pdfModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close Modal via Esc key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
                pdfModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
