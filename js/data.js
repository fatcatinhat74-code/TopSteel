/**************************************************************
 🔥 DATA MANAGER – FIRESTORE COMPATIBLE (FINAL)
**************************************************************/

let db;
if (window.firebase) {
  db = firebase.firestore();
  window.db = db;
} else {
  console.warn("⚠️ Firebase SDK not loaded yet — will retry later");
}

// =============================================================
// DataManager Class
// =============================================================
class DataManager {
  constructor() {
    this.isOnline = false;
    this.firebaseInitialized = false;
    this.categories = [];
    this.products = [];
    this.slides = [];
    this.footerContent = {};
    this.content = {};
    this.initialize();
  }

  async initialize() {
    await this.initFirebase();
    await this.initializeData();
    console.log("✅ DataManager fully initialized");
  }

  // =============================================================
  // 🔹 Firebase Initialization
  // =============================================================
  async initFirebase() {
    try {
      let tries = 0;
      while (typeof firebase === "undefined" && tries < 10) {
        await new Promise(res => setTimeout(res, 500));
        tries++;
      }
      if (typeof firebase === "undefined") throw new Error("Firebase SDK not loaded");

      db = firebase.firestore();
      window.db = db;

      await db.collection("websiteData").doc("connectionTest").set({
        test: true,
        timestamp: new Date(),
      });

      this.isOnline = true;
      this.firebaseInitialized = true;
      console.log("✅ Connected to Firebase Firestore");

      await this.loadAllCategories();
      await this.loadAllProducts();
      await this.getSlides();
      await this.loadAllDataFromFirestore();
    } catch (error) {
      this.isOnline = false;
      console.warn("⚠️ Firestore not available, using localStorage:", error.message);
    }
  }

  // =============================================================
  // 🔹 Local Initialization
  // =============================================================
  async initializeData() {
    const adminCredentials = { username: "admin", password: "password123" };
    localStorage.setItem("adminCredentials", JSON.stringify(adminCredentials));

    await this.ensureDefaultData();
  }

  async ensureDefaultData() {
    const hasData =
      localStorage.getItem("categories") &&
      localStorage.getItem("products") &&
      localStorage.getItem("content");

    if (!hasData) {
      console.log("ℹ️ Setting up default data...");
      await this.setupDefaultData();
    }
  }

  async setupDefaultData() {
    const defaultCategories = [
      {
        id: "1",
        name: "الأنابيب غير الملحومة",
        description: "أنابيب الصلب غير الملحومة عالية الجودة للتطبيقات عالية الضغط",
        image:
          "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=300&fit=crop",
      },
      {
        id: "2",
        name: "الأنابيب الملحومة",
        description: "أنابيب الصلب الملحومة المتينة للتطبيقات الصناعية المختلفة",
        image:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop",
      },
    ];
    localStorage.setItem("categories", JSON.stringify(defaultCategories));

    const defaultProducts = [
      {
        id: "1",
        categoryId: "1",
        name: "أنبوب API 5L غير الملحوم",
        description: "أنبوب غير ملحوم عالي القوة لنقل النفط والغاز",
        specs: "الحجم: 2-24 بوصة\nالمادة: الصلب الكربوني\nالمعايير: API 5L, ASTM A106",
        price: "٦٥٠ - ٢٥٠٠ جنيه",
        image:
          "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop",
      },
    ];
    localStorage.setItem("products", JSON.stringify(defaultProducts));

    const defaultContent = {
      "hero-title": "حلول أنابيب الصلب المتميزة",
      "hero-subtitle":
        "نصنع أنابيب الصلب عالية الجودة للتطبيقات الصناعية والتجارية في جميع أنحاء العالم",
      "intro-title": "مرحبًا بكم في توب ستيل",
      "intro-text": "أكثر من 25 عامًا من الخبرة في تصنيع أنابيب الصلب.",
    };
    localStorage.setItem("content", JSON.stringify(defaultContent));

    const defaultFooter = {
      companyName: "توب ستيل",
      companyDescription: "الشركة الرائدة في تصنيع أنابيب الصلب المتميزة منذ عام 1998.",
      email: "info@top-steel.com",
      phone: "+20 123 456 7890",
      address: "المنطقة الصناعية، مدينة العبور، القاهرة",
      facebook: "https://facebook.com/topsteel",
      copyright: "Designed By Abdelrhman A. Eliwa",
    };
    localStorage.setItem("footerContent", JSON.stringify(defaultFooter));

    const defaultSlides = [
      {
        id: "1",
        image:
          "https://images.unsplash.com/photo-1581094794322-7c6dceeecb91?auto=format&fit=crop&w=1000&q=80",
        title: "حلول أنابيب الصلب المتميزة",
        subtitle:
          "نصنع أنابيب الصلب عالية الجودة للتطبيقات الصناعية والتجارية في جميع أنحاء العالم",
        active: true,
      },
    ];
    localStorage.setItem("heroSlides", JSON.stringify(defaultSlides));

    if (this.isOnline) await this.saveAllDataToFirestore();
  }

  // =============================================================
  // 🔹 Firestore Getters
  // =============================================================
  async getProductsFromFirestore() {
    try {
      const snapshot = await db
        .collection("websiteData")
        .doc("products")
        .collection("items")
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("❌ Error fetching products:", e);
      return [];
    }
  }

  async getCategoriesFromFirestore() {
    try {
      const snapshot = await db
        .collection("websiteData")
        .doc("categories")
        .collection("items")
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("❌ Error fetching categories:", e);
      return [];
    }
  }

  // =============================================================
  // 🔹 Cache Loaders
  // =============================================================
  async loadAllCategories() {
    this.categories = await this.getCategoriesFromFirestore();
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  async loadAllProducts() {
    this.products = await this.getProductsFromFirestore();
    localStorage.setItem("products", JSON.stringify(this.products));
  }

  // =============================================================
  // 🔹 Firestore Save & Load
  // =============================================================
  async saveAllDataToFirestore() {
    if (!this.isOnline || !db) return;
    try {
      const data = {
        categories: this.getCategories(),
        products: this.getProducts(),
        content: this.getContent(),
        footerContent: this.getFooterContent(),
        slides: await this.getSlides(),
        lastUpdated: new Date(),
      };
      await db.collection("websiteData").doc("allData").set(data, { merge: true });
      console.log("✅ All data saved to Firestore");
    } catch (e) {
      console.error("❌ Error saving all data:", e);
    }
  }

  async loadAllDataFromFirestore() {
    if (!this.isOnline || !db) return;
    try {
      const docSnap = await db.collection("websiteData").doc("allData").get();
      if (docSnap.exists) {
        const data = docSnap.data();
        Object.keys(data).forEach(key => {
          if (typeof data[key] === "object") {
            localStorage.setItem(key, JSON.stringify(data[key]));
          }
        });
        console.log("✅ Data loaded from Firestore");
      }
    } catch (e) {
      console.error("❌ Error loading Firestore data:", e);
    }
  }

  // =============================================================
  // 🔹 Content & Footer
  // =============================================================
  getContent() {
    try {
      return JSON.parse(localStorage.getItem("content")) || {};
    } catch {
      return {};
    }
  }

  async updateMultipleContent(updates) {
    const current = this.getContent();
    const merged = { ...current, ...updates };
    localStorage.setItem("content", JSON.stringify(merged));
    if (this.isOnline && db) {
      await db.collection("websiteData").doc("content").set(merged, { merge: true });
    }
    console.log("✅ Content updated");
  }

  getFooterContent() {
    try {
      return JSON.parse(localStorage.getItem("footerContent")) || {};
    } catch {
      return {};
    }
  }

  async updateFooterContent(updates) {
    const current = this.getFooterContent();
    const merged = { ...current, ...updates };
    localStorage.setItem("footerContent", JSON.stringify(merged));
    if (this.isOnline && db) {
      await db.collection("websiteData").doc("footer").set(merged, { merge: true });
    }
    console.log("✅ Footer updated");
  }

  // =============================================================
  // 🔹 Categories CRUD
  // =============================================================
  getCategories() {
    try {
      return JSON.parse(localStorage.getItem("categories")) || [];
    } catch {
      return [];
    }
  }

  async addCategory(category) {
    const id = Date.now().toString();
    const cats = this.getCategories();
    const newCat = { id, ...category };
    cats.push(newCat);
    localStorage.setItem("categories", JSON.stringify(cats));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("categories")
        .collection("items")
        .doc(id)
        .set(newCat);
    }
    console.log("✅ Category added");
  }

  async updateCategory(id, updated) {
    const cats = this.getCategories();
    const idx = cats.findIndex(c => c.id === id);
    if (idx !== -1) cats[idx] = { id, ...updated };
    localStorage.setItem("categories", JSON.stringify(cats));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("categories")
        .collection("items")
        .doc(String(id))
        .set(updated, { merge: true });
    }
    console.log("✅ Category updated");
  }

  async deleteCategory(id) {
    const cats = this.getCategories().filter(c => c.id !== id);
    localStorage.setItem("categories", JSON.stringify(cats));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("categories")
        .collection("items")
        .doc(String(id))
        .delete();
    }
    console.log("✅ Category deleted");
  }

  
  

  // =============================================================
  // 🔹 Products CRUD
  // =============================================================
  getProducts() {
    try {
      return JSON.parse(localStorage.getItem("products")) || [];
    } catch {
      return [];
    }
  }

  
  async addProduct(product) {
    const id = Date.now().toString();
    const prods = this.getProducts();
    const newProd = { id, ...product };
    prods.push(newProd);
    localStorage.setItem("products", JSON.stringify(prods));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("products")
        .collection("items")
        .doc(id)
        .set(newProd);
    }
    console.log("✅ Product added");
  }

  async updateProduct(id, updated) {
    const prods = this.getProducts();
    const idx = prods.findIndex(p => p.id === id);
    if (idx !== -1) prods[idx] = { id, ...updated };
    localStorage.setItem("products", JSON.stringify(prods));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("products")
        .collection("items")
        .doc(String(id))
        .set(updated, { merge: true });
    }
    console.log("✅ Product updated");
  }

  async deleteProduct(id) {
    const prods = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(prods));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("products")
        .collection("items")
        .doc(String(id))
        .delete();
    }
    console.log("✅ Product deleted");
  }

  // =============================================================
  // 🔹 Slides CRUD
  // =============================================================
  async getSlides() {
    try {
      if (this.isOnline && db) {
        const snap = await db
          .collection("websiteData")
          .doc("slides")
          .collection("items")
          .get();
        const slides = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        localStorage.setItem("heroSlides", JSON.stringify(slides));
        return slides;
      }
    } catch (e) {
      console.error("❌ getSlides Firestore error:", e);
    }
    return JSON.parse(localStorage.getItem("heroSlides")) || [];
  }

  async addSlide(slide) {
    const id = Date.now().toString();
    slide.id = id;
    const slides = await this.getSlides();
    slides.push(slide);
    localStorage.setItem("heroSlides", JSON.stringify(slides));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("slides")
        .collection("items")
        .doc(id)
        .set(slide);
    }
    console.log("✅ Slide added");
  }

  async updateSlide(id, updatedSlide) {
    const slides = await this.getSlides();
    const idx = slides.findIndex(s => s.id == id);
    if (idx !== -1) slides[idx] = { ...slides[idx], ...updatedSlide };
    localStorage.setItem("heroSlides", JSON.stringify(slides));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("slides")
        .collection("items")
        .doc(String(id))
        .set(updatedSlide, { merge: true });
    }
    console.log("✅ Slide updated");
  }

  async deleteSlide(id) {
    const slides = await this.getSlides();
    const filtered = slides.filter(s => s.id != id);
    localStorage.setItem("heroSlides", JSON.stringify(filtered));

    if (this.isOnline && db) {
      await db
        .collection("websiteData")
        .doc("slides")
        .collection("items")
        .doc(String(id))
        .delete();
    }
    console.log("✅ Slide deleted");
  }

  // =============================================================
  // 🔹 Real-time Sync
  // =============================================================
  subscribeToFirestoreUpdates() {
    if (!this.isOnline || !db) return;
    db.collection("websiteData").doc("allData").onSnapshot(doc => {
      if (doc.exists) {
        const data = doc.data();
        Object.keys(data).forEach(k => {
          if (typeof data[k] === "object") {
            localStorage.setItem(k, JSON.stringify(data[k]));
          }
        });
        console.log("🔄 Data auto-updated from Firestore");
      }
    });
  }
}

// =============================================================
// Initialize
// =============================================================
let dataManager = null;
function initializeDataManager() {
  dataManager = new DataManager();
  window.dataManager = dataManager;
  return dataManager;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeDataManager);
} else {
  initializeDataManager();
}

// ===============================
// DISPLAY FUNCTIONS
// ===============================

// 🔹 PRODUCTS PAGE → shows all categories
async function loadProductCategories() {
  const container = document.getElementById("products-container");
  if (!container || !window.dataManager) return;

  try {
    const categories = await window.dataManager.getCategoriesFromFirestore();

    if (!categories.length) {
      container.innerHTML = `<p>لا توجد فئات متاحة حالياً.</p>`;
      return;
    }

    container.innerHTML = categories
      .map(
        c => `
        <div class="category-card">
          <img src="${c.image || 'https://via.placeholder.com/400'}" alt="${c.name}">
          <h3>${c.name}</h3>
          <p>${c.description || ''}</p>
          <a href="category.html?categoryId=${c.id}" class="cta-button">عرض المنتجات</a>
        </div>`
      )
      .join("");
  } catch (e) {
    console.error("❌ Error loading categories:", e);
    container.innerHTML = `<p>حدث خطأ أثناء تحميل الفئات.</p>`;
  }
}

// 🔹 CATEGORY PAGE → shows all products within selected category
async function loadCategoryProducts() {
  const container = document.getElementById("products-container");
  if (!container || !window.dataManager) return;

  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get("categoryId");

  try {
    const products = await window.dataManager.getProductsFromFirestore();
    const filtered = categoryId
      ? products.filter(p => String(p.categoryId) === String(categoryId))
      : products;

    if (!filtered.length) {
      container.innerHTML = `<p>لا توجد منتجات في هذه الفئة حالياً.</p>`;
      return;
    }

    container.innerHTML = filtered
      .map(
        p => `
        <div class="product-card">
          <img src="${p.image || 'https://via.placeholder.com/400'}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.description || ''}</p>
          ${p.specs ? `<p class="specs">${p.specs}</p>` : ''}
          <span class="price">${p.price || ''} جنية</span>
        </div>`
      )
      .join("");
  } catch (e) {
    console.error("❌ Error loading products:", e);
    container.innerHTML = `<p>حدث خطأ أثناء تحميل المنتجات.</p>`;
  }
}

// 🔹 HOMEPAGE → featured products (optional)
async function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container || !window.dataManager) return;

  try {
    const products = await window.dataManager.getProductsFromFirestore();

    if (!products.length) {
      container.innerHTML = `<p>لا توجد منتجات مميزة حالياً.</p>`;
      return;
    }

    container.innerHTML = products
      .slice(0, 4)
      .map(
        p => `
        <div class="product-card">
          <img src="${p.image || 'https://via.placeholder.com/400'}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.description || ''}</p>
          <span class="price">${p.price || ''}</span>
        </div>`
      )
      .join("");
  } catch (e) {
    console.error("❌ Error loading featured products:", e);
    container.innerHTML = `<p>حدث خطأ أثناء تحميل المنتجات المميزة.</p>`;
  }
}
