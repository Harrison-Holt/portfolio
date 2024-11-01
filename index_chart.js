// Function to animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');

    skillBars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-skill-level');
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Check if the bar is in the viewport
        if (barTop < windowHeight) {
            bar.style.width = skillLevel; // Set the width based on skill level
        }
    });
}

// Event listener for scrolling to trigger animation
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars); // Trigger animation on page load
