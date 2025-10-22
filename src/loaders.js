// ===================================================
// LOADERS - Funciones que cargan datos para las rutas
// ===================================================

// Datos estáticos de ejemplo para el blog
const blogArticles = [
    {
        id: 1,
        slug: 'consejos-conservar-postres',
        titulo: 'Consejos para Conservar Postres',
        descripcion: 'Aprende las mejores técnicas para mantener tus postres frescos y deliciosos por más tiempo.',
        categoria: 'Consejos',
        fecha: '2025-01-15',
        autor: 'María González',
        tiempoLectura: '5 min',
        imagen: '/images/blog/postres.jpg',
        contenido: `
            <p>Mantener nuestros postres en perfectas condiciones es todo un arte. Aquí te compartimos los mejores consejos:</p>
            
            <h3>1. Temperatura adecuada</h3>
            <p>La mayoría de nuestros postres se conservan mejor en refrigeración entre 2-4°C.</p>
            
            <h3>2. Envases herméticos</h3>
            <p>Utiliza recipientes que eviten la entrada de aire para mantener la frescura.</p>
            
            <h3>3. Consumo recomendado</h3>
            <p>Para disfrutar al máximo el sabor, consume dentro de las primeras 48 horas.</p>
        `
    },
    {
        id: 2,
        slug: 'receta-torta-chocolate',
        titulo: 'Secretos de Nuestra Torta de Chocolate',
        descripcion: 'Descubre los ingredientes especiales que hacen única nuestra torta de chocolate.',
        categoria: 'Recetas',
        fecha: '2025-01-10',
        autor: 'Carlos Mendoza',
        tiempoLectura: '8 min',
        imagen: '/images/blog/chocolate.jpg',
        contenido: `
            <p>Nuestra torta de chocolate es el resultado de años de perfeccionamiento. Te contamos sus secretos:</p>
            
            <h3>El chocolate belga</h3>
            <p>Utilizamos solo chocolate belga de primera calidad, con un 70% de cacao.</p>
            
            <h3>La técnica del bizcocho</h3>
            <p>El secreto está en batir las claras por separado para conseguir esa esponjosidad única.</p>
        `
    }
];

// ===================================================
// LOADER PARA BLOG - Lista de artículos
// ===================================================
export async function blogLoader() {
    // Simular delay de red (opcional)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return {
        articles: blogArticles,
        categories: ['Todos', 'Consejos', 'Recetas', 'Noticias'],
        featuredArticle: blogArticles[0]
    };
}

// ===================================================
// LOADER PARA ARTÍCULO INDIVIDUAL - Por slug
// ===================================================
export async function articuloLoader({ params }) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const { slug } = params;
    
    // Buscar artículo por slug
    const article = blogArticles.find(art => art.slug === slug);
    
    if (!article) {
        throw new Response("Artículo no encontrado", { status: 404 });
    }
    
    // Artículos relacionados (excluyendo el actual)
    const relatedArticles = blogArticles
        .filter(art => art.id !== article.id)
        .slice(0, 3);
    
    return {
        article,
        relatedArticles
    };
}

// ===================================================
// LOADER PARA CONTACTO - Datos dinámicos (NUEVO!)
// ===================================================
export async function contactoLoader() {
    try {
        // Importar datos desde archivos JSON
        const [contactoData, sucursalesData, opcionesAsuntoData] = await Promise.all([
            import('./data/contacto.json'),
            import('./data/sucursales.json'),
            import('./data/opciones-asunto.json')
        ]);
        
        // Filtrar solo sucursales activas
        const sucursalesActivas = sucursalesData.default.filter(sucursal => sucursal.activa);
        
        return {
            contactInfo: contactoData.default,
            sucursales: sucursalesActivas,
            opcionesAsunto: opcionesAsuntoData.default,
            // Información adicional que podríamos usar
            metadata: {
                totalSucursales: sucursalesData.default.length,
                sucursalesActivas: sucursalesActivas.length,
                ultimaActualizacion: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Error cargando datos de contacto:', error);
        
        // Fallback en caso de error - datos por defecto
        return {
            contactInfo: [
                {
                    id: 1,
                    icon: "fas fa-phone",
                    title: "Teléfono",
                    info: "+56 2 2345 6789",
                    color: "var(--strawberry)"
                }
            ],
            sucursales: [
                {
                    id: 1,
                    nombre: "Sucursal Principal",
                    direccion: "Av. Principal 1234, Santiago",
                    telefono: "+56 2 2345 6789",
                    horarios: {
                        semana: "Lun - Sáb: 9:00 - 20:00",
                        domingo: "Dom: 10:00 - 18:00"
                    }
                }
            ],
            opcionesAsunto: [
                { id: 1, value: "consulta", label: "Consulta General" }
            ],
            metadata: {
                error: true,
                message: "Usando datos de respaldo"
            }
        };
    }
}

// ===================================================
// LOADER PARA NOSOTROS - Página dinámica (NUEVO!)
// ===================================================
export async function nosotrosLoader() {
    try {
        // Importar todos los datos de la página Nosotros
        const [timelineData, misionData, valoresData, heroData] = await Promise.all([
            import('./data/timeline.json'),
            import('./data/mision.json'),
            import('./data/valores.json'),
            import('./data/hero-nosotros.json')
        ]);
        
        // Filtrar eventos destacados del timeline
        const eventosDestacados = timelineData.default.filter(evento => evento.destacado);
        
        // Filtrar valores destacados
        const valoresDestacados = valoresData.default.valores.filter(valor => valor.destacado);
        
        return {
            // 📅 Timeline/Historia
            timeline: timelineData.default,
            eventosDestacados,
            
            // 🎯 Misión y estadísticas
            mision: misionData.default.mision,
            estadisticas: misionData.default.estadisticas,
            
            // 💎 Valores
            valoresInfo: {
                titulo: valoresData.default.titulo,
                subtitulo: valoresData.default.subtitulo
            },
            valores: valoresData.default.valores,
            valoresDestacados,
            
            // 🦸‍♂️ Hero section
            hero: heroData.default,
            
            // 📊 Metadata útil
            metadata: {
                totalEventos: timelineData.default.length,
                añoFundacion: timelineData.default[0]?.year || "1995",
                añosExperiencia: new Date().getFullYear() - parseInt(timelineData.default[0]?.year || "1995"),
                totalValores: valoresData.default.valores.length,
                ultimaActualizacion: new Date().toISOString()
            }
        };
    } catch (error) {
        console.error('Error cargando datos de nosotros:', error);
        
        // 🛡️ Fallback en caso de error
        return {
            timeline: [
                {
                    id: 1,
                    year: "1995",
                    title: "Los Inicios",
                    description: "Comenzamos como una pequeña pastelería familiar.",
                    image: "/images/nosotros/carrusel-1995.png"
                }
            ],
            mision: {
                titulo: "Nuestra Misión",
                descripcion: "Crear dulces momentos desde 1995.",
                imagen: "/images/nosotros/badge-1995.png"
            },
            estadisticas: [
                { numero: "30+", etiqueta: "Años de experiencia" }
            ],
            valores: [
                { icon: "fas fa-heart", title: "Pasión", description: "Amor en cada receta" }
            ],
            hero: {
                titulo: "Nuestra Historia",
                subtitulo: "30 años endulzando momentos"
            },
            metadata: {
                error: true,
                message: "Usando datos de respaldo"
            }
        };
    }
}