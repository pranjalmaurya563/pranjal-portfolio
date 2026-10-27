const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
  document.body.dataset.theme = theme;

  const isDark = theme === "dark";

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀" : "☾";
  }

  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.setAttribute(
      "title",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

// Load previously saved theme
let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("portfolio-theme") || "light";
} catch (error) {
  console.warn("Could not load the saved theme.");
}

applyTheme(savedTheme === "dark" ? "dark" : "light");

// Toggle between light and dark modes
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      console.warn("Could not save the theme preference.");
    }
  });
}


/* 2. MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  // Close menu after clicking a navigation link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");

      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });

  // Close menu when clicking outside it
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navLinks.classList.remove("open");

      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Close mobile menu when switching to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      navLinks.classList.remove("open");

      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}


/* 3. HERO TYPING ANIMATION */

const changingText = document.getElementById("changingText");

if (changingText) {
  const words = [
    "web",
    "technology",
    "digital experiences",
    "new ideas"
  ];

  let wordIndex = 0;
  let characterIndex = words[0].length;
  let deleting = true;

  const typingSpeed = 85;
  const deletingSpeed = 45;
  const pauseDuration = 1400;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (deleting) {
      characterIndex--;

      changingText.textContent =
        currentWord.substring(0, characterIndex);

      if (characterIndex <= 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;

        setTimeout(typeEffect, 350);
        return;
      }

      setTimeout(typeEffect, deletingSpeed);
    } else {
      const nextWord = words[wordIndex];

      characterIndex++;

      changingText.textContent =
        nextWord.substring(0, characterIndex);

      if (characterIndex >= nextWord.length) {
        deleting = true;

        setTimeout(typeEffect, pauseDuration);
        return;
      }

      setTimeout(typeEffect, typingSpeed);
    }
  }

  // Start the animation after a short pause
  setTimeout(typeEffect, 1800);
}


/* 4. SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
  ".about-heading, .about-description, .principles article, " +
  ".skill-card, .project-card, .timeline-item, .contact"
);

// Add reveal styles dynamically
const revealStyle = document.createElement("style");

revealStyle.textContent = `
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity 0.65s ease,
      transform 0.65s ease;
  }

  .reveal-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal-on-scroll {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;

document.head.appendChild(revealStyle);

// Use IntersectionObserver for efficient scroll animations
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal-on-scroll");
    revealObserver.observe(element);
  });
} else {
  // Fallback for older browsers
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}


/* 5. ACTIVE NAVIGATION ON SCROLL */

const pageSections = document.querySelectorAll(
  "main section[id]"
);

const navigationLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;

          navigationLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${currentId}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: 0
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


/* 6. FOOTER YEAR */

const footerText = document.querySelector(".footer p");

if (footerText) {
  footerText.textContent =
    `Designed & built with curiosity. © ${new Date().getFullYear()}`;
}


/* PORTFOLIO JAVASCRIPT INITIALIZED */

console.log("Pranjal's portfolio JavaScript loaded successfully!");
