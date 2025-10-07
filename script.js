// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== NAVBAR BACKGROUND ON SCROLL ====================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(102, 126, 234, 0.3)';
        nav.style.backdropFilter = 'blur(20px)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.05)';
        nav.style.backdropFilter = 'blur(15px)';
    }
});

// ==================== BOOKING FORM HANDLING ====================
const bookingForm = document.querySelector('.booking-form');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const destination = document.getElementById('destination').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const travelers = document.getElementById('travelers').value;

    // Validate dates
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkinDate < today) {
        alert('Check-in date cannot be in the past!');
        return;
    }

    if (checkoutDate <= checkinDate) {
        alert('Check-out date must be after check-in date!');
        return;
    }

    // Calculate days
    const timeDiff = checkoutDate - checkinDate;
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Show success message
    alert(`Searching for ${destination} packages:\n- Check-in: ${checkin}\n- Check-out: ${checkout}\n- Duration: ${days} days\n- Travelers: ${travelers}\n\nRedirecting to available packages...`);

    // Here you would typically send the data to a backend
    console.log({
        destination,
        checkin,
        checkout,
        travelers,
        days
    });
});

// ==================== SET MINIMUM DATE FOR DATE INPUTS ====================
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').setAttribute('min', today);
document.getElementById('checkout').setAttribute('min', today);

// Update checkout minimum date when checkin changes
document.getElementById('checkin').addEventListener('change', function() {
    const checkinDate = this.value;
    const nextDay = new Date(checkinDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const minCheckout = nextDay.toISOString().split('T')[0];
    document.getElementById('checkout').setAttribute('min', minCheckout);
});

// ==================== DESTINATION CARD INTERACTIONS ====================
const destinationCards = document.querySelectorAll('.destinations .destination-card');

destinationCards.forEach(card => {
    const button = card.querySelector('.details-button');

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const destination = card.querySelector('.destination-overlay h3').textContent;
        const price = card.querySelector('.price').textContent;
        alert(`${destination}\n${price}\n\nFeatures:\n✓ Round-trip flights\n✓ 5-star hotel accommodation\n✓ Daily breakfast\n✓ Local tours & activities\n✓ 24/7 concierge service\n\nClick Book Now to proceed!`);
    });
});

// ==================== PACKAGE CARD INTERACTIONS ====================
const packageCards = document.querySelectorAll('.packages .destination-card');

packageCards.forEach(card => {
    const button = card.querySelector('.details-button');

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const packageName = card.querySelector('.destination-overlay h3').textContent;
        const packageDetails = card.querySelector('.destination-overlay p').textContent;
        const price = card.querySelector('.price').textContent;
        alert(`${packageName}\n${packageDetails}\n${price}\n\nPackage Includes:\n✓ Flights & Accommodation\n✓ Guided Tours\n✓ Meals as specified\n✓ Travel Insurance\n\nReady to book this adventure?`);
    });
});

// ==================== ANIMATION ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// ==================== CTA BUTTON ACTION ====================
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#destinations').scrollIntoView({
        behavior: 'smooth'
    });
});

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert(`Thank you, ${name}! Your message has been sent.\n\nWe will respond to ${email} shortly.`);
            contactForm.reset();
            console.log({ name, email, message });
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ==================== PARALLAX EFFECT FOR HERO ====================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c🌍 Welcome to Travel Abroad! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #667eea; font-size: 14px;');
console.log('%cFeaturing Glassmorphism UI Design', 'color: #764ba2; font-size: 14px;');

// ==================== THEME TOGGLE ====================
const themeToggleButton = document.getElementById('theme-icon');
const body = document.body;

// Check for saved theme preference, default to dark-theme if none
let currentTheme = localStorage.getItem('theme');
if (!currentTheme) {
    currentTheme = 'dark-theme'; // Default to dark theme
    localStorage.setItem('theme', currentTheme);
}

body.classList.add(currentTheme);
if (currentTheme === 'dark-theme') {
    themeToggleButton.classList.replace('fa-moon', 'fa-sun');
} else {
    themeToggleButton.classList.replace('fa-sun', 'fa-moon');
}

themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeToggleButton.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        themeToggleButton.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light-theme');
    }
});

// ===================== Force scroll to top for Home/Logo links =====================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
