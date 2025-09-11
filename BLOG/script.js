// Artículos mock
const articles = [{
    id: 1,
    title: "Torta Tres Leches Perfecta",
    snippet: "Aprende a preparar una torta tres leches esponjosa y deliciosa con este paso a paso fácil.",
    category: "receta",
    date: "2025-09-01",
    img: "imgs/tres-leches.jpg"
}, {
    id: 2,
    title: "Decoración con Frutas Frescas",
    snippet: "Ideas y consejos para decorar tus pasteles usando frutas de temporada y lograr un acabado profesional.",
    category: "decoracion",
    date: "2025-08-28",
    img: "imgs/frutas-decoracion.avif"
}, {
    id: 3,
    title: "Historia del Queque Marmoleado",
    snippet: "Descubre el origen y curiosidades de este clásico de la pastelería casera.",
    category: "historia",
    date: "2025-08-15",
    img: "imgs/queque-marmoleado.jpg"
}, {
    id: 4,
    title: "Tips para un Bizcocho Saludable",
    snippet: "¿Cómo lograr un bizcocho esponjoso y bajo en azúcar? Aquí te lo contamos.",
    category: "saludable",
    date: "2025-09-05",
    img: "imgs/bizcocho-saludable.jpg"
}, {
    id: 5,
    title: "Receta: Pie de Limón Clásico",
    snippet: "El paso a paso definitivo para un pie de limón con merengue firme y base crocante.",
    category: "receta",
    date: "2025-08-22",
    img: "imgs/pie-limon.avif"
}, {
    id: 6,
    title: "Cómo Usar Manga Pastelera",
    snippet: "Domina la manga pastelera y sorprende con decoraciones creativas y fáciles.",
    category: "tips",
    date: "2025-09-03",
    img: "imgs/manga-pastelera.avif"
}];

// Renderiza los artículos
function renderArticles(list) {
    const grid = document.getElementById('blog-grid');
    grid.innerHTML = '';
    list.forEach(article => {
        const card = document.createElement('article');
        card.className = 'blog-card';
        card.tabIndex = 0;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', article.title);

        // Nueva función para generar URLs consistentes
        function generateDetailUrl(title) {
            return title
                .toLowerCase()
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Elimina tildes
                .replace(/:/g, '') // Elimina dos puntos
                .replace(/\s+/g, '-') // Reemplaza espacios con guiones
                .replace(/[^a-z0-9-]/g, ''); // Elimina caracteres especiales
        }

        // Construir la URL del detalle usando la nueva función
        const detailUrl = `detalles/${generateDetailUrl(article.title)}.html`;

        card.onclick = () => window.location.href = detailUrl;
        card.onkeydown = e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = detailUrl;
            }
        };
        card.innerHTML = `
                    <img src="${article.img}" alt="${article.title}" class="blog-img">
                    <div class="blog-card-content">
                        <span class="blog-category">${article.category.charAt(0).toUpperCase() + article.category.slice(1)}</span>
                        <h2 class="blog-title">${article.title}</h2>
                        <p class="blog-snippet">${article.snippet}</p>
                        <span class="blog-date">${new Date(article.date).toLocaleDateString('es-CL')}</span>
                    </div>
                `;
        grid.appendChild(card);
    });
}

// Filtros y orden
function applyFilters() {
    const cat = document.getElementById('filter-category').value;
    const sort = document.getElementById('sort-date').value;
    let filtered = articles.slice();
    if (cat !== 'all') {
        filtered = filtered.filter(a => a.category === cat);
    }
    filtered.sort((a, b) => sort === 'asc' ?
        new Date(a.date) - new Date(b.date) :
        new Date(b.date) - new Date(a.date)
    );
    renderArticles(filtered);
}

document.getElementById('filter-category').addEventListener('change', applyFilters);
document.getElementById('sort-date').addEventListener('change', applyFilters);

// Inicial
renderArticles(articles);