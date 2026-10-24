// 1. Dynamic Typing Effect for Hero Banner
const typingWords = [
    "Comprehensive Networking Solution",
    "CCTV & Security Surveillance",
    "Access Control & Attendance System",
    "Computer / Desktop Maintenance",
    "PBX & IP Phone (Intercom) System",
    "Printer & Network Sharing",
    "Digital Solution & Marketing",
    "Electical Solution (IPS & Online UPS)",
    "Professional IT Training"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const typingTextElement = document.getElementById("typingText");

function typeEffect() {
    if (!typingTextElement) return;
    const currentWord = typingWords[wordIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1800);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
        setTimeout(typeEffect, 400);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : typingSpeed);
    }
}
window.addEventListener("DOMContentLoaded", typeEffect);

// 2. Interactive Canvas Particle Background
const canvas = document.getElementById("heroCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let particles = [];

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
if (canvas) resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#00f2fe";
        ctx.fill();
    }
}

function initParticles() {
    if (!canvas) return;
    particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 20), 60);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}
if (canvas) initParticles();

function animateCanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 242, 254, ${1 - dist / 120})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateCanvas);
}
if (canvas) animateCanvas();

// 3. Mobile Menu Drawer Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
}

// 4. Product Category Filter Logic
function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    const tabs = document.querySelectorAll('.product-tab');

    tabs.forEach(tab => {
        if (tab.getAttribute('data-cat') === category) {
            tab.className = "product-tab px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-glow text-navy-900 shadow-neon-sm transition-all";
        } else {
            tab.className = "product-tab px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-navy-800 text-slate-300 hover:text-cyan-glow border border-slate-700 transition-all";
        }
    });

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 5. Global Real-time Search Logic
function handleGlobalSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    const dropdown = document.getElementById('searchDropdown');
    const cards = document.querySelectorAll('.product-card');

    if (query.trim() === "") {
        dropdown.classList.add('hidden');
        cards.forEach(c => c.style.display = 'flex');
        return;
    }

    dropdown.classList.remove('hidden');
    let matches = [];

    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(query)) {
            card.style.display = 'flex';
            matches.push(card.getAttribute('data-title'));
        } else {
            card.style.display = 'none';
        }
    });

    if (matches.length > 0) {
        dropdown.innerHTML = matches.map(m => `
                <div onclick="scrollToProducts()" class="p-2.5 hover:bg-navy-900 text-xs text-cyan-glow font-semibold cursor-pointer rounded-xl border-b border-slate-800/50">
                    <i class="ph-bold ph-arrow-right mr-1.5"></i> ${m}
                </div>
            `).join('');
    } else {
        dropdown.innerHTML = `<div class="p-3 text-xs text-slate-400">No hardware found matching "${query}"</div>`;
    }
}

function handleMobileSearch() {
    const query = document.getElementById('mobileSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(query)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function scrollToProducts() {
    const element = document.getElementById('products');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    const dropdown = document.getElementById('searchDropdown');
    if (dropdown) dropdown.classList.add('hidden');
}

// 6. Modal Open/Close Controls
function openModal(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) targetModal.classList.remove('hidden');
}
function closeModal(id) {
    const targetModal = document.getElementById(id);
    if (targetModal) targetModal.classList.add('hidden');
}

// 7. Product Modal Details
function openProductDetail(title, price, desc) {
    document.getElementById('modalProductTitle').innerText = title;
    document.getElementById('modalProductPrice').innerText = price;
    document.getElementById('modalProductDesc').innerText = desc;

    const msg = encodeURIComponent(`Hello Tech BD, I am interested in purchasing: ${title} (${price})`);
    document.getElementById('modalOrderWhatsApp').href = `https://wa.me/8801516573873?text=${msg}`;

    openModal('productModal');
}

// 8. Quick Enquiry Launcher
function quickEnquiry(serviceName) {
    const msg = encodeURIComponent(`Hello Tech BD IT Solutions, I would like to request an audit/quote for: ${serviceName}`);
    window.open(`https://wa.me/8801516573873?text=${msg}`, '_blank');
}

// 9. Cost Estimator Calculator
function calculateQuote() {
    let total = 0;
    const checks = document.querySelectorAll('.quote-check');
    checks.forEach(c => {
        if (c.checked) total += parseInt(c.value);
    });
    document.getElementById('quoteTotal').innerText = '৳ ' + total.toLocaleString();
}

function sendQuoteToWhatsApp() {
    const total = document.getElementById('quoteTotal').innerText;
    const msg = encodeURIComponent(`Hello Tech BD, I generated an estimated quote on your website for ${total}. Please assist me with further details.`);
    window.open(`https://wa.me/8801516573873?text=${msg}`, '_blank');
}

// 10. Simulated Chatbox Functionality
function toggleChatWindow() {
    const box = document.getElementById('chatBoxWindow');
    if (box) box.classList.toggle('hidden');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const container = document.getElementById('chatMessages');
    if (!input || !input.value.trim()) return;

    const userMsg = document.createElement('div');
    userMsg.className = "bg-cyan-glow/20 text-cyan-glow p-2.5 rounded-xl text-xs border border-cyan-glow/30 text-right";
    userMsg.innerText = input.value;
    container.appendChild(userMsg);

    const userText = input.value;
    input.value = "";
    container.scrollTop = container.scrollHeight;

    // Automated Bot Response Logic
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = "bg-navy-900 p-2.5 rounded-xl text-slate-200 border border-slate-800";

        if (userText.toLowerCase().includes("cctv") || userText.toLowerCase().includes("camera")) {
            botMsg.innerText = "We offer Dahua & Hikvision IP cameras starting from ৳ 2,500! Call 09638665205 for instant catalog.";
        } else if (userText.toLowerCase().includes("mikrotik") || userText.toLowerCase().includes("router")) {
            botMsg.innerText = "Our certified engineers configure Mikrotik load balancing, VLAN, and bandwidth management.";
        } else {
            botMsg.innerText = "Thank you! An engineer will reply shortly. You can also reach hotline: 09638665205";
        }
        container.appendChild(botMsg);
        container.scrollTop = container.scrollHeight;
    }, 800);
}

// 11. Form Submission Handlers
function handleFormSubmit(e) {
    e.preventDefault();
    alert("Thank you! Your inquiry has been dispatched to Tech BD IT Solutions engineering team. We will call you back shortly.");
    e.target.reset();
}

function handleCareerSubmit(e) {
    e.preventDefault();
    alert("Application Received! Our HR team will contact shortlisted candidates.");
    closeModal('careerModal');
}

function handleReviewSubmit(e) {
    e.preventDefault();
    alert("Thank you for your valuable feedback!");
    closeModal('reviewModal');
}