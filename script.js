// Smooth scrolling for on-page hash links only
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active nav highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = Array.from(document.querySelectorAll('nav a')).filter(a => a.getAttribute('href')?.startsWith('#'));
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (link) {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0.1 });
sections.forEach(sec => observer.observe(sec));

// Back to top button behavior
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTop.style.display = 'block';
        else backToTop.style.display = 'none';
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Toggle header background on scroll (Wix-like behavior)
const header = document.querySelector('header');
if (header) {
    const toggleHeader = () => {
        if (window.scrollY > 10) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    };
    toggleHeader();
    window.addEventListener('scroll', toggleHeader);
}