// main.js - Main JavaScript with RTL support
document.addEventListener('DOMContentLoaded', function() {
    // Navigation and footer functionality is now handled by navigation.js
    
    // Load dynamic content
    loadDynamicContent();
});

// Load dynamic content from localStorage
function loadDynamicContent() {
    const content = JSON.parse(localStorage.getItem('content') || '{}');
    
    // Update elements with data from localStorage
    Object.keys(content).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = content[key];
        }
    });
}

function loadFeaturedProducts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const featuredContainer = document.getElementById('featured-products');
    
    if (!featuredContainer) return;
    
    // Display first 4 products as featured
    const featuredProducts = products.slice(0, 4);
    
    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p>لا توجد منتجات متاحة حالياً.</p>';
        return;
    }
    
    featuredContainer.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${product.price}</div>
            <div class="product-specs">
                <pre>${product.specs}</pre>
            </div>
        </div>
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
        productsContainer.innerHTML = '<p class="text-center">لا توجد منتجات في هذه الفئة حالياً.</p>';
        return;
    }

    productsContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">${product.price}</div>
            <div class="product-specs">
                ${product.specs.replace(/\n/g, '<br>')}
            </div>
        </div>
    `).join('');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});