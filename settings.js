document.addEventListener('DOMContentLoaded', () => {
    // Grab elements
    const light_dark_setting_button = document.getElementById("light_dark_setting_button");
    const greyscale_button = document.getElementById("greyscale_button");
    const high_contrast_button = document.getElementById('high_contrast_button'); 
    const toggleButton = document.getElementById('toggle_magnifier');
    const magnifier = document.getElementById('magnifier');
    const content = document.getElementById('content');
    const zoomedContent = document.getElementById('zoomed-content');
    let magnifierEnabled = false;

    // Ensure the buttons exist before adding event listeners
    if (light_dark_setting_button) {
        light_dark_setting_button.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                light_dark_setting_button.textContent = 'Disable Dark Mode';
            } else {
                localStorage.setItem('theme', 'light');
                light_dark_setting_button.textContent = 'Enable Dark Mode';
            }
        });
    }

    if (greyscale_button) {
        greyscale_button.addEventListener('click', () => {
            document.body.classList.toggle('grayscale-mode');
            if (document.body.classList.contains('grayscale-mode')) {
                localStorage.setItem('greyscale', 'enabled');
                greyscale_button.textContent = 'Disable Grayscale Mode';
            } else {
                localStorage.setItem('greyscale', 'disabled');
                greyscale_button.textContent = 'Enable Grayscale Mode';
            }
        });
    }

    if (high_contrast_button) {
        high_contrast_button.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast-mode');
            if (document.body.classList.contains('high-contrast-mode')) {
                localStorage.setItem('contrast', 'enabled');
                high_contrast_button.textContent = 'Disable High Contrast Mode';
            } else {
                localStorage.setItem('contrast', 'disabled');
                high_contrast_button.textContent = 'Enable High Contrast Mode';
            }
        });
    }

    // On page load, check saved preferences
    const savedTheme = localStorage.getItem('theme');
    const greyscale = localStorage.getItem('greyscale');
    const contrast = localStorage.getItem('contrast');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    if (greyscale === 'enabled') {
        document.body.classList.add('grayscale-mode');
    }

    if (contrast === 'enabled') {
        document.body.classList.add('high-contrast-mode');
    }

    // Magnifier functionality
    if (toggleButton && magnifier && content && zoomedContent) {
        // Clone the content inside the zoomed-content div
        zoomedContent.innerHTML = content.innerHTML;

        // Enable/Disable magnifier
        toggleButton.addEventListener('click', () => {
            magnifierEnabled = !magnifierEnabled;
            if (magnifierEnabled) {
                toggleButton.textContent = 'Disable Magnifying Glass';
            } else {
                toggleButton.textContent = 'Enable Magnifying Glass';
                magnifier.style.display = 'none';
                content.classList.remove('hidden-under-magnifier');
            }
        });

        // Handle mouse movement for the magnifier
        content.addEventListener('mousemove', (event) => {
            if (magnifierEnabled) {
                magnifier.style.display = 'block';
                const mouseX = event.pageX;
                const mouseY = event.pageY;

                // Position the magnifier around the mouse pointer
                magnifier.style.left = `${mouseX - 75}px`;
                magnifier.style.top = `${mouseY - 75}px`;

                // Calculate the position for the zoomed content inside the magnifier
                const contentRect = content.getBoundingClientRect();
                const offsetX = mouseX - contentRect.left;
                const offsetY = mouseY - contentRect.top;

                // Properly adjust the zoom to match the cursor position within the magnifier
                zoomedContent.style.left = `-${offsetX * 2 - 75}px`;
                zoomedContent.style.top = `-${offsetY * 2 - 75}px`;

                // Hide the content under the magnifier
                content.classList.add('hidden-under-magnifier');
            }
        });
    } else {
        console.error('Magnifier elements are missing.');
    }
});

