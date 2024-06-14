let isMenu = false;

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        isMenu =!isMenu;
        nav.classList.toggle('show'); // Toggle the active class on the navigation menu
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section-container section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Remove active class from all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to the clicked section
            const targetId = link.getAttribute('href').substring(1); // Extract section id from href
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to the clicked link
            link.classList.add('active');
        });
    });

    // Set Home section as default active section
    document.getElementById('Home').classList.add('active');
    document.querySelector('nav ul li a[href="#Home"]').classList.add('active');
});



document.addEventListener('DOMContentLoaded', function() {
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Remove active class from all sections
            const sections = document.querySelectorAll('.section-container section');
            sections.forEach(section => section.classList.remove('active'));

            // Add active class to the clicked section
            const targetId = button.getAttribute('href').substring(1); // Extract section id from href
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Update the nav link to show as active
            const navLinks = document.querySelectorAll('nav ul li a');
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            const correspondingNavLink = document.querySelector(`nav ul li a[href="#${targetId}"]`);
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const welcomeMessages = document.querySelectorAll('.welcome-message');

    // Function to check if an element is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Function to toggle visibility based on viewport position with fade-in and out
    const toggleVisibilityOnScroll = () => {
        welcomeMessages.forEach(message => {
            if (isInViewport(message)) {
                message.style.opacity = 1;
                message.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                message.style.transform = "translateY(0)";
            } else {
                message.style.opacity = 0;
                message.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                message.style.transform = "translateY(50px)";
            }
        });
    };

    // Attach scroll event listener to window
    window.addEventListener('scroll', toggleVisibilityOnScroll);

    // Run the visibility check initially
    toggleVisibilityOnScroll();
});




document.addEventListener("DOMContentLoaded", function() {
    const welcomeMessages = document.querySelectorAll('.welcome-message, .welcome-about, .welcome-curriculum, .welcome-gallery');

    const fadeInOnScroll = () => {
        welcomeMessages.forEach(message => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    } else {
                        entry.target.classList.remove('fade-in');
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(message);
        });
    };

    // Initialize the fade-in animation on scroll
    fadeInOnScroll();
});



document.addEventListener("DOMContentLoaded", () => {
    const loadingContainer = document.querySelector(".loading-container");
    const greetingContainer = document.querySelector(".greeting-container");
    const greetingText = document.getElementById("greeting-text");
    const closeGreetingButton = document.getElementById("close-greeting");

    // Function to get the appropriate greeting based on the hour of the day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return "Good Morning!";
        } else if (hour < 18) {
            return "Good Afternoon!";
        } else {
            return "Good Evening!";
        }
    };


    // Function to check if the current time matches the target greeting times
    const isGreetingTime = () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        // Check if the current time is exactly 8 AM, 12 PM, 4 PM, or 8 PM
        return (hour === 8 || hour === 12 || hour === 16 || hour === 20) && minute === 0;
    };

    // Display greeting message
    greetingText.textContent = getGreeting();

    // Function to hide the loading screen
    const hideLoadingScreen = () => {
        loadingContainer.style.transform = "translateX(-100%)";
        setTimeout(() => {
            loadingContainer.style.display = "none";
            showGreetingMessage();
            if (isGreetingTime()) {
                showGreetingMessage();
            }
        }, 8000);
    };

    // Function to show the greeting message
    const showGreetingMessage = () => {
        greetingContainer.style.transform = "translateX(-100%)";
        greetingContainer.style.display = "flex";
        setTimeout(hideGreetingMessage, 8000);
    };

    // Function to hide the greeting message
    const hideGreetingMessage = () => {
        greetingContainer.style.transform = "translateX(100%)";
        setTimeout(() => {
            greetingContainer.style.display = "none";
        }, 8000);
    };

    // Event listener for the close button
    closeGreetingButton.addEventListener("click", hideGreetingMessage);

    // Hide loading screen after DOM is loaded and an additional 8 seconds
    setTimeout(hideLoadingScreen, 8000);
});

//================================================================================================================



document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('introVideo');

    // Function to check if the video is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Event listener for scrolling
    window.addEventListener('scroll', () => {
        if (!isInViewport(video)) {
            video.pause();
        }
    });

    // Event listener for when the video ends
    video.addEventListener('ended', () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });

    // Initial check in case the video starts out of the viewport
    if (!isInViewport(video)) {
        video.pause();
    }
});
