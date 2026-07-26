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
        navbar.style.background = 'rgba(12, 10, 26, 0.95)';
        navbar.classList.add('nav-blur');
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// ===== MOBILE MENU =====
const mobileToggle = document.getElementById('mobileToggle');
const mobileClose = document.getElementById('mobileClose');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== SCROLL ANIMATIONS =====
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const divider = entry.target.querySelector('.divider-line');
            if (divider) divider.classList.add('visible');
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

    // ===== COUNTER ANIMATION =====
    function animateCounters() {
        document.querySelectorAll('.counter').forEach(el => {
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
        document.querySelectorAll('.counter-decimal').forEach(el => {
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
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    const counterSection = document.querySelector('.counter');
    if (counterSection) counterObserver.observe(counterSection.closest('.flex'));
}

// ===== SPAREPART PAGE =====
if (currentPage === 'sparepart') {
    const spareparts = [
        { name: 'Oli Mesin Yamaha 10W-40', category: 'oli', price: 'Rp 65.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Oli Gardan Yamaha', category: 'oli', price: 'Rp 45.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Filter Oli Yamaha', category: 'mesin', price: 'Rp 35.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Kampas Rem Depan', category: 'rem', price: 'Rp 85.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Kampas Rem Belakang', category: 'rem', price: 'Rp 75.000', status: 'limited', statusText: 'Terbatas' },
        { name: 'Busi NGK Yamaha', category: 'mesin', price: 'Rp 28.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Lampu LED Depan', category: 'listrik', price: 'Rp 150.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Lampu Sein LED', category: 'listrik', price: 'Rp 45.000', status: 'available', statusText: 'Tersedia' },
        { name: 'CDI Yamaha', category: 'listrik', price: 'Rp 350.000', status: 'limited', statusText: 'Terbatas' },
        { name: 'Kanvas Kopling', category: 'mesin', price: 'Rp 120.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Boshing Stir', category: 'rem', price: 'Rp 55.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Spion Yamaha Original', category: 'body', price: 'Rp 95.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Cover Body Depan', category: 'body', price: 'Rp 250.000', status: 'limited', statusText: 'Terbatas' },
        { name: 'Cover Body Belakang', category: 'body', price: 'Rp 275.000', status: 'empty', statusText: 'Habis' },
        { name: 'Jok Motor Original', category: 'body', price: 'Rp 450.000', status: 'available', statusText: 'Tersedia' },
        { name: 'Shock Absorber Depan', category: 'rem', price: 'Rp 320.000', status: 'available', statusText: 'Tersedia' },
    ];

    const grid = document.getElementById('sparepartGrid');
    const searchInput = document.getElementById('sparepartSearch');
    const filterSelect = document.getElementById('sparepartFilter');
    const noResults = document.getElementById('noResults');

    function renderSpareparts(items) {
        if (items.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            lucide.createIcons();
            return;
        }
        noResults.classList.add('hidden');
        grid.innerHTML = items.map(sp => `
            <div class="sparepart-card bg-white border border-gray-200 rounded-2xl p-5">
                <div class="w-12 h-12 rounded-xl ${sp.category === 'mesin' || sp.category === 'oli' ? 'blue-accent' : 'red-accent'} flex items-center justify-center mb-4">
                    <i data-lucide="${sp.category === 'mesin' ? 'settings' : sp.category === 'oli' ? 'droplets' : sp.category === 'listrik' ? 'zap' : sp.category === 'rem' ? 'disc' : 'car'}" class="w-6 h-6 text-white"></i>
                </div>
                <h4 class="font-bold text-sm text-yamaha-dark mb-2 leading-snug">${sp.name}</h4>
                <p class="text-yamaha-blue font-black text-base mb-3">${sp.price}</p>
                <div class="flex items-center justify-between">
                    <span class="status-${sp.status} text-xs font-semibold flex items-center gap-1.5">
                        <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                        ${sp.statusText}
                    </span>
                    <button onclick="showToast('Stok ${sp.name}: ${sp.statusText}', '${sp.status === "available" ? "success" : sp.status === "limited" ? "info" : "error"}')" class="text-xs text-yamaha-blue font-semibold hover:underline">Detail</button>
                </div>
            </div>
        `).join('');
        lucide.createIcons();
    }

    function filterSpareparts() {
        const query = searchInput.value.toLowerCase();
        const cat = filterSelect.value;
        let filtered = spareparts.filter(sp => {
            const matchSearch = sp.name.toLowerCase().includes(query);
            const matchCat = cat === 'all' || sp.category === cat;
            return matchSearch && matchCat;
        });
        renderSpareparts(filtered);
    }

    searchInput.addEventListener('input', filterSpareparts);
    filterSelect.addEventListener('change', filterSpareparts);
    renderSpareparts(spareparts);
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
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.faq-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });
}

// ===== BOOKING PAGE: FORM =====
if (currentPage === 'booking') {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nama = form.querySelector('#bookNama').value.trim();
            const hp = form.querySelector('#bookHp').value.trim();
            const motor = form.querySelector('#bookMotor').value;
            const layanan = form.querySelector('#bookLayanan').value;
            const tanggal = form.querySelector('#bookTanggal').value;
            const waktu = form.querySelector('#bookWaktu').value;

            if (!nama || !hp || !motor || !layanan || !tanggal || !waktu) {
                showToast('Harap lengkapi semua field yang wajib diisi!', 'error');
                return;
            }

            const waText = encodeURIComponent(
                `Halo Yamaha Prihatin Motor,\n\nSaya ingin booking servis:\n\nNama: ${nama}\nNo HP: ${hp}\nTipe Motor: ${motor}\nJenis Layanan: ${layanan}\nTanggal: ${tanggal}\nWaktu: ${waktu}\n\nMohon konfirmasi, terima kasih!`
            );
            window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
            showToast('Booking berhasil! Anda akan diarahkan ke WhatsApp.', 'success');
        });
    }
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