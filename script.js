function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}

function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-10000px)"
}


//for Typewriter effect

const texts = [
    " WEB DEVELOPER",
    " AI ENGINEER",
    " PHOTOGRAPHER"
]

let speed = 100;

const textElements = document.querySelector(".typewriter-text")

let textIndex = 0;
let characterIndex = 0;

function typeWriter(){
    if(characterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter,speed);
    }else{
        setTimeout(eraseText, 1000)
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1)
        setTimeout(eraseText,50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length
        characterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

typeWriter();


// Skill Set

let logoScrollers = {};

function initiateLogoScroller(container = document) {
    const rows = container.querySelectorAll(".logo-scroller-row");

    rows.forEach(row => {

        const images = row.querySelectorAll("img");
        let loadedCount = 0;

        // 🔥 Wait until all images are loaded
        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener("load", checkAllLoaded);
                img.addEventListener("error", checkAllLoaded);
            }
        });

        if (loadedCount === images.length) {
            startAnimation();
        }

        function checkAllLoaded() {
            loadedCount++;
            if (loadedCount === images.length) {
                startAnimation();
            }
        }

        function startAnimation() {

            if (logoScrollers[row]) {
                logoScrollers[row].kill();
                delete logoScrollers[row];
            }

            const rowItems = Array.from(row.children);
            let rowWidth = row.scrollWidth;
            const containerWidth = row.parentElement.offsetWidth;

            if (!row.dataset.cloned) {
                let totalWidth = rowWidth;

                while (totalWidth < containerWidth * 2) {
                    rowItems.forEach(item => {
                        const clone = item.cloneNode(true);
                        row.appendChild(clone);
                        totalWidth += item.offsetWidth;
                    });
                }

                row.dataset.cloned = "true";
                rowWidth = row.scrollWidth;
            }

            gsap.set(row, { x: 0 });

            // ⚡ Speed control (adjust this value if needed)
            let speed = 100; // lower = faster
            let duration = rowWidth / speed;

            const tl = gsap.timeline({
                repeat: -1,
                defaults: { ease: "none" }
            });

            tl.to(row, {
                x: -rowWidth / 2,
                duration: duration
            });

            logoScrollers[row] = tl;

            row.addEventListener("mouseenter", () => tl.pause());
            row.addEventListener("mouseleave", () => tl.resume());

            row.addEventListener("touchstart", () => tl.pause());
            row.addEventListener("touchend", () => tl.resume());
        }
    });
}

window.addEventListener("load", () => {
    initiateLogoScroller();
});

window.addEventListener("resize", () => {
    initiateLogoScroller();
});