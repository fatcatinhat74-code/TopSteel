// Sample data and localStorage management
class DataManager {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Default admin credentials
        if (!localStorage.getItem('adminCredentials')) {
            localStorage.setItem('adminCredentials', JSON.stringify({
                username: 'admin',
                password: 'password123'
            }));
        }

        // Default categories
        if (!localStorage.getItem('categories')) {
            const defaultCategories = [
                {
                    id: 1,
                    name: 'الأنابيب غير الملحومة',
                    description: 'أنابيب الصلب غير الملحومة عالية الجودة للتطبيقات عالية الضغط',
                    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop'
                },
                {
                    id: 2,
                    name: 'الأنابيب الملحومة',
                    description: 'أنابيب الصلب الملحومة المتينة للتطبيقات الصناعية المختلفة',
                    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop'
                }
            ];
            localStorage.setItem('categories', JSON.stringify(defaultCategories));
        }

        // In data.js - Update default products with simple prices
        if (!localStorage.getItem('products')) {
            const defaultProducts = [
                {
                    id: 1,
                    categoryId: 1,
                    name: 'أنبوب API 5L غير الملحوم',
                    description: 'أنبوب غير ملحوم عالي القوة لنقل النفط والغاز',
                    specs: 'الحجم: 2-24 بوصة\nالمادة: الصلب الكربوني\nالمعايير: API 5L, ASTM A106',
                    price: '650-2500', // Simple format - will be auto-formatted
                    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop'
                },
                {
                    id: 2,
                    categoryId: 1,
                    name: 'أنبوب الفولاذ المقاوم للصدأ غير الملحوم',
                    description: 'أنابيب غير ملحومة مقاومة للتآكل للصناعة الكيميائية',
                    specs: 'الحجم: 1/2-12 بوصة\nالمادة: الفولاذ المقاوم للصدأ 304/316\nالمعايير: ASTM A312',
                    price: '1000-3500', // Simple format
                    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop'
                },
                {
                    id: 3,
                    categoryId: 2,
                    name: 'أنبوب الصلب ERW',
                    description: 'أنابيب ملحومة بمقاومة كهربائية للتطبيقات الهيكلية',
                    specs: 'الحجم: 1/2-20 بوصة\nالمادة: الصلب الكربوني\nالمعايير: ASTM A53',
                    price: '400-1500', // Simple format
                    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop'
                },
                {
                    id: 4,
                    categoryId: 2,
                    name: 'أنبوب الصلب LSAW',
                    description: 'أنابيب ملحومة بقوس مغمور طولي للتطبيقات كبيرة القطر',
                    specs: 'الحجم: 20-60 بوصة\nالمادة: الصلب الكربوني\nالمعايير: API 5L, ASTM A252',
                    price: '1500-6000', // Simple format
                    image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop'
                }
            ];
            
            // Auto-format the default products
            const formattedProducts = defaultProducts.map(product => {
                return {
                    ...product,
                    price: this.formatPriceToEGP(product.price)
                };
            });
            
            localStorage.setItem('products', JSON.stringify(formattedProducts));
        }

        // Default content
        if (!localStorage.getItem('content')) {
            const defaultContent = {
                'hero-title': 'حلول أنابيب الصلب المتميزة',
                'hero-subtitle': 'نصنع أنابيب الصلب عالية الجودة للتطبيقات الصناعية والتجارية في جميع أنحاء العالم',
                'intro-title': 'مرحبًا بكم في SteelFlow Pipes',
                'intro-text': 'مع أكثر من 25 عامًا من الخبرة في تصنيع أنابيب الصلب، نقدم حلول أنابيب قوية وموثوقة لتطبيقات النفط والغاز وأنظمة المياه والتطبيقات الصناعية. التزامنا بالجودة والابتكار يجعلنا الخيار المفضل عالميًا.',
                'about-history-title': 'تاريخنا',
                'about-history-text': 'تأسست SteelFlow Pipes في عام 1998 كوحدة تصنيع صغيرة برؤية لإحداث ثورة في صناعة أنابيب الصلب. على مر السنين، نمينا لتصبح قائدًا عالميًا، نخدم العملاء في أكثر من 50 دولة بحلولنا المتميزة لأنابيب الصلب.',
                'about-mission-title': 'مهمتنا',
                'about-mission-text': 'تقديم حلول مبتكرة وعالية الجودة لأنابيب الصلب تتجاوز توقعات العملاء مع الحفاظ على أعلى معايير السلامة والموثوقية والمسؤولية البيئية.',
                'about-vision-title': 'رؤيتنا',
                'about-vision-text': 'أن نكون الشريك الأكثر ثقة في العالم في تصنيع أنابيب الصلب، ودفع التقدم من خلال الابتكار التكنولوجي والممارسات المستدامة.',
                'projects-title': 'المشاريع الرئيسية',
                'certifications-title': 'الشهادات والجوائز',
                'milestones-title': 'محطات الشركة'
            };
            localStorage.setItem('content', JSON.stringify(defaultContent));
        }

            if (!localStorage.getItem('footerContent')) {
                const defaultFooterContent = {
                    companyName: 'توب ستيل',
                    companyDescription: 'الشركة الرائدة في تصنيع أنابيب الصلب المتميزة منذ عام 1998.',
                    email: 'info@top-steel.com',
                    phone: '+20 123 456 7890',
                    address: 'المنطقة الصناعية، مدينة العبور، القاهرة',
                    facebook: 'https://facebook.com/topsteel',
         
                    copyright: '&copy; 2024 توب ستيل. جميع الحقوق محفوظة.'
                };
                localStorage.setItem('footerContent', JSON.stringify(defaultFooterContent));
            }
        } 


            // Add footer content methods
        getFooterContent() {
            return JSON.parse(localStorage.getItem('footerContent')) || {};
        }

        updateFooterContent(updates) {
            const footerContent = this.getFooterContent();
            Object.keys(updates).forEach(key => {
                footerContent[key] = updates[key];
            });
            localStorage.setItem('footerContent', JSON.stringify(footerContent));
            this.updateNavigationFooter();
        }

        updateNavigationFooter() {
            if (window.navigation) {
                const footerContent = this.getFooterContent();
                window.navigation.updateFooter(footerContent);
            }
        }


    // Category methods
    getCategories() {
        return JSON.parse(localStorage.getItem('categories')) || [];
    }

    addCategory(category) {
        const categories = this.getCategories();
        category.id = Date.now();
        categories.push(category);
        localStorage.setItem('categories', JSON.stringify(categories));
        return category;
    }

    updateCategory(id, updatedCategory) {
        const categories = this.getCategories();
        const index = categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
            categories[index] = { ...categories[index], ...updatedCategory };
            localStorage.setItem('categories', JSON.stringify(categories));
            return true;
        }
        return false;
    }

    deleteCategory(id) {
        const categories = this.getCategories();
        const filteredCategories = categories.filter(cat => cat.id !== id);
        localStorage.setItem('categories', JSON.stringify(filteredCategories));
        
        // Also delete products in this category
        this.deleteProductsByCategory(id);
    }

    // Product methods
    getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    getProductsByCategory(categoryId) {
        const products = this.getProducts();
        return products.filter(product => product.categoryId === parseInt(categoryId));
    }

addProduct(product) {
    const products = this.getProducts();
    product.id = Date.now();
    product.categoryId = parseInt(product.categoryId);
    
    // Auto-format price to EGP
    product.price = this.formatPriceToEGP(product.price);
    
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
    return product;
}

updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex(prod => prod.id === id);
    if (index !== -1) {
        // Auto-format price to EGP
        updatedProduct.price = this.formatPriceToEGP(updatedProduct.price);
        
        products[index] = { ...products[index], ...updatedProduct };
        localStorage.setItem('products', JSON.stringify(products));
        return true;
    }
    return false;
}

// Enhanced price formatting in data.js
formatPriceToEGP(price) {
    if (!price || price.trim() === '') return 'السعر عند الطلب';
    
    let formattedPrice = price.trim();
    
    // Remove any currency indicators
    formattedPrice = formattedPrice
        .replace(/جنيه/g, '')
        .replace(/\$/g, '')
        .replace(/EGP/g, '')
        .replace(/ج\.م/g, '')
        .replace(/ريال/g, '')
        .replace(/ر\.س/g, '')
        .replace(/دينار/g, '')
        .replace(/د\.ك/g, '')
        .replace(/درهم/g, '')
        .replace(/د\.إ/g, '')
        .trim();
    
    // Handle different separators
    formattedPrice = formattedPrice
        .replace(/,/g, '-')  // Replace commas with dashes
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/--+/g, '-') // Remove multiple dashes
        .replace(/^-|-$/g, ''); // Remove leading/trailing dashes
    
    // Convert to Eastern Arabic numerals
    formattedPrice = this.convertToEasternArabic(formattedPrice);
    
    // Format single price
    if (!formattedPrice.includes('-')) {
        return `${formattedPrice} جنيه`;
    }
    
    // Format price range
    const priceParts = formattedPrice.split('-');
    if (priceParts.length === 2) {
        return `${priceParts[0]} - ${priceParts[1]} جنيه`;
    }
    
    // Fallback for complex ranges
    return `${formattedPrice} جنيه`;
}

// Enhanced numeral conversion with proper range handling
convertToEasternArabic(text) {
    const westernArabic = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const easternArabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    
    // Handle price ranges separately
    if (text.includes('-')) {
        const parts = text.split('-');
        const convertedParts = parts.map(part => {
            let converted = part.trim();
            westernArabic.forEach((num, index) => {
                const regex = new RegExp(num, 'g');
                converted = converted.replace(regex, easternArabic[index]);
            });
            return converted;
        });
        return convertedParts.join(' - ');
    }
    
    // Single price
    let converted = text;
    westernArabic.forEach((num, index) => {
        const regex = new RegExp(num, 'g');
        converted = converted.replace(regex, easternArabic[index]);
    });
    
    return converted;
}
    deleteProduct(id) {
        const products = this.getProducts();
        const filteredProducts = products.filter(prod => prod.id !== id);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
    }

    deleteProductsByCategory(categoryId) {
        const products = this.getProducts();
        const filteredProducts = products.filter(prod => prod.categoryId !== parseInt(categoryId));
        localStorage.setItem('products', JSON.stringify(filteredProducts));
    }

    // Content methods
    getContent() {
        return JSON.parse(localStorage.getItem('content')) || {};
    }

    updateContent(key, value) {
        const content = this.getContent();
        content[key] = value;
        localStorage.setItem('content', JSON.stringify(content));
    }

    updateMultipleContent(updates) {
        const content = this.getContent();
        Object.keys(updates).forEach(key => {
            content[key] = updates[key];
        });
        localStorage.setItem('content', JSON.stringify(content));
    }

    // Featured products (first 4 products)
    getFeaturedProducts() {
        const products = this.getProducts();
        return products.slice(0, 4);
    }

    // Slideshow methods
getSlides() {
    return JSON.parse(localStorage.getItem('heroSlides')) || [];
}

addSlide(slide) {
    const slides = this.getSlides();
    slide.id = Date.now();
    slides.push(slide);
    localStorage.setItem('heroSlides', JSON.stringify(slides));
    this.updateNavigationSlides();
    return slide;
}

updateSlide(id, updatedSlide) {
    const slides = this.getSlides();
    const index = slides.findIndex(slide => slide.id === id);
    if (index !== -1) {
        slides[index] = { ...slides[index], ...updatedSlide };
        localStorage.setItem('heroSlides', JSON.stringify(slides));
        this.updateNavigationSlides();
        return true;
    }
    return false;
}

toggleSlide(id) {
    const slides = this.getSlides();
    const index = slides.findIndex(slide => slide.id === id);
    if (index !== -1) {
        slides[index].active = !slides[index].active;
        localStorage.setItem('heroSlides', JSON.stringify(slides));
        this.updateNavigationSlides();
        return true;
    }
    return false;
}

moveSlide(id, direction) {
    const slides = this.getSlides();
    const index = slides.findIndex(slide => slide.id === id);
    if (index !== -1 && index + direction >= 0 && index + direction < slides.length) {
        const temp = slides[index];
        slides[index] = slides[index + direction];
        slides[index + direction] = temp;
        localStorage.setItem('heroSlides', JSON.stringify(slides));
        this.updateNavigationSlides();
        return true;
    }
    return false;
}

deleteSlide(id) {
    const slides = this.getSlides();
    const filteredSlides = slides.filter(slide => slide.id !== id);
    localStorage.setItem('heroSlides', JSON.stringify(filteredSlides));
    this.updateNavigationSlides();
}

updateNavigationSlides() {
    if (window.navigation) {
        const slides = this.getSlides();
        window.navigation.updateSlides(slides);
    }
}
}

// Initialize data manager
const dataManager = new DataManager();

// Utility functions for frontend
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    const featuredProducts = dataManager.getFeaturedProducts();
    const categories = dataManager.getCategories();

    featuredContainer.innerHTML = featuredProducts.map(product => {
        const category = categories.find(cat => cat.id === product.categoryId);
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop'">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price}</div>
                <div class="product-specs">
                    <strong>Category:</strong> ${category ? category.name : 'Unknown'}<br>
                    ${product.specs.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
    }).join('');
}

function loadCategories() {
    const categoriesContainer = document.getElementById('categories-container');
    if (!categoriesContainer) return;

    const categories = dataManager.getCategories();
    
    categoriesContainer.innerHTML = categories.map(category => `
        <a href="category.html?category=${category.id}" class="category-card">
            <img src="${category.image}" alt="${category.name}" onerror="this.src='https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop'">
            <h3>${category.name}</h3>
            <p>${category.description}</p>
        </a>
    `).join('');
}

function loadCategoryProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get('category');
    
    if (!categoryId) {
        window.location.href = 'products.html';
        return;
    }

    const category = dataManager.getCategories().find(cat => cat.id === parseInt(categoryId));
    if (!category) {
        window.location.href = 'products.html';
        return;
    }

    // Update page title and description
    document.getElementById('category-title').textContent = category.name;
    document.getElementById('category-description').textContent = category.description;

    const productsContainer = document.getElementById('products-container');
    const products = dataManager.getProductsByCategory(categoryId);

    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="text-center">No products found in this category.</p>';
        return;
    }

    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop'">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${product.price}</div>
            <div class="product-specs">
                ${product.specs.replace(/\n/g, '<br>')}
            </div>
        </div>
    `).join('');
}

// Load dynamic content from localStorage
function loadDynamicContent() {
    const content = dataManager.getContent();
    
    // Update all elements with data from localStorage
    Object.keys(content).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = content[key];
        }
        
        // Also update input fields in admin panel
        const inputElement = document.getElementById(`${key}-input`);
        if (inputElement) {
            inputElement.value = content[key];
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadDynamicContent();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});


