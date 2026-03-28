// 1. Theme Toggle Logic
const themeBtn = document.getElementById('theme-btn');

// Set the initial icon based on localStorage
if (localStorage.getItem('theme') === 'dark') {
    themeBtn.textContent = '☀️';
} else {
    themeBtn.textContent = '🌓';
}

themeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    
    // Check if dark mode is currently active
    if (root.getAttribute('data-theme') === 'dark') {
        // Switch to Light Mode
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = '🌓';
    } else {
        // Switch to Dark Mode
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = '☀️';
    }
});

// 2. Custom Cursor Animation (From dark.html)
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX; 
    my = e.clientY;
    cur.style.left = mx + 'px'; 
    cur.style.top = my + 'px';
});

(function animRing() {
    rx += (mx - rx) * 0.11; 
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px'; 
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();

// Enlarge cursor on interactive elements
document.querySelectorAll('a, button, .proj-card, .svc-card, .testi-card').forEach(el => {
    el.addEventListener('mouseenter', () => { 
        cur.style.width = '18px'; 
        cur.style.height = '18px'; 
        ring.style.width = '48px'; 
        ring.style.height = '48px'; 
    });
    el.addEventListener('mouseleave', () => { 
        cur.style.width = '10px'; 
        cur.style.height = '10px'; 
        ring.style.width = '34px'; 
        ring.style.height = '34px'; 
    });
});

// 3. Scroll Reveal Animations (From light.html)
const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) { 
            setTimeout(() => e.target.classList.add('visible'), i * 90); 
            obs.unobserve(e.target); 
        }
    });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// 4. Active Navigation Links highlighting
const secs = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let curSec = '';
    
    // Find which section is currently in view
    secs.forEach(s => { 
        if (window.scrollY >= s.offsetTop - 140) {
            curSec = s.id; 
        }
    });
    
    // Add or remove 'active' class
    links.forEach(a => {
        if (a.getAttribute('href') === '#' + curSec) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });
});