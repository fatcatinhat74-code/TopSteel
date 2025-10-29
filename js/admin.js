// Admin Panel JavaScript - Arabic Messages
class AdminPanel {
    constructor() {
        this.dataManager = new DataManager();
        this.isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        this.currentEditingId = null;
        
        this.initializeAdmin();
    }

    initializeAdmin() {
        if (this.isLoggedIn) {
            this.showDashboard();
        } else {
            this.showLogin();
        }

        this.setupEventListeners();
        this.loadData();
    }

    setupEventListeners() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Form submissions
        this.setupFormSubmissions();
    }

    setupFormSubmissions() {
        // Home content form
        const homeForm = document.getElementById('home-content-form');
        if (homeForm) {
            homeForm.addEventListener('submit', (e) => this.handleContentUpdate(e, 'home'));
        }

        const slideForm = document.getElementById('add-slide-form');
        if (slideForm) {
            slideForm.addEventListener('submit', (e) => this.handleAddSlide(e));
        }

        // About content form
        const aboutForm = document.getElementById('about-content-form');
        if (aboutForm) {
            aboutForm.addEventListener('submit', (e) => this.handleContentUpdate(e, 'about'));
        }

        // Achievements content form
        const achievementsForm = document.getElementById('achievements-content-form');
        if (achievementsForm) {
            achievementsForm.addEventListener('submit', (e) => this.handleContentUpdate(e, 'achievements'));
        }

        // Add category form
        const categoryForm = document.getElementById('add-category-form');
        if (categoryForm) {
            categoryForm.addEventListener('submit', (e) => this.handleAddCategory(e));
        }

        // Add product form
        const productForm = document.getElementById('add-product-form');
        if (productForm) {
            productForm.addEventListener('submit', (e) => this.handleAddProduct(e));
        }

         // Footer content form
    const footerForm = document.getElementById('footer-content-form');
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => this.handleFooterContentUpdate(e));
    }

    }

    handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const credentials = JSON.parse(localStorage.getItem('adminCredentials'));

        if (username === credentials.username && password === credentials.password) {
            localStorage.setItem('adminLoggedIn', 'true');
            this.isLoggedIn = true;
            this.showDashboard();
            this.showSuccess('تم تسجيل الدخول بنجاح!');
        } else {
            alert('بيانات الاعتماد غير صالحة! يرجى المحاولة مرة أخرى.');
        }
    }

    handleLogout() {
        localStorage.setItem('adminLoggedIn', 'false');
        this.isLoggedIn = false;
        this.showLogin();
        this.showSuccess('تم تسجيل الخروج بنجاح!');
    }

    showLogin() {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('admin-dashboard').classList.add('hidden');
    }

    showDashboard() {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
    }

    switchTab(tabName) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        // Show selected tab content
        document.getElementById(tabName).classList.add('active');

        // Add active class to clicked button
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Load dynamic data for specific tabs
        if (tabName === 'categories') {
            this.loadCategoriesList();
        } else if (tabName === 'products') {
            this.loadProductsList();
            this.populateCategoryDropdown();
        } else if (tabName === 'hero-slideshow') {
            this.loadSlidesList();
        } else if (tabName === 'footer-content') {
            this.loadFooterContentForm(); // Load footer content when tab is selected
        }
    }


    loadData() {
        this.loadContentForms();
        this.loadCategoriesList();
        this.loadProductsList();
        this.populateCategoryDropdown();
        this.loadFooterContentForm(); // Load footer content on initialization
    }

    loadContentForms() {
        const content = this.dataManager.getContent();
        
        // Set values for all content inputs
        Object.keys(content).forEach(key => {
            const input = document.querySelector(`[data-key="${key}"]`);
            if (input) {
                input.value = content[key];
            }
        });
    }

    handleContentUpdate(e, type) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const updates = {};
        
        // Get all inputs with data-key attribute
        const inputs = e.target.querySelectorAll('[data-key]');
        inputs.forEach(input => {
            updates[input.dataset.key] = input.value;
        });

        this.dataManager.updateMultipleContent(updates);
        
        let successMessage = '';
        switch(type) {
            case 'home':
                successMessage = 'تم تحديث محتوى الصفحة الرئيسية بنجاح!';
                break;
            case 'about':
                successMessage = 'تم تحديث محتوى صفحة من نحن بنجاح!';
                break;
            case 'achievements':
                successMessage = 'تم تحديث محتوى صفحة الإنجازات بنجاح!';
                break;
            default:
                successMessage = 'تم تحديث المحتوى بنجاح!';
        }
        
        this.showSuccess(successMessage);
    }

handleAddSlide(e) {
    e.preventDefault();
    
    const slide = {
        image: document.getElementById('slide-image').value,
        title: document.getElementById('slide-title').value,
        subtitle: document.getElementById('slide-subtitle').value,
        active: document.getElementById('slide-active').checked
    };

    this.dataManager.addSlide(slide);
    
    // Use safe reset
    this.safeFormReset('add-slide-form');
    
    this.loadSlidesList();
    this.showSuccess('تم إضافة الشريحة بنجاح!');
}


loadSlidesList() {
    const container = document.getElementById('slides-list-container');
    if (!container) return;

    const slides = this.dataManager.getSlides();
    
    container.innerHTML = slides.map((slide, index) => `
        <div class="slide-item ${slide.active ? '' : 'inactive'}">
            <div class="slide-preview">
                <img src="${slide.image}" alt="${slide.title}" class="slide-image" onerror="this.src='https://images.unsplash.com/photo-1581094794322-7c6dceeecb91?w=400&h=250&fit=crop'">
                <div class="slide-info">
                    <h5>${slide.title}</h5>
                    <p>${slide.subtitle}</p>
                    <span class="slide-status ${slide.active ? 'active' : 'inactive'}">
                        ${slide.active ? 'نشطة' : 'غير نشطة'}
                    </span>
                </div>
            </div>
            <div class="slide-actions">
                <button class="toggle-slide-btn ${slide.active ? '' : 'inactive'}" onclick="admin.toggleSlide(${slide.id})">
                    ${slide.active ? 'تعطيل' : 'تفعيل'}
                </button>
                <button class="edit-btn" onclick="admin.editSlide(${slide.id})">تعديل</button>
                <button class="move-slide-btn" onclick="admin.moveSlide(${slide.id}, -1)" ${index === 0 ? 'disabled' : ''}>↑</button>
                <button class="move-slide-btn" onclick="admin.moveSlide(${slide.id}, 1)" ${index === slides.length - 1 ? 'disabled' : ''}>↓</button>
                <button class="delete-btn" onclick="admin.deleteSlide(${slide.id})">حذف</button>
            </div>
        </div>
    `).join('');
}

toggleSlide(id) {
    this.dataManager.toggleSlide(id);
    this.loadSlidesList();
    this.showSuccess('تم تحديث حالة الشريحة بنجاح!');
}

editSlide(id) {
    const slides = this.dataManager.getSlides();
    const slide = slides.find(s => s.id === id);
    
    if (slide) {
        document.getElementById('slide-image').value = slide.image;
        document.getElementById('slide-title').value = slide.title;
        document.getElementById('slide-subtitle').value = slide.subtitle;
        document.getElementById('slide-active').checked = slide.active;
        
        // Change add button to update button
        const submitButton = document.querySelector('#add-slide-form button');
        submitButton.textContent = 'تحديث الشريحة';
        submitButton.onclick = (e) => this.handleUpdateSlide(e, id);
        
        this.showSuccess('تم تحميل الشريحة للتعديل. قم بتحديث الحقول وانقر على "تحديث الشريحة".');
    }
}

handleUpdateSlide(e, id) {
    e.preventDefault();
    
    const slide = {
        image: document.getElementById('slide-image').value,
        title: document.getElementById('slide-title').value,
        subtitle: document.getElementById('slide-subtitle').value,
        active: document.getElementById('slide-active').checked
    };

    if (this.dataManager.updateSlide(id, slide)) {
        this.resetSlideForm();
        this.loadSlidesList();
        this.showSuccess('تم تحديث الشريحة بنجاح!');
    }
}

resetSlideForm() {
    const form = document.getElementById('add-slide-form');
    if (form && form.reset) {
        form.reset();
    }
    const submitButton = document.querySelector('#add-slide-form button');
    if (submitButton) {
        submitButton.textContent = 'إضافة شريحة';
        submitButton.onclick = (e) => this.handleAddSlide(e);
    }
}

// Alternative approach: Create a safe reset function
safeFormReset(formId) {
    const form = document.getElementById(formId);
    if (form && typeof form.reset === 'function') {
        form.reset();
    } else {
        // Manual reset if form.reset is not available
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'text' || input.type === 'url' || input.type === 'textarea') {
                input.value = '';
            } else if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.type === 'select-one') {
                input.selectedIndex = 0;
            }
        });
    }
}

moveSlide(id, direction) {
    this.dataManager.moveSlide(id, direction);
    this.loadSlidesList();
    this.showSuccess('تم تغيير ترتيب الشريحة بنجاح!');
}

deleteSlide(id) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذه الشريحة؟')) {
        this.dataManager.deleteSlide(id);
        this.loadSlidesList();
        this.showSuccess('تم حذف الشريحة بنجاح!');
    }
}


// Updated handlers using safe reset
handleAddCategory(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const category = {
        name: formData.get('name') || document.getElementById('category-name').value,
        description: formData.get('description') || document.getElementById('category-description').value,
        image: formData.get('image') || document.getElementById('category-image').value
    };

    this.dataManager.addCategory(category);
    
    // Use safe reset
    this.safeFormReset('add-category-form');
    
    this.loadCategoriesList();
    this.populateCategoryDropdown();
    this.showSuccess('تم إضافة الفئة بنجاح!');
}


    loadCategoriesList() {
        const container = document.getElementById('categories-list-container');
        if (!container) return;

        const categories = this.dataManager.getCategories();
        
        container.innerHTML = categories.map(category => `
            <div class="category-item">
                <div class="category-info">
                    <h4>${category.name}</h4>
                    <p>${category.description}</p>
                </div>
                <div class="category-actions">
                    <button class="edit-btn" onclick="admin.editCategory(${category.id})">تعديل</button>
                    <button class="delete-btn" onclick="admin.deleteCategory(${category.id})">حذف</button>
                </div>
            </div>
        `).join('');
    }

    editCategory(id) {
        const categories = this.dataManager.getCategories();
        const category = categories.find(cat => cat.id === id);
        
        if (category) {
            document.getElementById('category-name').value = category.name;
            document.getElementById('category-description').value = category.description;
            document.getElementById('category-image').value = category.image;
            
            this.currentEditingId = id;
            
            // Change add button to update button
            const submitButton = document.querySelector('#add-category-form button');
            submitButton.textContent = 'تحديث الفئة';
            submitButton.onclick = (e) => this.handleUpdateCategory(e, id);
            
            this.showSuccess('تم تحميل الفئة للتعديل. قم بتحديث الحقول وانقر على "تحديث الفئة".');
        }
    }

    handleUpdateCategory(e, id) {
        e.preventDefault();
        
        const category = {
            name: document.getElementById('category-name').value,
            description: document.getElementById('category-description').value,
            image: document.getElementById('category-image').value
        };

        if (this.dataManager.updateCategory(id, category)) {
            this.resetCategoryForm();
            this.loadCategoriesList();
            this.populateCategoryDropdown();
            this.showSuccess('تم تحديث الفئة بنجاح!');
        }
    }

resetCategoryForm() {
    const form = document.getElementById('add-category-form');
    if (form && form.reset) {
        form.reset();
    }
    const submitButton = document.querySelector('#add-category-form button');
    if (submitButton) {
        submitButton.textContent = 'إضافة فئة';
        submitButton.onclick = (e) => this.handleAddCategory(e);
    }
    this.currentEditingId = null;
}
    deleteCategory(id) {
        if (confirm('هل أنت متأكد أنك تريد حذف هذه الفئة؟ سيتم حذف جميع المنتجات في هذه الفئة أيضًا.')) {
            this.dataManager.deleteCategory(id);
            this.loadCategoriesList();
            this.populateCategoryDropdown();
            this.showSuccess('تم حذف الفئة بنجاح!');
        }
    }

    // Product Management
populateCategoryDropdown() {
    const dropdown = document.getElementById('product-category');
    if (!dropdown) return;

    const categories = this.dataManager.getCategories();
    
    dropdown.innerHTML = '<option value="">اختر فئة</option>' +
        categories.map(category => 
            `<option value="${category.id}">${category.name}</option>`
        ).join('');
    
    // Update price placeholder to show flexible examples
    const priceInput = document.getElementById('product-price');
    if (priceInput) {
        priceInput.placeholder = 'مثال: 500 أو 500-2000 أو ٥٠٠-٢٠٠٠';
    }
}


handleAddProduct(e) {
    e.preventDefault();
    
    const product = {
        categoryId: document.getElementById('product-category').value,
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        specs: document.getElementById('product-specs').value,
        price: document.getElementById('product-price').value,
        image: document.getElementById('product-image').value
    };

    this.dataManager.addProduct(product);
    
    // Safe reset
    this.resetForm('add-product-form');
    
    this.loadProductsList();
    this.showSuccess('تم إضافة المنتج بنجاح!');
}


// Footer content management methods
loadFooterContentForm() {
    const footerContent = this.dataManager.getFooterContent();
    
    // Set values for all footer content inputs
    Object.keys(footerContent).forEach(key => {
        const input = document.getElementById(`footer-${key}-input`);
        if (input) {
            input.value = footerContent[key] || '';
        }
    });
}

handleFooterContentUpdate(e) {
    e.preventDefault();
    
    const updates = {};
    const inputs = e.target.querySelectorAll('[data-key]');
    
    inputs.forEach(input => {
        updates[input.dataset.key] = input.value;
    });

    this.dataManager.updateFooterContent(updates);
    this.showSuccess('تم تحديث محتوى التذييل بنجاح!');
}


    loadProductsList() {
        const container = document.getElementById('products-list-container');
        if (!container) return;

        const products = this.dataManager.getProducts();
        const categories = this.dataManager.getCategories();
        
        container.innerHTML = products.map(product => {
            const category = categories.find(cat => cat.id === product.categoryId);
            return `
                <div class="product-item">
                    <div class="product-info">
                        <h4>${product.name}</h4>
                        <p>${product.description}</p>
                        <small><strong>الفئة:</strong> ${category ? category.name : 'غير معروفة'}</small>
                    </div>
                    <div class="product-actions">
                        <button class="edit-btn" onclick="admin.editProduct(${product.id})">تعديل</button>
                        <button class="delete-btn" onclick="admin.deleteProduct(${product.id})">حذف</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    editProduct(id) {
        const products = this.dataManager.getProducts();
        const product = products.find(prod => prod.id === id);
        
        if (product) {
            document.getElementById('product-category').value = product.categoryId;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-specs').value = product.specs;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-image').value = product.image;
            
            this.currentEditingId = id;
            
            // Change add button to update button
            const submitButton = document.querySelector('#add-product-form button');
            submitButton.textContent = 'تحديث المنتج';
            submitButton.onclick = (e) => this.handleUpdateProduct(e, id);
            
            this.showSuccess('تم تحميل المنتج للتعديل. قم بتحديث الحقول وانقر على "تحديث المنتج".');
        }
    }

    handleUpdateProduct(e, id) {
        e.preventDefault();
        
        const product = {
            categoryId: document.getElementById('product-category').value,
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-description').value,
            specs: document.getElementById('product-specs').value,
            price: document.getElementById('product-price').value,
            image: document.getElementById('product-image').value
        };

        if (this.dataManager.updateProduct(id, product)) {
            this.resetProductForm();
            this.loadProductsList();
            this.showSuccess('تم تحديث المنتج بنجاح!');
        }
    }

resetProductForm() {
    const form = document.getElementById('add-product-form');
    if (form && form.reset) {
        form.reset();
    }
    const submitButton = document.querySelector('#add-product-form button');
    if (submitButton) {
        submitButton.textContent = 'إضافة منتج';
        submitButton.onclick = (e) => this.handleAddProduct(e);
    }
    this.currentEditingId = null;
}


    deleteProduct(id) {
        if (confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
            this.dataManager.deleteProduct(id);
            this.loadProductsList();
            this.showSuccess('تم حذف المنتج بنجاح!');
        }
    }

    showSuccess(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        // Insert at the top of the admin container
        const adminContainer = document.querySelector('.admin-container');
        adminContainer.insertBefore(successDiv, adminContainer.firstChild);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
}


// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.admin = new AdminPanel();
});