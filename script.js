// ============================
// BSc EMC WEBSITE JAVASCRIPT
// ============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation menu
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
    });
});

// Automatically update the copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Highlight the active navigation section
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navigationLinks.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                                "#" + entry.target.id
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -65% 0px"
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });
}

// Smoothly reveal cards when they enter the viewport
const revealItems = document.querySelectorAll(
    ".discipline-card, .facility-card, .event-card"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealItems.forEach(function (item) {
        item.classList.add("reveal");
        revealObserver.observe(item);
    });
}