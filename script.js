let isMenu = false;

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        isMenu = !isMenu;
        nav.classList.toggle('show'); // Toggle the active class on the navigation menu
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.section-container section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Hide the menu if it is shown
            if (isMenu) {
                nav.classList.remove('show');
                isMenu = false;
            }

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

            // Save the active link and section in sessionStorage
            sessionStorage.setItem('activeLink', link.getAttribute('href'));
            sessionStorage.setItem('activeSection', targetId);
        });
    });

    // Load the active link and section from sessionStorage
    const activeLink = sessionStorage.getItem('activeLink');
    const activeSection = sessionStorage.getItem('activeSection');

    if (activeLink && activeSection) {
        document.querySelector(`nav ul li a[href="${activeLink}"]`).classList.add('active');
        document.getElementById(activeSection).classList.add('active');
    } else {
        // Set Home section as default active section
        document.getElementById('Home').classList.add('active');
        document.querySelector('nav ul li a[href="#Home"]').classList.add('active');
    }
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
    // Check if the screen size is large
    if (window.innerWidth > 800) {
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
    }
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

    const getAdditionalMessage = () => {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();

        let message = "";
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        if (day === 0 || day === 6) {
            message = `Please pay us a visit  on Monday. We have alot to share Have a nice ${daysOfWeek[day]}!`;
        } else if (day === 5 && hour >= 12) {
            message = `Have a nice weekend!Have a nice ${daysOfWeek[day]}!`;
        } else if (day === 0 && hour >= 8) {
            message = `Have a blessed Sunday! and Have a nice ${daysOfWeek[day]}!`;
        } else if (day === 1 && hour >= 6 && hour < 12) {
            message =   `Have a great week! Have a nice ${daysOfWeek[day]}!`;
        } else {
           
            message = `Have a nice ${daysOfWeek[day]}!`;
        }

        return message;
    };

    // Display greeting message
    greetingText.innerHTML = `<h2>${getGreeting()}</h2` + `<p> ${getAdditionalMessage()}</p>`;
    

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
        greetingContainer.style.flexDirection = "column";
        greetingContainer.style.alignItems = 'center';
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
//=================================================================================================================================

document.addEventListener("DOMContentLoaded", function() {
    // Wait for an additional 30 seconds after DOM is loaded
    setTimeout(function() {
        // Show the overlay
        document.getElementById('imageOverlay').style.display = 'flex';
    }, 30000); // 30000 milliseconds = 30 seconds
    

     
    
    // Close button functionality
    document.getElementById('closeOverlay').addEventListener('click', function() {
        document.getElementById('imageOverlay').style.display = 'none';
        document.getElementById('menuBar').style.display = 'block';
    });
    
     // Menu bar toggle functionality
     document.getElementById('toggleOverlayButton').addEventListener('click', function() {
        const overlay = document.getElementById('imageOverlay');
        document.getElementById('menuBar').style.display = "none";
        if (overlay.style.display === 'flex') {
            overlay.style.display = 'none';
           
        } else {
            overlay.style.display = 'flex';
        }
    });

    // Image click event listener
    const images = document.querySelectorAll('.clip-path img');
    images.forEach(image => {
        image.addEventListener('click', function() {
            const src = this.src;
            document.getElementById('fullscreenImage').src = src;
            document.getElementById('fullscreenOverlay').style.display = 'flex';
        });
    });

    // Fullscreen close button event listener
    document.getElementById('closeFullscreen').addEventListener('click', function() {
        document.getElementById('fullscreenOverlay').style.display = 'none';
    });

    // Zoom in and zoom out functionality
    let zoomLevel = 1;

    document.getElementById('zoomIn').addEventListener('click', function() {
        zoomLevel += 0.1;
        document.getElementById('fullscreenImage').style.transform = `scale(${zoomLevel})`;
    });

    document.getElementById('zoomOut').addEventListener('click', function() {
        if (zoomLevel > 1) {
            zoomLevel -= 0.1;
            document.getElementById('fullscreenImage').style.transform = `scale(${zoomLevel})`;
        }
    });
});
//=============================================================================================================================

document.addEventListener("DOMContentLoaded", function() {
    const donationCounter = document.getElementById('donationCount');
    
    // Retrieve the last stored donation count from session storage
    let lastDonationCount = parseInt(sessionStorage.getItem('lastDonationCount')) || 0;
    
    // Function to start the animation when the section is in view
    function startDonationAnimation(targetAmount, duration) {
        let startTime = null;
        const startAmount = lastDonationCount;
        
        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            const progress = currentTime - startTime;
            const increment = Math.easeInOutQuad(progress, startAmount, targetAmount - startAmount, duration);
            donationCounter.innerText = `$${Math.floor(increment)}`;
            if (progress < duration) {
                requestAnimationFrame(animate);
            } else {
                donationCounter.innerText = `$${targetAmount}`;
            }
        }
        requestAnimationFrame(animate);
    }

    // Easing function for smooth animation
    Math.easeInOutQuad = function(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    // Example: Start animation to a random target amount between 1000 and 9999
    const minTargetAmount = 1000;
    const maxTargetAmount = 9999;
    const targetAmount = Math.floor(Math.random() * (maxTargetAmount - minTargetAmount + 1)) + minTargetAmount;
    startDonationAnimation(targetAmount, 3000); // Count up to targetAmount in 3 seconds

    // Optional: Update session storage with the new donation count
    sessionStorage.setItem('lastDonationCount', targetAmount);
});

//============================================================================================================================

const valuesList = document.querySelectorAll('.welcome-messages li');

valuesList.forEach(item => {
    item.addEventListener('click', () => {
        const theme = item.getAttribute('data-theme');

        // Generate quote and Bible verse based on the theme
        let quote, author, verse;

        switch (theme) {
            case 'Professionalism':
                quote = "Professionalism is knowing how to do it, when to do it, and doing it.";
                author = "Bethelbrooke School";
                verse = "Colossians 3:23 - Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.";
                break;
            case 'Integrity':
                quote = "Integrity is doing the right thing, even when no one is watching.";
                author = "C.S. Lewis";
                verse = "Proverbs 11:3 - The integrity of the upright guides them, but the unfaithful are destroyed by their duplicity.";
                break;
            case 'Team work':
                quote = "Teamwork divides the task and multiplies the success.";
                author = "Bethelbrooke School";
                verse = "Ecclesiastes 4:9 - Two are better than one, because they have a good return for their labor.";
                break;
            case 'Excellence':
                quote = "Excellence is not being the best; it's doing your best.";
                author = "Bethelbrooke School";
                verse = "Colossians 3:23 - Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.";
                break;
            case 'Commitment':
                quote = "Commitment is what transforms a promise into reality.";
                author = "Abraham Lincoln";
                verse = "Galatians 6:9 - Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.";
                break;
            case 'Quality':
                quote = "Quality is never an accident. It is always the result of intelligent effort.";
                author = "John Ruskin";
                verse = "Philippians 4:8 - Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.";
                break;
            case 'Innovation':
                quote = "Innovation distinguishes between a leader and a follower.";
                author = "Steve Jobs";
                verse = "Isaiah 43:19 - See, I am doing a new thing! Now it springs up; do you not perceive it? I am making a way in the wilderness and streams in the wasteland.";
                break;
            case 'Accountability':
                quote = "Accountability breeds response-ability.";
                author = "Stephen Covey";
                verse = "Romans 14:12 - So then, each of us will give an account of ourselves to God.";
                break;
            case 'Competence':
                quote = "Competence means keeping your head in a crisis, sticking with a task even when it seems hopeless, and improvising on the fly.";
                author = "Bethelbrooke School";
                verse = "Proverbs 18:16 - A gift opens the way and ushers the giver into the presence of the great.";
                break;
            case 'Love':
                quote = "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.";
                author = "1 Corinthians 13:4-7 (NIV)";
                verse = "1 Corinthians 13:13 - And now these three remain: faith, hope and love. But the greatest of these is love.";
                break;
            default:
                quote = "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.";
                author = "John 3:16 (NIV)";
                verse = "John 3:16 - For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.";
                break;
        }
        

        displayQuote(quote, author, verse);
    });
});

function displayQuote(quote, author, verse) {
    const quoteTitle = document.getElementById('quoteTitle');
    const quoteContent = document.getElementById('quoteContent');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const bibleVerse = document.getElementById('bibleVerse');
    const quoteAndBible =  document.getElementById('overlays')

    quoteTitle.textContent = `Quote and Bible verse`;
    quoteContent.textContent = `"${quote}"`;
    quoteAuthor.textContent = `Author: ${author}`;
    bibleVerse.textContent = `Bible verse: ${verse}`;
    quoteAndBible.style.display = 'block';
}

function closeQuote() {
    document.getElementById('overlays').style.display = 'none';
}

//=====================================================================================================================================

// Function to show relevant questions based on selected option
function showQuestionsForRelationship(relationshipValue) {
    const dynamicQuestionsContainer = document.getElementById('dynamicQuestionsContainer');
    

    dynamicQuestionsContainer.innerHTML = ''; // Clear previous content

    switch (relationshipValue) {
        case 'parent':
            dynamicQuestionsContainer.innerHTML = `
                <label for="challenges">What challenges have you faced as a parent at BethelBrooke and how were they addressed?</label>
                <textarea id="challenges" name="challenges" rows="4"></textarea>

                <label for="appreciation">What do you appreciate most about the communication between parents and teachers at BethelBrooke?</label>
                <textarea id="appreciation" name="appreciation" rows="4"></textarea>

                <label for="extracurricular">How do you feel about the extracurricular activities offered to students at BethelBrooke?</label>
                <textarea id="extracurricular" name="extracurricular" rows="4"></textarea>

                <label for="improvements">What improvements would you like to see in the parent-teacher meeting structure?</label>
                <textarea id="improvements" name="improvements" rows="4"></textarea>

                <label for="social-development">How has BethelBrooke School contributed to your child's social development?</label>
                <textarea id="social-development" name="social-development" rows="4"></textarea>

                <label for="standout">In your opinion, what makes BethelBrooke stand out compared to other schools?</label>
                <textarea id="standout" name="standout" rows="4"></textarea>

                <label for="safety">How satisfied are you with the school's handling of safety and security measures?</label>
                <textarea id="safety" name="safety" rows="4"></textarea>

                <label for="event">Can you describe a memorable event or field trip experience that your child enjoyed at BethelBrooke?</label>
                <textarea id="event" name="event" rows="4"></textarea>

                <label for="community">What role do you think parents should play in supporting the school's community initiatives?</label>
                <textarea id="community" name="community" rows="4"></textarea>
            `;
            break;

        case 'student':
                dynamicQuestionsContainer.innerHTML = `
                    <label for="achievements">Any achievements you would like to share during your time at BethelBrooke?</label>
                    <textarea id="achievements" name="achievements" rows="4"></textarea>
            
                    <label for="impact">What extracurricular activities have had the most impact on your personal development?</label>
                    <textarea id="impact" name="impact" rows="4"></textarea>
            
                    <label for="memorable">Can you share a memorable experience with a teacher or staff member that positively influenced you?</label>
                    <textarea id="memorable" name="memorable" rows="4"></textarea>
            
                    <label for="changes">What changes would you suggest to improve the school's learning environment?</label>
                    <textarea id="changes" name="changes" rows="4"></textarea>
            
                    <label for="preparation">How has BethelBrooke prepared you for your future educational goals?</label>
                    <textarea id="preparation" name="preparation" rows="4"></textarea>
            
                    <label for="motivating">What aspects of the school culture do you find most motivating?</label>
                    <textarea id="motivating" name="motivating" rows="4"></textarea>
            
                    <label for="support">How do you feel about the support provided by teachers in understanding challenging subjects?</label>
                    <textarea id="support" name="support" rows="4"></textarea>
            
                    <label for="programs">What new programs or clubs would you like to see introduced at BethelBrooke?</label>
                    <textarea id="programs" name="programs" rows="4"></textarea>
            
                    <label for="technology">How has technology been integrated into your learning experience at BethelBrooke?</label>
                    <textarea id="technology" name="technology" rows="4"></textarea>
            
                    <label for="advice">What advice would you give to new students joining BethelBrooke?</label>
                    <textarea id="advice" name="advice" rows="4"></textarea>
                `;
                break;
            
        case 'alumni':
                    dynamicQuestionsContainer.innerHTML = `
                        <label for="recommendation">Would you recommend BethelBrooke School to others? Why?</label>
                        <textarea id="recommendation" name="recommendation" rows="4"></textarea>
                
                        <label for="impact-career">How did your time at BethelBrooke School prepare you for your career or further education?</label>
                        <textarea id="impact-career" name="impact-career" rows="4"></textarea>
                
                        <label for="influential">Can you recall a teacher or staff member who had a significant impact on your life? How?</label>
                        <textarea id="influential" name="influential" rows="4"></textarea>
                
                        <label for="academic">Would you describe your academic experience at BethelBrooke as challenging, satisfying, or both?</label>
                        <textarea id="academic" name="academic" rows="4"></textarea>
                
                        <label for="role">What role did extracurricular activities play in shaping your time at BethelBrooke?</label>
                        <textarea id="role" name="role" rows="4"></textarea>
                
                        <label for="changes-alumni">What changes or improvements have you observed in BethelBrooke since you graduated?</label>
                        <textarea id="changes-alumni" name="changes-alumni" rows="4"></textarea>
                
                        <label for="advice-alumni">What advice would you give to current students aspiring to follow a similar path as yours?</label>
                        <textarea id="advice-alumni" name="advice-alumni" rows="4"></textarea>
                
                        <label for="personal-growth">How did BethelBrooke support your personal growth outside of academics?</label>
                        <textarea id="personal-growth" name="personal-growth" rows="4"></textarea>
                
                        <label for="importance">How important do you think alumni involvement is in the ongoing success of BethelBrooke?</label>
                        <textarea id="importance" name="importance" rows="4"></textarea>
                
                        <label for="miss">What do you miss most about being a student at BethelBrooke?</label>
                        <textarea id="miss" name="miss" rows="4"></textarea>
                    `;
                    break;
                
            case 'staff':
                        dynamicQuestionsContainer.innerHTML = `
                            <label for="feedback">Any feedback or suggestions for improving the school environment?</label>
                            <textarea id="feedback" name="feedback" rows="4"></textarea>
                    
                            <label for="development">What professional development opportunities have been beneficial to your career at BethelBrooke?</label>
                            <textarea id="development" name="development" rows="4"></textarea>
                    
                            <label for="impact-staff">Can you share a rewarding experience where you felt your efforts made a significant impact?</label>
                            <textarea id="impact-staff" name="impact-staff" rows="4"></textarea>
                    
                            <label for="collaboration">How would you describe the collaboration among staff members at BethelBrooke?</label>
                            <textarea id="collaboration" name="collaboration" rows="4"></textarea>
                    
                            <label for="attractive">In your opinion, what makes BethelBrooke an attractive place to work?</label>
                            <textarea id="attractive" name="attractive" rows="4"></textarea>
                    
                            <label for="support-teachers">How do you think the school can better support teachers in their classroom efforts?</label>
                            <textarea id="support-teachers" name="support-teachers" rows="4"></textarea>
                    
                            <label for="changes-student">What changes have you seen in the student body over your time at BethelBrooke?</label>
                            <textarea id="changes-student" name="changes-student" rows="4"></textarea>
                    
                            <label for="diversity">How do you approach diversity and inclusion in your interactions with students and colleagues?</label>
                            <textarea id="diversity" name="diversity" rows="4"></textarea>
                    
                            <label for="initiatives">What initiatives or projects are you most excited about for the future of BethelBrooke?</label>
                            <textarea id="initiatives" name="initiatives" rows="4"></textarea>
                    
                            <label for="evolved">How has your perception of the school evolved since you first joined the staff?</label>
                            <textarea id="evolved" name="evolved" rows="4"></textarea>
                        `;
                        break;
                    
                case 'other':
                            dynamicQuestionsContainer.innerHTML = `
                                <label for="guestQuestion">Please provide any questions or feedback you have as a guest:</label>
                                <textarea id="guestQuestion" name="guestQuestion" rows="4"></textarea>
                        
                                <label for="relationship-guest">How would you describe your relationship with BethelBrooke, even if indirect?</label>
                                <textarea id="relationship-guest" name="relationship-guest" rows="4"></textarea>
                        
                                <label for="observations">Can you share any observations or feedback based on your interactions with BethelBrooke?</label>
                                <textarea id="observations" name="observations" rows="4"></textarea>
                        
                                <label for="improvements-guest">What improvements do you think BethelBrooke could make to better serve its community?</label>
                                <textarea id="improvements-guest" name="improvements-guest" rows="4"></textarea>
                        
                                <label for="strengths">In your opinion, what unique strengths does BethelBrooke bring to the educational landscape?</label>
                                <textarea id="strengths" name="strengths" rows="4"></textarea>
                        
                                <label for="impression">How would you rate your overall impression of BethelBrooke based on what you've heard or seen?</label>
                                <textarea id="impression" name="impression" rows="4"></textarea>
                        
                                <label for="concerns">What questions or concerns do you have about BethelBrooke that you would like addressed?</label>
                                <textarea id="concerns" name="concerns" rows="4"></textarea>
                        
                                <label for="engagement">How important do you believe community engagement is for the success of a school like BethelBrooke?</label>
                                <textarea id="engagement" name="engagement" rows="4"></textarea>
                        
                                <label for="trends">What changes in education trends do you think BethelBrooke should adapt to in the coming years?</label>
                                <textarea id="trends" name="trends" rows="4"></textarea>
                        
                                <label for="advice-guest">What advice would you give to BethelBrooke based on your experiences with other educational institutions?</label>
                                <textarea id="advice-guest" name="advice-guest" rows="4"></textarea>
                            `;
                            break;
                        
        default:
            // Handle default or no selection case
            break;
    }
}

// Function to validate name input
function validateName(name) {
    // Regex to check if name contains numbers or punctuation
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

// Event listener for changes in the select field
document.getElementById('relationship').addEventListener('change', function() {
    const selectedValue = this.value;
    const nameInput = document.getElementById('name').value.trim();
    const nameErrorMessage = document.getElementById('name-error-message'); // Assuming you have a placeholder for the error message
    const dynamicQuestionsContainer = document.getElementById('dynamicQuestionsContainer');
    
    if (validateName(nameInput)) {
        // Clear any existing error message
        nameErrorMessage.textContent = '';
        showQuestionsForRelationship(selectedValue);
    } else {
        // Show error message and clear questions container
        nameErrorMessage.textContent = 'Please enter a valid name without numbers or punctuation.';
       
        dynamicQuestionsContainer.innerHTML = '';
    }
});


// Name input validation and error message display
const nameInput = document.getElementById('name');
const nameErrorContainer = document.querySelector('.error-message');
const relationshipSelect = document.getElementById('relationship');

nameInput.addEventListener('input', function() {
    const name = this.value.trim();
    if (name.length === 0) {
        nameErrorContainer.textContent = 'Please enter a valid name.';
        dynamicQuestionsContainer.innerHTML = ''; // Clear questions if name is invalid or empty
    } else if (!validateName(name)) {
        nameErrorContainer.textContent = 'Name should not contain numbers or special characters.';
        dynamicQuestionsContainer.innerHTML = ''; // Clear questions if name contains invalid characters
    } else {
        nameErrorContainer.textContent = '';
        showQuestionsForRelationship(document.getElementById('relationship').value); // Show relevant questions based on selected relationship
    }
});

// Event listener for changes in the select field (relationship)
relationshipSelect.addEventListener('change', function() {
    const selectedValue = this.value;
    const name = nameInput.value.trim();

    if (validateName(name)) {
        showQuestionsForRelationship(selectedValue);
    } else {
        // Clear questions container if name is invalid
        dynamicQuestionsContainer.innerHTML = '';
    }
});

// Form submission handling (you can add more validation logic here if needed)
document.getElementById('interviewForm').addEventListener('submit', function(event) {
    
    const name = nameInput.value.trim();
    if (name.length === 0 || !validateName(name)) {
        nameErrorContainer.textContent = 'Please enter a valid name.';
        event.preventDefault(); // Prevent form submission if name is not valid
    }
});

//========================================================================================================================
