// Actualiza el badge del carrito desde localStorage
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const cartCount = parseInt(localStorage.getItem('cartCount'), 10) || 0;
    badge.textContent = cartCount;
}

// Menú hamburguesa
const hamburger = document.querySelector('.product');
const navList = document.getElementById('nav-list');

if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
        navList.classList.toggle('open');
    });
}

// Inicializa el contador del carrito si no existe
if (!localStorage.getItem('cartCount')) {
    localStorage.setItem('cartCount', '3'); // Para pruebas, inicia con 3 ítems
}

document.addEventListener('DOMContentLoaded', updateCartBadge);