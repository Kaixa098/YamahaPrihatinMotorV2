// ==========================================================================
// YAMAHA PRIHATIN MOTOR — MASTER SCRIPT
// ==========================================================================

const currentPage = document.body.dataset.page || 'beranda';
const OFFICIAL_WA_NUMBER = '6281211117265';
const OFFICIAL_EMAIL = 'prihatinmotor96@gmail.com';
const OFFICIAL_ADDRESS = 'Jl. Raya Narogong No. 10, Cileungsi, Kabupaten Bogor, Jawa Barat';
const OFFICIAL_HOURS = 'Senin - Minggu: 08:00 - 17:00';

// ===== 1. SHARED COMPONENT RENDERER (Single Source of Truth) =====
function initSharedLayout() {
    const navItems = [
        { href: 'index.html', page: 'beranda', label: 'Beranda' },
        { href: 'tentang-kami.html', page: 'tentang', label: 'Tentang Kami' },
        { href: 'layanan.html', page: 'layanan', label: 'Layanan' },
        { href: 'produk.html', page: 'produk', label: 'Tipe Motor' },
        { href: 'keunggulan.html', page: 'keunggulan', label: 'Keunggulan' },
        { href: 'galeri.html', page: 'galeri', label: 'Galeri' },
        { href: 'info.html', page: 'informasi', label: 'Info & Lokasi' },
        { href: 'bantuan.html', page: 'faq', label: 'FAQ' },
        { href: 'hubungi.html', page: 'kontak', label: 'Kontak' },
    ];

    // Check if #navbar element exists or create/fill it
    const navbarEl = document.getElementById('navbar');
    if (navbarEl) {
        navbarEl.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
        navbarEl.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <div class="flex items-center justify-between h-20">
                <a href="index.html" class="flex items-center gap-3 group">
                    <img src="Image/logorevisi.png" alt="Yamaha Prihatin Motor" class="h-14 sm:h-16 w-auto transition-transform group-hover:scale-105">
                </a>
                <div class="hidden xl:flex items-center gap-1">
                    ${navItems.map(item => `
                        <a href="${item.href}" class="nav-link ${currentPage === item.page ? 'active-link' : ''} px-3 py-2 text-xs font-semibold text-white/80 hover:text-white rounded-lg transition-colors">
                            ${item.label}
                        </a>
                    `).join('')}
                </div>
                <div class="hidden sm:flex items-center gap-3">
                    <a href="https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent('Halo Yamaha Prihatin Motor, saya ingin booking servis motor.')}" target="_blank" rel="noopener noreferrer" class="btn-yamaha-primary text-xs py-2.5 px-4 font-bold rounded-xl flex items-center gap-2">
                        <i data-lucide="calendar-check" class="w-4 h-4"></i>
                        <span>Booking Servis</span>
                    </a>
                </div>
                <div class="flex xl:hidden items-center gap-3">
                    <button id="mobileToggle" aria-label="Buka menu navigasi" aria-expanded="false" class="w-10 h-10 flex items-center justify-center text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                        <i data-lucide="menu" class="w-6 h-6"></i>
                    </button>
                </div>
            </div>
        </div>`;
    }

    // Render mobile drawer
    let mobileMenuEl = document.getElementById('mobileMenu');
    if (!mobileMenuEl) {
        mobileMenuEl = document.createElement('div');
        mobileMenuEl.id = 'mobileMenu';
        mobileMenuEl.className = 'mobile-menu';
        document.body.appendChild(mobileMenuEl);
    }
    
    mobileMenuEl.innerHTML = `
        <div class="flex items-center justify-between p-6 border-b border-white/10">
            <a href="index.html"><img src="Image/logorevisi.png" alt="Yamaha Prihatin Motor" class="h-12 w-auto"></a>
            <button id="mobileClose" aria-label="Tutup menu navigasi" class="w-10 h-10 flex items-center justify-center text-white rounded-lg bg-white/10 hover:bg-white/20">
                <i data-lucide="x" class="w-6 h-6"></i>
            </button>
        </div>
        <div class="flex flex-col gap-1 px-6 py-6 overflow-y-auto flex-1">
            ${navItems.map(item => `
                <a href="${item.href}" class="mobile-link ${currentPage === item.page ? 'active-link' : ''} px-4 py-3 text-base font-semibold text-white/80 hover:text-white rounded-xl">
                    ${item.label}
                </a>
            `).join('')}
            <div class="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                <a href="https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent('Halo Yamaha Prihatin Motor, saya ingin konsultasi.')}" target="_blank" rel="noopener noreferrer" class="btn-yamaha-primary py-3 w-full text-center text-sm">
                    <i data-lucide="message-circle" class="w-4 h-4"></i> Chat WhatsApp
                </a>
                <p class="text-xs text-white/50 text-center">Buka Setiap Hari: 08:00 - 17:00 WIB</p>
            </div>
        </div>`;

    // Render Footer
    const footerEl = document.querySelector('footer');
    if (footerEl) {
        const currentYear = new Date().getFullYear();
        footerEl.className = 'bg-[#0A0D14] text-white relative overflow-hidden border-t border-white/10';
        footerEl.innerHTML = `
        <div class="yamaha-stripe"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                <div>
                    <div class="mb-5">
                        <img src="Image/logorevisi.png" alt="Yamaha Prihatin Motor" class="h-14 w-auto">
                    </div>
                    <p class="text-white/60 text-sm leading-relaxed mb-4">
                        Dealer & Bengkel Resmi Yamaha 3S (Sales, Service, Sparepart) terpercaya di Cileungsi, Bogor sejak 1996.
                    </p>
                    <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-amber-400 font-semibold">
                        <i data-lucide="award" class="w-4 h-4"></i> 30 Tahun Melayani (1996–${currentYear})
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-sm text-white tracking-wider uppercase mb-5 border-l-2 border-red-500 pl-3">Jelajahi Menu</h4>
                    <ul class="space-y-2.5 text-sm text-white/60">
                        <li><a href="index.html" class="hover:text-red-400 transition-colors">Beranda</a></li>
                        <li><a href="tentang-kami.html" class="hover:text-red-400 transition-colors">Tentang Kami</a></li>
                        <li><a href="layanan.html" class="hover:text-red-400 transition-colors">Layanan 3S</a></li>
                        <li><a href="produk.html" class="hover:text-red-400 transition-colors">Katalog Tipe Motor</a></li>
                        <li><a href="keunggulan.html" class="hover:text-red-400 transition-colors">Keunggulan Dealer</a></li>
                        <li><a href="galeri.html" class="hover:text-red-400 transition-colors">Galeri Bengkel & Showroom</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-sm text-white tracking-wider uppercase mb-5 border-l-2 border-red-500 pl-3">Layanan Kami</h4>
                    <ul class="space-y-2.5 text-sm text-white/60">
                        <li><a href="layanan.html" class="hover:text-red-400 transition-colors">Penjualan Motor Baru (Sales)</a></li>
                        <li><a href="layanan.html" class="hover:text-red-400 transition-colors">Servis Berkala & Tune Up</a></li>
                        <li><a href="layanan.html" class="hover:text-red-400 transition-colors">Overhaul & Turun Mesin</a></li>
                        <li><a href="layanan.html" class="hover:text-red-400 transition-colors">Yamaha Genuine Parts (YGP)</a></li>
                        <li><a href="bantuan.html" class="hover:text-red-400 transition-colors">Tanya Jawab (FAQ)</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-sm text-white tracking-wider uppercase mb-5 border-l-2 border-red-500 pl-3">Kontak & Lokasi</h4>
                    <ul class="space-y-3 text-sm text-white/60">
                        <li class="flex items-start gap-2.5">
                            <i data-lucide="map-pin" class="w-4 h-4 mt-1 text-red-500 flex-shrink-0"></i>
                            <span>${OFFICIAL_ADDRESS} (Seberang Mall Cileungsi Trade Center)</span>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <i data-lucide="phone" class="w-4 h-4 text-red-500 flex-shrink-0"></i>
                            <a href="tel:+6281211117265" class="hover:text-white transition-colors">(+62) 812-1111-7265</a>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <i data-lucide="mail" class="w-4 h-4 text-red-500 flex-shrink-0"></i>
                            <a href="mailto:${OFFICIAL_EMAIL}" class="hover:text-white transition-colors">${OFFICIAL_EMAIL}</a>
                        </li>
                        <li class="flex items-center gap-2.5">
                            <i data-lucide="clock" class="w-4 h-4 text-red-500 flex-shrink-0"></i>
                            <span>${OFFICIAL_HOURS}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="border-t border-white/10 bg-black/40">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-white/40 text-xs text-center sm:text-left">
                    &copy; ${currentYear} Yamaha Prihatin Motor. Seluruh hak cipta dilindungi.
                </p>
                <div class="flex items-center gap-3">
                    <span class="text-white/40 text-xs font-semibold uppercase tracking-wider mr-1">Media Sosial:</span>
                    <a href="https://www.instagram.com/yamaha_prihatinmotor/" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-red-600 transition-colors" aria-label="Instagram">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.198-4.354-2.618-6.782-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://www.facebook.com/YamahaPrihatinMotor1" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-blue-600 transition-colors" aria-label="Facebook">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.6 0 0 .6 0 1.325v21.351C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.676V1.325C24 .6 23.4 0 22.675 0z"/></svg>
                    </a>
                    <a href="https://tiktok.com/@yamaha_prihatinmotor" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-neutral-800 transition-colors" aria-label="TikTok">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </a>
                </div>
            </div>
        </div>`;
    }

    // Render Floating WhatsApp Beacon
    let waFloatEl = document.getElementById('waFloat');
    if (!waFloatEl) {
        waFloatEl = document.createElement('a');
        waFloatEl.id = 'waFloat';
        waFloatEl.href = `https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent('Halo Yamaha Prihatin Motor, saya ingin bertanya tentang layanan & motor.')}`;
        waFloatEl.target = '_blank';
        waFloatEl.rel = 'noopener noreferrer';
        waFloatEl.setAttribute('aria-label', 'Chat WhatsApp Yamaha Prihatin Motor');
        waFloatEl.innerHTML = `
            <span class="wa-pulse-beacon"></span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span class="hidden sm:inline">WhatsApp Kami</span>
        `;
        document.body.appendChild(waFloatEl);
    }
}

initSharedLayout();

// ===== 2. PRELOADER =====
const preloader = document.getElementById('preloader');
if (preloader) {
    if (sessionStorage.getItem('preloaderDone')) {
        preloader.style.display = 'none';
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                sessionStorage.setItem('preloaderDone', 'true');
            }, 1200);
        });
    }
}

// ===== 3. SCROLL PROGRESS & NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = progress + '%';

    if (navbar) {
        if (scrollTop > 40) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
});

// ===== 4. MOBILE MENU INTERACTIVITY =====
const mobileToggle = document.getElementById('mobileToggle');
const mobileClose = document.getElementById('mobileClose');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
        mobileToggle.setAttribute('aria-expanded', 'true');
    });
}

if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===== 5. SCROLL ANIMATIONS (INTERSECTION OBSERVER) =====
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

// ===== 6. BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== 6b. FLOATING SOCIAL FAB TOGGLE (MOBILE, BERANDA) =====
const socialFabToggle = document.getElementById('socialFabToggle');
const socialFabWrap = document.querySelector('.social-fab-wrap');
if (socialFabToggle && socialFabWrap) {
    socialFabToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = socialFabWrap.classList.toggle('open');
        socialFabToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', (e) => {
        if (socialFabWrap.classList.contains('open') && !socialFabWrap.contains(e.target)) {
            socialFabWrap.classList.remove('open');
            socialFabToggle.setAttribute('aria-expanded', 'false');
        }
    });
    // Auto-close saat salah satu ikon medsos ditekan
    socialFabWrap.querySelectorAll('.social-fab-item').forEach(item => {
        item.addEventListener('click', () => {
            socialFabWrap.classList.remove('open');
            socialFabToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// ===== 7. COUNTER ANIMATION =====
function animateCounters(scope) {
    scope.querySelectorAll('.counter').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;
        const duration = 1600;
        const startTime = performance.now();
        function updateCount(time) {
            const progress = Math.min((time - startTime) / duration, 1);
            const current = Math.floor(progress * target);
            el.textContent = current.toLocaleString('id-ID');
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = target.toLocaleString('id-ID');
            }
        }
        requestAnimationFrame(updateCount);
    });

    scope.querySelectorAll('.counter-decimal').forEach(el => {
        const target = parseFloat(el.dataset.target);
        if (isNaN(target)) return;
        const duration = 1600;
        const startTime = performance.now();
        function updateDecimal(time) {
            const progress = Math.min((time - startTime) / duration, 1);
            const current = (progress * target).toFixed(1);
            el.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(updateDecimal);
            } else {
                el.textContent = target.toFixed(1);
            }
        }
        requestAnimationFrame(updateDecimal);
    });
}

document.querySelectorAll('.counter-group').forEach(group => {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters(group);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    counterObserver.observe(group);
});

// ===== 8. BERANDA: CANVAS PARTICLES & TYPING EFFECT =====
if (currentPage === 'beranda') {
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 35; i++) particles.push(new Particle());

        let rafId;
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            rafId = requestAnimationFrame(animateParticles);
        }
        animateParticles();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(rafId);
            else animateParticles();
        });
    }

    const typingEl = document.getElementById('typingText');
    if (typingEl) {
        const text = 'Dealer & Bengkel Resmi Yamaha 3S sejak 1996 di Cileungsi. Servis presisi dengan sparepart 100% original, garansi 30 hari, dan mekanik bersertifikat Yamaha Technical Academy.';
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                typingEl.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 25);
            }
        }
        setTimeout(typeChar, 400);
    }
}

// ===== 9. KATALOG MOTOR YAMAHA (DATA MASTER RESMI PER AGUSTUS 2026) =====
const motorList = [
    // ===== 1. MAXi =====
    { 
        name: 'TMAX', 
        slug: 'tmax', 
        category: 'maxi', 
        categoryLabel: 'MAXi', 
        cc: '562cc', 
        desc: 'Flagship super sport scooter premium dengan mesin 2 silinder 562cc, Electronic Throttle D-Mode, Cruise Control, dan Traction Control.', 
        image: 'PotoMotor/TIPE_MAXI/TMAX/TMAX Tech MAX.png',
        variants: [
            { variant: 'TMAX Tech MAX', image: 'PotoMotor/TIPE_MAXI/TMAX/TMAX Tech MAX.png', colors: ['Dark Petrol', 'Power Grey'], price: 455000000 },
            { variant: 'TMAX Special Livery', image: 'PotoMotor/TIPE_MAXI/TMAX/TMAX.png', colors: ['Racing Livery Special'], price: 475000000 },
        ] 
    },
    { 
        name: 'XMAX 250 Connected', 
        slug: 'xmax-250', 
        category: 'maxi', 
        categoryLabel: 'MAXi', 
        cc: '250cc', 
        desc: 'Skutik premium 250cc dengan navigasi Garmin terintegrasi, TFT Infotainment Display, dan Traction Control System.', 
        image: 'PotoMotor/TIPE_MAXI/XMAX/XMAX 250 CONNECTED.png',
        variants: [
            { variant: 'XMAX 250 Connected', image: 'PotoMotor/TIPE_MAXI/XMAX/XMAX 250 CONNECTED.png', colors: ['Fabulous Matte Black', 'Fabulous White'], price: 69215000 },
            { variant: 'XMAX 250 MAX Special Livery', image: 'PotoMotor/TIPE_MAXI/XMAX/XMAX 250 MAX Special Livery.png', colors: ['Radiant Red Black'], price: 70415000 },
            { variant: 'XMAX 250 Tech MAX', image: 'PotoMotor/TIPE_MAXI/XMAX/XMAX 250 TECH MAX.png', colors: ['Radiant Brown Black', 'Radiant Silver Black'], price: 77410000 },
        ] 
    },
    { 
        name: 'NMAX Turbo', 
        slug: 'nmax-turbo', 
        category: 'maxi', 
        categoryLabel: 'MAXi', 
        cc: '155cc', 
        desc: 'Skutik bertenaga dengan teknologi revolusioner Y-ECVT "TURBO" dan fitur Y-Shift untuk sensasi akselerasi instan.', 
        image: 'PotoMotor/TIPE_MAXI/NMAX/Turbo.png',
        variants: [
            { variant: 'NMAX Neo', image: 'PotoMotor/TIPE_MAXI/NMAX/Neo Version.png', colors: ['Matte Blue', 'Red', 'White', 'Black'], price: 34065000 },
            { variant: 'NMAX Neo S', image: 'PotoMotor/TIPE_MAXI/NMAX/Neo S Version.png', colors: ['Matte Blue', 'Red', 'White', 'Black'], price: 35055000 },
            { variant: 'NMAX Neo Special Livery', image: 'PotoMotor/TIPE_MAXI/NMAX/Neo Max Special Livery.png', colors: ['Neo Special Livery Edition'], price: 35565000 },
            { variant: 'NMAX Turbo', image: 'PotoMotor/TIPE_MAXI/NMAX/Turbo.png', colors: ['Ceramic Grey', 'Elixir Dark Silver', 'Magma Black'], price: 38965000 },
            { variant: 'NMAX Turbo Tech MAX', image: 'PotoMotor/TIPE_MAXI/NMAX/TURBO Tech Max.png', colors: ['Magma Black', 'Ceramic Grey'], price: 44465000 },
            { variant: 'NMAX Turbo Tech MAX Ultimate', image: 'PotoMotor/TIPE_MAXI/NMAX/TURBO Tech Max Ultimate.png', colors: ['Magma Black Performance'], price: 46445000 },
            { variant: 'NMAX Turbo Tech MAX Special Livery', image: 'PotoMotor/TIPE_MAXI/NMAX/TURBO Tech Max Special Livery.png', colors: ['Special Livery Performance'], price: 45465000 },
        ] 
    },
    { 
        name: 'NMAX 155 Connected', 
        slug: 'nmax-155', 
        category: 'maxi', 
        categoryLabel: 'MAXi', 
        cc: '155cc', 
        desc: 'Skutik MAXi legendaris berfitur Y-Connect, Traction Control System (TCS), dan Smart Key System.', 
        image: 'PotoMotor/TIPE_MAXI/NMAX 155/ConnectedABS.png',
        variants: [
            { variant: 'NMAX 155 Standard', image: 'PotoMotor/TIPE_MAXI/NMAX 155/Standard.png', colors: ['Matte Black', 'Matte Blue', 'Metallic Red'], price: 32175000 },
            { variant: 'NMAX 155 S Version', image: 'PotoMotor/TIPE_MAXI/NMAX 155/S Version.png', colors: ['Matte Black', 'Matte Red', 'Prestige Silver'], price: 33175000 },
            { variant: 'NMAX 155 Connected/ABS', image: 'PotoMotor/TIPE_MAXI/NMAX 155/ConnectedABS.png', colors: ['Prestige Silver', 'Maxi Signature Black'], price: 36300000 },
        ] 
    },
    { 
        name: 'Aerox Alpha', 
        slug: 'aerox-alpha', 
        category: 'maxi', 
        categoryLabel: 'MAXi', 
        cc: '155cc', 
        desc: 'Super Sport Scooter agresif dengan mesin 155cc Blue Core VVA generasi terkini dan sensasi performa Y-ECVT TURBO.', 
        image: 'PotoMotor/TIPE_MAXI/AEROX ALPHA/Turbo.png',
        variants: [
            { variant: 'Aerox Alpha Standard', image: 'PotoMotor/TIPE_MAXI/AEROX ALPHA/Standard.png', colors: ['Cyber Black', 'Racing Blue', 'Power Red'], price: 30200000 },
            { variant: 'Aerox Alpha CyberCity', image: 'PotoMotor/TIPE_MAXI/AEROX ALPHA/CyberCity.png', colors: ['Matte Purple Cyber', 'Matte Blue Red'], price: 30750000 },
            { variant: 'Aerox Alpha CyberCity ABS', image: 'PotoMotor/TIPE_MAXI/AEROX ALPHA/CyberCity ABS.png', colors: ['Matte Purple Black ABS', 'White Pearl Blue ABS'], price: 34290000 },
            { variant: 'Aerox Alpha Turbo', image: 'PotoMotor/TIPE_MAXI/AEROX ALPHA/Turbo.png', colors: ['Elixir Dark Silver'], price: 39550000 },
            { variant: 'Aerox Alpha Turbo 70th Livery', image: 'PotoMotor/TIPE_MAXI/AEROX ALPHA/Turbo 70th Livery.png', colors: ['70th Anniversary Yamaha Livery'], price: 39950000 },
            { variant: 'Aerox Alpha Turbo Ultimate', image: 'PotoMotor/TIPE_MAXI/AEROX ALPHA/Turbo Ultimate.png', colors: ['Magma Performance Dark'], price: 41500000 },
        ] 
    },
    { 
        name: 'Aerox 155 Connected', 
        slug: 'aerox-155', 
        category: 'maxi', 
        categoryLabel: 'MAXi', 
        cc: '155cc', 
        desc: 'Sport scooter berjiwa balap dengan Power weight ratio tertinggi di kelasnya, fitur Y-Connect, dan Smart Key.', 
        image: 'PotoMotor/TIPE_MAXI/AEROX 155/ConnectedABS.png',
        variants: [
            { variant: 'Aerox 155 Standard', image: 'PotoMotor/TIPE_MAXI/AEROX 155/Standard.png', colors: ['Dull Blue', 'Silver Cyan', 'Metallic Red', 'Black'], price: 28880000 },
            { variant: 'Aerox 155 CyberCity', image: 'PotoMotor/TIPE_MAXI/AEROX 155/CyberCity.png', colors: ['CyberCity Camo Livery'], price: 29080000 },
            { variant: 'Aerox 155 Connected/ABS', image: 'PotoMotor/TIPE_MAXI/AEROX 155/ConnectedABS.png', colors: ['Maxi Signature Black Gold', 'Prestige Silver'], price: 32615000 },
        ] 
    },
    { 
        name: 'LEXi LX 155', 
        slug: 'lexi-lx-155', 
        category: 'maxi', 
        categoryLabel: 'MAXi', 
        cc: '155cc', 
        desc: 'Skutik MAXi berlantai rata yang praktis dan elegan dengan mesin bertenaga Blue Core 155cc VVA generasi terbaru.', 
        image: 'PotoMotor/TIPE_MAXI/LEXi LX 155/ConnectedABS.png',
        variants: [
            { variant: 'LEXi LX 155 Standard', image: 'PotoMotor/TIPE_MAXI/LEXi LX 155/Standard.png', colors: ['Matte Green', 'Metallic Black', 'Ceramic Grey'], price: 27350000 },
            { variant: 'LEXi LX 155 S Version', image: 'PotoMotor/TIPE_MAXI/LEXi LX 155/S Version.png', colors: ['Magma Black', 'Elixir Dark Silver'], price: 29150000 },
            { variant: 'LEXi LX 155 Connected/ABS', image: 'PotoMotor/TIPE_MAXI/LEXi LX 155/ConnectedABS.png', colors: ['Magma Black ABS'], price: 32000000 },
        ] 
    },

    // ===== 2. Classy =====
    { 
        name: 'Grand Filano', 
        slug: 'grand-filano', 
        category: 'classy', 
        categoryLabel: 'Classy', 
        cc: '125cc', 
        desc: 'Skutik neo-retro berkelas dengan mesin Blue Core Hybrid 125cc, bagasi luas 27 liter, TFT Sub Display, dan desain berkelas Eropa.', 
        image: 'PotoMotor/TIPE_CLASSY/GRAND FILANO/Grand Filano HYBRID LUX.png',
        variants: [
            { variant: 'Grand Filano Hybrid Neo', image: 'PotoMotor/TIPE_CLASSY/GRAND FILANO/GRAND FILANO HYBRID NEO.png', colors: ['Prime Gray', 'Greenish Gray', 'Pink Mauve', 'Essential White'], price: 28315000 },
            { variant: 'Grand Filano Hybrid Lux', image: 'PotoMotor/TIPE_CLASSY/GRAND FILANO/Grand Filano HYBRID LUX.png', colors: ['Royal Iron', 'Magma Black'], price: 28795000 },
        ] 
    },
    { 
        name: 'Fazzio', 
        slug: 'fazzio', 
        category: 'classy', 
        categoryLabel: 'Classy', 
        cc: '125cc', 
        desc: 'Skutik stylish retro-modern dengan Blue Core Hybrid, Smart Key System, dan ruang bagasi serbaguna untuk gaya hidup urban.', 
        image: 'PotoMotor/TIPE_CLASSY/FAZZIO/FAZZIO HYBRID LUX.png',
        variants: [
            { variant: 'Fazzio Hybrid Neo', image: 'PotoMotor/TIPE_CLASSY/FAZZIO/FAZZIO HYBRID NEO.png', colors: ['Go Purple', 'Pink Mauve', 'White Neo', 'Green Neo'], price: 22470000 },
            { variant: 'Fazzio Hybrid Lux', image: 'PotoMotor/TIPE_CLASSY/FAZZIO/FAZZIO HYBRID LUX.png', colors: ['Greenish Gray Lux', 'Titanium Lux'], price: 24745000 },
            { variant: 'Fazzio Special Edition Starry Night', image: 'PotoMotor/TIPE_CLASSY/FAZZIO/FAZZIO SPECIAL EDITION STARRY NIGHT.png', colors: ['Starry Night Limited Edition'], price: 25100000 },
            { variant: 'Fazzio Special Edition Sunset Blue', image: 'PotoMotor/TIPE_CLASSY/FAZZIO/FAZZIO SPECIAL EDITION SUNSET BLUE.png', colors: ['Sunset Blue Limited Edition'], price: 25100000 },
        ] 
    },

    // ===== 3. Matic =====
    { 
        name: 'FreeGo 125', 
        slug: 'freego-125', 
        category: 'matic', 
        categoryLabel: 'Matic', 
        cc: '125cc', 
        desc: 'Skutik keluarga pintar dengan pengisian bensin praktis di depan (Smart Front Refuel) dan bagasi luas 25 liter.', 
        image: 'PotoMotor/TIPE_MATIC/FREEGO 125/FREEGO 125 CONNECTED.png',
        variants: [
            { variant: 'FreeGo 125 Standard', image: 'PotoMotor/TIPE_MATIC/FREEGO 125/FREEGO 125 STANDARD.png', colors: ['Metallic Red', 'Matte Black', 'Metallic Blue'], price: 22865000 },
            { variant: 'FreeGo 125 Connected', image: 'PotoMotor/TIPE_MATIC/FREEGO 125/FREEGO 125 CONNECTED.png', colors: ['Matte Green', 'Silver Connected'], price: 24650000 },
            { variant: 'FreeGo 125 Grande', image: 'PotoMotor/TIPE_MATIC/FINO 125/FREEGO 125 GRANDE.png', colors: ['Matte Blue Grande', 'Matte White'], price: 24950000 },
        ] 
    },
    { 
        name: 'X-Ride 125', 
        slug: 'xride-125', 
        category: 'matic', 
        categoryLabel: 'Matic', 
        cc: '125cc', 
        desc: 'Skutik bergaya adventure dengan ground clearance tinggi, stang lebar ala motor trail, dan suspensi sub-tank.', 
        image: 'PotoMotor/TIPE_MATIC/X RIDE 125.png',
        variants: [
            { variant: 'X-Ride 125 Adventure', image: 'PotoMotor/TIPE_MATIC/X RIDE 125.png', colors: ['Sand Matte', 'Black Red', 'Cyan Yellow'], price: 21135000 },
        ] 
    },
    { 
        name: 'Gear 125', 
        slug: 'gear-125', 
        category: 'matic', 
        categoryLabel: 'Matic', 
        cc: '125cc', 
        desc: 'Matic multiguna tangguh dengan double hook, electric power socket, dan mesin Blue Core 125cc yang hemat dan responsif.', 
        image: 'PotoMotor/TIPE_MATIC/GEAR 125 STANDARD.png',
        variants: [
            { variant: 'Gear 125 Standard', image: 'PotoMotor/TIPE_MATIC/GEAR 125 STANDARD.png', colors: ['Matte Black', 'Red Cyan', 'Blue Navy'], price: 18040000 },
            { variant: 'Gear Ultima Hybrid', image: 'PotoMotor/TIPE_MATIC/GEAR ULTIMA/GEAR ULTIMA HYBRID.png', colors: ['Solid Black', 'Pure White'], price: 20660000 },
            { variant: 'Gear Ultima Hybrid Solid', image: 'PotoMotor/TIPE_MATIC/GEAR ULTIMA/GEAR ULTIMA HYBRID SOLID.png', colors: ['Solid Navy Red'], price: 21200000 },
            { variant: 'Gear Ultima Hybrid Smart', image: 'PotoMotor/TIPE_MATIC/GEAR ULTIMA/GEAR ULTIMA HYBRID SMART.png', colors: ['Magma Black', 'Matte Blue'], price: 22785000 },
        ] 
    },
    { 
        name: 'Mio M3 125', 
        slug: 'mio-m3', 
        category: 'matic', 
        categoryLabel: 'Matic', 
        cc: '125cc', 
        desc: 'Matic sporty legendaris yang lincah, ekonomis, dan terbukti tangguh untuk mobilitas perkotaan harian.', 
        image: 'PotoMotor/TIPE_MATIC/MIO M3 125.png',
        variants: [
            { variant: 'Mio M3 125 CW', image: 'PotoMotor/TIPE_MATIC/MIO M3 125.png', colors: ['Metallic Black', 'Metallic Red', 'Metallic Blue', 'Cyan White'], price: 18905000 },
        ] 
    },
    { 
        name: 'Fino 125', 
        slug: 'fino-125', 
        category: 'matic', 
        categoryLabel: 'Matic', 
        cc: '125cc', 
        desc: 'Skutik retro klasik dengan sentuhan gaya elegan, mesin 125cc Blue Core, Advance Key System, dan lampu LED diamond cut.', 
        image: 'PotoMotor/TIPE_MATIC/FINO 125/FINO 125 PREMIUM.png',
        variants: [
            { variant: 'Fino 125 Sporty', image: 'PotoMotor/TIPE_MATIC/FINO 125/FINO 125 SPORTY.png', colors: ['Sporty White', 'Sporty Red', 'Sporty Black'], price: 20400000 },
            { variant: 'Fino 125 Premium', image: 'PotoMotor/TIPE_MATIC/FINO 125/FINO 125 PREMIUM.png', colors: ['Black Espresso', 'Caramel Brown', 'White Latte'], price: 20400000 },
        ] 
    },

    // ===== 4. Sport =====
    { 
        name: 'YZF-R25', 
        slug: 'r25', 
        category: 'sport', 
        categoryLabel: 'Sport', 
        cc: '250cc', 
        desc: 'Sportbike murni 2 silinder 250cc DOHC berpendingin cairan dengan suspensi Upside Down dan sistem pengereman ABS.', 
        image: 'PotoMotor/TIPE_SPORT/R25.png',
        variants: [
            { variant: 'YZF-R25 ABS Dual Channel', image: 'PotoMotor/TIPE_SPORT/R25.png', colors: ['Racing Blue', 'Metallic Black'], price: 74250000 },
        ] 
    },
    { 
        name: 'YZF-R15 Connected', 
        slug: 'r15', 
        category: 'sport', 
        categoryLabel: 'Sport', 
        cc: '155cc', 
        desc: 'Motor sport fairing berkarakter DNA balap YZR-M1 dengan rangka Deltabox, Quick Shifter, Traction Control, dan Assist & Slipper Clutch.', 
        image: 'PotoMotor/TIPE_SPORT/R15/R15 CONNECTED.png',
        variants: [
            { variant: 'R15 Connected', image: 'PotoMotor/TIPE_SPORT/R15/R15 CONNECTED.png', colors: ['Icon Performance Blue', 'Tech Black'], price: 40850000 },
            { variant: 'R15M Connected ABS', image: 'PotoMotor/TIPE_SPORT/R15/R15M CONNECTED ABS.png', colors: ['Icon Performance Silver Black'], price: 45600000 },
            { variant: 'R15M ABS 70th Livery', image: 'PotoMotor/TIPE_SPORT/R15/R15M ABS 70TH LIVERY.png', colors: ['70th Anniversary World GP Livery'], price: 46100000 },
        ] 
    },
    { 
        name: 'MT-25', 
        slug: 'mt-25', 
        category: 'sport', 
        categoryLabel: 'Sport', 
        cc: '250cc', 
        desc: 'Hyper naked bike 250cc 2-silinder bertenaga buas dengan filosofi "Dark Side of Japan" dan posisi berkendara tegap.', 
        image: 'PotoMotor/TIPE_SPORT/MT-25.png',
        variants: [
            { variant: 'MT-25 Naked', image: 'PotoMotor/TIPE_SPORT/MT-25.png', colors: ['Matte Dark Grey', 'Metallic Cyan'], price: 60525000 },
        ] 
    },
    { 
        name: 'MT-15', 
        slug: 'mt-15', 
        category: 'sport', 
        categoryLabel: 'Sport', 
        cc: '155cc', 
        desc: 'Streetfighter 155cc VVA berkarakter liar dengan suspensi Upside Down, rangka Deltabox kokoh, dan lampu depan Predator LED.', 
        image: 'PotoMotor/TIPE_SPORT/MT-15.png',
        variants: [
            { variant: 'MT-15 Streetfighter', image: 'PotoMotor/TIPE_SPORT/MT-15.png', colors: ['Metallic Cyan', 'Tech Black'], price: 39515000 },
        ] 
    },
    { 
        name: 'Vixion', 
        slug: 'vixion', 
        category: 'sport', 
        categoryLabel: 'Sport', 
        cc: '150-155cc', 
        desc: 'Naked bike legendaris andalan jutaan bikers Indonesia dengan teknologi Assist & Slipper Clutch, rangka Deltabox kokoh, dan pilihan mesin 150cc FI serta 155cc LC4V VVA.', 
        image: 'PotoMotor/TIPE_SPORT/VIXION/VIXION 150.png',
        variants: [
            { variant: 'All New Vixion 150', image: 'PotoMotor/TIPE_SPORT/VIXION/VIXION 150.png', colors: ['Matte Black', 'Red Metallic'], price: 30150000 },
            { variant: 'All New Vixion R 155', image: 'PotoMotor/TIPE_SPORT/VIXION/VIXION R 155.png', colors: ['Matte Blue', 'Metallic Silver'], price: 33720000 },
        ] 
    },
    { 
        name: 'XSR 155', 
        slug: 'xsr155', 
        category: 'sport', 
        categoryLabel: 'Sport', 
        cc: '155cc', 
        desc: 'Motor sport neo-retro berjiwa "Born to be Free" yang memadukan desain klasik timeless dengan performa mesin modern 155cc VVA.', 
        image: 'PotoMotor/TIPE_SPORT/XSR 155/XSR 155.png',
        variants: [
            { variant: 'XSR 155 Standard', image: 'PotoMotor/TIPE_SPORT/XSR 155/XSR 155.png', colors: ['Matte Black Elegance', 'Metallic Red Heritage', 'Light Silver'], price: 39065000 },
            { variant: 'XSR 155 70th Livery', image: 'PotoMotor/TIPE_SPORT/XSR 155/XSR 155 70TH LIVERY.png', colors: ['70th Anniversary World GP Livery'], price: 39465000 },
        ] 
    },

    // ===== 5. Off-Road =====
    { 
        name: 'WR 155 R', 
        slug: 'wr155r', 
        category: 'offroad', 
        categoryLabel: 'Off-Road', 
        cc: '155cc', 
        desc: 'Motor trail dual-purpose terkuat di kelasnya dengan mesin 155cc VVA berpendingin cairan, suspensi teleskopik panjang 41mm, dan rangka semi-double cradle.', 
        image: 'PotoMotor/TIPE_OFFROAD/WR155R.png',
        variants: [
            { variant: 'WR 155 R Adventure', image: 'PotoMotor/TIPE_OFFROAD/WR155R.png', colors: ['Yamaha Racing Blue', 'Yamaha Black Aggressive'], price: 39675000 },
        ] 
    },
    { 
        name: 'YZ125X', 
        slug: 'yz125x', 
        category: 'offroad', 
        categoryLabel: 'Off-Road', 
        cc: '125cc', 
        desc: 'Motor cross & enduro 2-tak kompetisi resmi Yamaha dengan performa mesin agresif dan suspensi KYB racing kelas dunia.', 
        image: 'PotoMotor/TIPE_OFFROAD/YZ125X.png',
        variants: [
            { variant: 'YZ125X Enduro Competition', image: 'PotoMotor/TIPE_OFFROAD/YZ125X.png', colors: ['Yamaha Racing Blue'], price: 97000000 },
        ] 
    },
    { 
        name: 'YZ250', 
        slug: 'yz250', 
        category: 'offroad', 
        categoryLabel: 'Off-Road', 
        cc: '250cc', 
        desc: 'Motor kompetisi off-road murni 250cc untuk para crosser profesional dan penjelajah medan ekstrem.', 
        image: 'PotoMotor/TIPE_OFFROAD/YZ250X.png',
        variants: [
            { variant: 'YZ250X Enduro Competition', image: 'PotoMotor/TIPE_OFFROAD/YZ250X.png', colors: ['Yamaha Racing Blue'], price: 129000000 },
            { variant: 'YZ250FX Cross Country', image: 'PotoMotor/TIPE_OFFROAD/YZ250FX.png', colors: ['Yamaha Racing Blue'], price: 135000000 },
        ] 
    },

    // ===== 6. Moped =====
    { 
        name: 'MX King 150', 
        slug: 'mx-king', 
        category: 'moped', 
        categoryLabel: 'Moped', 
        cc: '150cc', 
        desc: 'Raja motor bebek super bertenaga 150cc Fuel Injection berpendingin cairan dengan desain agresif ala motor balap underbone.', 
        image: 'PotoMotor/TIPE_MOPED/MX KING 150/MX KING 150.png',
        variants: [
            { variant: 'MX King 150 Standard', image: 'PotoMotor/TIPE_MOPED/MX KING 150/MX KING 150.png', colors: ['Cyber Red', 'Racing Blue', 'Tech Dark'], price: 26825000 },
            { variant: 'MX King 150 70th Livery', image: 'PotoMotor/TIPE_MOPED/MX KING 150/MX KING 150 70TH LIVERY.png', colors: ['70th Anniversary Livery'], price: 27025000 },
            { variant: 'MX King 150 Prima Pramac Livery', image: 'PotoMotor/TIPE_MOPED/MX KING 150/MX KING 150 PRIMA PRAMAC LIVERY.png', colors: ['Prima Pramac Racing Livery'], price: 27225000 },
        ] 
    },
    { 
        name: 'Jupiter Z1', 
        slug: 'jupiter-z1', 
        category: 'moped', 
        categoryLabel: 'Moped', 
        cc: '115cc', 
        desc: 'Motor bebek tangguh, irit, dan responsif dengan teknologi Forged Piston dan Fuel Injection yang telah terbukti puluhan tahun.', 
        image: 'PotoMotor/TIPE_MOPED/JUPITER Z1.png',
        variants: [
            { variant: 'Jupiter Z1 Fuel Injection', image: 'PotoMotor/TIPE_MOPED/JUPITER Z1.png', colors: ['Metallic Black', 'Metallic Red', 'Metallic Blue'], price: 20690000 },
        ] 
    },
    { 
        name: 'Vega Force', 
        slug: 'vega-force', 
        category: 'moped', 
        categoryLabel: 'Moped', 
        cc: '115cc', 
        desc: 'Pilihan motor bebek paling ekonomis dan tangguh untuk operasional niaga dan kebutuhan transportasi harian.', 
        image: 'PotoMotor/TIPE_MOPED/VEGA FORCE.png',
        variants: [
            { variant: 'Vega Force DB CW', image: 'PotoMotor/TIPE_MOPED/VEGA FORCE.png', colors: ['Metallic Black', 'Metallic Red'], price: 18850000 },
        ] 
    },
];

const categoryList = [
    { slug: 'maxi', label: 'MAXi', icon: 'gauge', image: 'PotoMotor/TIPE_MAXI/NMAX/Turbo.png', tagline: 'Skutik premium bertenaga besar dengan teknologi dan fitur kelas atas.' },
    { slug: 'classy', label: 'Classy', icon: 'sparkles', image: 'PotoMotor/TIPE_CLASSY/GRAND FILANO/Grand Filano HYBRID LUX.png', tagline: 'Skutik retro modern elegan dengan sentuhan gaya berkelas.' },
    { slug: 'matic', label: 'Matic', icon: 'circle-dot', image: 'PotoMotor/TIPE_MATIC/FREEGO 125/FREEGO 125 CONNECTED.png', tagline: 'Skutik harian serba bisa, lincah, dan irit untuk mobilitas kota.' },
    { slug: 'sport', label: 'Sport', icon: 'flame', image: 'PotoMotor/TIPE_SPORT/R15/R15 CONNECTED.png', tagline: 'Performa tinggi, DNA balap Yamaha MotoGP, serta gaya neo-retro Sport Heritage.' },
    { slug: 'offroad', label: 'Off-Road', icon: 'mountain', image: 'PotoMotor/TIPE_OFFROAD/WR155R.png', tagline: 'Tangguh di segala medan, dirancang untuk para penjelajah petualang sejati.' },
    { slug: 'moped', label: 'Moped', icon: 'bike', image: 'PotoMotor/TIPE_MOPED/MX KING 150/MX KING 150.png', tagline: 'Motor bebek legendaris yang irit, tangguh, dan andal untuk setiap hari.' },
];

function categoryCover(slug) {
    const cat = categoryList.find(c => c.slug === slug);
    if (cat && cat.image) return cat.image;
    const item = motorList.find(m => m.category === slug && m.image && m.image.trim() !== '');
    if (item) return item.image;
    return 'PotoMotor/TIPE_MAXI/NMAX/Turbo.png';
}

function formatRupiah(n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function motorDetailUrl(slug) {
    return 'motor-detail.html?motor=' + encodeURIComponent(slug);
}

// ===== 10. HALAMAN PRODUK / KATALOG MOTOR (produk.html) =====
if (currentPage === 'produk') {
    const categoryView = document.getElementById('categoryView');
    const modelView = document.getElementById('modelView');
    const categoryGrid = document.getElementById('categoryGrid');
    const produkGrid = document.getElementById('produkGrid');
    const noResults = document.getElementById('noResults');
    const backToCategoryBtn = document.getElementById('backToCategoryBtn');
    const modelViewCategoryLabel = document.getElementById('modelViewCategoryLabel');
    const modelViewTitle = document.getElementById('modelViewTitle');
    const modelViewDesc = document.getElementById('modelViewDesc');

    function renderCategoryGrid() {
        if (!categoryGrid) return;
        categoryGrid.innerHTML = categoryList.map((c, idx) => {
            const count = motorList.filter(m => m.category === c.slug).length;
            const coverImg = categoryCover(c.slug);
            return `
            <a href="produk.html?kategori=${c.slug}" data-category="${c.slug}" class="category-card card-hover block rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm transition-all duration-300">
                <div class="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-slate-800 to-slate-950 flex items-center justify-center p-6">
                    <img src="${coverImg}" alt="Kategori ${c.label}" loading="lazy" class="w-full h-full object-contain transition-transform duration-500 category-card-img drop-shadow-2xl">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-black/30 pointer-events-none"></div>
                    <span class="absolute top-3 right-3 text-xs font-bold text-white bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-white/10 shadow">${count} Model</span>
                    <span class="absolute bottom-3 left-4 text-white font-black text-2xl tracking-tight drop-shadow-md">${c.label}</span>
                </div>
                <div class="p-6">
                    <p class="text-slate-600 text-sm font-normal leading-relaxed mb-4">${c.tagline}</p>
                    <span class="produk-detail-link">Lihat Seluruh Model ${c.label} <i data-lucide="arrow-right" class="w-4 h-4"></i></span>
                </div>
            </a>`;
        }).join('');
        lucide.createIcons();

        categoryGrid.querySelectorAll('[data-category]').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                showCategory(card.dataset.category, true);
            });
        });
    }

    function showCategoryGrid(updateHistory) {
        if (categoryView) categoryView.classList.remove('hidden');
        if (modelView) modelView.classList.add('hidden');
        document.title = 'Katalog Tipe Motor — Yamaha Prihatin Motor';
        if (updateHistory) {
            history.pushState({ view: 'category' }, '', 'produk.html');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showCategory(slug, updateHistory) {
        const normalizedSlug = (slug || '').toLowerCase().trim();
        const cat = categoryList.find(c => c.slug === normalizedSlug);
        if (!cat) {
            showCategoryGrid(updateHistory);
            return;
        }

        if (categoryView) categoryView.classList.add('hidden');
        if (modelView) modelView.classList.remove('hidden');

        if (modelViewCategoryLabel) modelViewCategoryLabel.textContent = cat.label;
        if (modelViewTitle) modelViewTitle.textContent = 'Jajaran Motor Yamaha ' + cat.label;
        if (modelViewDesc) modelViewDesc.textContent = cat.tagline;
        document.title = 'Motor ' + cat.label + ' — Yamaha Prihatin Motor';

        const filteredMotors = motorList.filter(m => m.category.toLowerCase() === normalizedSlug);
        renderMotor(filteredMotors);

        if (updateHistory) {
            history.pushState({ view: 'model', kategori: normalizedSlug }, '', 'produk.html?kategori=' + normalizedSlug);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (backToCategoryBtn) {
        backToCategoryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showCategoryGrid(true);
        });
    }

    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search);
        const kategori = params.get('kategori');
        if (kategori) showCategory(kategori, false);
        else showCategoryGrid(false);
    });

    function renderMotor(items) {
        if (!produkGrid) return;
        if (items.length === 0) {
            produkGrid.innerHTML = '';
            if (noResults) noResults.classList.remove('hidden');
            return;
        }
        if (noResults) noResults.classList.add('hidden');

        produkGrid.innerHTML = items.map((m, idx) => {
            const hasMultiple = m.variants && m.variants.length > 1;
            const imgSrc = m.image && m.image.trim() !== '' ? m.image : 'PotoMotor/NMAX/Turbo.png';
            const isWarm = m.category === 'maxi' || m.category === 'sport' || m.category === 'sport-heritage';

            return `
            <div class="produk-card">
                <div class="produk-card-image">
                    <img src="${imgSrc}" alt="Yamaha ${m.name}" loading="lazy" class="drop-shadow-lg">
                    <span class="produk-badge ${isWarm ? '' : 'badge-blue'}">${m.categoryLabel}</span>
                    ${hasMultiple ? `<span class="produk-variant-count">${m.variants.length} Pilihan Varian</span>` : ''}
                </div>
                <div class="p-6 flex flex-col flex-1">
                    <div class="flex items-center justify-between gap-2 mb-2">
                        <h3 class="text-xl font-bold text-slate-900">${m.name}</h3>
                        <span class="badge-telemetry ${isWarm ? '' : 'badge-telemetry-blue'}">${m.cc}</span>
                    </div>
                    <p class="text-slate-600 text-sm leading-relaxed mb-6 flex-1">${m.desc}</p>
                    <div class="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                        <a href="${motorDetailUrl(m.slug)}" class="produk-detail-link">
                            <span>Detail & Varian Lengkap</span>
                            <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                        <a href="https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent('Halo Yamaha Prihatin Motor, saya ingin cek ketersediaan dan promo untuk Yamaha ' + m.name)}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-md shadow-red-500/30" aria-label="Tanya promo ${m.name} via WA">
                            <i data-lucide="message-circle" class="w-5 h-5"></i>
                        </a>
                    </div>
                </div>
            </div>`;
        }).join('');

        lucide.createIcons();
    }

    renderCategoryGrid();
    const initialParams = new URLSearchParams(window.location.search);
    const initialKategori = initialParams.get('kategori');
    if (initialKategori) {
        showCategory(initialKategori, false);
    } else {
        showCategoryGrid(false);
    }
}

// ===== 11. HALAMAN DETAIL MOTOR (motor-detail.html) =====
if (currentPage === 'motor-detail') {
    const heroEl = document.getElementById('motorDetailHero');
    const contentEl = document.getElementById('motorDetailContent');
    const notFoundEl = document.getElementById('motorNotFound');
    const variantsEl = document.getElementById('motorDetailVariants');
    const ctaWaEl = document.getElementById('motorDetailCtaWa');
    const specsEl = document.getElementById('motorDetailSpecs');

    const params = new URLSearchParams(window.location.search);
    const slug = (params.get('motor') || '').toLowerCase().trim();
    const motor = motorList.find(m => m.slug.toLowerCase() === slug);

    function transmisiForCategory(cat) {
        if (cat === 'maxi' || cat === 'classy' || cat === 'matic') return 'Otomatis (V-Belt / CVT)';
        if (cat === 'moped') return 'Semi Otomatis 4-Speed (Rotary)';
        return 'Manual 6-Speed (Constant Mesh)';
    }

    if (!motor) {
        if (heroEl) heroEl.classList.add('hidden');
        if (contentEl) contentEl.classList.add('hidden');
        if (notFoundEl) notFoundEl.classList.remove('hidden');
        lucide.createIcons();
    } else {
        document.title = `Yamaha ${motor.name} — Spesifikasi & Varian Resmi | Yamaha Prihatin Motor`;
        const heroImg = motor.image && motor.image.trim() !== '' ? motor.image : 'Image/dealerdepan.png';
        const isWarm = motor.category === 'maxi' || motor.category === 'sport' || motor.category === 'sport-heritage';

        if (heroEl) {
            heroEl.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6">
                <nav class="flex items-center gap-2 text-xs font-semibold text-white/60 mb-6" aria-label="Breadcrumb">
                    <a href="index.html" class="hover:text-white">Beranda</a>
                    <span>/</span>
                    <a href="produk.html" class="hover:text-white">Tipe Motor</a>
                    <span>/</span>
                    <a href="produk.html?kategori=${motor.category}" class="hover:text-white">${motor.categoryLabel}</a>
                    <span>/</span>
                    <span class="text-white">${motor.name}</span>
                </nav>
                <div class="grid lg:grid-cols-12 gap-8 items-center">
                    <div class="lg:col-span-7">
                        <span class="badge-telemetry ${isWarm ? '' : 'badge-telemetry-blue'} mb-4">${motor.categoryLabel} SERIES</span>
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
                            Yamaha <span class="red-gradient-text">${motor.name}</span>
                        </h1>
                        <p class="text-white/75 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">${motor.desc}</p>
                        <div class="flex flex-wrap gap-4">
                            <a href="https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent('Halo Yamaha Prihatin Motor, saya ingin booking / tanya unit Yamaha ' + motor.name)}" target="_blank" rel="noopener noreferrer" class="btn-yamaha-primary">
                                <i data-lucide="message-circle" class="w-5 h-5"></i>
                                <span>Tanya Unit & Promo via WhatsApp</span>
                            </a>
                            <a href="produk.html?kategori=${motor.category}" class="btn-yamaha-secondary">
                                <i data-lucide="arrow-left" class="w-4 h-4"></i>
                                <span>Model ${motor.categoryLabel} Lainnya</span>
                            </a>
                        </div>
                    </div>
                    <div class="lg:col-span-5 flex justify-center">
                        <div class="relative bg-slate-900/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl w-full max-w-md">
                            <img src="${heroImg}" alt="Yamaha ${motor.name}" class="w-full h-auto object-contain drop-shadow-2xl">
                            <div class="absolute bottom-4 right-4 badge-telemetry badge-telemetry-dark">
                                ${motor.variants.length} VARIAN RESMI
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        if (specsEl) {
            const specItems = [
                { icon: 'shapes', label: 'Kategori Motor', value: motor.categoryLabel },
                { icon: 'gauge', label: 'Kapasitas Mesin', value: motor.cc },
                { icon: 'cog', label: 'Tipe Transmisi', value: transmisiForCategory(motor.category) },
                { icon: 'shield-check', label: 'Garansi Resmi', value: 'Garansi Resmi Yamaha 3-5 Tahun' },
            ];
            specsEl.innerHTML = specItems.map(s => `
                <div class="motor-spec-item">
                    <span class="motor-spec-icon"><i data-lucide="${s.icon}" class="w-5 h-5"></i></span>
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-wider text-slate-500">${s.label}</p>
                        <p class="text-sm font-bold text-slate-900 mt-0.5">${s.value}</p>
                    </div>
                </div>`).join('');
        }

        if (variantsEl) {
            variantsEl.innerHTML = motor.variants.map(v => {
                const vImg = v.image && v.image.trim() !== '' ? v.image : heroImg;
                return `
                <div class="motor-variant-card animate-on-scroll flex flex-col">
                    <div class="motor-variant-card-image">
                        <img src="${vImg}" alt="Yamaha ${v.variant}" loading="lazy">
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="text-lg font-bold text-slate-900 mb-2">${v.variant}</h3>
                        <p class="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Pilihan Warna Resmi:</p>
                        <div class="flex flex-wrap gap-1.5 mb-6">
                            ${v.colors.map(c => `<span class="produk-color-chip">${c}</span>`).join('')}
                        </div>
                        <div class="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
                            <div>
                                <span class="text-[11px] uppercase tracking-wider font-bold text-slate-400">Harga Estimasi</span>
                                <p class="text-base font-black text-red-600">${formatRupiah(v.price)}</p>
                            </div>
                            <a href="https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent('Halo Yamaha Prihatin Motor, saya tertarik dengan unit Yamaha ' + v.variant + ' warna ' + v.colors.join('/') + '. Apakah unit ini ready stok?')}" target="_blank" rel="noopener noreferrer" class="btn-yamaha-primary text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5" aria-label="Tanya ketersediaan ${v.variant}">
                                <i data-lucide="message-circle" class="w-4 h-4"></i>
                                <span>Pesan</span>
                            </a>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        if (ctaWaEl) {
            ctaWaEl.href = `https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent('Halo Yamaha Prihatin Motor, saya ingin konsultasi pembelian / servis unit Yamaha ' + motor.name)}`;
        }

        lucide.createIcons();
        document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
    }
}

// ===== 12. LIGHTBOX VIEWER (Sertifikat & Galeri) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

window.openLightbox = function(el) {
    const img = el.querySelector('img');
    if (lightbox && lightboxImg && img) {
        lightboxImg.src = img.dataset.src || img.src;
        lightboxImg.alt = img.alt || 'Dokumentasi Yamaha Prihatin Motor';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
};

window.openCertLightbox = function(el) {
    window.openLightbox(el);
};

if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ===== 13. DEALER CAROUSEL (Tentang Kami & Beranda) =====
document.querySelectorAll('.dealer-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.dealer-carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.dealer-carousel-slide'));
    const prevBtn = carousel.querySelector('.dealer-carousel-btn--prev');
    const nextBtn = carousel.querySelector('.dealer-carousel-btn--next');
    const dots = Array.from(carousel.querySelectorAll('.dealer-carousel-dot'));
    if (!track || slides.length === 0) return;

    let current = 0;
    let isAnimating = false;

    function render() {
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
            dot.setAttribute('aria-current', i === current ? 'true' : 'false');
        });
    }

    function goTo(index) {
        if (isAnimating) return;
        const total = slides.length;
        current = (index + total) % total;
        isAnimating = true;
        render();
        setTimeout(() => { isAnimating = false; }, 350);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(diff) > 40) {
            goTo(diff < 0 ? current + 1 : current - 1);
        }
    }, { passive: true });

    render();
});

// ===== 14. INFORMASI PAGE: TESTIMONIAL CAROUSEL =====
if (currentPage === 'informasi') {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    let currentSlide = 0;

    function getVisibleCount() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function getTotalSlides() {
        return track ? track.children.length : 0;
    }

    function updateCarousel() {
        if (!track) return;
        const visible = getVisibleCount();
        const maxSlide = Math.max(0, getTotalSlides() - visible);
        if (currentSlide > maxSlide) currentSlide = maxSlide;
        const offset = -(currentSlide * (100 / visible));
        track.style.transform = `translateX(${offset}%)`;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) { currentSlide--; updateCarousel(); }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const visible = getVisibleCount();
            const maxSlide = Math.max(0, getTotalSlides() - visible);
            if (currentSlide < maxSlide) { currentSlide++; updateCarousel(); }
        });
    }

    window.addEventListener('resize', updateCarousel);
}

// ===== 15. FAQ ACCORDION =====
if (currentPage === 'faq') {
    function toggleFaqItem(item) {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            const h = i.querySelector('.faq-header');
            if (h) h.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            item.classList.add('active');
            const header = item.querySelector('.faq-header');
            if (header) header.setAttribute('aria-expanded', 'true');
        }
    }

    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => toggleFaqItem(item));
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFaqItem(item);
                }
            });
        }
    });
}

// ===== 16. CONTACT FORM TO WHATSAPP =====
if (currentPage === 'kontak') {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = (form.querySelector('#contactNama') ? form.querySelector('#contactNama').value : '').trim();
            const email = (form.querySelector('#contactEmail') ? form.querySelector('#contactEmail').value : '').trim();
            const subjek = (form.querySelector('#contactSubjek') ? form.querySelector('#contactSubjek').value : '').trim();
            const pesan = (form.querySelector('#contactPesan') ? form.querySelector('#contactPesan').value : '').trim();

            if (!nama || !email || !subjek || !pesan) {
                alert('Harap lengkapi seluruh kolom formulir.');
                return;
            }

            const waMessage =
                `Halo Yamaha Prihatin Motor, saya ingin mengirim pesan melalui website resmi:\n\n` +
                `*Nama:* ${nama}\n` +
                `*Email:* ${email}\n` +
                `*Subjek:* ${subjek}\n` +
                `*Pesan:*\n${pesan}`;

            const waUrl = `https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;
            window.open(waUrl, '_blank', 'noopener,noreferrer');
            form.reset();
        });
    }
}

// ===== 17. 3D TILT EFFECT =====
function init3DCards() {
    if (window.matchMedia('(hover: none)').matches) return;
    const cards = document.querySelectorAll('.card-hover, .interactive-card, .cert-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', init3DCards);
init3DCards();

// ===== 18. LUCIDE ICONS INITIALIZATION =====
lucide.createIcons();