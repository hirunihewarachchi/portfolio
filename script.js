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
