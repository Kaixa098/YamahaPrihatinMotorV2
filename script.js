// ===== PAGE DETECTION =====
const currentPage = document.body.dataset.page || 'beranda';

// ===== PRELOADER (hanya di beranda & sekali per sesi) =====
const preloader = document.getElementById('preloader');
if (preloader) {
    if (sessionStorage.getItem('preloaderDone')) {
        preloader.style.display = 'none';
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                sessionStorage.setItem('preloaderDone', 'true');
            }, 2200);
        });
    }
}

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const bar = document.getElementById('scrollProgress');
    if (bar) bar.style.width = progress + '%';
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const mobileClose = document.getElementById('mobileClose');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        if (navbar) navbar.classList.add('navbar-menu-open');
        document.body.style.overflow = 'hidden';
        mobileToggle.setAttribute('aria-expanded', 'true');
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        if (navbar) navbar.classList.remove('navbar-menu-open');
        document.body.style.overflow = '';
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        if (navbar) navbar.classList.remove('navbar-menu-open');
        document.body.style.overflow = '';
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    });
});

// ===== SCROLL ANIMATIONS =====
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const divider = entry.target.querySelector('.divider-line');
            if (divider) divider.classList.add('visible');
            // Animation only ever needs to run once — stop observing to keep scroll listening light.
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    scrollObserver.observe(el);
});

// ===== BACK TO TOP =====
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

// ===== TOAST FUNCTION =====
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info';
    toast.className = `toast ${bgColor} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium min-w-[280px]`;
    toast.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5 flex-shrink-0"></i><span>${message}</span>`;
    container.appendChild(toast);
    lucide.createIcons();
    setTimeout(() => { toast.remove(); }, 3500);
}

// ===== BERANDA: PARTICLE CANVAS =====
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
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
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

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // ===== TYPING EFFECT =====
    const typingEl = document.getElementById('typingText');
    if (typingEl) {
        const text = 'Servis motor Yamaha terpercaya dengan sparepart original, mekanik bersertifikat, dan harga transparan. Kepuasan Anda adalah prioritas kami.';
        let i = 0;
        function typeChar() {
            if (i < text.length) {
                typingEl.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 30);
            }
        }
        setTimeout(typeChar, 2500);
    }
}

// ===== COUNTER ANIMATION (berlaku di semua halaman yang punya .counter) =====
function animateCounters(scope) {
    scope.querySelectorAll('.counter').forEach(el => {
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current).toLocaleString('id-ID');
        }, 16);
    });
    scope.querySelectorAll('.counter-decimal').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current.toFixed(1);
        }, 16);
    });
}
document.querySelectorAll('.counter-group').forEach(group => {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters(group);
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    counterObserver.observe(group);
});

// ===== PRODUK PAGE: TIPE MOTOR YAMAHA =====
if (currentPage === 'produk') {
    const motorList = [
        // ===== MAXi =====
        { name: 'TMAX', category: 'maxi', categoryLabel: 'MAXi', cc: '560cc', price: 'Rp 455.000.000', desc: 'Premium sport scooter ikonik dengan mesin 2 silinder 560cc bertenaga tinggi.', seed: 'yamaha-tmax' },
        { name: 'XMAX 250', category: 'maxi', categoryLabel: 'MAXi', cc: '250cc', price: 'Rp 69.215.000', desc: 'Skutik premium 250cc dengan kenyamanan berkendara jarak jauh kelas atas.', seed: 'yamaha-xmax-250' },
        { name: 'NMAX Turbo', category: 'maxi', categoryLabel: 'MAXi', cc: '155cc', price: 'Rp 34.065.000', desc: 'Skutik matic premium terlaris dengan fitur Y-ECVT dan Y-Shift untuk akselerasi responsif.', seed: 'yamaha-nmax-turbo' },
        { name: 'Aerox Alpha', category: 'maxi', categoryLabel: 'MAXi', cc: '155cc', price: 'Rp 30.200.000', desc: 'Skutik sporty bergaya agresif dengan desain terbaru dan performa gesit.', seed: 'yamaha-aerox-alpha' },
        { name: 'LEXi LX 155', category: 'maxi', categoryLabel: 'MAXi', cc: '155cc', price: 'Rp 27.350.000', desc: 'Skutik ringan bergaya retro-modern dengan teknologi Blue Core hemat bahan bakar.', seed: 'yamaha-lexi-lx-155' },
        { name: 'NMAX 155', category: 'maxi', categoryLabel: 'MAXi', cc: '155cc', price: 'Rp 32.175.000', desc: 'NMAX Connected dengan fitur Y-Connect dan kenyamanan berkendara terbaik di kelasnya.', seed: 'yamaha-nmax-155' },
        { name: 'Aerox 155', category: 'maxi', categoryLabel: 'MAXi', cc: '155cc', price: 'Rp 28.880.000', desc: 'Aerox Connected dengan desain sporty dan performa mesin 155cc VVA.', seed: 'yamaha-aerox-155' },

        // ===== Classy =====
        { name: 'Grand Filano', category: 'classy', categoryLabel: 'Classy', cc: '125cc', price: 'Rp 28.315.000', desc: 'Skutik retro elegan dengan teknologi hybrid dan bagasi luas untuk kebutuhan harian.', seed: 'yamaha-grand-filano' },
        { name: 'Fazzio', category: 'classy', categoryLabel: 'Classy', cc: '125cc', price: 'Rp 22.470.000', desc: 'Skutik retro-modern hybrid dengan smart key dan tampilan stylish anak muda urban.', seed: 'yamaha-fazzio' },

        // ===== Matic =====
        { name: 'Gear Ultima', category: 'matic', categoryLabel: 'Matic', cc: '125cc', price: 'Rp 20.140.000', desc: 'Motor matic serbaguna dengan desain sporty dan bagasi luas untuk aktivitas harian.', seed: 'yamaha-gear-ultima' },
        { name: 'GEAR 125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', price: 'Rp 19.295.000', desc: 'Matic ringan dan lincah, ideal untuk pelajar dan mobilitas perkotaan.', seed: 'yamaha-gear-125' },
        { name: 'FreeGo 125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', price: 'Rp 22.865.000', desc: 'Matic dengan ruang kaki lapang dan bagasi besar, nyaman untuk penggunaan sehari-hari.', seed: 'yamaha-freego-125' },
        { name: 'X-Ride 125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', price: 'Rp 21.135.000', desc: 'Matic petualang dengan ground clearance tinggi untuk berbagai kondisi jalan.', seed: 'yamaha-xride-125' },
        { name: 'Mio M3 125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', price: 'Rp 18.705.000', desc: 'Matic sporty ringan dengan mesin tangguh dan harga paling terjangkau di kelasnya.', seed: 'yamaha-mio-m3' },
        { name: 'Fino 125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', price: 'Rp 20.400.000', desc: 'Matic bergaya retro klasik yang memadukan estetika vintage dengan teknologi modern.', seed: 'yamaha-fino-125' },

        // ===== Sport =====
        { name: 'XSR 155', category: 'sport', categoryLabel: 'Sport', cc: '155cc', price: 'Rp 39.565.000', desc: 'Neo-retro sport bike dengan karakter klasik dan performa mesin VVA modern.', seed: 'yamaha-xsr-155' },
        { name: 'R15', category: 'sport', categoryLabel: 'Sport', cc: '155cc', price: 'Rp 41.500.000', desc: 'Motor sport fairing full ala MotoGP dengan handling tajam dan mesin 155cc VVA.', seed: 'yamaha-r15' },
        { name: 'R25', category: 'sport', categoryLabel: 'Sport', cc: '250cc', price: 'Rp 75.550.000', desc: 'Sport fairing 2 silinder 250cc dengan desain aerodinamis terinspirasi YZR-M1.', seed: 'yamaha-r25' },
        { name: 'MT-25', category: 'sport', categoryLabel: 'Sport', cc: '250cc', price: 'Rp 65.750.000', desc: 'Naked sport bike bermesin 250cc 2 silinder dengan karakter Dark Side of Japan.', seed: 'yamaha-mt-25' },
        { name: 'MT-15', category: 'sport', categoryLabel: 'Sport', cc: '155cc', price: 'Rp 40.515.000', desc: 'Naked sport agresif dengan mesin 155cc VVA dan desain khas keluarga MT series.', seed: 'yamaha-mt-15' },
        { name: 'Vixion 155', category: 'sport', categoryLabel: 'Sport', cc: '155cc', price: 'Rp 31.050.000', desc: 'Sport naked legendaris dengan mesin 155cc VVA, tangguh untuk harian maupun turing.', seed: 'yamaha-vixion-155' },

        // ===== Off-Road =====
        { name: 'WR155R', category: 'offroad', categoryLabel: 'Off-Road', cc: '155cc', price: 'Rp 40.775.000', desc: 'Trail dual-purpose "The Real Adventure Partner" dengan suspensi long-travel.', seed: 'yamaha-wr155r' },
        { name: 'YZ125X', category: 'offroad', categoryLabel: 'Off-Road', cc: '125cc', price: 'Rp 99.800.000', desc: 'Motor enduro kompetisi berbasis YZ125, pintu masuk ideal ke dunia off-road racing.', seed: 'yamaha-yz125x' },
        { name: 'YZ250X', category: 'offroad', categoryLabel: 'Off-Road', cc: '250cc', price: 'Rp 132.000.000', desc: 'Motor cross-country kompetisi 250cc dengan performa tinggi untuk medan berat.', seed: 'yamaha-yz250x' },
        { name: 'YZ250FX', category: 'offroad', categoryLabel: 'Off-Road', cc: '250cc', price: 'Rp 140.000.000', desc: 'Motor cross-country 4-tak 250cc kelas kompetisi dengan teknologi balap terkini.', seed: 'yamaha-yz250fx' },

        // ===== Moped =====
        { name: 'MX King 150', category: 'moped', categoryLabel: 'Moped', cc: '150cc', price: 'Rp 29.000.000', desc: 'Bebek super sporty dengan Light Frame Design dan tenaga yang responsif.', seed: 'yamaha-mx-king' },
        { name: 'Jupiter Z1', category: 'moped', categoryLabel: 'Moped', cc: '115cc', price: 'Rp 22.480.000', desc: 'Bebek legendaris yang irit, tangguh, dan andal untuk kebutuhan harian.', seed: 'yamaha-jupiter-z1' },
        { name: 'Vega Force', category: 'moped', categoryLabel: 'Moped', cc: '115cc', price: 'Rp 19.900.000', desc: 'Bebek entry-level dengan desain sporty dan harga paling ekonomis di jajaran Yamaha.', seed: 'yamaha-vega-force' },
    ];

    const produkGrid = document.getElementById('produkGrid');
    const noResults = document.getElementById('noResults');
    const tabs = document.querySelectorAll('.motor-tab-btn');

    function renderMotor(items) {
        if (!produkGrid) return;
        if (items.length === 0) {
            produkGrid.innerHTML = '';
            if (noResults) noResults.classList.remove('hidden');
            return;
        }
        if (noResults) noResults.classList.add('hidden');
        produkGrid.innerHTML = items.map((m, idx) => `
            <div class="produk-card card-hover animate-on-scroll" style="transition-delay:${(idx % 3) * 0.1}s">
                <div class="produk-card-image">
                    <img src="https://picsum.photos/seed/${m.seed}/500/375.jpg" alt="Yamaha ${m.name}" loading="lazy">
                    <span class="produk-badge ${m.category === 'maxi' || m.category === 'sport' ? '' : 'badge-blue'}">${m.categoryLabel}</span>
                </div>
                <div class="p-6 flex flex-col flex-1">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-bold text-yamaha-dark">${m.name}</h3>
                        <span class="text-xs font-semibold text-gray-400">${m.cc}</span>
                    </div>
                    <p class="text-gray-500 text-sm font-light leading-relaxed mb-4 flex-1">${m.desc}</p>
                    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                            <p class="text-[11px] text-gray-400">OTR Jakarta, mulai dari</p>
                            <p class="text-yamaha-blue font-black text-base">${m.price}</p>
                        </div>
                        <a href="https://wa.me/6281211117265?text=${encodeURIComponent('Halo, saya ingin tanya tentang Yamaha ' + m.name)}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl red-accent flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform" aria-label="Tanya soal ${m.name} via WhatsApp"><i data-lucide="message-circle" class="w-5 h-5 text-white"></i></a>
                    </div>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
        document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
    }

    function filterMotor(cat) {
        const filtered = cat === 'all' ? motorList : motorList.filter(m => m.category === cat);
        renderMotor(filtered);
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
            tab.classList.add('active');
            tab.setAttribute('aria-pressed', 'true');
            filterMotor(tab.dataset.filter);
        });
    });

    renderMotor(motorList);
}

// ===== GALLERY PAGE: LIGHTBOX =====
if (currentPage === 'galeri') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    window.openLightbox = function(el) {
        const img = el.querySelector('img');
        if (lightboxImg && img) {
            lightboxImg.src = img.dataset.src || img.src;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    };

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.openLightbox(item);
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ===== INFORMASI PAGE: TESTIMONIAL CAROUSEL =====
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
        if (!track) return 0;
        return track.children.length;
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

// ===== FAQ PAGE: ACCORDION =====
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

// ===== KONTAK PAGE: FORM =====
if (currentPage === 'kontak') {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = form.querySelector('#contactNama').value.trim();
            const email = form.querySelector('#contactEmail').value.trim();
            const subjek = form.querySelector('#contactSubjek').value.trim();
            const pesan = form.querySelector('#contactPesan').value.trim();

            if (!nama || !email || !subjek || !pesan) {
                showToast('Harap lengkapi semua field!', 'error');
                return;
            }

            showToast('Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.', 'success');
            form.reset();
        });
    }
}
// ===== 3D TILT EFFECT =====
document.querySelectorAll('.tilt-3d').forEach(card => {
    const inner = card.querySelector('.tilt-3d-inner');
    if (!inner) return;

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});
// ===== INIT LUCIDE ICONS =====
lucide.createIcons();