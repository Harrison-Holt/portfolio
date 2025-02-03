// On page load, check if the user has saved preferences for both theme and grayscale mode
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const greyscale = localStorage.getItem('greyscale');
    const contrast = localStorage.getItem('contrast'); 

    // Apply the saved theme (dark mode)
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Apply the saved grayscale mode
    if (greyscale === 'enabled') {
        document.body.classList.add('grayscale-mode');
    }

    if(contrast === 'enabled') {
        document.body.classList.add('high-contrast-mode'); 
    }
});