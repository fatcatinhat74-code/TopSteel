// ===========================================================
// 🔧 NAVIGATION – Compatible with Firestore-based DataManager
// ===========================================================
class Navigation {
    constructor() {
        this.navbarHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo">
                        <div class="logo-container">
                            <img src="images/logo-placeholder.png" alt="توب ستيل Logo" class="logo-img" onerror="this.style.display='none'">
                           <h2>توب ستيل</h2>
                        </div>
                    </div>
                    <ul class="nav-menu">
                        <li><a href="index.html" class="nav-link">الرئيسية</a></li>
                        <li><a href="products.html" class="nav-link">المنتجات</a></li>
                        <li><a href="about.html" class="nav-link">من نحن</a></li>
<li><a href="#footer-company-description" class="nav-link">تواصل معنا</a></li>
                    </ul>
                    <div class="hamburger">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </nav>
        `;

        this.heroSlideshowHTML = `
            <section class="hero-slideshow">
                <div class="hero-slides-container" id="heroSlidesContainer"></div>
                <div class="hero-content">
                    <h1 id="hero-title">حلول أنابيب الصلب المتميزة</h1>
                    <p id="hero-subtitle">نصنع أنابيب الصلب عالية الجودة للتطبيقات الصناعية والتجارية في جميع أنحاء العالم</p>
                    <a href="products.html" class="cta-button">استكشف المنتجات</a>
                </div>
                <div class="slideshow-controls">
                    <button class="slide-prev" onclick="navigation.prevSlide()">‹</button>
                    <button class="slide-next" onclick="navigation.nextSlide()">›</button>
                </div>
                <div class="slideshow-dots" id="slideshowDots"></div>
            </section>
        `;

        this.regularHeroHTML = `
            <section class="hero-regular">
                <div class="hero-background"></div>
                <div class="hero-content">
                    <h1 id="hero-title">حلول أنابيب الصلب المتميزة</h1>
                    <p id="hero-subtitle">نصنع أنابيب الصلب عالية الجودة للتطبيقات الصناعية والتجارية في جميع أنحاء العالم</p>
                    <a href="products.html" class="cta-button">العودة للفئات</a>
                </div>
            </section>
        `;

        this.currentSlide = 0;
        this.slideshowInterval = null;
        this.slides = [];
        this.footerContent = {};
    }

    // =======================================================
    async init() {
        await this.waitForDOM();

        document.body.insertAdjacentHTML('afterbegin', this.navbarHTML);
        this.insertHeroSection();
        await this.waitForDataManager();

        await this.loadFooterContent();
        if (this.isHomepage()) await this.loadSlideshow();

        this.setActiveNavLink();
        this.initMobileMenu();
        this.updateFooterLinks();
    }

    waitForDOM() {
        return new Promise(resolve => {
            if (document.body) resolve();
            else document.addEventListener('DOMContentLoaded', resolve);
        });
    }

    async waitForDataManager() {
        let retries = 0;
        while ((!window.dataManager || !window.dataManager.firebaseInitialized) && retries < 20) {
            await new Promise(res => setTimeout(res, 300));
            retries++;
        }
    }

    // =======================================================
    // Footer
    // =======================================================
    async loadFooterContent() {
        if (!window.dataManager) {
            console.warn('⚠️ DataManager not ready, using default footer');
            this.generateFooterHTML();
            this.insertFooter();
            return;
        }
        this.footerContent = window.dataManager.getFooterContent();
        this.generateFooterHTML();
        this.insertFooter();
    }

// In navbar.js - update the generateFooterHTML() method
generateFooterHTML() {
    this.footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3 id="footer-company-name">${this.footerContent.companyName || 'توب ستيل'}</h3>
                        <p id="footer-company-description">${this.footerContent.companyDescription || 'الشركة الرائدة في تصنيع أنابيب الصلب المتميزة منذ عام 1998.'}</p>
                    </div>
                    <div class="footer-section">
                        <h4>معلومات الاتصال</h4>
                        <p><strong>البريد الإلكتروني:</strong> ${this.footerContent.email || 'info@top-steel.com'}</p>
                        <p><strong>الهاتف:</strong> ${this.footerContent.phone || '+20 123 456 7890'}</p>
                        <p><strong>العنوان:</strong> ${this.footerContent.address || 'المنطقة الصناعية، مدينة العبور، القاهرة'}</p>
                    </div>
                    <div class="footer-section">
                        <h4>روابط سريعة</h4>
                        <ul>
                            <li><a href="index.html">الرئيسية</a></li>
                            <li><a href="products.html">المنتجات</a></li>
                            <li><a href="about.html">من نحن</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>وسائل التواصل</h4>
                        <ul>
                            <li><a href="${this.footerContent.facebook || '#'}" class="social-link">فيسبوك</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>
                        <a href="https://linktr.ee/aaeliwa" target="blank" class="copyright-link">
                            Developed by Abdelrhman A. Eliwa © 2025
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    `;
}

    insertFooter() {
        document.body.insertAdjacentHTML('beforeend', this.footerHTML);
    }

    // =======================================================
    // Hero section & slides
    // =======================================================
    isHomepage() {
        const page = this.getCurrentPage();
        return page === 'index.html' || page === '' || page === '/';
    }

    insertHeroSection() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        if (this.isHomepage()) navbar.insertAdjacentHTML('afterend', this.heroSlideshowHTML);
        else {
            navbar.insertAdjacentHTML('afterend', this.regularHeroHTML);
            this.updatePageHeroContent();
        }
    }

    async loadSlideshow() {
        if (!window.dataManager) return;

        // ✅ Firestore-compatible: await async getSlides()
        const savedSlides = await window.dataManager.getSlides();
        this.slides = Array.isArray(savedSlides) ? savedSlides : [];

        // fallback if no slides
        if (this.slides.length === 0) {
            this.slides = [{
                id: 1,
                image: 'https://images.unsplash.com/photo-1581094794322-7c6dceeecb91?auto=format&fit=crop&w=2070&q=80',
                title: 'حلول أنابيب الصلب المتميزة',
                subtitle: 'نصنع أنابيب الصلب عالية الجودة للتطبيقات الصناعية والتجارية في جميع أنحاء العالم',
                active: true
            }];
        }

        this.renderSlideshow();
        this.startSlideshow();
    }

    renderSlideshow() {
        const container = document.getElementById('heroSlidesContainer');
        const dotsContainer = document.getElementById('slideshowDots');
        if (!container) return;

        const activeSlides = this.slides.filter(s => s.active);
        if (activeSlides.length === 0) {
            container.innerHTML = `<div class="hero-slide active"><div class="slide-background" style="background-image:url('https://images.unsplash.com/photo-1581094794322-7c6dceeecb91?w=800')"></div></div>`;
            dotsContainer.innerHTML = '<span class="dot active"></span>';
            return;
        }

        container.innerHTML = activeSlides.map((s, i) => `
            <div class="hero-slide ${i === 0 ? 'active' : ''}">
                <div class="slide-background" style="background-image:url('${s.image}')"></div>
            </div>`).join('');

        dotsContainer.innerHTML = activeSlides.map((s, i) =>
            `<span class="dot ${i === 0 ? 'active' : ''}" onclick="navigation.goToSlide(${i})"></span>`
        ).join('');

        this.updateSlideContent(0);
    }

    updateSlideContent(i) {
        const actives = this.slides.filter(s => s.active);
        if (!actives[i]) return;
        document.getElementById('hero-title').textContent = actives[i].title;
        document.getElementById('hero-subtitle').textContent = actives[i].subtitle;
    }

    nextSlide() { this.moveSlide(1); }
    prevSlide() { this.moveSlide(-1); }

    moveSlide(step) {
        if (!this.isHomepage()) return;
        const activeSlides = this.slides.filter(s => s.active);
        if (activeSlides.length <= 1) return;

        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        slides[this.currentSlide].classList.remove('active');
        dots[this.currentSlide].classList.remove('active');

        this.currentSlide = (this.currentSlide + step + activeSlides.length) % activeSlides.length;
        slides[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');
        this.updateSlideContent(this.currentSlide);
        this.restartSlideshow();
    }

    startSlideshow() {
        if (!this.isHomepage()) return;
        const activeSlides = this.slides.filter(s => s.active);
        if (activeSlides.length <= 1) return;
        this.slideshowInterval = setInterval(() => this.nextSlide(), 5000);
    }

    restartSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.startSlideshow();
        }
    }

    stopSlideshow() {
        if (this.slideshowInterval) clearInterval(this.slideshowInterval);
    }

    // =======================================================
    // Utility
    // =======================================================
    updatePageHeroContent() {
        const page = this.getCurrentPage();
        const title = document.getElementById('hero-title');
        const sub = document.getElementById('hero-subtitle');
        const btn = document.querySelector('.hero-content .cta-button');
        if (!title) return;

        const pageData = {
            'about.html': ['من نحن', 'تعرف على تاريخنا، مهمتنا، والتزامنا بالتميز'],
            'products.html': ['منتجاتنا', 'استكشف مجموعة حلول أنابيب الصلب الشاملة لدينا'],
            'achievements.html': ['إنجازاتنا', 'الاحتفاء بمعالمنا والتقدير في صناعة أنابيب الصلب'],
            'admin.html': ['لوحة التحكم', 'إدارة محتوى موقع توب ستيل']
        };

        if (pageData[page]) {
            title.textContent = pageData[page][0];
            sub.textContent = pageData[page][1];
            if (btn) btn.style.display = 'none';
        }
    }

    getCurrentPage() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    setActiveNavLink() {
        const page = this.getCurrentPage();
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === page);
        });
    }

    updateFooterLinks() {
        const page = this.getCurrentPage();
        document.querySelectorAll('.footer-section a').forEach(link => {
            const href = link.getAttribute('href');
            if (href === page) {
                link.style.color = '#3498db';
                link.style.fontWeight = '600';
            }
        });
    }

    initMobileMenu() {
        const burger = document.querySelector('.hamburger');
        const menu = document.querySelector('.nav-menu');
        if (!burger || !menu) return;

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(l =>
            l.addEventListener('click', () => {
                burger.classList.remove('active');
                menu.classList.remove('active');
            })
        );

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                burger.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }
}

// ===========================================================
// Initialize navigation after DOM ready
// ===========================================================
document.addEventListener('DOMContentLoaded', async () => {
    window.navigation = new Navigation();
    await window.navigation.init();
});
