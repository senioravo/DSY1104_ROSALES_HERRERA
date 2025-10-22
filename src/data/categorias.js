// categorias.js
// Base de datos simulada de categorías de Pastelería 1000 Sabores
// id coincide con el prefijo de los códigos de producto

export const CATEGORIES_PS = [{
        id: "TC",
        nombre: "Tortas Cuadradas",
        descripcion: "Tortas de forma cuadrada en varios tamaños.",
        imagen: "PG.png"
    },
    {
        id: "TT",
        nombre: "Tortas Circulares",
        descripcion: "Tortas redondas para toda ocasión.",
        imagen: "PI.png"
    },
    {
        id: "PI",
        nombre: "Postres Individuales",
        descripcion: "Porciones individuales para llevar o compartir.",
        imagen: "PI.png"
    },
    {
        id: "PSA",
        nombre: "Productos Sin Azúcar",
        descripcion: "Opciones endulzadas naturalmente o sin azúcar añadida.",
        imagen: "PSA.png"
    },
    {
        id: "PT",
        nombre: "Pastelería Tradicional",
        descripcion: "Clásicos de la pastelería que nunca fallan.",
        imagen: "PG.png"
    },
    {
        id: "PG",
        nombre: "Productos Sin Gluten",
        descripcion: "Preparaciones libres de gluten.",
        imagen: "PG.png"
    },
    {
        id: "PV",
        nombre: "Productos Vegana",
        descripcion: "Opciones 100% libres de productos animales.",
        imagen: "PG.png"
    },
    {
        id: "TE",
        nombre: "Tortas Especiales",
        descripcion: "Decoraciones y temáticas especiales para celebrar.",
        imagen: "PG.png"
    }
];

// Función helper para obtener una categoría por ID
export const getCategoryById = (id) => {
    return CATEGORIES_PS.find(category => category.id === id);
};

// Función helper para obtener categorías destacadas
export const getFeaturedCategories = (limit = 3) => {
    return CATEGORIES_PS.slice(0, limit);
};