// Carrusel de línea de tiempo
const carouselImages = [{
    src: "img/carrusel-1995.png",
    year: "1995",
    alt: "Primer local de Mil Sabores en 1995"
}, {
    src: "img/carrusel-2005.png",
    year: "2005",
    alt: "Expansión y nuevo equipo en 2005"
}, {
    src: "img/carrusel-2015.png",
    year: "2015",
    alt: "Innovación en recetas en 2015"
}, {
    src: "img/carrusel-2025.png",
    year: "2025",
    alt: "Mil Sabores en la actualidad, 2025"
}];

const track = document.querySelector('.carousel-track');
const yearDisplay = document.getElementById('carousel-year');
const dotsContainer = document.getElementById('carousel-dots');
let current = 0;

function renderCarousel() {
    track.innerHTML = '';
    carouselImages.forEach((img, idx) => {
        const div = document.createElement('div');
        div.className = 'carousel-slide';
        if (idx === current) div.classList.add('active');
        if (idx === (current - 1 + carouselImages.length) % carouselImages.length) div.classList.add('left');
        if (idx === (current + 1) % carouselImages.length) div.classList.add('right');
        if (idx !== current && idx !== (current - 1 + carouselImages.length) % carouselImages.length && idx !== (current + 1) % carouselImages.length) div.classList.add('hidden');
        div.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
        track.appendChild(div);
    });
    yearDisplay.textContent = carouselImages[current].year;
    renderDots();
}

function renderDots() {
    dotsContainer.innerHTML = '';
    carouselImages.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (idx === current ? ' active' : '');
        dot.setAttribute('aria-label', `Ir a la imagen del año ${carouselImages[idx].year}`);
        dot.setAttribute('tabindex', '0');
        dot.onclick = () => {
            current = idx;
            renderCarousel();
        };
        dotsContainer.appendChild(dot);
    });
}

document.querySelector('.carousel-btn-left').onclick = () => {
    current = (current - 1 + carouselImages.length) % carouselImages.length;
    renderCarousel();
};
document.querySelector('.carousel-btn-right').onclick = () => {
    current = (current + 1) % carouselImages.length;
    renderCarousel();
};

// Accesibilidad con teclado
document.querySelector('.carousel-btn-left').onkeydown = e => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        current = (current - 1 + carouselImages.length) % carouselImages.length;
        renderCarousel();
    }
};
document.querySelector('.carousel-btn-right').onkeydown = e => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        current = (current + 1) % carouselImages.length;
        renderCarousel();
    }
};

renderCarousel();