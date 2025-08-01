/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);
    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*==================== scroll reveal ====================*/
const sr = ScrollReveal({
    reset: false,   
    distance: '80px',
    duration: 2000,
    delay: 200
});

sr.reveal('.home-content, .heading', { origin: 'top' });
sr.reveal('.home-img, .portfolio-container, .contact form', { origin: 'bottom' });
sr.reveal('.home-content h1, .about-img', { origin: 'left' });
sr.reveal('.home-content p, .about-content', { origin: 'right' });

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
    strings: ['AI Developer', 'AI Agent Architect', 'ML Engineer', 'GenAI & LLM Specialist', 'Cybersecurity Enthusiast', 'Finance-Tech Innovator'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/*==================== Toast with Sound ====================*/
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Add message span
    const msg = document.createElement('span');
    msg.textContent = message;
    toast.appendChild(msg);

    // Add progress bar
    const progress = document.createElement('div');
    progress.className = 'progress';
    toast.appendChild(progress);

    container.appendChild(toast);

    // Play sound
    const audio = new Audio(type === 'success' ? 'assets/success.mp3' : 'assets/error.mp3');
    audio.volume = 0.3;
    audio.play().catch(err => console.log('Audio play error:', err));

    // Remove after 3s
    setTimeout(() => toast.remove(), 3000);
}

/*==================== EmailJS Form Submission ====================*/
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_hpzkh1q', 'template_eq6azmr', this)
        .then(function() {
            showToast("✅ Message sent successfully!", "success");
            document.getElementById('contact-form').reset();
        }, function(error) {
            showToast("❌ Failed to send. Try again!", "error");
            console.error('EmailJS Error:', error);
        });
});

// Smooth "Read More" toggle with arrow rotation
const readMoreBtn = document.querySelector('.read-more-btn');
const moreSection = document.getElementById('more-about');

readMoreBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const isOpen = moreSection.classList.toggle('active');

  // Toggle text + arrow
  this.classList.toggle('rotate', isOpen);
  this.innerHTML = isOpen 
      ? 'Read Less <span class="arrow">▼</span>' 
      : 'Read More <span class="arrow">▼</span>';

  if (isOpen) {
    // Scroll to new content
    setTimeout(() => {
      moreSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.ScrollReveal) ScrollReveal().clean('.portfolio-container, .contact form');
      if (window.ScrollReveal) ScrollReveal().reveal('.portfolio-container, .contact form', { origin: 'bottom', distance: '80px', duration: 2000, delay: 200 });
    }, 300);
  }
});
