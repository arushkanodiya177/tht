/* ============================================================
   THE HIGH TRIBE — script.js
   Demo application – all data stored in localStorage
   ============================================================ */

// ---------- Utility ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showToast(msg, duration = 2500) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

// ---------- LocalStorage keys ----------
const LS_KEYS = {
  menu: 'tht_menu',
  cart: 'tht_cart',
  orders: 'tht_orders',
  reservations: 'tht_reservations',
  events: 'tht_events',
  staff: 'tht_staff',
  theme: 'tht_theme',
  gallery: 'tht_gallery',
  loyalty: 'tht_loyalty',
  serviceRequests: 'tht_serviceRequests',
};

// ---------- Seed data (only if not present) ----------
function seedData() {
  if (!localStorage.getItem(LS_KEYS.menu)) {
    const sampleMenu = [
      { id: 'm1', name: 'Truffle Mushroom Crostini', description: 'Wild mushrooms, truffle oil, parmesan on toasted sourdough.', price: 349, category: 'Starters', veg: true, image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=400&q=80', available: true, spice: 0, allergens: 'Gluten, Dairy', portion: 'Regular' },
      { id: 'm2', name: 'Chicken Tikka Sliders', description: 'Mini buns with tandoori chicken, mint mayo, and pickled onions.', price: 429, category: 'Starters', veg: false, image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&q=80', available: true, spice: 2, allergens: 'Gluten, Dairy', portion: '3 pcs' },
      { id: 'm3', name: 'Paneer Butter Masala', description: 'Cottage cheese simmered in rich tomato-butter gravy.', price: 399, category: 'Main Course', veg: true, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80', available: true, spice: 1, allergens: 'Dairy', portion: 'Regular' },
      { id: 'm4', name: 'Butter Chicken', description: 'Tender chicken in a creamy tomato-butter sauce.', price: 499, category: 'Main Course', veg: false, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80', available: true, spice: 1, allergens: 'Dairy', portion: 'Regular' },
      { id: 'm5', name: 'Margherita Pizza', description: 'Fresh mozzarella, basil, and San Marzano tomato sauce.', price: 449, category: 'Pizza', veg: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', available: true, spice: 0, allergens: 'Gluten, Dairy', portion: '10 inch' },
      { id: 'm6', name: 'Pepperoni Pizza', description: 'Spicy pepperoni, mozzarella, and oregano.', price: 549, category: 'Pizza', veg: false, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80', available: true, spice: 2, allergens: 'Gluten, Dairy', portion: '10 inch' },
      { id: 'm7', name: 'Alfredo Pasta', description: 'Fettuccine in creamy parmesan Alfredo sauce.', price: 379, category: 'Pasta', veg: true, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80', available: true, spice: 0, allergens: 'Gluten, Dairy', portion: 'Regular' },
      { id: 'm8', name: 'Arrabbiata Pasta', description: 'Spicy tomato-garlic sauce with penne.', price: 359, category: 'Pasta', veg: true, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80', available: true, spice: 3, allergens: 'Gluten', portion: 'Regular' },
      { id: 'm9', name: 'Dal Makhani', description: 'Slow-cooked black lentils with butter and cream.', price: 329, category: 'Indian Cuisine', veg: true, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80', available: true, spice: 1, allergens: 'Dairy', portion: 'Regular' },
      { id: 'm10', name: 'Rogan Josh', description: 'Kashmiri lamb curry with aromatic spices.', price: 549, category: 'Indian Cuisine', veg: false, image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80', available: true, spice: 2, allergens: 'Dairy', portion: 'Regular' },
      { id: 'm11', name: 'Chocolate Fondant', description: 'Warm chocolate cake with molten center and vanilla ice cream.', price: 299, category: 'Desserts', veg: true, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80', available: true, spice: 0, allergens: 'Gluten, Dairy, Egg', portion: 'Regular' },
      { id: 'm12', name: 'Tiramisu', description: 'Classic Italian coffee-flavoured dessert.', price: 349, category: 'Desserts', veg: true, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', available: true, spice: 0, allergens: 'Gluten, Dairy, Egg', portion: 'Regular' },
      { id: 'm13', name: 'Fresh Lime Soda', description: 'Refreshing lime soda, sweet or salted.', price: 149, category: 'Beverages', veg: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80', available: true, spice: 0, allergens: '', portion: '300 ml' },
      { id: 'm14', name: 'Masala Chai', description: 'Aromatic Indian spiced tea.', price: 99, category: 'Beverages', veg: true, image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80', available: true, spice: 0, allergens: 'Dairy', portion: '200 ml' },
      { id: 'm15', name: 'Virgin Mojito', description: 'Mint, lime, and soda — refreshing mocktail.', price: 199, category: 'Mocktails', veg: true, image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&q=80', available: true, spice: 0, allergens: '', portion: '300 ml' },
      { id: 'm16', name: 'Blue Lagoon', description: 'Blue curacao syrup, lemon, and soda.', price: 219, category: 'Mocktails', veg: true, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80', available: true, spice: 0, allergens: '', portion: '300 ml' },
    ];
    localStorage.setItem(LS_KEYS.menu, JSON.stringify(sampleMenu));
  }

  if (!localStorage.getItem(LS_KEYS.gallery)) {
    const sampleGallery = [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
      'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80',
    ];
    localStorage.setItem(LS_KEYS.gallery, JSON.stringify(sampleGallery));
  }

  if (!localStorage.getItem(LS_KEYS.events)) {
    const sampleEvents = [
      { id: 'e1', title: 'Sufi Baithak', date: '2025-12-15', time: '7:00 PM', description: 'An evening of soulful Sufi music and poetry.', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80', venue: 'Rooftop Main Stage' },
      { id: 'e2', title: 'Rooftop Live Jazz', date: '2025-12-22', time: '8:00 PM', description: 'Live jazz band with dinner specials.', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', venue: 'Lounge Area' },
    ];
    localStorage.setItem(LS_KEYS.events, JSON.stringify(sampleEvents));
  }

  if (!localStorage.getItem(LS_KEYS.staff)) {
    const sampleStaff = [
      { id: 's1', name: 'Admin', email: 'admin@tht.com', password: 'admin123', role: 'admin', active: true },
      { id: 's2', name: 'Staff', email: 'staff@tht.com', password: 'staff123', role: 'coworker', active: true },
      { id: 's3', name: 'Kitchen', email: 'kitchen@tht.com', password: 'kitchen123', role: 'kitchen', active: true },
      { id: 's4', name: 'Customer', email: 'customer@tht.com', password: 'cust123', role: 'customer', active: true },
    ];
    localStorage.setItem(LS_KEYS.staff, JSON.stringify(sampleStaff));
  }

  if (!localStorage.getItem(LS_KEYS.cart)) localStorage.setItem(LS_KEYS.cart, JSON.stringify([]));
  if (!localStorage.getItem(LS_KEYS.orders)) localStorage.setItem(LS_KEYS.orders, JSON.stringify([]));
  if (!localStorage.getItem(LS_KEYS.reservations)) localStorage.setItem(LS_KEYS.reservations, JSON.stringify([]));
  if (!localStorage.getItem(LS_KEYS.loyalty)) localStorage.setItem(LS_KEYS.loyalty, JSON.stringify({ points: 0, history: [] }));
  if (!localStorage.getItem(LS_KEYS.serviceRequests)) localStorage.setItem(LS_KEYS.serviceRequests, JSON.stringify([]));
}
seedData();

// ---------- State helpers ----------
function getLS(key, fallback = []) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function setLS(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

// ---------- Theme (demo) ----------
function applyThemeFromStorage() {
  const theme = getLS(LS_KEYS.theme, {});
  if (theme.gold) document.documentElement.style.setProperty('--color-gold', theme.gold);
  if (theme.burgundy) document.documentElement.style.setProperty('--color-burgundy', theme.burgundy);
}
applyThemeFromStorage();

// ============================================================
// NAVBAR & SCROLL
// ============================================================
window.addEventListener('scroll', () => {
  const nav = $('#navbar');
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Hamburger
$('#hamburger').addEventListener('click', () => {
  $('#navLinks').classList.toggle('open');
  $('#hamburger').classList.toggle('active');
});

// Close nav on link click (mobile)
$$('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    $('#navLinks').classList.remove('open');
    $('#hamburger').classList.remove('active');
  });
});

// ============================================================
// LOADER
// ============================================================
window.addEventListener('load', () => {
  setTimeout(() => $('#loader').classList.add('fade-out'), 800);
});

// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

function observeReveals() {
  $$('.animate-on-scroll').forEach(el => revealObserver.observe(el));
}

// ============================================================
// GALLERY & LIGHTBOX
// ============================================================
const galleryImages = getLS(LS_KEYS.gallery);
let lightboxIndex = 0;

function renderGallery() {
  const grid = $('#galleryGrid');
  if (!grid) return;
  grid.innerHTML = galleryImages.map((src, i) =>
    `<div class="gallery-item animate-on-scroll" data-index="${i}">
      <img src="${src}" alt="Gallery ${i+1}" loading="lazy">
    </div>`
  ).join('');
  observeReveals();
}

$('#galleryGrid')?.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item');
  if (!item) return;
  lightboxIndex = +item.dataset.index;
  openLightbox(galleryImages[lightboxIndex]);
});

function openLightbox(src) {
  $('#lightboxImg').src = src;
  $('#lightbox').classList.add('active');
}
function closeLightbox() { $('#lightbox').classList.remove('active'); }

$('#lightboxClose').addEventListener('click', closeLightbox);
$('#lightbox').addEventListener('click', (e) => { if (e.target === $('#lightbox')) closeLightbox(); });
$('#lightboxPrev').addEventListener('click', () => {
  lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
  $('#lightboxImg').src = galleryImages[lightboxIndex];
});
$('#lightboxNext').addEventListener('click', () => {
  lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
  $('#lightboxImg').src = galleryImages[lightboxIndex];
});

// ============================================================
// MENU
// ============================================================
let currentFilter = 'all';
let currentCategory = 'All';
let menuSearchTerm = '';

function getMenu() { return getLS(LS_KEYS.menu); }
function saveMenu(m) { setLS(LS_KEYS.menu, m); }

function renderCategories() {
  const categories = ['All', ...new Set(getMenu().map(i => i.category))];
  const tabs = $('#categoryTabs');
  tabs.innerHTML = categories.map(c =>
    `<button class="category-tab ${c === currentCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');
  tabs.querySelectorAll('.category-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.dataset.cat;
      renderCategories();
      renderMenu();
    });
  });
}

function renderMenu() {
  const grid = $('#menuGrid');
  let items = getMenu();

  // Veg / nonveg filter
  if (currentFilter === 'veg') items = items.filter(i => i.veg);
  if (currentFilter === 'nonveg') items = items.filter(i => !i.veg);

  // Category filter
  if (currentCategory !== 'All') items = items.filter(i => i.category === currentCategory);

  // Search
  if (menuSearchTerm) {
    const q = menuSearchTerm.toLowerCase();
    items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
  }

  if (!items.length) {
    grid.innerHTML = '<p style="color:var(--color-text-muted);grid-column:1/-1;text-align:center;padding:2rem;">No items found.</p>';
    return;
  }

  grid.innerHTML = items.map(item => {
    const cartQty = getCartQtyForItem(item.id);
    return `
    <div class="menu-card" data-id="${item.id}">
      <div class="menu-card-img">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <span class="menu-card-badge ${item.veg ? 'badge-veg' : 'badge-nonveg'}">${item.veg ? 'Veg' : 'Non-Veg'}</span>
      </div>
      <div class="menu-card-body">
        <h3>${item.name}</h3>
        <p class="menu-card-desc">${item.description}</p>
        <div class="menu-card-meta">
          <span>Spice: ${'🌶️'.repeat(item.spice) || 'Mild'}</span>
          <span>${item.portion}</span>
        </div>
        <div class="menu-card-price">₹${item.price}</div>
        <div class="menu-card-actions">
          ${cartQty > 0
            ? `<div class="quantity-control">
                 <button class="qty-dec" data-id="${item.id}">−</button>
                 <span>${cartQty}</span>
                 <button class="qty-inc" data-id="${item.id}">+</button>
               </div>`
            : `<button class="btn btn-gold add-to-cart-btn" data-id="${item.id}">Add</button>`
          }
          <button class="btn btn-outline customize-btn" data-id="${item.id}">Customize</button>
        </div>
      </div>
    </div>`;
  }).join('');

  // Event listeners for add / inc / dec
  grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
  grid.querySelectorAll('.qty-inc').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
  grid.querySelectorAll('.qty-dec').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });
  grid.querySelectorAll('.customize-btn').forEach(btn => {
    btn.addEventListener('click', () => openCustomize(btn.dataset.id));
  });
}

function getCartQtyForItem(id) {
  const cart = getLS(LS_KEYS.cart);
  return cart.filter(c => c.id === id).reduce((s, c) => s + c.qty, 0);
}

// Filter buttons
$$('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderMenu();
  });
});

// Search
$('#menuSearch')?.addEventListener('input', (e) => {
  menuSearchTerm = e.target.value;
  renderMenu();
});

// ============================================================
// CART
// ============================================================
function getCart() { return getLS(LS_KEYS.cart); }
function saveCart(c) { setLS(LS_KEYS.cart, c); updateCartBadge(); }

function updateCartBadge() {
  const count = getCart().reduce((s, c) => s + c.qty, 0);
  $('#cartCount').textContent = count;
}

function addToCart(id, customizations = {}) {
  const item = getMenu().find(i => i.id === id);
  if (!item || !item.available) { showToast('Item unavailable.'); return; }
  const cart = getCart();
  const existing = cart.find(c => c.id === id && JSON.stringify(c.custom) === JSON.stringify(customizations));
  if (existing) existing.qty += 1;
  else cart.push({ id, name: item.name, price: item.price, image: item.image, qty: 1, custom: customizations });
  saveCart(cart);
  renderMenu();
  showToast(`${item.name} added to cart`);
}

function removeFromCart(id) {
  let cart = getCart();
  const idx = cart.findIndex(c => c.id === id);
  if (idx === -1) return;
  if (cart[idx].qty > 1) cart[idx].qty -= 1;
  else cart.splice(idx, 1);
  saveCart(cart);
  renderMenu();
}

function updateCartUI() {
  const cart = getCart();
  const container = $('#cartItems');
  const footer = $('#cartFooter');
  if (!cart.length) {
    container.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    footer.querySelector('#cartTotals').innerHTML = '';
    footer.querySelector('#checkoutBtn').disabled = true;
    return;
  }
  footer.querySelector('#checkoutBtn').disabled = false;
  container.innerHTML = cart.map((c, i) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${c.image}" alt="${c.name}">
      <div class="cart-item-info">
        <h4>${c.name}</h4>
        <p>${c.custom?.spice ? 'Spice: '+c.custom.spice : ''} ${c.custom?.portion ? '| '+c.custom.portion : ''}</p>
        <span class="cart-item-price">₹${c.price} × ${c.qty}</span>
      </div>
      <div class="quantity-control">
        <button class="cart-dec" data-index="${i}">−</button>
        <span>${c.qty}</span>
        <button class="cart-inc" data-index="${i}">+</button>
      </div>
      <button class="cart-item-remove" data-index="${i}"><i class="fas fa-trash-alt"></i></button>
    </div>
  `).join('');

  // Totals
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = Math.round(subtotal * 0.05);
  const service = Math.round(subtotal * 0.10);
  const total = subtotal + tax + service;
  footer.querySelector('#cartTotals').innerHTML = `
    <div class="total-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
    <div class="total-row"><span>GST (5%)</span><span>₹${tax}</span></div>
    <div class="total-row"><span>Service (10%)</span><span>₹${service}</span></div>
    <div class="total-row grand-total"><span>Total</span><span>₹${total}</span></div>
  `;

  // Cart event listeners
  container.querySelectorAll('.cart-inc').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.index;
    const cart = getCart(); cart[i].qty += 1; saveCart(cart); updateCartUI();
  }));
  container.querySelectorAll('.cart-dec').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.index;
    const cart = getCart();
    if (cart[i].qty > 1) cart[i].qty -= 1;
    else cart.splice(i, 1);
    saveCart(cart); updateCartUI();
  }));
  container.querySelectorAll('.cart-item-remove').forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.index;
    const cart = getCart(); cart.splice(i, 1); saveCart(cart); updateCartUI();
  }));
}

// Open cart
$('#cartFloat').addEventListener('click', () => {
  updateCartUI();
  $('#cartModal').classList.add('active');
});
$('#closeCartBtn').addEventListener('click', () => $('#cartModal').classList.remove('active'));
$('#cartModal').addEventListener('click', (e) => { if (e.target === $('#cartModal')) $('#cartModal').classList.remove('active'); });

// Checkout
$('#checkoutBtn').addEventListener('click', () => {
  const cart = getCart();
  if (!cart.length) return;
  const order = {
    id: 'ORD' + Date.now(),
    items: cart,
    status: 'New',
    table: 'T1',
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  };
  const orders = getLS(LS_KEYS.orders);
  orders.push(order);
  setLS(LS_KEYS.orders, orders);

  // Loyalty points
  const loyalty = getLS(LS_KEYS.loyalty);
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  loyalty.points += Math.floor(subtotal / 100);
  loyalty.history.push({ date: new Date().toLocaleString(), points: Math.floor(subtotal / 100) });
  setLS(LS_KEYS.loyalty, loyalty);

  saveCart([]);
  updateCartUI();
  $('#cartModal').classList.remove('active');
  showToast('Order placed! (Demo)');
});

// ============================================================
// CUSTOMIZE MODAL (simple)
// ============================================================
function openCustomize(id) {
  const item = getMenu().find(i => i.id === id);
  if (!item) return;
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal" style="max-width:420px;">
      <div class="modal-header">
        <h3>Customize ${item.name}</h3>
        <button class="modal-close" id="closeCustomize">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Spice Level</label>
          <select id="custSpice">
            <option value="Mild">Mild</option>
            <option value="Medium">Medium</option>
            <option value="Hot">Hot</option>
          </select>
        </div>
        <div class="form-group">
          <label>Portion Size</label>
          <select id="custPortion">
            <option value="Regular">Regular</option>
            <option value="Large (+₹80)">Large (+₹80)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Special Instructions</label>
          <textarea id="custNotes" rows="2"></textarea>
        </div>
        <button class="btn btn-gold" id="addCustomizedBtn" style="width:100%;">Add to Cart</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('#closeCustomize').addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  modal.querySelector('#addCustomizedBtn').addEventListener('click', () => {
    const spice = modal.querySelector('#custSpice').value;
    const portion = modal.querySelector('#custPortion').value;
    const notes = modal.querySelector('#custNotes').value;
    let price = item.price;
    if (portion.startsWith('Large')) price += 80;
    addToCart(id, { spice, portion, notes, price });
    modal.remove();
  });
}

// ============================================================
// RESERVATION
// ============================================================
$('#reservationForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const res = {
    id: 'RES' + Date.now(),
    name: $('#resName').value,
    phone: $('#resPhone').value,
    date: $('#resDate').value,
    time: $('#resTime').value,
    guests: $('#resGuests').value,
    request: $('#resRequest').value,
    status: 'Pending',
  };
  const list = getLS(LS_KEYS.reservations);
  list.push(res);
  setLS(LS_KEYS.reservations, list);
  $('#resConfirmation').classList.remove('hidden');
  $('#resConfirmation').innerHTML = `<h3 style="color:var(--color-gold);margin-bottom:0.5rem;">Reservation Received</h3>
    <p>Thank you, ${res.name}! Your table for ${res.guests} on ${res.date} at ${res.time} has been noted.</p>
    <p class="form-note">Demo only — not a confirmed booking.</p>`;
  $('#reservationForm').reset();
  showToast('Reservation submitted (demo)');
});

// ============================================================
// EVENTS
// ============================================================
function renderEvents() {
  const events = getLS(LS_KEYS.events);
  const grid = $('#eventsGrid');
  if (!grid) return;
  if (!events.length) {
    grid.innerHTML = '<p style="color:var(--color-text-muted);text-align:center;">No upcoming events.</p>';
    return;
  }
  grid.innerHTML = events.map(ev => `
    <div class="event-card animate-on-scroll">
      <div class="event-card-img"><img src="${ev.image}" alt="${ev.title}" loading="lazy"></div>
      <div class="event-card-body">
        <h3>${ev.title}</h3>
        <p class="event-date">${ev.date} · ${ev.time}</p>
        <p>${ev.description}</p>
        <p style="font-size:0.75rem;color:var(--color-gold);margin-top:0.5rem;">${ev.venue}</p>
      </div>
    </div>
  `).join('');
  observeReveals();
}

// ============================================================
// GAMES
// ============================================================
$('#games').addEventListener('click', (e) => {
  const btn = e.target.closest('.game-btn');
  if (!btn) return;
  const game = btn.dataset.game;
  openGame(game);
});

function openGame(game) {
  const body = $('#gameBody');
  const title = $('#gameTitle');
  $('#gameModal').classList.add('active');

  if (game === 'tictactoe') {
    title.textContent = 'Tic-Tac-Toe';
    body.innerHTML = `
      <div class="game-board" id="tttBoard">
        ${Array(9).fill('<div class="game-cell" data-cell></div>').join('')}
      </div>
      <p class="game-status" id="tttStatus">Player X's turn</p>
      <button class="btn btn-outline" id="tttReset" style="width:100%;">Reset</button>
    `;
    initTicTacToe();
  } else if (game === 'memory') {
    title.textContent = 'Memory Match';
    body.innerHTML = `
      <p class="game-status" id="memStatus">Find all pairs!</p>
      <div class="memory-grid" id="memGrid"></div>
      <button class="btn btn-outline" id="memReset" style="width:100%;margin-top:0.5rem;">Restart</button>
    `;
    initMemory();
  } else if (game === 'quiz') {
    title.textContent = 'Quick Quiz';
    body.innerHTML = `
      <p class="game-status" id="quizStatus">Question 1 of 5</p>
      <div id="quizOptions"></div>
      <p class="game-status" id="quizScore">Score: 0</p>
      <button class="btn btn-outline" id="quizRestart" style="width:100%;margin-top:0.5rem;">Play Again</button>
    `;
    initQuiz();
  } else {
    title.textContent = 'Group Challenge';
    body.innerHTML = `
      <p class="game-status" id="challengeText" style="font-size:1.1rem;min-height:80px;display:flex;align-items:center;justify-content:center;text-align:center;"></p>
      <button class="btn btn-gold" id="newChallenge" style="width:100%;">New Challenge</button>
    `;
    initChallenge();
  }
}

$('#closeGameBtn').addEventListener('click', () => $('#gameModal').classList.remove('active'));
$('#gameModal').addEventListener('click', (e) => { if (e.target === $('#gameModal')) $('#gameModal').classList.remove('active'); });

// Tic-Tac-Toe
function initTicTacToe() {
  let board = Array(9).fill(null);
  let current = 'X';
  const cells = $$('#tttBoard .game-cell');
  const status = $('#tttStatus');
  function checkWin() {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return board.every(Boolean) ? 'draw' : null;
  }
  function update() {
    cells.forEach((cell, i) => {
      cell.textContent = board[i] || '';
      cell.onclick = () => {
        if (board[i] || checkWin()) return;
        board[i] = current;
        current = current === 'X' ? 'O' : 'X';
        update();
      };
    });
    const win = checkWin();
    if (win === 'draw') status.textContent = "It's a draw!";
    else if (win) status.textContent = `Player ${win} wins!`;
    else status.textContent = `Player ${current}'s turn`;
  }
  update();
  $('#tttReset').addEventListener('click', () => {
    board = Array(9).fill(null); current = 'X'; update();
  });
}

// Memory Match
function initMemory() {
  const symbols = ['🍕','🍔','🍣','🍩','🍷','🍜','🍦','🥗'];
  let cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
  let flipped = [], matched = 0;
  const grid = $('#memGrid');
  const status = $('#memStatus');
  grid.innerHTML = cards.map((s, i) =>
    `<div class="memory-card" data-index="${i}" data-symbol="${s}"></div>`
  ).join('');
  const cardEls = grid.querySelectorAll('.memory-card');
  cardEls.forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('flipped') || el.classList.contains('matched') || flipped.length >= 2) return;
      el.textContent = el.dataset.symbol;
      el.classList.add('flipped');
      flipped.push(el);
      if (flipped.length === 2) {
        setTimeout(() => {
          if (flipped[0].dataset.symbol === flipped[1].dataset.symbol) {
            flipped.forEach(c => { c.classList.remove('flipped'); c.classList.add('matched'); });
            matched++;
            if (matched === symbols.length) status.textContent = 'All pairs found! 🎉';
          } else {
            flipped.forEach(c => { c.classList.remove('flipped'); c.textContent = ''; });
          }
          flipped = [];
        }, 600);
      }
    });
  });
  status.textContent = 'Find all pairs!';
}

// Quiz
function initQuiz() {
  const questions = [
    { q: 'What is the main ingredient in guacamole?', opts: ['Tomato','Avocado','Cucumber','Pepper'], ans: 1 },
    { q: 'Which country is pasta from?', opts: ['France','Italy','Spain','Greece'], ans: 1 },
    { q: 'Which spice is the most expensive?', opts: ['Saffron','Cinnamon','Cardamom','Turmeric'], ans: 0 },
    { q: 'What is a common dessert in Italy?', opts: ['Croissant','Tiramisu','Brownie','Pudding'], ans: 1 },
    { q: 'What is the main ingredient in hummus?', opts: ['Lentils','Chickpeas','Beans','Peas'], ans: 1 },
  ];
  let idx = 0, score = 0;
  const status = $('#quizStatus');
  const optsDiv = $('#quizOptions');
  const scoreEl = $('#quizScore');

  function renderQ() {
    if (idx >= questions.length) {
      status.textContent = 'Quiz Complete!';
      optsDiv.innerHTML = `<p style="text-align:center;color:var(--color-gold);font-size:1.2rem;">Your score: ${score}/${questions.length}</p>`;
      return;
    }
    const q = questions[idx];
    status.textContent = `Question ${idx+1} of ${questions.length}`;
    optsDiv.innerHTML = q.opts.map((o, i) =>
      `<button class="quiz-option" data-i="${i}">${o}</button>`
    ).join('');
    optsDiv.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const chosen = +btn.dataset.i;
        if (chosen === q.ans) { btn.classList.add('correct'); score++; }
        else btn.classList.add('wrong');
        optsDiv.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        scoreEl.textContent = `Score: ${score}`;
        setTimeout(() => { idx++; renderQ(); }, 900);
      });
    });
  }
  renderQ();
  $('#quizRestart').addEventListener('click', () => { idx = 0; score = 0; scoreEl.textContent = 'Score: 0'; renderQ(); });
}

// Group Challenge
function initChallenge() {
  const challenges = [
    'Name 5 dishes from our menu!',
    'Do your best food critic impression.',
    'Share a food memory from childhood.',
    'Everyone at the table must compliment the chef.',
    'Describe your favorite dish in 3 words.',
    'Do a 10-second happy dance.',
    'Tell a joke about food.',
    'Name 3 ingredients in a Margherita pizza.',
    'What is your ultimate comfort food?',
    'Describe the perfect rooftop evening.',
  ];
  const text = $('#challengeText');
  function newChallenge() {
    text.textContent = challenges[Math.floor(Math.random() * challenges.length)];
  }
  newChallenge();
  $('#newChallenge').addEventListener('click', newChallenge);
}

// ============================================================
// LOGIN / SIGNUP
// ============================================================
$('#loginNavBtn').addEventListener('click', (e) => {
  e.preventDefault();
  $('#loginModal').classList.add('active');
});
$('#closeLoginBtn').addEventListener('click', () => $('#loginModal').classList.remove('active'));
$('#loginModal').addEventListener('click', (e) => { if (e.target === $('#loginModal')) $('#loginModal').classList.remove('active'); });

$$('.login-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    $$('.login-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const isLogin = tab.dataset.tab === 'login';
    $('#loginModalTitle').textContent = isLogin ? 'Login' : 'Sign Up';
    $('#loginSubmitBtn').textContent = isLogin ? 'Login' : 'Sign Up';
    $('#roleGroup').style.display = isLogin ? 'block' : 'block';
  });
});

$('#loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = $('#loginEmail').value.trim();
  const password = $('#loginPassword').value;
  const role = $('#loginRole').value;
  const staff = getLS(LS_KEYS.staff);
  const user = staff.find(s => s.email === email && s.password === password && s.active);

  if (user) {
    if (user.role !== role && role !== 'customer') {
      $('#loginFeedback').textContent = 'Role mismatch. Please select the correct role.';
      return;
    }
    $('#loginFeedback').textContent = `Logged in as ${user.name} (${user.role})`;
    setTimeout(() => {
      $('#loginModal').classList.remove('active');
      openDashboard(user.role, user.name);
    }, 600);
  } else {
    // Sign-up flow (demo): if signup tab is active
    const isSignup = $$('.login-tab')[1].classList.contains('active');
    if (isSignup && role === 'customer') {
      const newUser = { id: 'u' + Date.now(), name: email.split('@')[0], email, password, role: 'customer', active: true };
      staff.push(newUser);
      setLS(LS_KEYS.staff, staff);
      $('#loginFeedback').textContent = 'Account created! You can now log in.';
    } else {
      $('#loginFeedback').textContent = 'Invalid credentials. Try a demo account.';
    }
  }
});

function openDashboard(role, name) {
  const body = $('#dashboardBody');
  const title = $('#dashboardTitle');
  $('#dashboardModal').classList.add('active');

  if (role === 'admin') {
    title.textContent = `Admin Dashboard — ${name}`;
    renderAdminDashboard(body);
  } else if (role === 'coworker') {
    title.textContent = `Coworker Dashboard — ${name}`;
    renderCoworkerDashboard(body);
  } else if (role === 'kitchen') {
    title.textContent = `Kitchen Dashboard — ${name}`;
    renderKitchenDashboard(body);
  } else {
    title.textContent = `Welcome, ${name}`;
    body.innerHTML = `<p style="color:var(--color-champagne);">You are logged in as a customer. Enjoy your experience!</p>
      <p style="color:var(--color-text-muted);margin-top:1rem;">Loyalty Points: ${getLS(LS_KEYS.loyalty).points}</p>`;
  }
}

$('#closeDashboardBtn').addEventListener('click', () => $('#dashboardModal').classList.remove('active'));
$('#dashboardModal').addEventListener('click', (e) => { if (e.target === $('#dashboardModal')) $('#dashboardModal').classList.remove('active'); });

// ---------- Admin Dashboard ----------
function renderAdminDashboard(body) {
  const orders = getLS(LS_KEYS.orders);
  const reservations = getLS(LS_KEYS.reservations);
  const menu = getMenu();
  const events = getLS(LS_KEYS.events);
  const requests = getLS(LS_KEYS.serviceRequests);

  body.innerHTML = `
    <div class="dash-section">
      <h4><i class="fas fa-chart-line"></i> Overview</h4>
      <p style="color:var(--color-text-muted);font-size:0.85rem;">Orders: ${orders.length} · Reservations: ${reservations.length} · Menu Items: ${menu.length} · Events: ${events.length} · Service Requests: ${requests.length}</p>
    </div>
    <div class="dash-section">
      <h4><i class="fas fa-receipt"></i> Recent Orders</h4>
      ${orders.length ? `<table class="dash-table"><tr><th>ID</th><th>Table</th><th>Items</th><th>Total</th><th>Status</th></tr>
        ${orders.slice(-5).map(o => `<tr><td>${o.id}</td><td>${o.table}</td><td>${o.items.length}</td><td>₹${o.items.reduce((s,i)=>s+i.price*i.qty,0)}</td><td><span class="status-badge status-${o.status.toLowerCase()}">${o.status}</span></td></tr>`).join('')}</table>`
        : '<p style="color:var(--color-text-muted);">No orders yet.</p>'}
    </div>
    <div class="dash-section">
      <h4><i class="fas fa-calendar-check"></i> Reservations</h4>
      ${reservations.length ? `<table class="dash-table"><tr><th>Name</th><th>Phone</th><th>Date</th><th>Guests</th></tr>
        ${reservations.slice(-5).map(r => `<tr><td>${r.name}</td><td>${r.phone}</td><td>${r.date} ${r.time}</td><td>${r.guests}</td></tr>`).join('')}</table>`
        : '<p style="color:var(--color-text-muted);">No reservations yet.</p>'}
    </div>
    <div class="dash-section">
      <h4><i class="fas fa-bell"></i> Service Requests</h4>
      ${requests.length ? `<table class="dash-table"><tr><th>Table</th><th>Type</th><th>Time</th><th>Status</th></tr>
        ${requests.slice(-5).map(r => `<tr><td>${r.table}</td><td>${r.type}</td><td>${r.time}</td><td>${r.status}</td></tr>`).join('')}</table>`
        : '<p style="color:var(--color-text-muted);">No requests.</p>'}
    </div>
    <div class="dash-section">
      <h4><i class="fas fa-palette"></i> Theme Settings (Demo)</h4>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        <label style="color:var(--color-text-muted);font-size:0.8rem;">Gold Color <input type="color" id="themeGold" value="#d4af37"></label>
        <label style="color:var(--color-text-muted);font-size:0.8rem;">Burgundy <input type="color" id="themeBurgundy" value="#3b0d1e"></label>
        <button class="btn btn-gold" id="saveThemeBtn" style="padding:0.3rem 1rem;font-size:0.7rem;">Apply</button>
      </div>
    </div>
  `;
  body.querySelector('#saveThemeBtn')?.addEventListener('click', () => {
    const gold = body.querySelector('#themeGold').value;
    const burgundy = body.querySelector('#themeBurgundy').value;
    setLS(LS_KEYS.theme, { gold, burgundy });
    document.documentElement.style.setProperty('--color-gold', gold);
    document.documentElement.style.setProperty('--color-burgundy', burgundy);
    showToast('Theme updated (demo)');
  });
}

// ---------- Coworker Dashboard ----------
function renderCoworkerDashboard(body) {
  const orders = getLS(LS_KEYS.orders);
  const requests = getLS(LS_KEYS.serviceRequests);
  body.innerHTML = `
    <div class="dash-section">
      <h4><i class="fas fa-receipt"></i> Active Orders</h4>
      ${orders.length ? `<table class="dash-table"><tr><th>ID</th><th>Table</th><th>Items</th><th>Status</th><th>Action</th></tr>
        ${orders.slice(-8).map((o, idx) => `<tr><td>${o.id}</td><td>${o.table}</td><td>${o.items.map(i=>i.name).join(', ')}</td><td><span class="status-badge status-${o.status.toLowerCase()}">${o.status}</span></td>
        <td><button class="btn btn-outline" style="padding:0.2rem 0.5rem;font-size:0.65rem;" data-order-id="${o.id}" data-action="advance">Advance</button></td></tr>`).join('')}</table>`
        : '<p style="color:var(--color-text-muted);">No active orders.</p>'}
    </div>
    <div class="dash-section">
      <h4><i class="fas fa-bell"></i> Service Requests</h4>
      ${requests.length ? `<table class="dash-table"><tr><th>Table</th><th>Type</th><th>Time</th><th>Status</th><th>Action</th></tr>
        ${requests.map((r, i) => `<tr><td>${r.table}</td><td>${r.type}</td><td>${r.time}</td><td>${r.status}</td>
        <td><button class="btn btn-outline" style="padding:0.2rem 0.5rem;font-size:0.65rem;" data-req-index="${i}">Done</button></td></tr>`).join('')}</table>`
        : '<p style="color:var(--color-text-muted);">No requests.</p>'}
    </div>
  `;
  body.querySelectorAll('[data-action="advance"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.orderId;
      const orders = getLS(LS_KEYS.orders);
      const order = orders.find(o => o.id === id);
      if (order) {
        const states = ['New','Accepted','Preparing','Ready','Served'];
        const next = states.indexOf(order.status) + 1;
        if (next < states.length) order.status = states[next];
        setLS(LS_KEYS.orders, orders);
        renderCoworkerDashboard(body);
        showToast(`Order ${id} → ${order.status}`);
      }
    });
  });
  body.querySelectorAll('[data-req-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = +btn.dataset.reqIndex;
      const reqs = getLS(LS_KEYS.serviceRequests);
      reqs.splice(idx, 1);
      setLS(LS_KEYS.serviceRequests, reqs);
      renderCoworkerDashboard(body);
      showToast('Request resolved');
    });
  });
}

// ---------- Kitchen Dashboard ----------
function renderKitchenDashboard(body) {
  const orders = getLS(LS_KEYS.orders).filter(o => o.status !== 'Served' && o.status !== 'Cancelled');
  body.innerHTML = `
    <div class="dash-section">
      <h4><i class="fas fa-fire"></i> Live Orders</h4>
      ${orders.length ? orders.map(o => `
        <div class="kitchen-order-card">
          <h4>Order ${o.id} · Table ${o.table}</h4>
          <p class="order-meta">${o.time} · Status: <span class="status-badge status-${o.status.toLowerCase()}">${o.status}</span></p>
          <div class="kitchen-order-items">
            ${o.items.map(i => `<div>${i.qty} × ${i.name} ${i.custom?.spice ? '· '+i.custom.spice : ''} ${i.custom?.notes ? '· '+i.custom.notes : ''}</div>`).join('')}
          </div>
          <div class="kitchen-order-actions">
            <button class="btn btn-outline" data-kitchen-id="${o.id}" data-status="Preparing">Preparing</button>
            <button class="btn btn-outline" data-kitchen-id="${o.id}" data-status="Ready">Ready</button>
            <button class="btn btn-outline" data-kitchen-id="${o.id}" data-status="Served">Served</button>
          </div>
        </div>
      `).join('') : '<p style="color:var(--color-text-muted);">No active orders.</p>'}
    </div>
  `;
  body.querySelectorAll('[data-kitchen-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.kitchenId;
      const status = btn.dataset.status;
      const orders = getLS(LS_KEYS.orders);
      const order = orders.find(o => o.id === id);
      if (order) {
        order.status = status;
        setLS(LS_KEYS.orders, orders);
        renderKitchenDashboard(body);
        showToast(`Order ${id} → ${status}`);
      }
    });
  });
}

// ============================================================
// REVIEWS
// ============================================================
let selectedRating = 0;
$$('#starRating i').forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = +star.dataset.rating;
    $$('#starRating i').forEach(s => {
      s.classList.toggle('active', +s.dataset.rating <= selectedRating);
      s.className = +s.dataset.rating <= selectedRating ? 'fas fa-star active' : 'far fa-star';
    });
  });
});

$('#submitReviewBtn').addEventListener('click', () => {
  const text = $('#reviewText').value.trim();
  if (!selectedRating) { showToast('Please select a star rating.'); return; }
  showToast('Thank you for your feedback! (Demo)');
  $('#reviewText').value = '';
  selectedRating = 0;
  $$('#starRating i').forEach(s => { s.className = 'far fa-star'; s.classList.remove('active'); });
});

// ============================================================
// WAITER CALL / SERVICE REQUESTS (from customer perspective)
// ============================================================
// Add a floating "Call Waiter" button for demo
(function addCallWaiterButton() {
  const btn = document.createElement('button');
  btn.innerHTML = '<i class="fas fa-bell"></i> Call Waiter';
  btn.className = 'btn btn-gold';
  btn.style.cssText = 'position:fixed;bottom:6rem;right:2rem;z-index:900;font-size:0.7rem;padding:0.5rem 1rem;';
  btn.addEventListener('click', () => {
    const reqs = getLS(LS_KEYS.serviceRequests);
    reqs.push({ table: 'T1', type: 'Call Waiter', time: new Date().toLocaleTimeString(), status: 'Pending' });
    setLS(LS_KEYS.serviceRequests, reqs);
    showToast('Waiter called! (Demo)');
  });
  document.body.appendChild(btn);
})();

// ============================================================
// RESET DEMO
// ============================================================
$('#resetDemoBtn').addEventListener('click', () => {
  if (confirm('Reset all demo data to defaults?')) {
    Object.values(LS_KEYS).forEach(k => localStorage.removeItem(k));
    seedData();
    location.reload();
  }
});

// ============================================================
// INIT
// ============================================================
function init() {
  renderGallery();
  renderCategories();
  renderMenu();
  updateCartBadge();
  renderEvents();
  observeReveals();

  // Set default reservation date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateInput = $('#resDate');
  if (dateInput) dateInput.value = tomorrow.toISOString().split('T')[0];
}
init();