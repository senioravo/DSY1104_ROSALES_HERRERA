export async function nosotrosLoader() {
    try {
        // Importar todos los datos de la página Nosotros
        const [timelineData, misionData, valoresData, heroData] = await Promise.all([
            import('../data/timeline.json'),
            import('../data/mision.json'),
            import('../data/valores.json'),
            import('../data/hero-nosotros.json')
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