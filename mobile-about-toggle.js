document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;

    const aboutText = aboutSection.querySelector('.about-text');
    if (!aboutText) return;

    const paragraphs = Array.from(aboutText.querySelectorAll('.about-description'));
    const knowMoreButton = aboutText.querySelector('.about-button');

    if (paragraphs.length < 2 || !knowMoreButton) return;

    // Create a container for the mobile view
    const mobileContent = document.createElement('div');
    mobileContent.className = 'about-content-mobile';

    // Create a container for the full content (on mobile)
    const fullContent = document.createElement('div');
    fullContent.className = 'about-extra-content';
    fullContent.style.display = 'none';

    // Always show the first paragraph
    mobileContent.appendChild(paragraphs[0].cloneNode(true));

    // Add the rest of the paragraphs and the button to the full content container
    paragraphs.slice(1).forEach(p => fullContent.appendChild(p.cloneNode(true)));
    fullContent.appendChild(knowMoreButton.cloneNode(true));

    // Create "Read more" and "See less" buttons
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'read-more-btn';
    readMoreBtn.textContent = 'Read more...';

    const seeLessBtn = document.createElement('button');
    seeLessBtn.className = 'see-less-btn';
    seeLessBtn.textContent = 'See less...';
    seeLessBtn.style.display = 'none';

    // Event listeners for toggling content
    readMoreBtn.addEventListener('click', () => {
        fullContent.style.display = 'block';
        readMoreBtn.style.display = 'none';
        seeLessBtn.style.display = 'inline-block';
    });

    seeLessBtn.addEventListener('click', () => {
        fullContent.style.display = 'none';
        readMoreBtn.style.display = 'inline-block';
        seeLessBtn.style.display = 'none';
    });

    // Append new elements to the mobile container
    mobileContent.appendChild(fullContent);
    mobileContent.appendChild(readMoreBtn);
    mobileContent.appendChild(seeLessBtn);

    // Create the desktop container and clone all original content
    const desktopContent = document.createElement('div');
    desktopContent.className = 'about-content-desktop';
    paragraphs.forEach(p => desktopContent.appendChild(p.cloneNode(true)));
    desktopContent.appendChild(knowMoreButton.cloneNode(true));

    // Clear the original container and add the new mobile and desktop containers
    aboutText.innerHTML = '';
    aboutText.appendChild(mobileContent);
    aboutText.appendChild(desktopContent);

    // Function to toggle between mobile and desktop views
    function handleView() {
        if (window.innerWidth <= 767) {
            mobileContent.style.display = 'block';
            desktopContent.style.display = 'none';
        } else {
            mobileContent.style.display = 'none';
            desktopContent.style.display = 'block';
        }
    }

    // Initial check and on resize
    handleView();
    window.addEventListener('resize', handleView);
});
