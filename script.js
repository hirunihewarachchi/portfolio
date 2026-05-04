// ================= NAVBAR =================
function hamburg() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) navbar.style.transform = "translateY(0)";
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) navbar.style.transform = "translateY(-100%)";
}


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

// ================= SKILL LOGO SEAMLESS SCROLLER =================
function initiateLogoScroller() {

    if (typeof gsap === "undefined") {
        console.error("GSAP not loaded");
        return;
    }

    const rows = document.querySelectorAll(".logo-scroller-row");

    rows.forEach(row => {

        // Stop previous animation
        gsap.killTweensOf(row);

        // Reset original content (important for re-init)
        if (!row.dataset.original) {
            row.dataset.original = row.innerHTML;
        }
        row.innerHTML = row.dataset.original;

        const originalContent = row.innerHTML;

        // Create wrapper for seamless duplication
        row.innerHTML = originalContent + originalContent;

        // Force layout update
        const fullWidth = row.scrollWidth / 2;

        // Set starting position
        gsap.set(row, { x: 0 });

        // Speed control (smaller = faster)
        const speed = 100;
        const duration = fullWidth / speed;

        const tween = gsap.to(row, {
            x: -fullWidth,
            duration: duration,
            ease: "none",
            repeat: -1
        });

        // Pause on hover
        row.addEventListener("mouseenter", () => tween.pause());
        row.addEventListener("mouseleave", () => tween.resume());

        // Touch support
        row.addEventListener("touchstart", () => tween.pause());
        row.addEventListener("touchend", () => tween.resume());
    });
}

// ================= PHOTOHUB SCROLLER =================
const track = document.getElementById("track");

let scrollSpeed = 1;
let position = 0;

function animateGallery() {
    if (!track) return;

    position -= scrollSpeed;

    if (position <= -track.scrollWidth / 2) {
        position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateGallery);
}


// ================= INIT =================
window.addEventListener("load", () => {
    typeWriter();
    initiateLogoScroller();

    if (track) {
        track.innerHTML += track.innerHTML; // duplicate once
        animateGallery();
    }
});


// ================= RESIZE FIX =================
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initiateLogoScroller();
    }, 300);
});