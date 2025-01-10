// DOM Elements
const menu = document.querySelector('#menu-icon-js');
const menuicon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navtc = document.querySelector('#nav-tc-js');
const contactForm = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const errorDiv = document.querySelector('.error');
const emailErrorDiv = document.querySelector('.email-error');
const contactButton = document.querySelector('.contact-button');
const contactLoad = document.querySelector('.contact-load');
const submitText = document.querySelector('.submit-text');

// Menu Toggle Functionality
menu.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.toggle('open');
    navtc.classList.toggle("nav-touch-close-open");
};

// Close Menu when clicking on navtc
navtc.onclick = () => {
    menuicon.classList.toggle('bx-x');
    navbar.classList.remove('open');
    navtc.classList.remove('nav-touch-close-open');
    navtc.classList.remove("nav-tc-z", "nav-LR-TC");
};

// Handle Scroll Direction and Navbar Visibility
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;

    // Add/remove scrolled class to header
    document.getElementById("header").classList.toggle('scrolled', currentScrollPos > 0);

    // Handle navbar visibility based on scroll direction
    if (navtc.classList.contains('nav-touch-close-open')) return;

    document.getElementById("header").style.top = (prevScrollpos > currentScrollPos) ? "0" : "-100px";
    prevScrollpos = currentScrollPos;
};

// Form Validation Function
function validateForm(event) {
    event.preventDefault();
    let isValid = true;

    // Validate Name field
    if (nameInput.value.trim() === '') {
        isValid = false;
        nameInput.classList.add('invalid');
    } else {
        nameInput.classList.remove('invalid');
    }

    // Validate Email field
    if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
        isValid = false;
        emailInput.classList.add('invalid');
    } else {
        emailInput.classList.remove('invalid');
    }

    // Validate Message field
    if (messageInput.value.trim() === '') {
        isValid = false;
        messageInput.classList.add('invalid');
    } else {
        messageInput.classList.remove('invalid');
    }

    // If the form is valid, proceed with submission
    if (isValid) {
        handleFormSubmission();
    } else {
        errorDiv.classList.add('error-show');
    }
}

// Validate Email using Regular Expression
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle Form Submission (Show Loading, Submit, and Reload)
function handleFormSubmission() {
    // Show loading spinner and hide submit text
    contactButton.classList.add('loading');
    contactLoad.classList.add('show');
    submitText.classList.add('hide');

    setTimeout(() => {
        sendMail(); // Replace with your actual mail-sending function or AJAX request

        // After submission, reset UI and reload the page
        setTimeout(() => {
            resetUI();
            reloadPage();
        }, 2000);
    }, 2000);
}

// Reset UI elements after form submission
function resetUI() {
    contactButton.classList.remove('loading');
    contactLoad.classList.remove('show');
    submitText.classList.remove('hide');
}

// Reload the page
function reloadPage() {
    setTimeout(() => {
        location.reload();  // Force page reload
    }, 1000);  // Delay for 1 second to allow time for the form feedback
}

// Event listener for form submission
if (contactForm) {
    contactForm.addEventListener('submit', validateForm);
}
