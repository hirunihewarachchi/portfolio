// ================= NAVBAR =================
function hamburg() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) navbar.style.transform = "translateY(0)";
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) navbar.style.transform = "translateY(-100%)";
}


// ================= DARK / LIGHT MODE TOGGLE =================
function toggleTheme() {
    const body = document.body;
    const isLight = body.classList.toggle("light-mode");

    // Update both icons (desktop + dropdown)
    const icon    = document.getElementById("theme-icon");
    const ddIcon  = document.getElementById("dropdown-theme-icon");
    const emoji   = isLight ? "☀️" : "🌙";

    if (icon)   icon.textContent   = emoji;
    if (ddIcon) ddIcon.textContent = emoji;

    // Persist preference
    localStorage.setItem("theme", isLight ? "light" : "dark");
}

// Apply saved theme on load (before DOMContentLoaded flicker)
(function applyStoredTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
        document.body.classList.add("light-mode");
        // Icons updated after DOM ready
        document.addEventListener("DOMContentLoaded", () => {
            const icon   = document.getElementById("theme-icon");
            const ddIcon = document.getElementById("dropdown-theme-icon");
            if (icon)   icon.textContent   = "☀️";
            if (ddIcon) ddIcon.textContent = "☀️";
        });
    }
})();


// ================= TYPEWRITER =================
const texts = [
    " WEB DEVELOPER",
    " AI ENGINEER",
    " PHOTOGRAPHER"
];

let typingSpeed = 100;
let textIndex = 0;
let characterIndex = 0;

const textElement = document.querySelector(".typewriter-text");

function typeWriter() {
    if (!textElement) return;

    if (characterIndex < texts[textIndex].length) {
        textElement.textContent += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (!textElement) return;

    if (textElement.textContent.length > 0) {
        textElement.textContent = textElement.textContent.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

// ================= SKILLS INTERACTION =================
function initSkillsInteraction() {
    const buttons = document.querySelectorAll('.skill-btn');
    const icons = document.querySelectorAll('.skill-icon');

    if (!buttons.length || !icons.length) return;

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const category = button.getAttribute('data-category');

            icons.forEach(icon => {
                if (icon.classList.contains(category)) {
                    icon.classList.add('highlight');
                    icon.classList.remove('dimmed');
                } else {
                    icon.classList.add('dimmed');
                    icon.classList.remove('highlight');
                }
            });
        });

        button.addEventListener('mouseleave', () => {
            icons.forEach(icon => {
                icon.classList.remove('highlight', 'dimmed');
            });
        });
    });
}


// ================= PHOTOHUB LOOP =================
function initPhotoHubLoop() {
    const track = document.getElementById("track");
    if (!track) return;

    track.innerHTML += track.innerHTML;

    const trackWidth = track.scrollWidth / 2;
    let position = 0;
    let isPaused = false;

    function animate() {
        if (!isPaused) {
            position -= 1.5;

            if (position <= -trackWidth) {
                position = 0;
            }

            track.style.transform = `translateX(${position}px)`;
        }

        requestAnimationFrame(animate);
    }

    animate();

    track.addEventListener("mouseenter", () => isPaused = true);
    track.addEventListener("mouseleave", () => isPaused = false);
}

// ================= ABOUT SECTION (FIXED SYSTEM) =================

let glowStarted = false;

function initAboutAnimation() {
    const aboutHeadings = document.querySelectorAll(".about-box h1");

    if (!aboutHeadings.length) return;

    splitAboutLetters(aboutHeadings);
    initAboutObserver();
    initAboutParallax();
}