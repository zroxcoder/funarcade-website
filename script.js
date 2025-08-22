document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Handle Play button click (if it exists)
    if (playButton) {
        playButton.addEventListener('click', function() {
            window.location.href = '/games/play/index.html';
        });

        // CTA button pulse animation
        setInterval(() => {
            playButton.style.transform = 'scale(1.05)';
            setTimeout(() => playButton.style.transform = 'scale(1)', 1000);
        }, 4000);
    }

    // Handle menu toggle for mobile
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        menuToggle.textContent = sidebar.classList.contains('active') ? '✕' : '☰';
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(event.target) &&
            event.target !== menuToggle) {
            sidebar.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });

    // Highlight active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href === window.location.href) {
            link.classList.add('active');
        }

        // Simple hover effect
        link.addEventListener('mouseenter', () => link.style.transform = 'translateX(5px)');
        link.addEventListener('mouseleave', () => link.style.transform = 'translateX(0)');
    });

    // FAQ expand/collapse
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(btn => {
        btn.addEventListener("click", () => {
            const answer = btn.nextElementSibling;
            answer.style.display = answer.style.display === "block" ? "none" : "block";
        });
    });

    // Search filter (for Help or FAQ pages)
    const searchInput = document.getElementById("searchInput");
    const faqItems = document.querySelectorAll(".faq-item");
    const noResults = document.querySelector(".no-results");

    if (searchInput && faqItems.length > 0 && noResults) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            let visibleCount = 0;

            faqItems.forEach(item => {
                const text = item.innerText.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = "block";
                    visibleCount++;
                } else {
                    item.style.display = "none";
                }
            });

            noResults.style.display = visibleCount === 0 ? "block" : "none";
        });
    }
});
