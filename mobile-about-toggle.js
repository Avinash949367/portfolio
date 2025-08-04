// Mobile-specific About Me section toggle functionality
(function() {
    'use strict';

    // Check if we're on mobile (screen width <= 767px)
    function isMobile() {
        return window.innerWidth <= 767;
    }

    // Initialize the mobile toggle functionality
    function initMobileToggle() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;

        // Create mobile-specific content structure
        const aboutText = aboutSection.querySelector('.about-text');
        if (!aboutText) return;

        // Get all paragraphs
        const paragraphs = aboutText.querySelectorAll('.about-description');
        if (paragraphs.length < 3) return;

        // Create mobile structure
        const mobileContent = document.createElement('div');
        mobileContent.className = 'about-content-mobile';
        mobileContent.style.display = 'none';

        // First paragraph (always visible)
        const firstPara = paragraphs[0].cloneNode(true);
        firstPara.classList.add('about-intro');

        // Extra content container
        const extraContent = document.createElement('div');
        extraContent.id = 'aboutExtraContent';
        extraContent.style.display = 'none';

        // Add remaining paragraphs to extra content
        for (let i = 1; i < paragraphs.length; i++) {
            extraContent.appendChild(paragraphs[i].cloneNode(true));
        }

        // Create toggle buttons
        const readMoreBtn = document.createElement('button');
        readMoreBtn.id = 'readMoreBtn';
        readMoreBtn.className = 'read-more-btn';
        readMoreBtn.textContent = 'Read more...';
        readMoreBtn.style.cssText = `
            background: linear-gradient(90deg, #a855f7, #9333ea);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            margin-top: 10px;
            transition: all 0.3s ease;
        `;

        const seeLessBtn = document.createElement('button');
        seeLessBtn.id = 'seeLessBtn';
        seeLessBtn.className = 'see-less-btn';
        seeLessBtn.textContent = 'See less...';
        seeLessBtn.style.cssText = `
            background: linear-gradient(90deg, #a855f7, #9333ea);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            margin-top: 10px;
            transition: all 0.3s ease;
            display: none;
        `;

        // Toggle function
        function toggleAboutContent() {
            const isExpanded = extraContent.style.display === 'block';
            extraContent.style.display = isExpanded ? 'none' : 'block';
            readMoreBtn.style.display = isExpanded ? 'block' : 'none';
            seeLessBtn.style.display = isExpanded ? 'none' : 'block';
        }

        // Attach event listeners
        readMoreBtn.onclick = toggleAboutContent;
        seeLessBtn.onclick = toggleAboutContent;

        // Assemble mobile structure
        mobileContent.appendChild(firstPara);
        mobileContent.appendChild(extraContent);
        mobileContent.appendChild(readMoreBtn);
        mobileContent.appendChild(seeLessBtn);

        // Create desktop content container
        const desktopContent = document.createElement('div');
        desktopContent.className = 'about-content-desktop';

        // Clone all paragraphs for desktop
        paragraphs.forEach(p => {
            desktopContent.appendChild(p.cloneNode(true));
        });

        // Replace original content
        aboutText.innerHTML = '';
        aboutText.appendChild(mobileContent);
        aboutText.appendChild(desktopContent);

        // Handle responsive behavior
        function handleResize() {
            if (isMobile()) {
                mobileContent.style.display = 'block';
                desktopContent.style.display = 'none';
            } else {
                mobileContent.style.display = 'none';
                desktopContent.style.display = 'block';
            }
        }

        // Initial setup
        handleResize();
        window.addEventListener('resize', handleResize);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileToggle);
    } else {
        initMobileToggle();
    }
})();


