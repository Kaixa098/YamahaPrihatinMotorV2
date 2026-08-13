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

        for (let i = 0; i < 40; i++) particles.push(new Particle());

        let rafId;
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            rafId = requestAnimationFrame(animateParticles);
        }
        animateParticles();
        // Pause animation when tab is hidden to save GPU/CPU
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(rafId);
            else animateParticles();
        });
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

// ===== DATA MOTOR YAMAHA (dipakai bersama oleh halaman Produk & Detail Motor) =====
// Kartu produk di halaman "Tipe Motor" TIDAK ditulis manual satu-satu di
// produk.html — semuanya di-generate otomatis dari daftar (array) di
// bawah ini. Halaman Produk merender ringkasan tiap model ke
// <div id="produkGrid">, lalu saat kartu diklik pengguna diarahkan ke
// motor-detail.html?motor=<slug> yang menampilkan seluruh varian resmi
// model tersebut secara lengkap (foto, warna, harga).
//
// CARA MENGGANTI GAMBAR SETIAP MOTOR:
// 1. Siapkan foto motor (disarankan rasio 4:3, contoh 800x600px, format
//    .jpg/.png/.webp, ukuran file diperkecil/compress agar loading cepat).
// 2. Taruh filenya di folder Image/produk/ (buat folder ini jika belum
//    ada), misalnya: Image/produk/tmax.jpg
// 3. Ganti nilai "image" pada motor yang sesuai di bawah ini menjadi
//    path file tersebut, contoh:
//        image: 'Image/produk/tmax.jpg'
// 4. Simpan file ini — gambar akan otomatis muncul di card motor,
//    halaman detail, filter kategori, karena hanya field "image" yang
//    dibaca ulang.
//
// Selama field "image" belum diisi/foto belum diupload, halaman akan
// memakai foto sementara (placeholder) dari picsum.photos supaya
// tampilan tetap terisi dan tidak rusak.
//
// CARA MENAMBAH FOTO KHUSUS PER VARIAN (opsional):
// Tambahkan field "image" di dalam objek varian terkait, misalnya:
//   { variant: 'TMAX Special Livery', image: 'PotoMotor/TMAX-livery.png', colors: [...], price: ... }
// Jika field ini kosong/tidak diisi, halaman detail otomatis memakai
// foto utama model sebagai gantinya.
//
// "slug" dipakai sebagai alamat halaman detail (motor-detail.html?motor=slug).
// Setiap model motor memiliki daftar "variants": varian resmi (nama
// varian, pilihan warna resmi, harga OTW Bogor) sesuai referensi situs
// resmi Yamaha Indonesia (yamaha-motor.co.id). Untuk menambah/ubah
// varian, cukup tambah/ubah objek di dalam array "variants" milik model
// terkait — kartu di halaman Produk dan halaman detail motor akan
// otomatis menyesuaikan.
const motorList = [
    // ===== MAXi =====
    { name: 'TMAX', slug: 'tmax', category: 'maxi', categoryLabel: 'MAXi', cc: '530cc', desc: 'Premium sport scooter ikonik dari Eropa dengan mesin 2 silinder 530cc bertenaga tinggi, ABS, TCS, dan cruise control.', seed: 'yamaha-tmax', image: 'PotoMotor/TMAX/TMAX.png',
        variants: [
            { variant: 'TMAX Tech MAX', image: 'PotoMotor/TMAX/TMAX Tech MAX.png', colors: ['Matte Black'], price: 455000000 },
            { variant: 'TMAX Special Livery', image: 'PotoMotor/TMAX/TMAX.png', colors: ['Special Livery'], price: 475000000 },
        ] },
    { name: 'XMAX 250', slug: 'xmax-250', category: 'maxi', categoryLabel: 'MAXi', cc: '250cc', desc: 'Skutik premium 250cc dengan kenyamanan berkendara jarak jauh dan fitur Traction Control kelas atas.', seed: 'yamaha-xmax-250', image: 'PotoMotor/XMAX/XMAX 250 MAX Special Livery.png',
        variants: [
            { variant: 'XMAX Connected', image: 'PotoMotor/XMAX/XMAX 250 CONNECTED.png', colors: ['Fabulous Matte Black', 'Fabulous White'], price: 70015000 },
            { variant: 'XMAX Special Livery', image: 'PotoMotor/XMAX/XMAX 250 MAX Special Livery.png', colors: ['Radiant Red Black'], price: 70415000 },
            { variant: 'XMAX Tech Max', image: 'PotoMotor/XMAX/XMAX 250 TECH MAX.png', colors: ['Radiant Brown Black', 'Radiant Silver Black'], price: 77410000 },
        ] },
    { name: 'NMAX "Turbo"', slug: 'nmax-turbo', category: 'maxi', categoryLabel: 'MAXi', cc: '155cc', desc: 'Skutik matic premium terlaris dengan teknologi Y-ECVT dan "TURBO" Y-Shift untuk akselerasi responsif.', seed: 'yamaha-nmax-turbo', image: 'PotoMotor/NMAX/Neo S MAX Special Livery.png',
        variants: [
            { variant: 'NMAX Neo', image: 'PotoMotor/NMAX/Neo Version.png', colors: ['Matte Blue', 'Red', 'White', 'Black', 'Dull Blue'], price: 34565000 },
            { variant: 'NMAX Neo MAX Special Livery', image: 'PotoMotor/NMAX/Neo Max Special Livery.png', colors: ['Special Livery Black'], price: 34965000 },
            { variant: 'NMAX Neo S', image: 'PotoMotor/NMAX/Neo S Version.png', colors: ['Matte Blue', 'Red', 'White', 'Black', 'Dull Blue'], price: 35555000 },
            { variant: 'NMAX Neo S MAX Special Livery', image: 'PotoMotor/NMAX/Neo S MAX Special Livery.png', colors: ['Special Livery Black'], price: 35955000 },
            { variant: 'NMAX "Turbo"', image: 'PotoMotor/NMAX/Turbo.png', colors: ['Ceramic Grey', 'Elixir Dark Silver', 'Magma Black'], price: 39465000 },
            { variant: 'NMAX "Turbo" Tech Max', image: 'PotoMotor/NMAX/TURBO Tech Max.png', colors: ['Ceramic Grey', 'Elixir Dark Silver', 'Magma Black'], price: 44965000 },
            { variant: 'NMAX "Turbo" Tech Max Special Livery', image: 'PotoMotor/NMAX/TURBO Tech Max Special Livery.png', colors: ['Special Livery Black'], price: 45365000 },
            { variant: 'NMAX "Turbo" Tech Max Ultimate', image: 'PotoMotor/NMAX/TURBO Tech Max Ultimate.png', colors: ['Ceramic Grey', 'Elixir Dark Silver', 'Magma Black'], price: 46945000 },
        ] },
    { name: 'Aerox Alpha', slug: 'aerox-alpha', category: 'maxi', categoryLabel: 'MAXi', cc: '155cc', desc: 'Super sport scooter bergaya agresif dengan mesin 155cc VVA dan teknologi YECVT "TURBO".', seed: 'yamaha-aerox-alpha', image: 'PotoMotor/AEROX ALPHA/CyberCity ABS.png',
        variants: [
            { variant: 'Aerox Alpha Standard', image: 'PotoMotor/AEROX ALPHA/Standard.png', colors: ['Black', 'Blue', 'Red'], price: 30700000 },
            { variant: 'Aerox Alpha Cybercity', image: 'PotoMotor/AEROX ALPHA/CyberCity.png', colors: ['Matte Blue Red'], price: 31250000 },
            { variant: 'Aerox Alpha Cybercity ABS', image: 'PotoMotor/AEROX ALPHA/CyberCity ABS.png', colors: ['Matte Purple Black', 'White Pearl Blue'], price: 34790000 },
            { variant: 'Aerox Alpha "Turbo"', image: 'PotoMotor/AEROX ALPHA/Turbo.png', colors: ['Elixir Dark Silver'], price: 40050000 },
            { variant: 'Aerox Alpha "Turbo" 70th Anniversary Livery', image: 'PotoMotor/AEROX ALPHA/Turbo 70th Livery.png', colors: ['70th Anniversary Livery'], price: 40450000 },
            { variant: 'Aerox Alpha "Turbo" Ultimate', image: 'PotoMotor/AEROX ALPHA/Turbo ULTIMATE.png', colors: ['Elixir Dark Silver'], price: 42230000 },
        ] },
    { name: 'LEXi LX 155', slug: 'lexi-lx-155', category: 'maxi', categoryLabel: 'MAXi', cc: '155cc', desc: 'Skutik ringan bergaya retro-modern dengan mesin 155cc VVA yang hemat bahan bakar.', seed: 'yamaha-lexi-lx-155', image: 'PotoMotor/LEXi/ConnectedABS.png',
        variants: [
            { variant: 'Lexi LX 155 Standard', image: 'PotoMotor/LEXi/Standard.png', colors: ['Ceramic Grey', 'Sand', 'Matte Green'], price: 27850000 },
            { variant: 'Lexi LX 155 S Version', image: 'PotoMotor/LEXi/S Version.png', colors: ['Ceramic Grey', 'Sand', 'Matte Green'], price: 29650000 },
            { variant: 'Lexi LX 155 Connected/ABS', image: 'PotoMotor/LEXi/ConnectedABS.png', colors: ['Ceramic Grey', 'Sand', 'Matte Green'], price: 32500000 },
        ] },

    // ===== Classy =====
    { name: 'Grand Filano Hybrid', slug: 'grand-filano', category: 'classy', categoryLabel: 'Classy', cc: '125cc', desc: 'Skutik retro elegan dengan teknologi Blue Core Hybrid, bagasi 27 liter, dan TFT Sub Display.', seed: 'yamaha-grand-filano', image: 'PotoMotor/Grand Filano.png',
        variants: [
            { variant: 'Grand Filano Hybrid Neo', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026012310263681335O86751.png', colors: ['Prime Gray', 'Greenish Gray', 'Pink Mauve', 'Essential White'], price: 28665000 },
            { variant: 'Grand Filano Hybrid Lux', colors: ['Royal Iron', 'Magma Black'], price: 29145000 },
        ] },
    { name: 'Fazzio Hybrid', slug: 'fazzio', category: 'classy', categoryLabel: 'Classy', cc: '125cc', desc: 'Skutik retro-modern hybrid dengan smart key dan tampilan stylish anak muda urban.', seed: 'yamaha-fazzio', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026012315101756736A45457.png',
        variants: [
            { variant: 'Fazzio Hybrid', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026012315093684262D3348.png', colors: ['Blue White', 'Black Red'], price: 22820000 },
            { variant: 'Fazzio Hybrid Neo', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202601231711304860C78501.png', colors: ['Go Purple', 'Pink Mauve', 'White', 'Green'], price: 24405000 },
            { variant: 'Fazzio Hybrid Lux', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026012315110540976J2461.png', colors: ['Greenish Gray'], price: 25095000 },
        ] },

    // ===== Matic =====
    { name: 'GEAR 125', slug: 'gear-125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', desc: 'Matic ringan dan lincah dengan bagasi luas, ideal untuk pelajar dan mobilitas perkotaan.', seed: 'yamaha-gear-125', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025030717193296301C81889.png',
        variants: [
            { variant: 'GEAR 125', colors: ['Black', 'Red', 'Blue'], price: 19495000 },
        ] },
    { name: 'GEAR ULTIMA', slug: 'gear-ultima', category: 'matic', categoryLabel: 'Matic', cc: '125cc', desc: 'Skutik keluarga "Motor Kuat Mantap" bermesin Blue Core Hybrid 125cc dengan bagasi 18,6 liter terluas di kelasnya.', seed: 'yamaha-gear-ultima', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026040210281363446A2951.png',
        variants: [
            { variant: 'GEAR ULTIMA Hybrid', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026040210355699153B34831.png', colors: ['Black', 'White'], price: 20240000 },
            { variant: 'GEAR ULTIMA Hybrid Solid', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026040210302746779S97325.png', colors: ['Solid Orange', 'Solid Blue'], price: 20660000 },
            { variant: 'GEAR ULTIMA Hybrid Smart', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026040210285549459N49815.png', colors: ['Magma Black', 'Matte Blue'], price: 22785000 },
        ] },
    { name: 'FreeGo 125', slug: 'freego-125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', desc: 'Matic dengan ruang kaki lapang dan bagasi besar, nyaman untuk penggunaan sehari-hari.', seed: 'yamaha-freego-125', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025060914385589502M90490.png',
        variants: [
            { variant: 'FreeGo 125', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025060914390790747E27231.png', colors: ['Black', 'White', 'Red'], price: 22865000 },
            { variant: 'FreeGo 125 Connected', colors: ['Matte Grey', 'Blue'], price: 24650000 },
        ] },
    { name: 'X-Ride 125', slug: 'xride-125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', desc: 'Matic petualang dengan ground clearance tinggi untuk berbagai kondisi jalan.', seed: 'yamaha-xride-125', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025070409415976337A27649.png',
        variants: [
            { variant: 'X-Ride 125', colors: ['Black', 'Green', 'Red'], price: 21135000 },
        ] },
    { name: 'Mio M3 125', slug: 'mio-m3', category: 'matic', categoryLabel: 'Matic', cc: '125cc', desc: 'Matic sporty ringan dengan mesin tangguh dan harga paling terjangkau di kelasnya.', seed: 'yamaha-mio-m3', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025051911283817688W57116.png',
        variants: [
            { variant: 'Mio M3 125', colors: ['Black', 'Red', 'White'], price: 18905000 },
        ] },
    { name: 'Fino 125', slug: 'fino-125', category: 'matic', categoryLabel: 'Matic', cc: '125cc', desc: 'Matic bergaya retro klasik yang memadukan estetika vintage dengan mesin Blue Core modern.', seed: 'yamaha-fino-125', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2022030515231473422V37157.png',
        variants: [
            { variant: 'Fino Sporty', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2022030515293157128N76590.png', colors: ['Black', 'Red'], price: 20400000 },
            { variant: 'Fino Premium', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2022030515262544883N54966.png', colors: ['White', 'Cream'], price: 20400000 },
            { variant: 'Fino Grande', colors: ['Matte Black', 'Brown'], price: 21610000 },
        ] },

    // ===== Sport =====
    { name: 'R15', slug: 'r15', category: 'sport', categoryLabel: 'Sport', cc: '155cc', desc: 'Motor sport fairing full ala MotoGP dengan rangka Deltabox dan mesin 155cc VVA.', seed: 'yamaha-r15', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025012017035257352I85474.png',
        variants: [
            { variant: 'R15 Connected', colors: ['Black', 'Blue'], price: 42200000 },
            { variant: 'R15M Connected/ABS', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2024072510405534685V24502.png', colors: ['Icon Performance', 'Tech Black'], price: 46950000 },
            { variant: 'R15M Connected/ABS 70th Anniversary Livery', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202601221233083712A95570.png', colors: ['70th Anniversary Livery'], price: 47100000 },
        ] },
    { name: 'R25', slug: 'r25', category: 'sport', categoryLabel: 'Sport', cc: '250cc', desc: 'Sport fairing 2 silinder 250cc dengan desain aerodinamis terinspirasi YZR-M1 dan rem ABS.', seed: 'yamaha-r25', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025012015280236852T12421.png',
        variants: [
            { variant: 'R25 ABS', colors: ['Yamaha Blue', 'Matte Black'], price: 76250000 },
        ] },
    { name: 'MT-25', slug: 'mt-25', category: 'sport', categoryLabel: 'Sport', cc: '250cc', desc: 'Naked sport bike bermesin 250cc 2 silinder dengan karakter "Dark Side of Japan".', seed: 'yamaha-mt-25', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025012015174655343P65550.png',
        variants: [
            { variant: 'MT-25', colors: ['Matte Black', 'Ice Fluo'], price: 66450000 },
        ] },
    { name: 'MT-15', slug: 'mt-15', category: 'sport', categoryLabel: 'Sport', cc: '155cc', desc: 'Naked sport agresif dengan mesin 155cc VVA dan desain khas keluarga MT series.', seed: 'yamaha-mt-15', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202501201512088268P91906.png',
        variants: [
            { variant: 'MT-15', colors: ['Matte Black', 'Ice Fluo'], price: 41215000 },
        ] },
    { name: 'Vixion', slug: 'vixion', category: 'sport', categoryLabel: 'Sport', cc: '150-155cc', desc: 'Sport naked legendaris dengan mesin VVA, tangguh untuk penggunaan harian maupun turing.', seed: 'yamaha-vixion', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202201110944359935S19728.png',
        variants: [
            { variant: 'Vixion 150', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/202201110944359935S19728.png', colors: ['Black', 'Red'], price: 31450000 },
            { variant: 'Vixion R 155', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2022011109442589529O58043.png', colors: ['Red', 'Grey'], price: 34020000 },
        ] },

    // ===== Sport Heritage =====
    { name: 'XSR155', slug: 'xsr155', category: 'sport-heritage', categoryLabel: 'Sport Heritage', cc: '155cc', desc: 'Neo-retro sport bike bergaya scrambler dengan mesin 155cc VVA dan enam percepatan.', seed: 'yamaha-xsr-155', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2022122614535230076F30677.png',
        variants: [
            { variant: 'XSR155', colors: ['Matte Black Elegance', 'Matte Silver Premium'], price: 40265000 },
            { variant: 'XSR155 70th Anniversary Livery', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026012212283641750K65588.png', colors: ['70th Anniversary Livery'], price: 40665000 },
        ] },

    // ===== Off-Road =====
    { name: 'WR155R', slug: 'wr155r', category: 'offroad', categoryLabel: 'Off-Road', cc: '155cc', desc: 'Trail dual-purpose "The Real Adventure Partner" dengan suspensi long-travel dan rangka Deltabox.', seed: 'yamaha-wr155r', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026012216212099486L85017.png',
        variants: [
            { variant: 'WR155R', colors: ['Blue', 'Black'], price: 41275000 },
        ] },
    { name: 'YZ125X', slug: 'yz125x', category: 'offroad', categoryLabel: 'Off-Road', cc: '125cc', desc: 'Motor enduro kompetisi berbasis YZ125, pintu masuk ideal ke dunia off-road racing.', seed: 'yamaha-yz125x', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026060310515421581Q19732.png',
        variants: [
            { variant: 'YZ125X', colors: ['Yamaha Racing Blue'], price: 99800000 },
        ] },
    { name: 'YZ250X', slug: 'yz250x', category: 'offroad', categoryLabel: 'Off-Road', cc: '250cc', desc: 'Motor cross-country kompetisi 250cc dengan performa tinggi untuk medan berat.', seed: 'yamaha-yz250x', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026060310532432856X70087.png',
        variants: [
            { variant: 'YZ250X', colors: ['Yamaha Racing Blue'], price: 132000000 },
        ] },
    { name: 'YZ250FX', slug: 'yz250fx', category: 'offroad', categoryLabel: 'Off-Road', cc: '250cc', desc: 'Motor cross-country 4-tak 250cc kelas kompetisi dengan teknologi balap terkini.', seed: 'yamaha-yz250fx', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026060310504041210L92658.png',
        variants: [
            { variant: 'YZ250FX', colors: ['Yamaha Racing Blue'], price: 140000000 },
        ] },

    // ===== Moped =====
    { name: 'MX King 150', slug: 'mx-king', category: 'Moped', categoryLabel: 'Moped', cc: '150cc', desc: 'Bebek super sporty dengan Light Frame Design dan tenaga yang responsif.', seed: 'yamaha-mx-king', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025120815501128784Y48788.png',
        variants: [
            { variant: 'MX King 150', colors: ['Black', 'Red'], price: 29200000 },
            { variant: 'MX King 150 70th Anniversary Livery', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026012212570650164D72125.png', colors: ['70th Anniversary Livery'], price: 29400000 },
            { variant: 'MX King 150 Prima Pramac Livery', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2026062207303160354M62891.png', colors: ['Pramac Racing Livery'], price: 29900000 },
        ] },
    { name: 'Jupiter Z1', slug: 'jupiter-z1', category: 'Moped', categoryLabel: 'Moped', cc: '115cc', desc: 'Bebek legendaris yang irit, tangguh, dan andal untuk kebutuhan harian.', seed: 'yamaha-jupiter-z1', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2025061108303017327J72634.png',
        variants: [
            { variant: 'Jupiter Z1', colors: ['Black', 'Red', 'Blue'], price: 22580000 },
        ] },
    { name: 'Vega Force', slug: 'vega-force', category: 'Moped', categoryLabel: 'Moped', cc: '115cc', desc: 'Bebek entry-level dengan desain sporty dan harga paling ekonomis di jajaran Yamaha.', seed: 'yamaha-vega-force', image: 'https://www.yamaha-motor.co.id/uploads/products/new_product_model_image/2023060508085578784S98910.png',
        variants: [
            { variant: 'Vega Force', colors: ['Black', 'Red'], price: 19900000 },
        ] },
];

// ===== KATEGORI MOTOR (mengikuti struktur navigasi Yamaha Indonesia) =====
// Alur: Kategori -> Model Motor -> Halaman Detail Motor -> Varian -> Warna -> Harga.
// Tambah/ubah kategori cukup di array ini; jumlah model & gambar sampul
// kategori otomatis dihitung dari "motorList" di atas (lihat categoryCover()).
const categoryList = [
    { slug: 'maxi', label: 'MAXi', icon: 'gauge-circle', tagline: 'Skutik premium bertenaga besar dengan teknologi dan fitur kelas atas.' },
    { slug: 'classy', label: 'Classy', icon: 'sparkles', tagline: 'Skutik retro elegan dengan sentuhan gaya klasik yang stylish.' },
    { slug: 'matic', label: 'Matic', icon: 'circle-dot', tagline: 'Skutik harian serba bisa, ringan, dan nyaman untuk mobilitas kota.' },
    { slug: 'sport', label: 'Sport', icon: 'flame', tagline: 'Performa tinggi dan adrenalin balap untuk jiwa muda yang menantang.' },
    { slug: 'sport-heritage', label: 'Sport Heritage', icon: 'history', tagline: 'Gaya neo-retro modern yang memadukan desain klasik dan performa masa kini.' },
    { slug: 'offroad', label: 'Off-Road', icon: 'mountain', tagline: 'Tangguh di segala medan, dirancang untuk para petualang sejati.' },
    { slug: 'Moped', label: 'Moped', icon: 'bike', tagline: 'Motor bebek irit, tangguh, dan andal untuk kebutuhan harian.' },
];

// Kategori "hangat" (merah) vs "sejuk" (biru) — dipakai untuk warna badge kartu produk & detail motor
function isWarmCategory(cat) {
    return cat === 'maxi' || cat === 'sport' || cat === 'sport-heritage';
}

// Foto sampul kategori = foto motor pertama pada kategori tsb yang sudah punya gambar
function categoryCover(slug) {
    const withImage = motorList.find(m => m.category === slug && m.image && m.image.trim() !== '');
    if (withImage) return withImage.image;
    return 'https://picsum.photos/seed/yamaha-kategori-' + slug + '/500/375.jpg';
}

// Format angka jadi "Rp 12.345.000"
function formatRupiah(n) {
    return 'Rp ' + n.toLocaleString('id-ID');
}

function truncateText(str, max) {
    if (!str || str.length <= max) return str;
    return str.slice(0, max).trim() + '…';
}

// URL halaman detail motor berdasarkan slug
function motorDetailUrl(slug) {
    return 'motor-detail.html?motor=' + encodeURIComponent(slug);
}

// ===== PRODUK PAGE: KATEGORI -> MODEL MOTOR (alur seperti yamaha-motor.co.id) =====
// Langkah 1: pengguna melihat seluruh kategori (#categoryView).
// Langkah 2: setelah memilih kategori, tampil daftar model di kategori itu (#modelView).
// Langkah 3: mengklik model membuka halaman terpisah motor-detail.html?motor=slug.
// Kategori aktif disimpan di URL sebagai ?kategori=slug supaya bisa di-bookmark,
// dibagikan, dan tombol back/forward browser tetap berfungsi wajar.
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
            return `
            <a href="produk.html?kategori=${c.slug}" data-category="${c.slug}" class="category-card card-hover animate-on-scroll block rounded-2xl overflow-hidden bg-white border border-gray-100" style="transition-delay:${(idx % 3) * 0.1}s">
                <div class="relative aspect-[4/3] overflow-hidden bg-yamaha-gray-light">
                    <img src="${categoryCover(c.slug)}" alt="Kategori ${c.label}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 category-card-img">
                    <div class="absolute inset-0" style="background: linear-gradient(180deg, rgba(12,10,26,0.05) 0%, rgba(12,10,26,0.75) 100%);"></div>
                    <span class="absolute top-3 right-3 text-[11px] font-bold text-white/85 bg-black/30 backdrop-blur px-2.5 py-1 rounded-full">${count} Model</span>
                    <span class="absolute bottom-3 left-4 text-white font-black text-xl tracking-tight">${c.label}</span>
                </div>
                <div class="p-5">
                    <p class="text-gray-500 text-sm font-light leading-relaxed">${c.tagline}</p>
                    <span class="produk-detail-link">Lihat Model ${c.label} <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i></span>
                </div>
            </a>`;
        }).join('');
        lucide.createIcons();
        document.querySelectorAll('#categoryGrid .animate-on-scroll').forEach(el => scrollObserver.observe(el));

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
        document.title = 'Produk Motor — Yamaha Prihatin Motor';
        if (updateHistory) {
            history.pushState({ view: 'category' }, '', 'produk.html');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showCategory(slug, updateHistory) {
        const cat = categoryList.find(c => c.slug === slug);
        if (!cat) { showCategoryGrid(updateHistory); return; }

        if (categoryView) categoryView.classList.add('hidden');
        if (modelView) modelView.classList.remove('hidden');

        if (modelViewCategoryLabel) modelViewCategoryLabel.textContent = cat.label;
        if (modelViewTitle) modelViewTitle.textContent = 'Model Motor ' + cat.label;
        if (modelViewDesc) modelViewDesc.textContent = cat.tagline;
        document.title = 'Motor ' + cat.label + ' — Yamaha Prihatin Motor';

        renderMotor(motorList.filter(m => m.category === slug));

        if (updateHistory) {
            history.pushState({ view: 'model', kategori: slug }, '', 'produk.html?kategori=' + slug);
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
            const hasMultiple = m.variants.length > 1;

            return `
            <a href="${motorDetailUrl(m.slug)}" class="produk-card card-hover animate-on-scroll" style="transition-delay:${(idx % 3) * 0.1}s">
                <div class="produk-card-image">
                    <img src="${m.image && m.image.trim() !== '' ? m.image : 'https://picsum.photos/seed/' + m.seed + '/500/375.jpg'}" alt="Yamaha ${m.name}" loading="lazy">
                    <span class="produk-badge ${isWarmCategory(m.category) ? '' : 'badge-blue'}">${m.categoryLabel}</span>
                    ${hasMultiple ? `<span class="produk-variant-count">${m.variants.length} Varian</span>` : ''}
                </div>
                <div class="p-6 flex flex-col flex-1">
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-bold text-yamaha-dark">${m.name}</h3>
                        <span class="text-xs font-semibold text-gray-400">${m.cc}</span>
                    </div>
                    <p class="text-gray-500 text-sm font-light leading-relaxed mb-4 flex-1">${m.desc}</p>
                    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span class="produk-detail-link !mt-0">Lihat Detail &amp; Semua Varian</span>
                        <span class="w-10 h-10 rounded-xl red-accent flex items-center justify-center flex-shrink-0" aria-hidden="true"><i data-lucide="arrow-right" class="w-5 h-5 text-white"></i></span>
                    </div>
                </div>
            </a>
        `;
        }).join('');
        lucide.createIcons();
        document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
    }

    // Render kartu kategori sekali di awal, lalu tentukan tampilan awal
    // berdasarkan parameter ?kategori= di URL (mendukung link langsung/bookmark).
    renderCategoryGrid();
    const initialParams = new URLSearchParams(window.location.search);
    const initialKategori = initialParams.get('kategori');
    if (initialKategori) {
        showCategory(initialKategori, false);
    } else {
        showCategoryGrid(false);
    }
}

// ===== HALAMAN DETAIL MOTOR (motor-detail.html?motor=slug) =====
if (currentPage === 'motor-detail') {
    const heroEl = document.getElementById('motorDetailHero');
    const contentEl = document.getElementById('motorDetailContent');
    const notFoundEl = document.getElementById('motorNotFound');
    const variantsEl = document.getElementById('motorDetailVariants');
    const ctaWaEl = document.getElementById('motorDetailCtaWa');

    const specsEl = document.getElementById('motorDetailSpecs');

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('motor');
    const motor = motorList.find(m => m.slug === slug);

    // Transmisi disimpulkan dari kategori (semua motor pada kategori yang sama
    // di jajaran Yamaha memakai jenis transmisi yang sama)
    function transmisiForCategory(cat) {
        if (cat === 'maxi' || cat === 'classy' || cat === 'matic') return 'Otomatis (CVT)';
        if (cat === 'Moped') return 'Rotary (Tanpa Kopling Tangan)';
        return 'Manual';
    }

    if (!motor) {
        // Slug tidak ditemukan / link rusak — tampilkan state "tidak ditemukan"
        if (heroEl) heroEl.classList.add('hidden');
        if (contentEl) contentEl.classList.add('hidden');
        if (notFoundEl) notFoundEl.classList.remove('hidden');
        lucide.createIcons();
    } else {
        document.title = 'Yamaha ' + motor.name + ' — Yamaha Prihatin Motor';

        const heroImg = motor.image && motor.image.trim() !== '' ? motor.image : 'https://picsum.photos/seed/' + motor.seed + '/1200/750.jpg';

        if (heroEl) {
            heroEl.innerHTML = `
                <div class="motor-hero-image">
                    <img src="${heroImg}" alt="Yamaha ${motor.name}">
                    <div class="motor-hero-overlay"></div>
                </div>
                <div class="motor-hero-content">
                    <nav class="motor-breadcrumb" aria-label="Breadcrumb">
                        <a href="produk.html">Tipe Motor</a>
                        <span aria-hidden="true">/</span>
                        <a href="produk.html?kategori=${motor.category}">${motor.categoryLabel}</a>
                        <span aria-hidden="true">/</span>
                        <span class="motor-breadcrumb-current">${motor.name}</span>
                    </nav>
                    <a href="produk.html?kategori=${motor.category}" class="motor-back-link"><i data-lucide="arrow-left" class="w-4 h-4"></i> Kembali ke Model ${motor.categoryLabel}</a>
                    <span class="produk-badge motor-hero-badge ${isWarmCategory(motor.category) ? '' : 'badge-blue'}">${motor.categoryLabel}</span>
                    <h1 class="motor-hero-title">Yamaha ${motor.name}</h1>
                    <p class="motor-hero-desc">${motor.desc}</p>
                    <div class="motor-hero-meta">
                        <div class="motor-hero-meta-item"><i data-lucide="gauge" class="w-4 h-4"></i><span>${motor.cc}</span></div>
                        <div class="motor-hero-meta-item"><i data-lucide="layers" class="w-4 h-4"></i><span>${motor.variants.length} Varian Resmi</span></div>
                    </div>
                </div>
            `;
        }

        if (specsEl) {
            const specItems = [
                { icon: 'shapes', label: 'Kategori', value: motor.categoryLabel },
                { icon: 'gauge', label: 'Kapasitas Mesin', value: motor.cc },
                { icon: 'cog', label: 'Transmisi', value: transmisiForCategory(motor.category) },
                { icon: 'layers', label: 'Varian Resmi', value: motor.variants.length + ' Varian' },
            ];
            specsEl.innerHTML = specItems.map(s => `
                <div class="motor-spec-item">
                    <span class="motor-spec-icon"><i data-lucide="${s.icon}" class="w-4 h-4"></i></span>
                    <div>
                        <p class="motor-spec-label">${s.label}</p>
                        <p class="motor-spec-value">${s.value}</p>
                    </div>
                </div>`).join('');
        }

        if (variantsEl) {
            variantsEl.innerHTML = motor.variants.map(v => {
                const vImg = v.image && v.image.trim() !== '' ? v.image : heroImg;
                return `
                <div class="motor-variant-card animate-on-scroll">
                    <div class="motor-variant-card-image">
                        <img src="${vImg}" alt="Yamaha ${v.variant}" loading="lazy">
                    </div>
                    <div class="motor-variant-card-body">
                        <h3 class="motor-variant-card-name">${v.variant}</h3>
                        <p class="text-gray-500 text-xs font-light leading-relaxed mb-3">${truncateText(motor.desc, 70)}</p>
                        <div class="motor-variant-card-colors">
                            ${v.colors.map(c => `<span class="produk-color-chip">${c}</span>`).join('')}
                        </div>
                        <div class="motor-variant-card-footer">
                            <span class="produk-detail-link !mt-0">Hubungi Kami</span>
                            <a href="https://wa.me/6281211117265?text=${encodeURIComponent('Halo, saya ingin tanya tentang Yamaha ' + v.variant)}" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-xl red-accent flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform" aria-label="Tanya soal ${v.variant} via WhatsApp"><i data-lucide="message-circle" class="w-5 h-5 text-white"></i></a>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        if (ctaWaEl) {
            ctaWaEl.href = 'https://wa.me/6281211117265?text=' + encodeURIComponent('Halo, saya ingin tanya tentang Yamaha ' + motor.name);
        }

        lucide.createIcons();
        document.querySelectorAll('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
    }
}

// ===== TENTANG KAMI PAGE: LIGHTBOX SERTIFIKAT =====
if (currentPage === 'tentang') {
    const certLightbox = document.getElementById('lightbox');
    const certLightboxImg = document.getElementById('lightboxImg');
    const certLightboxClose = document.getElementById('lightboxClose');

    window.openCertLightbox = function(el) {
        const img = el.querySelector('img');
        if (certLightboxImg && img) {
            certLightboxImg.src = img.dataset.src || img.src;
            certLightboxImg.alt = img.alt || 'Foto Sertifikat';
            certLightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    };

    document.querySelectorAll('.cert-card-frame').forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.openCertLightbox(item);
            }
        });
    });

    if (certLightboxClose) {
        certLightboxClose.addEventListener('click', () => {
            certLightbox.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (certLightbox) {
        certLightbox.addEventListener('click', (e) => {
            if (e.target === certLightbox) {
                certLightbox.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certLightbox && certLightbox.classList.contains('open')) {
            certLightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
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
        // Nomor WhatsApp owner (sama dengan nomor yang dipakai tombol WA lain di situs ini)
        const CONTACT_WA_NUMBER = '6281211117265';

        const submitBtn = form.querySelector('button[type="submit"]');
        const submitBtnDefaultHTML = submitBtn ? submitBtn.innerHTML : '';

        // Validasi format email sederhana
        function isValidEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

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

            if (!isValidEmail(email)) {
                showToast('Format email tidak valid!', 'error');
                return;
            }

            // Susun isi form menjadi pesan WhatsApp yang rapi untuk owner
            const waMessage =
                `Halo Yamaha Prihatin Motor, saya ingin mengirim pesan melalui website:\n\n` +
                `*Nama:* ${nama}\n` +
                `*Email:* ${email}\n` +
                `*Subjek:* ${subjek}\n` +
                `*Pesan:*\n${pesan}`;

            const waUrl = `https://wa.me/${CONTACT_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

            // Feedback visual singkat sebelum membuka WhatsApp
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="flex items-center gap-2">Membuka WhatsApp...</span>';
            }

            showToast('Mengalihkan ke WhatsApp untuk mengirim pesan Anda...', 'success');

            setTimeout(() => {
                window.open(waUrl, '_blank', 'noopener,noreferrer');
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = submitBtnDefaultHTML;
                }
            }, 600);
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
// ===== DEALER IMAGE CAROUSEL (About/"Tentang Kami" section) =====
document.querySelectorAll('.dealer-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.dealer-carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.dealer-carousel-slide'));
    const prevBtn = carousel.querySelector('.dealer-carousel-btn--prev');
    const nextBtn = carousel.querySelector('.dealer-carousel-btn--next');
    const dots = Array.from(carousel.querySelectorAll('.dealer-carousel-dot'));
    if (!track || slides.length === 0) return;

    let current = 0;
    let isAnimating = false;
    const ANIMATION_MS = 400;

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
        setTimeout(() => { isAnimating = false; }, ANIMATION_MS);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    // Basic swipe support for touch devices
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

// ===== 3D INTERACTIVE CARDS =====
function init3DCards() {
    // Only apply on devices with mouse/hover capability
    if (window.matchMedia("(hover: none)").matches) return;

    const cards = document.querySelectorAll('.interactive-card, .card-hover, .nav-card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set position for glare
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // Calculate 3D tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.setProperty('--rotate-x', `${rotateX}deg`);
            card.style.setProperty('--rotate-y', `${rotateY}deg`);
        });

        card.addEventListener('mouseleave', () => {
            // Reset transforms smoothly
            card.style.setProperty('--rotate-x', `0deg`);
            card.style.setProperty('--rotate-y', `0deg`);
            
            // Center glare
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${rect.width / 2}px`);
            card.style.setProperty('--mouse-y', `${rect.height / 2}px`);
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init3DCards);
// Also run immediately in case DOMContentLoaded already fired
init3DCards();

// ===== INIT LUCIDE ICONS =====
lucide.createIcons();