import { useState } from 'react';

export default function TimelineSection({ timeline: timelineFromLoader }) {
    const [activeCard, setActiveCard] = useState(0);

    // Datos por defecto del timeline si no vienen del loader
    const defaultTimelineData = [
        {
            id: 1,
            year: "1995",
            title: "Los Inicios",
            subtitle: "Mejor pastelería comunal de Santiago",
            description: "Comenzamos como una pequeña pastelería familiar, ganando el reconocimiento de la revista Dessert&Delicious como la mejor pastelería comunal de Santiago.",
            image: "/images/nosotros/carrusel-1995.png",
            icon: "fas fa-seedling"
        },
        {
            id: 2,
            year: "2005",
            title: "Expansión",
            subtitle: "Crecimiento y nuevos horizontes",
            description: "Expandimos nuestras instalaciones y diversificamos nuestra oferta, incorporando nuevas líneas de productos y técnicas innovadoras de repostería.",
            image: "/images/nosotros/carrusel-2005.png",
            icon: "fas fa-chart-line"
        },
        {
            id: 3,
            year: "2015",
            title: "Modernización",
            subtitle: "Tecnología y tradición",
            description: "Renovamos completamente nuestras instalaciones con equipos de última generación, manteniendo siempre la calidad artesanal que nos caracteriza.",
            image: "/images/nosotros/carrusel-2015.png",
            icon: "fas fa-cogs"
        },
        {
            id: 4,
            year: "2025",
            title: "Era Digital",
            subtitle: "Innovación constante",
            description: "Nos adaptamos a los nuevos tiempos con tecnología de punta y presencia digital, sin perder nunca el sabor casero que nos distingue.",
            image: "/images/nosotros/carrusel-2025.png",
            icon: "fas fa-rocket"
        }
    ];

    // Usar datos del loader si están disponibles, sino usar los por defecto
    const timelineData = timelineFromLoader?.length > 0 ? 
        timelineFromLoader.map((item, index) => ({
            id: index + 1,
            year: item.year.toString(),
            title: item.event,
            subtitle: item.event,
            description: item.description,
            image: `/images/nosotros/carrusel-${item.year}.png`,
            icon: index === 0 ? "fas fa-seedling" : 
                  index === 1 ? "fas fa-chart-line" : 
                  index === 2 ? "fas fa-cogs" : "fas fa-rocket"
        })) : 
        defaultTimelineData;

    return (
        <section className="timeline-section">
            <div className="container">
                <div className="timeline-header">
                    <h2>Nuestro Recorrido</h2>
                    <p>Un viaje de tres décadas compartiendo dulzura</p>
                </div>
                
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    
                    {timelineData.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'} ${activeCard === index ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCard(index)}
                        >
                            <div className="timeline-content">
                                <div className="timeline-image">
                                    <img src={item.image} alt={item.title} />
                                    <div className="timeline-year">{item.year}</div>
                                </div>
                                <div className="timeline-text">
                                    <div className="timeline-icon">
                                        <i className={item.icon}></i>
                                    </div>
                                    <h3>{item.title}</h3>
                                    <h4>{item.subtitle}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                            <div className="timeline-connector"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}