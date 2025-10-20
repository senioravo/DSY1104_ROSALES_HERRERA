// productos.js
// Base de datos simulada de productos de Pastelería 1000 Sabores
// Estructura basada en el backlog detallado del proyecto

export const PRODUCTS_PS = [
    // TORTAS CUADRADAS (TC)
    {
        code: "TC001",
        nombre: "Torta Cuadrada de Chocolate",
        categoriaId: "TC",
        tipoForma: "cuadrada",
        tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)", "L (20 porciones)"],
        precioCLP: 45000,
        stock: 10,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Deliciosa torta de chocolate con ganache y toque de avellanas. Ideal para personalizar con mensaje.",
        etiquetas: ["tradicional"],
        imagen: "TC001.png"
    },
    {
        code: "TC002",
        nombre: "Torta Cuadrada de Frutas",
        categoriaId: "TC",
        tipoForma: "cuadrada",
        tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)", "L (20 porciones)"],
        precioCLP: 50000,
        stock: 8,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Bizcocho de vainilla con frutas frescas y crema chantilly.",
        etiquetas: ["tradicional", "frutas"],
        imagen: "TC002.png"
    },

    // TORTAS CIRCULARES (TT)
    {
        code: "TT001",
        nombre: "Torta Circular de Vainilla",
        categoriaId: "TT",
        tipoForma: "circular",
        tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)", "L (20 porciones)"],
        precioCLP: 40000,
        stock: 12,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Vainilla clásica rellena con crema pastelera y glaseado dulce.",
        etiquetas: ["tradicional"],
        imagen: "TT001.png"
    },
    {
        code: "TT002",
        nombre: "Torta Circular de Manjar",
        categoriaId: "TT",
        tipoForma: "circular",
        tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)", "L (20 porciones)"],
        precioCLP: 42000,
        stock: 9,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Clásica torta chilena con manjar y nueces.",
        etiquetas: ["tradicional"],
        imagen: "TT002.png"
    },

    // POSTRES INDIVIDUALES (PI)
    {
        code: "PI001",
        nombre: "Mousse de Chocolate",
        categoriaId: "PI",
        tipoForma: null,
        tamanosDisponibles: ["unidad"],
        precioCLP: 5000,
        stock: 40,
        personalizable: false,
        maxMsgChars: 0,
        descripcion: "Postre cremoso con chocolate de alta calidad.",
        etiquetas: ["chocolate"],
        imagen: "PI001.png"
    },
    {
        code: "PI002",
        nombre: "Tiramisú Clásico",
        categoriaId: "PI",
        tipoForma: null,
        tamanosDisponibles: ["unidad"],
        precioCLP: 5500,
        stock: 36,
        personalizable: false,
        maxMsgChars: 0,
        descripcion: "Café, mascarpone y cacao en un equilibrio perfecto.",
        etiquetas: ["clasico"],
        imagen: "PI002.png"
    },

    // PRODUCTOS SIN AZÚCAR (PSA)
    {
        code: "PSA001",
        nombre: "Torta Sin Azúcar de Naranja",
        categoriaId: "PSA",
        tipoForma: "circular",
        tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)"],
        precioCLP: 48000,
        stock: 7,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Endulzada naturalmente para quienes buscan opciones más saludables.",
        etiquetas: ["sin_azucar"],
        imagen: "PSA001.png"
    },
    {
        code: "PSA002",
        nombre: "Cheesecake Sin Azúcar",
        categoriaId: "PSA",
        tipoForma: "circular",
        tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)"],
        precioCLP: 47000,
        stock: 6,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Suave y cremoso, ideal para disfrutar sin culpa.",
        etiquetas: ["sin_azucar"],
        imagen: "PSA002.png"
    },

    // PASTELERÍA TRADICIONAL (PT)
    {
        code: "PT001",
        nombre: "Empanada de Manzana",
        categoriaId: "PT",
        tipoForma: null,
        tamanosDisponibles: ["unidad"],
        precioCLP: 3000,
        stock: 50,
        personalizable: false,
        maxMsgChars: 0,
        descripcion: "Rellena de manzanas especiadas, perfecta para el desayuno o merienda.",
        etiquetas: ["tradicional"],
        imagen: "PT001.png"
    },
    {
        code: "PT002",
        nombre: "Tarta de Santiago",
        categoriaId: "PT",
        tipoForma: "circular",
        tamanosDisponibles: ["S (8 porciones)"],
        precioCLP: 6000,
        stock: 22,
        personalizable: false,
        maxMsgChars: 0,
        descripcion: "Clásica tarta de almendras, azúcar y huevos.",
        etiquetas: ["tradicional"],
        imagen: "PT002.png"
    },

    // PRODUCTOS SIN GLUTEN (PG)
    {
        code: "PG001",
        nombre: "Brownie Sin Gluten",
        categoriaId: "PG",
        tipoForma: "cuadrada",
        tamanosDisponibles: ["unidad"],
        precioCLP: 4000,
        stock: 35,
        personalizable: false,
        maxMsgChars: 0,
        descripcion: "Denso y sabroso, libre de gluten.",
        etiquetas: ["sin_gluten", "chocolate"],
        imagen: "PG001.png"
    },
    {
        code: "PG002",
        nombre: "Pan Sin Gluten",
        categoriaId: "PG",
        tipoForma: null,
        tamanosDisponibles: ["unidad"],
        precioCLP: 3500,
        stock: 28,
        personalizable: false,
        maxMsgChars: 0,
        descripcion: "Suave y esponjoso, ideal para sándwiches.",
        etiquetas: ["sin_gluten"],
        imagen: "PG002.png"
    },

    // PRODUCTOS VEGANA (PV)
    {
        code: "PV001",
        nombre: "Torta Vegana de Chocolate",
        categoriaId: "PV",
        tipoForma: "circular",
        tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)"],
        precioCLP: 50000,
        stock: 6,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Húmeda y deliciosa, sin ingredientes de origen animal.",
        etiquetas: ["vegana", "chocolate"],
        imagen: "PV001.png"
    },
    {
        code: "PV002",
        nombre: "Galletas Veganas de Avena",
        categoriaId: "PV",
        tipoForma: null,
        tamanosDisponibles: ["unidad"],
        precioCLP: 4500,
        stock: 40,
        personalizable: false,
        maxMsgChars: 0,
        descripcion: "Crujientes y sabrosas, perfectas para colación.",
        etiquetas: ["vegana"],
        imagen: "PV002.png"
    },

    // TORTAS ESPECIALES (TE)
    {
        code: "TE001",
        nombre: "Torta Especial de Cumpleaños",
        categoriaId: "TE",
        tipoForma: "circular",
        tamanosDisponibles: ["S (8 porciones)", "M (12 porciones)", "L (20 porciones)"],
        precioCLP: 55000,
        stock: 7,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Pensada para celebrar: admite decoraciones temáticas y mensaje.",
        etiquetas: ["especial", "cumpleaños"],
        imagen: "TE001.png"
    },
    {
        code: "TE002",
        nombre: "Torta Especial de Boda",
        categoriaId: "TE",
        tipoForma: "circular",
        tamanosDisponibles: ["M (12 porciones)", "L (20 porciones)"],
        precioCLP: 60000,
        stock: 4,
        personalizable: true,
        maxMsgChars: 50,
        descripcion: "Elegante y memorable; lista para personalizar.",
        etiquetas: ["especial", "boda"],
        imagen: "TE002.png"
    }
];

// Función helper para obtener productos por categoría
export const getProductsByCategory = (categoryId) => {
    return PRODUCTS_PS.filter(product => product.categoriaId === categoryId);
};

// Función helper para obtener un producto por código
export const getProductByCode = (code) => {
    return PRODUCTS_PS.find(product => product.code === code);
};

// Función helper para obtener productos destacados (con stock > 0 y ordenados por precio)
export const getFeaturedProducts = (limit = 3) => {
    return PRODUCTS_PS
        .filter(product => product.stock > 0)
        .sort((a, b) => b.precioCLP - a.precioCLP)
        .slice(0, limit);
};