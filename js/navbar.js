// navigation.js - Navigation, Footer, and Hero components for all pages
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
                       
                    </ul>
                    <div class="hamburger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        `;
        
        this.heroSlideshowHTML = `
            <section class="hero-slideshow">
                <div class="hero-slides-container" id="heroSlidesContainer">
                    <!-- Slides will be dynamically loaded -->
                </div>
                <div class="hero-content">
                    <h1 id="hero-title">حلول أنابيب الصلب المتميزة</h1>
                    <p id="hero-subtitle">نصنع أنابيب الصلب عالية الجودة للتطبيقات الصناعية والتجارية في جميع أنحاء العالم</p>
                    <a href="products.html" class="cta-button">استكشف المنتجات</a>
                </div>
                <div class="slideshow-controls">
                    <button class="slide-prev" onclick="navigation.prevSlide()">‹</button>
                    <button class="slide-next" onclick="navigation.nextSlide()">›</button>
                </div>
                <div class="slideshow-dots" id="slideshowDots">
                    <!-- Dots will be dynamically generated -->
                </div>
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
        
        this.footerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3>توب ستيل</h3>
                            <p>الشركة الرائدة في تصنيع أنابيب الصلب المتميزة منذ عام 1998.</p>
                        </div>
                        <div class="footer-section">
                            <h4>معلومات الاتصال</h4>
                            <p>البريد الإلكتروني: info@steelflow.com</p>
                            <p>الهاتف: +1 (555) 123-4567</p>
                            <p>العنوان: 123 الطريق الصناعي، هيوستن، تكساس</p>
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
                                <li><a href="#" class="social-link">فيسبوك</a></li>
                    
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 توب ستيل. جميع الحقوق محفوظة.</p>
                    </div>
                </div>
            </footer>
        `;
        
        this.currentSlide = 0;
        this.slideshowInterval = null;
        this.slides = [];
        
        

          
        this.footerContent = {};
       
        
        this.init();
    }

    init() {
        // Insert navbar at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', this.navbarHTML);
        
        // Insert appropriate hero section based on current page
        this.insertHeroSection();
        
        // Load footer content and insert footer
        this.loadFooterContent();
        
        // Load slideshow data and initialize if on homepage
        if (this.isHomepage()) {
            this.loadSlideshow();
        }
        
        // Set active link based on current page
        this.setActiveNavLink();
        
        // Initialize mobile menu functionality
        this.initMobileMenu();
        
        // Update footer links based on current page
        this.updateFooterLinks();
    }

    
loadFooterContent() {
    // Get footer content from DataManager
    const dataManager = new DataManager();
    const savedFooterContent = dataManager.getFooterContent();
    this.footerContent = savedFooterContent;
    this.generateFooterHTML();
    this.insertFooter();
}

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
                        <p id="footer-email"><strong>البريد الإلكتروني:</strong> ${this.footerContent.email || 'info@top-steel.com'}</p>
                        <p id="footer-phone"><strong>الهاتف:</strong> ${this.footerContent.phone || '+20 123 456 7890'}</p>
                        <p id="footer-address"><strong>العنوان:</strong> ${this.footerContent.address || 'المنطقة الصناعية، مدينة العبور، القاهرة'}</p>
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
                    <p id="footer-copyright">${this.footerContent.copyright || '&copy; 2024 توب ستيل. جميع الحقوق محفوظة.'}</p>
                </div>
            </div>
        </footer>
    `;
}

insertFooter() {
    // Insert footer at the end of body
    document.body.insertAdjacentHTML('beforeend', this.footerHTML);
}

// Add method to update footer dynamically
updateFooter(newFooterContent) {
    this.footerContent = newFooterContent;
    
    // Remove existing footer
    const existingFooter = document.querySelector('.footer');
    if (existingFooter) {
        existingFooter.remove();
    }
    
    // Generate and insert new footer
    this.generateFooterHTML();
    this.insertFooter();
    this.updateFooterLinks();
}

    isHomepage() {
        const currentPage = this.getCurrentPage();
        return currentPage === 'index.html' || currentPage === '' || currentPage === '/';
    }

    insertHeroSection() {
        const navbar = document.querySelector('.navbar');
        
        if (this.isHomepage()) {
            // Insert slideshow hero for homepage
            navbar.insertAdjacentHTML('afterend', this.heroSlideshowHTML);
        } else {
            // Insert regular hero for other pages
            navbar.insertAdjacentHTML('afterend', this.regularHeroHTML);
            
            // Update hero content based on current page
            this.updatePageHeroContent();
        }
    }

    updatePageHeroContent() {
        const currentPage = this.getCurrentPage();
        const titleElement = document.getElementById('hero-title');
        const subtitleElement = document.getElementById('hero-subtitle');
        const buttonElement = document.querySelector('.hero-content .cta-button');
        
        if (!titleElement) return;
        
        switch(currentPage) {
            case 'about.html':
                titleElement.textContent = 'من نحن';
                subtitleElement.textContent = 'تعرف على تاريخنا، مهمتنا، والتزامنا بالتميز';
                if (buttonElement) buttonElement.style.display = 'none';
                break;
            case 'products.html':
                titleElement.textContent = 'منتجاتنا';
                subtitleElement.textContent = 'استكشف مجموعة حلول أنابيب الصلب الشاملة لدينا';
                if (buttonElement) buttonElement.textContent = 'عرض الفئات';
                break;
            case 'achievements.html':
                titleElement.textContent = 'إنجازاتنا';
                subtitleElement.textContent = 'الاحتفاء بمعالمنا والتقدير في صناعة أنابيب الصلب';
                if (buttonElement) buttonElement.style.display = 'none';
                break;
            case 'admin.html':
                titleElement.textContent = 'لوحة التحكم';
                subtitleElement.textContent = 'إدارة محتوى موقع توب ستيل';
                if (buttonElement) buttonElement.style.display = 'none';
                break;
            default:
                // Keep default content for other pages
                break;
        }
    }

    loadSlideshow() {
        // Get slides from localStorage or use defaults
        const savedSlides = JSON.parse(localStorage.getItem('heroSlides') || '[]');
        
        if (savedSlides.length > 0) {
            this.slides = savedSlides;
        } else {
            // Default slides
            this.slides = [
                {
                    id: 1,
                    image: 'https://images.unsplash.com/photo-1581094794322-7c6dceeecb91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'حلول أنابيب الصلب المتميزة',
                    subtitle: 'نصنع أنابيب الصلب عالية الجودة للتطبيقات الصناعية والتجارية في جميع أنحاء العالم',
                    active: true
                },
                {
                    id: 2,
                    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'جودة لا مثيل لها',
                    subtitle: 'أكثر من 25 عاماً من الخبرة في تصنيع أنابيب الصلب عالية الجودة',
                    active: true
                },
                {
                    id: 3,
                    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'توصيل عالمي',
                    subtitle: 'نخدم العملاء في أكثر من 50 دولة حول العالم',
                    active: true
                }
            ];
            localStorage.setItem('heroSlides', JSON.stringify(this.slides));
        }
        
        this.renderSlideshow();
        this.startSlideshow();
    }

    renderSlideshow() {
        const container = document.getElementById('heroSlidesContainer');
        const dotsContainer = document.getElementById('slideshowDots');
        
        if (!container) return;
        
        // Filter active slides
        const activeSlides = this.slides.filter(slide => slide.active);
        
        if (activeSlides.length === 0) {
            container.innerHTML = `
                <div class="hero-slide active">
                    <div class="slide-background" style="background-image: url('https://images.unsplash.com/photo-1581094794322-7c6dceeecb91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"></div>
                </div>
            `;
            if (dotsContainer) dotsContainer.innerHTML = '<span class="dot active"></span>';
            return;
        }
        
        // Render slides
        container.innerHTML = activeSlides.map((slide, index) => `
            <div class="hero-slide ${index === 0 ? 'active' : ''}" data-slide-id="${slide.id}">
                <div class="slide-background" style="background-image: url('${slide.image}')"></div>
            </div>
        `).join('');
        
        // Render dots
        if (dotsContainer) {
            dotsContainer.innerHTML = activeSlides.map((slide, index) => `
                <span class="dot ${index === 0 ? 'active' : ''}" onclick="navigation.goToSlide(${index})"></span>
            `).join('');
        }
        
        // Update current slide info
        this.updateSlideContent(0);
    }

    updateSlideContent(slideIndex) {
        const activeSlides = this.slides.filter(slide => slide.active);
        if (activeSlides.length === 0) return;
        
        const currentSlide = activeSlides[slideIndex];
        const titleElement = document.getElementById('hero-title');
        const subtitleElement = document.getElementById('hero-subtitle');
        
        if (titleElement) titleElement.textContent = currentSlide.title;
        if (subtitleElement) subtitleElement.textContent = currentSlide.subtitle;
    }

    nextSlide() {
        if (!this.isHomepage()) return;
        
        const activeSlides = this.slides.filter(slide => slide.active);
        if (activeSlides.length <= 1) return;
        
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        
        slides[this.currentSlide].classList.remove('active');
        dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (this.currentSlide + 1) % activeSlides.length;
        
        slides[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');
        this.updateSlideContent(this.currentSlide);
        
        this.restartSlideshow();
    }

    prevSlide() {
        if (!this.isHomepage()) return;
        
        const activeSlides = this.slides.filter(slide => slide.active);
        if (activeSlides.length <= 1) return;
        
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        
        slides[this.currentSlide].classList.remove('active');
        dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (this.currentSlide - 1 + activeSlides.length) % activeSlides.length;
        
        slides[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');
        this.updateSlideContent(this.currentSlide);
        
        this.restartSlideshow();
    }

    goToSlide(index) {
        if (!this.isHomepage()) return;
        
        const activeSlides = this.slides.filter(slide => slide.active);
        if (index < 0 || index >= activeSlides.length) return;
        
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.dot');
        
        slides[this.currentSlide].classList.remove('active');
        dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        slides[this.currentSlide].classList.add('active');
        dots[this.currentSlide].classList.add('active');
        this.updateSlideContent(this.currentSlide);
        
        this.restartSlideshow();
    }

    startSlideshow() {
        if (!this.isHomepage()) return;
        
        const activeSlides = this.slides.filter(slide => slide.active);
        if (activeSlides.length <= 1) return;
        
        this.slideshowInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    restartSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
            this.startSlideshow();
        }
    }

    stopSlideshow() {
        if (this.slideshowInterval) {
            clearInterval(this.slideshowInterval);
        }
    }

    // Admin methods to update slides
    updateSlides(newSlides) {
        this.slides = newSlides;
        localStorage.setItem('heroSlides', JSON.stringify(this.slides));
        if (this.isHomepage()) {
            this.currentSlide = 0;
            this.renderSlideshow();
            this.restartSlideshow();
        }
    }

    setActiveNavLink() {
        const currentPage = this.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if ((currentPage === 'index.html' && linkHref === 'index.html') ||
                (currentPage !== 'index.html' && linkHref === currentPage)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateFooterLinks() {
        const currentPage = this.getCurrentPage();
        const footerLinks = document.querySelectorAll('.footer-section a');
        
        footerLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref === currentPage) {
                link.style.color = '#3498db';
                link.style.fontWeight = '600';
            }
        });
    }

    getCurrentPage() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.navbar')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});