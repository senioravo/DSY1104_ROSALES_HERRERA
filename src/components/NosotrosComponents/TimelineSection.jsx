import { useState } from 'react';

export default function TimelineSection({ timelineData }) {
    const [activeCard, setActiveCard] = useState(0);

    // 🔄 DATOS DINÁMICOS con fallback
    const defaultTimelineData = [
        {
            id: 1,
            year: "1995",
            title: "Los Inicios",
            subtitle: "Mejor pastelería comunal de Santiago",
            description: "Comenzamos como una pequeña pastelería familiar.",
            image: "/images/nosotros/carrusel-1995.png",
            icon: "fas fa-seedling",
            note: "Primera receta de mil hojas",
            quote: "Todo gran sueño comienza con un pequeño horno",
            milestones: []
        }
    ];
    
    const timeline = timelineData || defaultTimelineData;

    return (
        <section className="timeline-section">
            <div className="container">
                <div className="timeline-header">
                    <h2>Nuestro Recorrido</h2>
                    <p>Un viaje de {timeline.length > 1 ? 'décadas' : 'años'} compartiendo dulzura</p>
                </div>
                
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    
                    {timeline.map((item, index) => (
                        <div key={item.id}>
                            {/* Frase inspiradora ARRIBA del evento */}
                            {index < timeline.length - 1 && item.quote && (
                                <div className="timeline-quote-top">
                                    <i className="fas fa-quote-left"></i>
                                    <span>{item.quote}</span>
                                    <i className="fas fa-quote-right"></i>
                                </div>
                            )}
                            
                            <div 
                                className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'} ${activeCard === index ? 'active' : ''}`}
                                onMouseEnter={() => setActiveCard(index)}
                            >
                                <div className="timeline-content">
                                    <div className="timeline-year-badge">{item.year}</div>
                                    
                                    <div className="timeline-layout">
                                        <div className="timeline-image">
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div className="timeline-text">
                                            <h3>{item.title}</h3>
                                            <h4>{item.subtitle}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="timeline-connector"></div>
                            </div>
                            
                            {/* Notitas laterales con años intermedios */}
                            {item.milestones && (
                                <div className={`timeline-milestones ${index % 2 === 0 ? 'milestones-right' : 'milestones-left'}`}>
                                    {item.milestones.map((milestone, idx) => (
                                        <div key={idx} className="milestone-item">
                                            <span className="milestone-year">{milestone.year}</span>
                                            <span className="milestone-text">{milestone.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}